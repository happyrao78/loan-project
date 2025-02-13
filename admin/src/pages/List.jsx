import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Correct import for useNavigate

const List = ({ token }) => {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use navigate for programmatic navigation

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

  const deleteBank = async (bankId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this bank?");
      if (confirmDelete) {
        await axios.delete(`${backendUrl}/api/bank/remove/${bankId}`, {
          headers: { token },
        });
        setBanks(banks.filter((bank) => bank._id !== bankId));
        toast.success("Bank deleted successfully!");
      }
    } catch (err) {
      console.error("Error deleting bank:", err);
      toast.error("Failed to delete bank");
    }
  };

  const handleEdit = (bankId) => {
    navigate(`/edit-bank/${bankId}`); // Navigate to the edit bank page using navigate
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Bank Accounts</h2>

      {loading ? (
        <p className="text-blue-500 text-center">Loading banks...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : banks.length === 0 ? (
        <p className="text-gray-500 text-center">No banks available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banks.map((bank) => (
            <div key={bank._id} className="bg-white border rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-blue-600">{bank.Holdername}</h3>
                <span className="text-sm text-gray-500">
                  {new Date(bank.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-semibold">Account Number:</span>{" "}
                  {bank.accountNumber}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Bank Name:</span> {bank.bankName}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Account Type:</span>{" "}
                  {bank.accountType}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">IFSC Code:</span> {bank.ifscCode}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Mobile:</span> {bank.mobileNumber}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Email:</span> {bank.email}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Processing Fee:</span>{" "}
                  ₹{bank.processingFee}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Agreement Fee:</span>{" "}
                  ₹{bank.agreementFee}
                </p>
              </div>

              {/* QR Code Image */}
              <div className="mt-4">
                <img
                  src={bank.qr}
                  alt="Bank QR Code"
                  className="w-full h-auto max-w-[200px] mx-auto"
                />
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Address:</span> {bank.address}
                </p>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <button
                  onClick={() => handleEdit(bank._id)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteBank(bank._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
