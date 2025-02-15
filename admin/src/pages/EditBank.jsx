import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // For routing in React Router v6
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const EditBank = ({ token }) => {
  const [bank, setBank] = useState({
    Holdername: "",
    accountNumber: "",
    accountType: "",
    bankName: "",
    ifscCode: "",
    mobileNumber: "",
    email: "",
    processingFee: "",
    agreementFee: "",
    address: "",
    qr: "", // For current QR image
    transferCharge: "",
    serviceCharge: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [file, setFile] = useState(null); // For the new QR code file

  const { bankId } = useParams(); // Get bank ID from the URL
  const navigate = useNavigate(); // To navigate after successful update

  // Fetch the current bank details
  const fetchBankDetails = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/bank/list`, {
        headers: { token },
      });

      const currentBank = response.data.banks.find((b) => b._id === bankId);
      if (currentBank) {
        setBank(currentBank);
      } else {
        setError("Bank not found.");
      }
    } catch (err) {
      console.error("Error fetching bank details:", err);
      setError("Failed to fetch bank details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBankDetails();
  }, [bankId]);

  // Handle file input for QR code
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBank((prevBank) => ({
      ...prevBank,
      [name]: value,
    }));
  };

  // Submit the updated form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("Holdername", bank.Holdername);
      formData.append("accountNumber", bank.accountNumber);
      formData.append("accountType", bank.accountType);
      formData.append("bankName", bank.bankName);
      formData.append("ifscCode", bank.ifscCode);
      formData.append("mobileNumber", bank.mobileNumber);
      formData.append("email", bank.email);
      formData.append("processingFee", bank.processingFee);
      formData.append("agreementFee", bank.agreementFee);
      formData.append("address", bank.address);
      formData.append("transferCharge", bank.transferCharge);
      formData.append("serviceCharge", bank.serviceCharge);

      // If a new QR file is uploaded, append it to formData
      if (file) {
        formData.append("qr", file);
      }

      // Send the PUT request to update the bank details
      const response = await axios.put(`${backendUrl}/api/bank/edit/${bankId}`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success("Bank details updated successfully!");
        navigate("/listbanks"); // Redirect to bank list page after successful update
      } else {
        toast.error("Failed to update bank details.");
      }
    } catch (err) {
      console.error("Error updating bank details:", err);
      toast.error("Failed to update bank details.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Bank Details</h2>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="Holdername" className="block text-sm font-medium">Holder Name</label>
          <input
            type="text"
            id="Holdername"
            name="Holdername"
            value={bank.Holdername}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="accountNumber" className="block text-sm font-medium">Account Number</label>
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            value={bank.accountNumber}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="accountType" className="block text-sm font-medium">Account Type</label>
          <input
            type="text"
            id="accountType"
            name="accountType"
            value={bank.accountType}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="bankName" className="block text-sm font-medium">Bank Name</label>
          <input
            type="text"
            id="bankName"
            name="bankName"
            value={bank.bankName}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="ifscCode" className="block text-sm font-medium">IFSC Code</label>
          <input
            type="text"
            id="ifscCode"
            name="ifscCode"
            value={bank.ifscCode}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="mobileNumber" className="block text-sm font-medium">Mobile Number</label>
          <input
            type="text"
            id="mobileNumber"
            name="mobileNumber"
            value={bank.mobileNumber}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={bank.email}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="processingFee" className="block text-sm font-medium">Processing Fee</label>
          <input
            type="text"
            id="processingFee"
            name="processingFee"
            value={bank.processingFee}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="agreementFee" className="block text-sm font-medium">Agreement Fee</label>
          <input
            type="text"
            id="agreementFee"
            name="agreementFee"
            value={bank.agreementFee}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="transferCharge" className="block text-sm font-medium">Transfer Charge:</label>
          <input
            type="text"
            id="transferCharge"
            name="transferCharge"
            value={bank.transferCharge}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="serviceCharge" className="block text-sm font-medium">TDS & Banking Service Charge:</label>
          <input
            type="text"
            id="serviceCharge"
            name="serviceCharge"
            value={bank.serviceCharge}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={bank.address}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        {/* QR Code Image Upload */}
        <div className="mb-4">
          <label htmlFor="qr" className="block text-sm font-medium">Upload New QR Code (Optional)</label>
          <input
            type="file"
            id="qr"
            onChange={handleFileChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full rounded"
        >
          Update Bank Details
        </button>
      </form>
    </div>
  );
};

export default EditBank;
