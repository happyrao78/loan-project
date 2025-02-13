import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { jsPDF } from "jspdf";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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

  const downloadPDF = (application, type) => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text(type === "agreement" ? "Loan Agreement" : "Approval Letter", 105, 20, { align: "center" });
    
    doc.setFontSize(12);
    doc.text("Loan Application Details:", 20, 40);
    doc.text(`Name: ${application.fullName}`, 20, 55);
    doc.text(`Loan Type: ${application.loanType}`, 20, 70);
    doc.text(`Loan Amount: ₹${application.loanAmount}`, 20, 85);
    doc.text(`Duration: ${application.duration} Years`, 20, 100);
    doc.text(`Status: ${application.loanStatus}`, 20, 115);
    doc.text(`Date: ${new Date(application.createdAt).toLocaleDateString()}`, 20, 130);
    
    doc.setFontSize(10);
    doc.text("This document is system generated.", 105, 280, { align: "center" });
    
    doc.save(`loan-${type}-${application.fullName}.pdf`);
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

  if (loading) return <div className="flex justify-center items-center h-64"><p className="text-blue-500">Loading applications...</p></div>;
  if (error) return <div className="flex justify-center items-center h-64"><p className="text-red-500">{error}</p></div>;
  if (applications.length === 0) return <div className="flex justify-center items-center h-64"><p className="text-gray-500">No applications available</p></div>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold text-center mb-8">Loan Applications</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map((app, index) => (
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

                <div className="pt-4 space-y-3">
                  <div className="flex justify-between gap-2">
                    <button
                      onClick={() => sendEmail(app.email, "agreement")}
                      className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-600 transition-colors"
                    >
                      Send Agreement
                      <Download size={16} />
                    </button>
                    <button
                      onClick={() => downloadPDF(app, "agreement")}
                      className="flex items-center gap-2 bg-green-500 text-white px-3 py-1.5 rounded text-sm hover:bg-green-600 transition-colors"
                    >
                      Download
                      <Download size={16} />
                    </button>
                  </div>

                  <div className="flex justify-between gap-2">
                    <button
                      onClick={() => sendEmail(app.email, "approval")}
                      className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-600 transition-colors"
                    >
                      Send Approval
                      <Download size={16} />
                    </button>
                    <button
                      onClick={() => downloadPDF(app, "approval")}
                      className="flex items-center gap-2 bg-green-500 text-white px-3 py-1.5 rounded text-sm hover:bg-green-600 transition-colors"
                    >
                      Download
                      <Download size={16} />
                    </button>
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
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LoanApplications;