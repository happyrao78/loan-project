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
import paidLogo from "../assets/admin_assets/paid.png"
import { use } from "react";
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
  const [banks, setBanks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (filterStatus === "All") {
      setFilteredApplications(applications);
    } else {
      setFilteredApplications(applications.filter(app => app.loanStatus === filterStatus));
    }
  }, [filterStatus, applications]);

  const handleSearch = () => {
    if (searchTerm === "") {
      setFilteredApplications(applications);
    } else {
      setFilteredApplications(applications.filter(app =>
        app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.phoneNumber.toString().includes(searchTerm)
      ));
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm, applications]);


  const fetchBanks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/bank/list`, {
        headers: { token },
      });

      if (response.data && response.data.success) {
        setBanks(response.data.banks);
      } else {
        toast.error("Unexpected response format");
      }
    } catch (err) {
      console.error("Error fetching banks:", err);
      toast.error("Failed to load banks");
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchBanks();
  },[]);

  const getFeeAmounts = (banks) => {
    const fees = {
      processing: 0,
      agreement: 0,
      transferChargePaid: 0,
      serviceChargePaid: 0
    };
  
    if (banks.length > 0) {
      fees.processing = banks[0].processingFee || 0;
      fees.agreement = banks[0].agreementFee || 0;
      fees.transferChargePaid = banks[0].transferCharge || 0;
      fees.serviceChargePaid = banks[0].serviceCharge || 0;
    }
  
    return fees;
  };

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

  
  const sendFeePaymentEmail = async (email, type, application,fees) => {
    try {
      let subject = "Payment Confirmation from DigitalFinserve";
      let message = "";
      let pdfData;
  
      // Payment type ke basis pe message decide karna
      switch (type) {
        case "processing":
          message = "Your loan processing fee payment has been successfully received. Your loan application is now under review.";
          break;
        case "agreement":
          message = "Your agreement fee payment has been successfully received. Your loan agreement is now processed.";
          break;
        case "transferChargePaid":
          message = "Your transfer charge payment has been successfully received. Your loan transfer request is now being processed.";
          break;
        case "serviceChargePaid":
          message = "Your TDS payment has been successfully received. The tax deduction has been applied to your transaction.";
          break;
        default:
          message = "Your payment has been successfully received.";
      }
  
      // Generate the payment receipt PDF
      pdfData = generatePaymentReceiptPDF(application, type, fees);
      const pdfBase64 = pdfData.base64;
      const fileName = pdfData.fileName;
  
      // Extract just the base64 content without the data URI prefix
      const base64Content = pdfBase64.split(',')[1];
  
      await axios.post(
        `${backendUrl}/api/loan/send-email`,
        {
          email,
          subject,
          message,
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
  const feesApproval = getFeeAmounts(banks);
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 40;

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
  doc.setFont("helvetica", "bold");
  doc.text("Digital Finserv Pvt.Ltd", 105, 35, { align: "center" });
  doc.text("CIN : U72900KA2022PTC160654", 105, 42, { align: "center" });
  doc.text("NBP Green Heights, C-68, Bandra Kurla Complex Rd, opposite to MCA Club, F Block BKC", 105, 49, { align: "center" });
  doc.text("Bandra East, Mumbai, Maharashtra 400051", 105, 56, { align: "center" });
  doc.text("Toll Free: +91 8981323486 | Email: support@digitalfinserv.in", 105, 63, { align: "center" });
  doc.text("Web: digitalfinserv.in", 105, 68, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.line(10, 70, 200, 70);
  const leftMargin = 10;

  // To Section
  doc.text("To,", leftMargin, 80);
  doc.text(application.fullName, leftMargin, 87);
  doc.text(application.email, leftMargin, 94);
  doc.text(`Phone: ${application.phoneNumber}`, leftMargin, 101);
  doc.text(`Dated: ${new Date().toLocaleDateString("en-GB")}`, leftMargin, 108);

  if (application.loanStatus === "Rejected") {
      // Rejection Letter Content
      doc.setFontSize(14);
      doc.text("We regret to inform you that your loan application has been rejected.", leftMargin, 120);
      doc.setFontSize(12);
      doc.text("Rejection Reason:", leftMargin, 130);
      doc.text(application.rejectionReason || "Your CIBIL score is not good.", 30, 137);
      doc.text("For further inquiries, please contact our support team.", leftMargin, 150);
      doc.text("Thank you for considering our services.", leftMargin, 160);
  } else {
      // Approval Letter Content
      doc.setFont("helvetica", "bold");
      doc.text(`Dear ${application.fullName},`, leftMargin, 120);
      doc.setFont("helvetica", "normal");
      doc.text("Digital Finserv Pvt.Ltd welcomes you.", leftMargin, 130);
      doc.text(`We are pleased to inform you that your application for a Personal Loan of Rs ${application.loanAmount} has been approved.`, leftMargin, 137);
      doc.setFont("helvetica", "bold");
      doc.text("Your Application Details are as follows:", leftMargin, 144);
      doc.setFont("helvetica", "normal");

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

      // Get the Y position after the first table
      let yPosition = doc.autoTable.previous.finalY + 10;

      // EMI Schedule Table
      const emiSchedule = calculateEMIScheduleFixed(application.loanAmount, roi, application.duration);
      autoTable(doc, {
          startY: yPosition,
          head: [["EMI Date(DD-MM-YYYY)", "Principal Amount", "Interest Amount", "Remaining Balance"]],
          body: emiSchedule,
          theme: "striped",
      });

      // Get the Y position after the second table
      yPosition = doc.autoTable.previous.finalY + 10;

      // Check if there's enough space for the remaining content
      const remainingContentHeight = 100; // Approximate height needed for remaining content
      if (yPosition + remainingContentHeight > pageHeight - margin) {
          doc.addPage();
          yPosition = margin;
      }

      // Processing Fee Note
      doc.setFont("helvetica", "bold");
      doc.text(`Kindly pay the Processing Fee of Rs ${feesApproval.processing} today. This amount is refundable.`, 
               leftMargin, yPosition + 10);

      // Signature section
      const signatureY = yPosition + 60;
      doc.text("Signed, Sealed & Delivered", margin + 50, signatureY);
      doc.text("Borrower Signature", pageWidth - margin - 150, signatureY);
      doc.text("(Digital Finserv Pvt.Ltd)", margin + 50, signatureY + 20);
      doc.text(`(${application.fullName})`, pageWidth - margin - 150, signatureY + 20);

      // Add signature image
      doc.addImage(signaturePath, "PNG", margin + 50, signatureY - 40, 80, 40);

      // Footer note
      doc.setFont("helvetica", "bold");
      doc.text("This is a computer generated document and does not require a signature.", 
               margin, pageHeight - margin);
  }

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
          dueDate.toLocaleDateString("en-GB"),
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

  useEffect(() => {
    fetchApplications();
  }, []);

const generateAgreementPDF = (application) => {
  const roi = roiInputs[application._id];
  if (!roi) {
    toast.error("Please enter Rate of Interest!");
    return;
  }
  const feesPdf = getFeeAmounts(banks);
  console.log(feesPdf.agreement);

  // Create PDF with compression
  const doc = new jsPDF({
    compress: true,
    unit: 'pt',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 40;
  
  // Add stamp at the start with reduced height
  doc.addImage(stampPath, "PNG", 20, 20, pageWidth-50, 200);

  // Start text content below the stamp with reduced spacing
  const contentStartY = 250; // Reduced from 300

  // Company logo
  const companyLogoProps = {
    width: 80,
    height: 80,
    imageType: 'PNG',
    compression: 'FAST'
  };
  doc.addImage(company, "PNG", pageWidth - margin - companyLogoProps.width, contentStartY, 
               companyLogoProps.width, companyLogoProps.height);

  // Header
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Loan Agreement", pageWidth / 2, contentStartY + 50, { align: "center" });

  // Company Details with reduced spacing
  doc.line(margin, contentStartY + 80, pageWidth - margin, contentStartY + 80);

  // Borrower Details with reduced spacing
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("THIS LOAN AGREEMENT is made on " + new Date().toLocaleDateString("en-GB"), 
           margin, contentStartY + 120);
  doc.text("BETWEEN", margin, contentStartY + 140);
  doc.text("1. DIGITAL FINSERV PRIVATE LIMITED, a company incorporated under the Companies ", 
           margin, contentStartY + 160);
  doc.text("Act, 2013, having CIN U72900KA2022PTC160654, with its registered office ",margin, contentStartY+ 180); 

  doc.text("at NBP Green Heights, C-68, Bandra Kurla Complex Rd, Opposite to MCA Club, ",margin, contentStartY+ 200);

  doc.text(" F Block BKC, Bandra East, Mumbai, Maharashtra 400051 ", margin, contentStartY + 220);
  doc.text("(hereinafter referred to as the 'Lender' AND", margin, contentStartY + 250);
  doc.text(`2. ${application.fullName},Email : ${application.email}, Contact No. : ${application.phoneNumber}`, 
           margin, contentStartY + 270);
  doc.text("(hereinafter referred to as the 'Borrower')", margin, contentStartY + 290);
  doc.setFont("helvetica", "normal");
  doc.text("WHEREAS, the lender agrees to provide a loan to the Borrower, and the Borrower ",
           margin, contentStartY + 310);
  doc.text(" agrees to repay the Loan under the terms set forth in this Agreement.", margin, contentStartY + 330);

  // Loan Details Table with adjusted starting position
  autoTable(doc, {
    startY: contentStartY + 370,
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

  // Terms and Conditions with proper page break handling
  const yPosition = doc.autoTable.previous.finalY + 20;
  
  // Add new page for terms and conditions
  doc.addPage();
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Terms and Conditions:", margin, margin + 20);

  doc.setFont("helvetica", "normal");
  const terms = [
    "1. Loan Amount & Interest",
    `The Lender promises to loan Rs. ${application.loanAmount} to the Borrower and the Borrower promises to repay this principal amount to the Lender, with ${roi}% interest payable on the unpaid principal at the rate specified per annum, calculated yearly not in advance.`,
    
    "2. Repayment Schedule",
    "This Loan will be repaid in consecutive monthly instalments of principal and interest on the first day of each month commencing the month following the beginning of the loan.",
    
    "3. Late Payment & Default",
    "In case of default in repayment, the Lender reserves the right to declare the outstanding amount due immediately.A penalty interest of 1% per annum will be charged on the outstanding amount from the date of default until full payment is received.The Borrower shall be responsible for any legal or collection costs incurred by the Lender due to non-payment.",
    
    "4. Governing Law & Jurisdiction",
    "This Agreement will be construed in accordance with and governed by the laws of the State of Maharashtra.Any disputes arising under this Agreement will be resolved in the courts of Mumbai.",
    
    "5. Binding Effect",
    "This Agreement will pass to the benefit of and be binding upon the respective heirs, executors, administrators, successors and permitted assigns of the Borrower and Lender.",
    
    "6. Amendments",
    "This Agreement may only be amended or modified by a written instrument executed by both parties.",
    
    "7. Severability",
    "If any provision is held invalid or unenforceable, it shall be reduced in scope to the extent necessary to make it reasonable and enforceable.",
    
    "8. Entire Agreement",
    "This Agreement constitutes the entire agreement between the parties.  No oral or written commitments outside this Agreement shall be binding.",
  ];

  

  let currentY = margin + 40;
  terms.forEach((term) => {
    const lines = doc.splitTextToSize(term, pageWidth - (2 * margin));
    
    // Check if we need a new page
    if (currentY + (lines.length * 20) > pageHeight - margin) {
      doc.addPage();
      currentY = margin + 20;
    }
    
    doc.text(lines, margin, currentY);
    currentY += (lines.length * 20);
  });

  // Ensure signatures are on a new page if needed
  if (currentY > pageHeight - 150) {
    doc.addPage();
    currentY = margin + 20;
  }

  // Note about Agreement Fee
  doc.text(`Kindly pay the Agreement Fee of Rs ${feesPdf.agreement} today. This amount is refundable.`, margin, currentY + 20);

  // Signature Spaces
  const signatureY = currentY + 100;
  doc.text("Signed, Sealed & Delivered", margin + 50, signatureY);
  doc.text("Borrower Signature", pageWidth - margin - 150, signatureY);
  doc.text("(Digital Finserv Pvt.Ltd)", margin + 50, signatureY + 20);
  doc.text(`(${application.fullName})`, pageWidth - margin - 150, signatureY + 20);

  doc.addImage(signaturePath, "PNG", margin + 50, signatureY - 40, 80, 40);
  doc.addImage(approve, "PNG", margin + 190, signatureY - 80, 120, 80);
  doc.setFont("helvetica", "bold");
  doc.text("This is a computer generated document and does not require a signature.", margin, pageHeight - margin);
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

        // Send payment email with receipt if the checkbox is checked
      if (value) {
        const application = applications.find(app => app._id === applicationId);
        const type = field.replace('FeePaid', '');
        const fees = getFeeAmounts(banks);
        sendFeePaymentEmail(application.email, type, application, fees);
      }
      } else {
        toast.error("Failed to update fee status");
      }
    } catch (error) {
      console.error("Error updating fee status:", error);
      toast.error("Failed to update fee status");
    }
  };

  const generatePaymentReceiptPDF = (application, type, fees) => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString("en-GB");
    
    // Map payment types to their display names
    const paymentTypeDisplay = {
      processing: "Processing Fee",
      agreement: "Agreement Fee",
      transferChargePaid: "Transfer Charge",
      serviceChargePaid: "TDS & Service Charge"
    };
  
    // Get the correct amount based on the type
    const amount = fees[type] || 0;
    const displayType = paymentTypeDisplay[type] || type;
  
    // Add company logo
    doc.addImage(company, "PNG", 10, 10, 50, 20);
  
    // Add approved stamp
    doc.addImage(paidLogo, "PNG", 150, 10, 50, 20);
  
    doc.setFontSize(18);
    doc.text("Payment Receipt", 105, 40, { align: "center" });
  
    doc.setFontSize(12);
    doc.text(`Date: ${date}`, 10, 60);
    doc.text(`Name: ${application.fullName}`, 10, 70);
    doc.text(`Email: ${application.email}`, 10, 80);
    doc.text(`Phone: ${application.phoneNumber}`, 10, 90);
    doc.text(`Loan Type: ${application.loanType}`, 10, 100);
    doc.text(`Loan Amount: Rs.${application.loanAmount}`, 10, 110);
    doc.text(`Duration: ${application.duration} Years`, 10, 120);
    doc.text(`Payment Type: ${displayType}`, 10, 130);
    doc.text(`Amount Paid: Rs.${amount}`, 10, 140);
  
    // Add table for payment details
    autoTable(doc, {
      startY: 150,
      head: [["Field", "Details"]],
      body: [
        ["Date", date],
        ["Name", application.fullName],
        ["Email", application.email],
        ["Phone", application.phoneNumber],
        ["Loan Type", application.loanType],
        ["Loan Amount", `Rs.${application.loanAmount}`],
        ["Duration", `${application.duration} Years`],
        ["Payment Type", displayType],
        ["Amount Paid", `Rs.${amount}`]
      ],
      theme: "grid",
      styles: { fontSize: 8, cellPadding: 2 },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 'auto' }
      }
    });
  
    doc.setFontSize(10);
    doc.text("Thank you for your payment.", 10, doc.autoTable.previous.finalY + 10);
  
    const pdfBase64 = doc.output('datauristring', { compress: true });
    return {
      doc,
      fileName: `payment-receipt-${type}-${application.fullName.replace(/\s+/g, '-')}.pdf`,
      base64: pdfBase64
    };
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
        <input
          type="text"
          placeholder="Search by Name, Email or Phone"
          className="border rounded-md px-3 py-2 w-96 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />


        
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
                        // if (isChecked) {
                        // sendFeePaymentEmail(app.email, "processing", app);
                        // }
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
                        handleCheckboxChange(app._id, 'agreementFeePaid', isChecked)
                        // if(isChecked) {
                        //   sendFeePaymentEmail(app.email, "agreement", app);
                        // }
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
                        handleCheckboxChange(app._id, 'transferChargePaid', isChecked)
                        // if(isChecked) {
                        //   sendFeePaymentEmail(app.email, "transferCharge", app);
                        // }
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
                        handleCheckboxChange(app._id, 'serviceChargePaid', isChecked)
                        // if(isChecked) {
                        //   sendFeePaymentEmail(app.email, "serviceCharge", app);
                        // }
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