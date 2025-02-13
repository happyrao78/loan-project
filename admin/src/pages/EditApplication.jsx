import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const EditLoanApplication = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    aadharNumber: "",
    panNumber: "",
    accountNumber: "",
    ifscCode: "",
    loanType: "",
    duration: "",
    loanAmount: "",
    bankName: "",
  });

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/loan/list`);
        const application = response.data.applications.find(app => app._id === id);
        
        if (application) {
          // Remove uneditable fields before setting state
          const { _id, __v, createdAt, updatedAt, ...editableData } = application;
          setFormData(editableData);
        }
      } catch (error) {
        toast.error("Error fetching application data.");
      }
    };

    fetchApplication();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${backendUrl}/api/loan/update/${id}`, formData, {
        headers: { token },
      });
      toast.success("Application updated successfully!");
      navigate("/loan-applications"); // Redirect back to applications list
    } catch (error) {
      toast.error("Error updating application.");
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Loan Application</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label className="block font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
              disabled={key === "email"} // Disable email field
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Update Application
        </button>
      </form>
    </div>
  );
};

export default EditLoanApplication;
