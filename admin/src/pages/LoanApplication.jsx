import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { jsPDF } from "jspdf";
import { backendUrl } from "../App";
import autoTable from "jspdf-autotable";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import reject from "../assets/admin_assets/rejected.png"
import approve from "../assets/admin_assets/approved.png"
import company from "../assets/admin_assets/company.png"
import signaturePath from "../assets/admin_assets/signature.png"
import stampPath from "../assets/admin_assets/stamp.png"

// Custom Card Components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="px-6 py-4 border-b border-gray-200">{children}</div>
);

const CardContent = ({ children }) => (
  <div className="px-6 py-4">{children}</div>
);

const LoanApplications = ({ token }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState("All");
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [roiInputs, setRoiInputs] = useState({});

  useEffect(() => {
    if (filterStatus === "All") {
      setFilteredApplications(applications);
    } else {
      setFilteredApplications(applications.filter(app => app.loanStatus === filterStatus));
    }
  }, [filterStatus, applications]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/loan/list`, {
        headers: { token },
      });

      if (response.data && response.data.success) {
        setApplications(response.data.applications);
      } else {
        toast.error("Unexpected response format");
      }
    } catch (err) {
      console.error("Error fetching applications:", err);
      toast.error("Failed to load loan applications");
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/loan/update-status/${id}`,
        { status: newStatus },  // Sending as 'status' to match controller
        { headers: { token } }
      );

      if (response.data && response.data.success) {
        toast.success("Status updated successfully");
        // Update the local state with the new loanStatus
        setApplications(applications.map(app =>
          app._id === id ? { ...app, loanStatus: newStatus } : app
        ));
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const deleteApplication = async (id) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/loan/delete/${id}`, {
        headers: { token },
      });

      if (response.data && response.data.success) {
        toast.success("Application deleted successfully");
        // Update the local state by removing the deleted application
        setApplications(applications.filter(app => app._id !== id));
      } else {
        toast.error("Failed to delete application");
      }
    } catch (error) {
      console.error("Error deleting application:", error);
      toast.error("Failed to delete application");
    }
  };
  const sendEmail = async (email, type, application) => {
    try {
      let pdfDoc;
      let fileName;
      let pdfBase64;
  
      if (type === "agreement") {
        const pdfData = generateAgreementPDF(application);
        if (!pdfData) return; // Return if ROI is not set
        pdfDoc = pdfData.doc;
        fileName = pdfData.fileName;
        pdfBase64 = pdfData.base64;
      } else {
        // For approval letter
        const roi = roiInputs[application._id];
        if (!roi && application.loanStatus !== "Rejected") {
          toast.error("Please enter Rate of Interest!");
          return;
        }
  
        // Create PDF with compression
        pdfDoc = new jsPDF(
        //   {
        //   compress: true,
        //   unit: 'pt',
        //   format: 'a4'
        // }
      );
        // Generate the approval/rejection letter
        generateApprovalPDF(pdfDoc, application, roi);
        
        fileName = `loan-${application.loanStatus.toLowerCase()}-${application.fullName}.pdf`;
        pdfBase64 = pdfDoc.output('datauristring', { compress: false });
      }
  
      // Extract just the base64 content without the data URI prefix
      const base64Content = pdfBase64.split(',')[1];
  
      // Send email with PDF attachment
      await axios.post(
        `${backendUrl}/api/loan/send-email`,
        {
          email,
          subject: type === "agreement" ? "Loan Agreement Document" : "Loan Approval Letter",
          message: type === "agreement"
            ? "Please find attached your loan agreement document. Review and sign it at your earliest convenience."
            : "Please find attached your loan approval letter.",
          attachment: {
            content: base64Content,
            filename: fileName,
            type: 'application/pdf'
          }
        },
        {
          headers: { 
            token,
            'Content-Type': 'application/json'
          },
          maxBodyLength: Infinity,
          timeout: 30000
        }
      );
  
      toast.success("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      if (error.response?.status === 413) {
        toast.error("File size too large. Please try again with a smaller file size.");
      } else if (error.code === 'ECONNABORTED') {
        toast.error("Request timed out. Please try again.");
      } else if (error.response?.status === 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error("Failed to send email. Please try again.");
      }
    }
  };

  const sendFeePaymentEmail = async (email, type, application) => {
    try {
      let subject = "Payment Confirmation from DigitalFinserve";
      let message = "";
      // Payment type ke basis pe message decide karna
      switch (type) {
        case "processing":
          message = "Your loan processing fee payment has been successfully received. Your loan application is now under review.";
          break;
        case "agreement":
          message = "Your agreement fee payment has been successfully received. Your loan agreement is now processed.";
          break;
        case "transferCharge":
          message = "Your transfer charge payment has been successfully received. Your loan transfer request is now being processed.";
          break;
        case "serviceCharge":
          message = "Your TDS payment has been successfully received. The tax deduction has been applied to your transaction.";
          break;
        default:
          message = "Your payment has been successfully received.";
      }
  
      await axios.post(
        `${backendUrl}/api/loan/send-email`,
        {
          email,
          subject,
          message,
        },
        {
          headers: {
            token,
            'Content-Type': 'application/json'
          }
        }
      );

      toast.success("Payment Email sent successfully!");
  
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email. Please try again.");
    }
  };


  const generateApprovalPDF = (doc, application, roi) => {
    // Set initial font size for header
    doc.setFontSize(18);

    // Company & Status Logos
    doc.addImage(company, "PNG", 160, 10, 30, 30);
    const statusLogo = application.loanStatus === "Approved" ? approve : reject;
    doc.addImage(statusLogo, "PNG", 10, 10, 30, 30);

    // Header
    const headerText = application.loanStatus === "Approved" ? "LOAN APPROVAL LETTER" : "LOAN REJECTION LETTER";
    doc.text(headerText, 105, 20, { align: "center" });

    // Company Details
    doc.setFontSize(12);
    doc.text("Dhanlaxmi Bank Pvt.Ltd", 105, 35, { align: "center" });
    doc.text("CIN : L65191kL1927PLC000307", 105, 42, { align: "center" });
    doc.text("Ground floor, Ideal Plaza, Minto Park, Kolkata, West Bengal, 700020", 105, 49, { align: "center" });
    doc.text("Toll Free: +91 9007437250 | Email: connect@laxmeefenerv.online", 105, 56, { align: "center" });
    doc.text("Web: laxmeefenerva.online", 105, 63, { align: "center" });
    doc.line(10, 70, 200, 70);
    const leftMargin = 10;
    // To Section
    doc.text("To,", leftMargin, 80);
    doc.text(application.fullName, leftMargin, 87);
    doc.text(application.email, leftMargin, 94);
    doc.text(`Phone: ${application.phoneNumber}`, leftMargin, 101);
    doc.text(`Dated: ${new Date().toLocaleDateString()}`, leftMargin, 108);

    if (application.loanStatus === "Rejected") {
        // Rejection Letter Content
        doc.setFontSize(14);
        doc.text("We regret to inform you that your loan application has been rejected.", leftMargin, 120);
        doc.setFontSize(12);
        doc.text("Rejection Reason:",leftMargin, 130);
        doc.text(application.rejectionReason || "Your CIBIL score is not good.", 30, 137);
        doc.text("For further inquiries, please contact our support team.",leftMargin, 150);
        doc.text("Thank you for considering our services.",leftMargin, 160);
    } else {
        // Approval Letter Content
        doc.text(`Dear ${application.fullName},`,leftMargin, 120);
        doc.text("Dhanlaxmi Bank Pvt.Ltd welcomes you.",leftMargin, 130);
        doc.text(`We are pleased to inform you that your application for a Personal Loan of Rs ${application.loanAmount} has been approved.`,leftMargin, 137);
        doc.text("Your Application Details are as follows:",leftMargin, 144);

        // const emiAmount = calculateEMI(application.loanAmount, roi, application.duration);
        // doc.setFontSize(14);
        // doc.text(`Monthly EMI: Rs ${emiAmount}`, leftMargin, 155);
        // doc.setFontSize(12);
        // Application Details Table
        autoTable(doc, {
            startY: 150,
            head: [["Field", "Details"]],
            body: [
                ["Applicant Name", application.fullName],
                ["PAN Number", application.panNumber],
                ["Aadhaar Number", application.aadharNumber],
                ["Account Holder", application.fullName],
                ["Account Number", application.accountNumber],
                ["IFSC Code", application.ifscCode],
                ["Bank Name", application.bankName],
                ["EMI", `Rs ${calculateEMI(application.loanAmount, roi, application.duration)}`],
                ["Loan Amount", `Rs ${application.loanAmount}`],
                ["Interest Rate", `${roi}%`]
            ],
            theme: "grid",
        });

        let yPosition = doc.autoTable.previous.finalY + 10;

        // EMI Schedule Table
        const emiSchedule = calculateEMIScheduleFixed(application.loanAmount, roi, application.duration);
        autoTable(doc, {
            startY: yPosition,
            head: [["EMI Date(MM-DD-YYYY)",  "Principal Amount", "Interest Amount", "Remaining Balance"]],
            body: emiSchedule,
            theme: "striped",
        });

        yPosition = doc.autoTable.previous.finalY + 10;

        // Payment Mode & Account Details
        doc.text("Kindly submit the required documents and pay the processing fee:", 20, yPosition);
        doc.text("Processing Fees: Rs 1199 (Refundable within 15 days)", 20, yPosition + 8);
        doc.text("Account Name: Dhanlaxmi Bank Pvt Ltd", 20, yPosition + 16);
        doc.text("Account No.: 50200097140840", 20, yPosition + 24);
        doc.text("IFSC: HDFC0006552 | Bank: HDFC BANK", 20, yPosition + 32);
        doc.text("Payment Mode: NEFT / RTGS / IMPS / UPI / Net Banking (Cash not allowed)", 20, yPosition + 40);
        doc.addImage(signaturePath, "PNG", 30, yPosition + 60, 50, 30); // Signature
        doc.addImage(stampPath, "PNG", 100, yPosition + 60, 50, 30); // Stamp
    }
   
    // Footer
    doc.setFontSize(10);
    doc.text("Follow us: @companyInstagram | @companyTwitter", 105, 280, { align: "center" });

    return doc;
};
const calculateEMIScheduleFixed = (loanAmount, rate, tenure) => {
  let balance = loanAmount;
  const emi = parseFloat(calculateEMI(loanAmount, rate, tenure));
  const months = tenure * 12;
  const emiSchedule = [];
  let dueDate = new Date();
  dueDate.setMonth(dueDate.getMonth() + 1);
  dueDate.setDate(7);

  for (let i = 1; i <= months; i++) {
      const interest = parseFloat(((balance * rate) / 1200).toFixed(2));
      const principalComponent = parseFloat((emi - interest).toFixed(2));
      balance = parseFloat((balance - principalComponent).toFixed(2));

      if (balance < 0) balance = 0;

      emiSchedule.push([
          dueDate.toLocaleDateString(),
          `Rs ${principalComponent.toFixed(2)}`,
          `Rs ${interest.toFixed(2)}`,
          `Rs ${balance.toFixed(2)}`
      ]);

      dueDate.setMonth(dueDate.getMonth() + 1);
  }
  return emiSchedule;
}

  const calculateEMI = (loanAmount, rate, tenure) => {
    const monthlyRate = rate / (12 * 100);
    const months = tenure * 12;
    return ((loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)).toFixed(2);
  };

  // **Calculate EMI Schedule**
  // const calculateEMISchedule = (loanAmount, rate, tenure) => {
  //   let balance = loanAmount;
  //   const emi = calculateEMI(loanAmount, rate, tenure);
  //   const months = tenure * 12;
  //   const emiSchedule = [];
  //   let dueDate = new Date();

  //   dueDate.setMonth(dueDate.getMonth() + 1);
  //   dueDate.setDate(7);  // Set fixed EMI due date (7th of each month)

  //   for (let i = 1; i <= months; i++) {
  //     const interest = ((balance * rate) / 1200).toFixed(2);
  //     const principalComponent = (emi - interest).toFixed(2);
  //     balance = (balance - principalComponent).toFixed(2);

  //     // Format Due Date
  //     const formattedDate = dueDate.toLocaleDateString();
  //     // const formattedMonth = dueDate.toLocaleString("default", { month: "short", year: "numeric" });
  //     const totalEMI = Number(principalComponent) + Number(interest);

  //     emiSchedule.push([
  //       formattedDate,
  //       // formattedMonth,
  //       `Rs ${totalEMI.toFixed(2)}`, // Combined EMI amount
  //       `Rs ${principalComponent}`,
  //       `Rs ${interest}`,
  //       `Rs ${balance}`
  //     ]);

  //     // Move to next month
  //     dueDate.setMonth(dueDate.getMonth() + 1);
  //   }

  //   return emiSchedule;
  // };

  useEffect(() => {
    fetchApplications();
  }, []);


const generateAgreementPDF = (application) => {
  const roi = roiInputs[application._id];
  if (!roi) {
    toast.error("Please enter Rate of Interest!");
    return;
  }

  // Create PDF with compression
  const doc = new jsPDF({
    compress: true,
    unit: 'pt', // Use points for more precise sizing
    format: 'a4'  // Specify A4 format
  });

  // Set initial font size and get page dimensions
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 40; // Standard margin in points

  // Optimize image
  const companyLogoProps = {
    width: 80,
    height: 80,
    imageType: 'PNG',
    compression: 'FAST'
  };
  doc.addImage(company, "PNG", pageWidth - margin - companyLogoProps.width, margin, 
               companyLogoProps.width, companyLogoProps.height);

  // Header
  doc.setFontSize(20);
  doc.text("LOAN AGREEMENT", pageWidth / 2, margin + 40, { align: "center" });

  // Company Details
  doc.setFontSize(12);
  doc.text("Dhanlaxmi Bank Pvt.Ltd", pageWidth / 2, margin + 80, { align: "center" });
  doc.text("CIN : L65191kL1927PLC000307", pageWidth / 2, margin + 100, { align: "center" });
  doc.text("Ground floor, Ideal Plaza, Minto Park, Kolkata, West Bengal, 700020", 
           pageWidth / 2, margin + 120, { align: "center" });
  
  // Horizontal line
  doc.setLineWidth(0.5);
  doc.line(margin, margin + 140, pageWidth - margin, margin + 140);

  // Agreement Content
  doc.setFontSize(14);
  doc.text("LOAN AGREEMENT TERMS AND CONDITIONS", 
           pageWidth / 2, margin + 180, { align: "center" });

  // Borrower Details
  doc.setFontSize(12);
  doc.text("THIS AGREEMENT is made on " + new Date().toLocaleDateString(), 
           margin, margin + 220);
  doc.text("BETWEEN", margin, margin + 250);
  doc.text("1. Dhanlaxmi Bank Pvt.Ltd (hereinafter referred to as the 'Lender')", 
           margin, margin + 280);
  doc.text("AND", margin, margin + 310);
  doc.text(`2. ${application.fullName} (hereinafter referred to as the 'Borrower')`, 
           margin, margin + 340);

  // Loan Details Table
  autoTable(doc, {
    startY: margin + 380,
    margin: { left: margin, right: margin },
    head: [["Loan Details", "Value"]],
    body: [
      ["Loan Amount", `Rs ${application.loanAmount.toLocaleString()}`],
      ["Interest Rate", `${roi}%`],
      ["Loan Term", `${application.duration} Years`],
      ["Monthly EMI", `Rs ${calculateEMI(application.loanAmount, roi, application.duration).toLocaleString()}`],
      ["Purpose of Loan", application.loanType]
    ],
    theme: "grid",
    styles: { fontSize: 12, cellPadding: 5 },
    columnStyles: {
      0: { cellWidth: 200 },
      1: { cellWidth: 'auto' }
    }
  });

  // Terms and Conditions
  const yPosition = doc.autoTable.previous.finalY + 30;
  doc.setFontSize(12);
  doc.text("Key Terms and Conditions:", margin, yPosition);

  const terms = [
    "1. The Borrower shall repay the loan amount with interest in monthly installments (EMI).",
    "2. The EMI payment is due on the 7th of each month.",
    "3. Late payment penalties will be applicable as per bank guidelines.",
    "4. The Borrower may prepay the loan with additional charges as applicable.",
    "5. The Lender reserves the right to recall the loan in case of default."
  ];

  let currentY = yPosition + 20;
  terms.forEach((term) => {
    // Word wrap for terms
    const lines = doc.splitTextToSize(term, pageWidth - (2 * margin));
    doc.text(lines, margin, currentY);
    currentY += (lines.length * 20); // Adjust spacing based on number of lines
  });

  // Signature Spaces
  const signatureY = currentY + 50;
  doc.text("Authorized Signatory", margin + 50, signatureY);
  doc.text("Borrower Signature", pageWidth - margin - 150, signatureY);
  doc.text("(Dhanlaxmi Bank Pvt.Ltd)", margin + 50, signatureY + 20);
  doc.text(`(${application.fullName})`, pageWidth - margin - 150, signatureY + 20);

  doc.addImage(signaturePath, "PNG", margin + 50, signatureY - 40, 80, 40); // Signature
  doc.addImage(stampPath, "PNG", margin + 150, signatureY - 40, 80, 40);
  // Generate compressed output
  const pdfBase64 = doc.output('datauristring', { compress: true });
  
  return {
    doc,
    fileName: `loan-agreement-${application.fullName.replace(/\s+/g, '-')}.pdf`,
    base64: pdfBase64
  };
};


  const getStatusStyles = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Rejected":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    }
  };

  const handleCheckboxChange = async (applicationId, field, value) => {
    try {
      // Send a PUT request to update the application with the new checkbox value
      const response = await axios.put(
        `${backendUrl}/api/loan/update-fee-status/${applicationId}`,
        { [field]: value },  // Dynamically set the field name (agreementFeePaid or processingFeePaid)
        { headers: { token } }
      );

      if (response.data && response.data.success) {
        toast.success("Fee status updated successfully!");
        // Update local state to reflect changes
        setApplications(applications.map(app =>
          app._id === applicationId ? { ...app, [field]: value } : app
        ));
      } else {
        toast.error("Failed to update fee status");
      }
    } catch (error) {
      console.error("Error updating fee status:", error);
      toast.error("Failed to update fee status");
    }
  };
  
  const handlePaymentModal = async (applicationId, field, value) => {
    try {
      // Send a PUT request to update the payment status with the new checkbox value
      const response = await axios.put(
        `${backendUrl}/api/loan/show-payments/${applicationId}`,
        { [field]: value },  
        { headers: { token } }
      );

      if (response.data && response.data.success) {
        if (value) {
          toast.success("Payment enabled successfully!");
        } else {
          toast.info("Payment disabled successfully!");
        }
        // Update local state to reflect changes
        setApplications(applications.map(app =>
          app._id === applicationId ? { ...app, [field]: value } : app
        ));
      } else {
        toast.error("Failed to enable payment");
      }
    } catch (error) {
      console.error("Error enabling payement:", error);
      toast.error("Failed to enable payment");
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64"><p className="text-blue-500">Loading applications...</p></div>;
  if (error) return <div className="flex justify-center items-center h-64"><p className="text-red-500">{error}</p></div>;
  if (applications.length === 0) return <div className="flex justify-center items-center h-64"><p className="text-gray-500">No applications available</p></div>;

  return (
    <div className="p-6 space-y-6 w-full">
      {/* <h2 className="text-3xl font-bold text-center mb-8">Loan Applications</h2> */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Loan Applications</h2>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border rounded-md text-sm"
        >
          <option value="All">All</option>
          <option value="Processing">Processing</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApplications.map((app, index) => (
          <Card key={app._id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{app.fullName}</h3>
                <span className="text-sm text-gray-500">#{index + 1}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-500">Phone:</div>
                  <div>{app.phoneNumber}</div>

                  <div className="text-gray-500">Email:</div>
                  <div className="truncate">{app.email}</div>

                  <div className="text-gray-500">Loan Type:</div>
                  <div>{app.loanType}</div>

                  <div className="text-gray-500">Amount:</div>
                  <div>₹{app.loanAmount}</div>

                  <div className="text-gray-500">Duration:</div>
                  <div>{app.duration} Years</div>
                </div>
                <input
                  type="number"
                  placeholder="Enter ROI (%)"
                  className="border rounded px-2 py-1 w-full text-sm"
                  value={roiInputs[app._id] || ""}
                  onChange={(e) => setRoiInputs({ ...roiInputs, [app._id]: e.target.value })}
                />
                <div className="pt-4 space-y-3">
                  <div className="flex justify-between gap-2">
                    {/* <button
                      onClick={() => sendEmail(app.email, "agreement")}
                      className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-600 transition-colors"
                    >
                      Send Agreement
                   
                    </button> */}
                    {/* <button
                      onClick={() => downloadPDF(app, "agreement")}
                      className="flex items-center gap-2 bg-green-500 text-white px-3 py-1.5 rounded text-sm hover:bg-green-600 transition-colors"
                    >
                      Download Agreement
                      <Download size={16} />
                    </button> */}


                    <button
                      onClick={() => sendEmail(app.email, "agreement", app)}
                      className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-600 transition-colors"
                    >
                      Send Agreement
                    </button>
                    <button
                      onClick={() => {
                        const { doc, fileName } = generateAgreementPDF(app);
                        doc.save(fileName);
                      }}
                      className="flex items-center gap-2 bg-green-500 text-white px-3 py-1.5 rounded text-sm hover:bg-green-600 transition-colors"
                    >
                      Download Agreement
                      <Download size={16} />
                    </button>
                  </div>

                  <div className="flex justify-between gap-2">
                    <button
                      onClick={() => sendEmail(app.email, "approval", app)}
                      className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-600 transition-colors"
                    >
                      Send Approval
                      {/* <Download size={16} /> */}
                    </button>
                    {/* <button
                      onClick={() => downloadPDF(app, "approval")}
                      className="flex items-center gap-2 bg-green-500 text-white px-3 py-1.5 rounded text-sm hover:bg-green-600 transition-colors"
                    >
                      Download Approval
                      <Download size={16} />
                    </button> */}
                    <button
                      onClick={() => {
                        const doc = new jsPDF();
                        generateApprovalPDF(doc, app, roiInputs[app._id]);
                        doc.save("Loan_Approval_Letter.pdf"); // Saves the generated PDF
                      }}
                      className="flex items-center gap-2 bg-green-500 text-white px-3 py-1.5 rounded text-sm hover:bg-green-600 transition-colors"
                    >
                      Download Approval
                      <Download size={16} />
                    </button>
                  </div>
                  <div className="space-y-2 pt-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={app.processingFeePaid || false}
                        onChange={(e) => {
                        const isChecked = e.target.checked;
                        handleCheckboxChange(app._id, 'processingFeePaid', isChecked);

                        // Sirf jab checkbox checked ho raha ho tab email bhejo
                        if (isChecked) {
                        sendFeePaymentEmail(app.email, "processing", app);
                        }
                        }}
                        className="form-checkbox"
                      />
                      <span className="text-sm">Processing Fee Paid</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={app.agreementFeePaid || false}
                        onChange={(e) => {
                        const isChecked = e.target.checked;
                        handleCheckboxChange(app._id, 'agreementFeePaid', e.target.checked)
                        if(isChecked) {
                          sendFeePaymentEmail(app.email, "agreement", app);
                        }
                        }}
                        className="form-checkbox"
                      />
                      <span className="text-sm">Agreement Fee Paid</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={app.transferChargePaid || false}
                        onChange={(e) => {
                        const isChecked = e.target.checked;
                        handleCheckboxChange(app._id, 'transferChargePaid', e.target.checked)
                        if(isChecked) {
                          sendFeePaymentEmail(app.email, "transferCharge", app);
                        }
                        }}
                        className="form-checkbox"
                      />
                      <span className="text-sm">Transfer Charge Paid</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={app.serviceChargePaid || false}
                        onChange={(e) => {
                        const isChecked = e.target.checked;
                        handleCheckboxChange(app._id, 'serviceChargePaid', e.target.checked)
                        if(isChecked) {
                          sendFeePaymentEmail(app.email, "serviceCharge", app);
                        }
                        }}
                        className="form-checkbox"
                      />
                      <span className="text-sm">TDS & Banking Service Charge Paid</span>
                    </div>
                    <hr />
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={app.showProcessingPayment || false}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          
                        handlePaymentModal(app._id, 'showProcessingPayment', e.target.checked)
                        }}
                        className="form-checkbox"
                      />
                      <span className="text-sm">Show Processing Fee Payment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={app.showAgreementPayment || false}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          
                        handlePaymentModal(app._id, 'showAgreementPayment', e.target.checked)
                        }}
                        className="form-checkbox"
                      />
                      <span className="text-sm">Show Agreement Payment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={app.showTransferPayment || false}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          
                        handlePaymentModal(app._id, 'showTransferPayment', e.target.checked)
                        }}
                        className="form-checkbox"
                      />
                      <span className="text-sm">Show Transfer Payment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={app.showServicePayment || false}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          
                        handlePaymentModal(app._id, 'showServicePayment', e.target.checked)
                        }}
                        className="form-checkbox"
                      />
                      <span className="text-sm">Show Service Payment</span>
                    </div>
                  </div>


                  <div className="pt-4 flex justify-between items-center">
                    <select
                      value={app.loanStatus || "Processing"}
                      onChange={(e) => updateApplicationStatus(app._id, e.target.value)}
                      className={`px-3 py-1 rounded text-sm cursor-pointer transition-colors ${getStatusStyles(app.loanStatus)}`}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>

                    <button
                      onClick={() => navigate(`/edit-application/${app._id}`)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 transition-colors"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteApplication(app._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>

                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div >
  );
};

export default LoanApplications;