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

  const sendEmail = async (email, type) => {
    try {
      await axios.post(`${backendUrl}/api/loan/send-email`, {
        email,
        subject: type === "agreement" ? "Loan Agreement Details" : "Loan Approval Letter",
        message: `Dear User,\n\nYour loan ${type === "agreement" ? "agreement" : "approval letter"} is attached.\n\nRegards,\nLoan Team`,
      });
      toast.success("Email sent successfully!");
    } catch (error) {
      toast.error("Failed to send email.");
    }
  };

  const calculateEMI = (loanAmount, rate, tenure) => {
    const monthlyRate = rate / (12 * 100);
    const months = tenure * 12;
    return ((loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
           (Math.pow(1 + monthlyRate, months) - 1)).toFixed(2);
};

// **Calculate EMI Schedule**
const calculateEMISchedule = (loanAmount, rate, tenure) => {
    let balance = loanAmount;
    const emi = calculateEMI(loanAmount, rate, tenure);
    const months = tenure * 12;
    const emiSchedule = [];
    let dueDate = new Date();
    dueDate.setDate(7);  // Set fixed EMI due date (7th of each month)

    for (let i = 1; i <= months; i++) {
        const interest = ((balance * rate) / 1200).toFixed(2);
        const principalComponent = (emi - interest).toFixed(2);
        balance = (balance - principalComponent).toFixed(2);
        
        // Format Due Date
        const formattedDate = dueDate.toLocaleDateString();
        const formattedMonth = dueDate.toLocaleString("default", { month: "short", year: "numeric" });

        emiSchedule.push([
            formattedDate,
            formattedMonth,
            `Rs ${principalComponent}`,
            `Rs ${interest}`,
            `Rs ${balance}`
        ]);

        // Move to next month
        dueDate.setMonth(dueDate.getMonth() + 1);
    }

    return emiSchedule;
};

// **Generate PDF**
const downloadPDF = (application, type) => {
    const roi = roiInputs[application._id];
    if (!roi && application.loanStatus !== "Rejected") {
        toast.error("Please enter Rate of Interest!");
        return;
    }

    const doc = new jsPDF();
    doc.setFontSize(18);

    // **Company & Status Logos**
    doc.addImage(company, "PNG", 160, 10, 30, 30);
    const statusLogo = application.loanStatus === "Approved" ? approve : reject;
    doc.addImage(statusLogo, "PNG", 10, 10, 30, 30);

    // **Header**
    let headerText = application.loanStatus === "Approved" ? "LOAN APPROVAL LETTER" : "LOAN REJECTION LETTER";
    doc.text(headerText, 105, 20, { align: "center" });

    // **Company Details**
    doc.setFontSize(12);
    doc.text("Dhanlaxmi Bank Pvt.Ltd", 105, 35, { align: "center" });
    doc.text("CIN : L65191kL1927PLC000307", 105, 42, { align: "center" });
    doc.text("Ground floor, Ideal Plaza, Minto Park, Kolkata, West Bengal, 700020", 105, 49, { align: "center" });
    doc.text("Toll Free: +91 9007437250 | Email: connect@laxmeefenerv.online", 105, 56, { align: "center" });
    doc.text("Web: laxmeefenerva.online", 105, 63, { align: "center" });
    doc.line(10, 70, 200, 70);

    // **To Section**
    doc.text(`To,`, 20, 80);
    doc.text(`${application.fullName}`, 20, 87);
    doc.text(`${application.email}`, 20, 94);
    doc.text(`Phone: ${application.phoneNumber}`, 20, 101);
    doc.text(`Dated: ${new Date().toLocaleDateString()}`, 20, 108);

    if (application.loanStatus === "Rejected") {
        // **Rejection Letter Content**
        doc.setFontSize(14);
        doc.text("We regret to inform you that your loan application has been rejected.", 20, 120);
        doc.setFontSize(12);
        doc.text("Rejection Reason:", 20, 130);
        doc.text(application.rejectionReason || "Your CIBIL score is not good.", 30, 137);
        doc.text("For further inquiries, please contact our support team.", 20, 150);
        doc.text("Thank you for considering our services.", 20, 160);
    } else {
        // **Approval Letter Content**
        doc.text(`Dear, ${application.fullName}`, 20, 120);
        doc.text(`Dhanlaxmi Bank Pvt.Ltd welcomes you.`, 20, 130);
        doc.text(`We are pleased to inform you that your application for a Personal Loan of Rs ${application.loanAmount} has been approved.`, 20, 137);
        doc.text(`Your Application Details are as follows:`, 20, 144);

        // **Application Details Table**
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

        // **EMI Schedule Table**
        const emiSchedule = calculateEMISchedule(application.loanAmount, roi, application.duration);
        autoTable(doc, {
            startY: yPosition,
            head: [["Due Date", "Month", "Principal", "Interest", "Balance"]],
            body: emiSchedule,
            theme: "striped",
        });

        yPosition = doc.autoTable.previous.finalY + 10;

        // **Payment Mode & Account Details**
        doc.text("Kindly submit the required documents and pay the processing fee:", 20, yPosition);
        doc.text(`Processing Fees: Rs 1199 (Refundable within 15 days)`, 20, yPosition + 8);
        doc.text(`Account Name: Dhanlaxmi Bank Pvt Ltd`, 20, yPosition + 16);
        doc.text(`Account No.: 50200097140840`, 20, yPosition + 24);
        doc.text(`IFSC: HDFC0006552 | Bank: HDFC BANK`, 20, yPosition + 32);
        doc.text(`Payment Mode: NEFT / RTGS / IMPS / UPI / Net Banking (Cash not allowed)`, 20, yPosition + 40);
    }

    // **Footer**
    doc.setFontSize(10);
    doc.text("Follow us: @companyInstagram | @companyTwitter", 105, 280, { align: "center" });

    // **Save PDF**
    const fileName = `loan-${application.loanStatus.toLowerCase()}-${application.fullName}.pdf`;
    doc.save(fileName);
};
  useEffect(() => {
    fetchApplications();
  }, []);

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
  

  if (loading) return <div className="flex justify-center items-center h-64"><p className="text-blue-500">Loading applications...</p></div>;
  if (error) return <div className="flex justify-center items-center h-64"><p className="text-red-500">{error}</p></div>;
  if (applications.length === 0) return <div className="flex justify-center items-center h-64"><p className="text-gray-500">No applications available</p></div>;

  return (
    <div className="p-6 space-y-6">
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
                    <button
                      onClick={() => sendEmail(app.email, "agreement")}
                      className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-600 transition-colors"
                    >
                      Send Agreement
                      {/* <Download size={16} /> */}
                    </button>
                    <button
                      onClick={() => downloadPDF(app, "agreement")}
                      className="flex items-center gap-2 bg-green-500 text-white px-3 py-1.5 rounded text-sm hover:bg-green-600 transition-colors"
                    >
                      Download Agreement
                      <Download size={16} />
                    </button>
                  </div>

                  <div className="flex justify-between gap-2">
                    <button
                      onClick={() => sendEmail(app.email, "approval")}
                      className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-600 transition-colors"
                    >
                      Send Approval
                      {/* <Download size={16} /> */}
                    </button>
                    <button
                      onClick={() => downloadPDF(app, "approval")}
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
                        checked={app.agreementFeePaid || false}
                        onChange={(e) => handleCheckboxChange(app._id, 'agreementFeePaid', e.target.checked)}
                        className="form-checkbox"
                      />
                      <span className="text-sm">Agreement Fee Paid</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={app.processingFeePaid || false}
                        onChange={(e) => handleCheckboxChange(app._id, 'processingFeePaid', e.target.checked)}
                        className="form-checkbox"
                      />
                      <span className="text-sm">Processing Fee Paid</span>
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