import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';

const AddBank = ({ token }) => {
    const [holdername, setHoldername] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accountType, setAccountType] = useState("");
    const [bankName, setBankName] = useState("");
    const [ifscCode, setIfscCode] = useState("");
    const [address, setAddress] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");
    const [processingFee, setProcessingFee] = useState("");
    const [agreementFee, setAgreementFee] = useState("");
    const [qr, setQr] = useState(null);  // For QR file

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("Holdername", holdername);
        formData.append("accountNumber", accountNumber);
        formData.append("accountType", accountType);
        formData.append("bankName", bankName);
        formData.append("ifscCode", ifscCode);
        formData.append("address", address);
        formData.append("mobileNumber", mobileNumber);
        formData.append("email", email);
        formData.append("processingFee", processingFee);
        formData.append("agreementFee", agreementFee);
        formData.append("qr", qr);  // Appending the QR image file

        try {
            const response = await axios.post(`${backendUrl}/api/bank/add`, formData, {
                headers: {
                    token,
                    "Content-Type": "multipart/form-data", // Ensure it's sent as FormData for file upload
                },
            });

            console.log(response.data);

            if (response.data.message === "Bank added successfully!") {
                toast.success(response.data.message);
                setHoldername("");
                setAccountNumber("");
                setAccountType("");
                setBankName("");
                setIfscCode("");
                setAddress("");
                setMobileNumber("");
                setEmail("");
                setProcessingFee("");
                setAgreementFee("");
                setQr(null);  // Clear the QR code after success
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Holder Name */}
                <div>
                    <p className="mb-2 text-sm font-medium">Holder Name</p>
                    <input 
                        type="text" 
                        value={holdername} 
                        onChange={(e) => setHoldername(e.target.value)} 
                        required 
                        className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>

                {/* Account Number */}
                <div>
                    <p className="mb-2 text-sm font-medium">Account Number</p>
                    <input 
                        type="number" 
                        value={accountNumber} 
                        onChange={(e) => setAccountNumber(e.target.value)} 
                        required 
                        className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>

                {/* Account Type */}
                <div>
                    <p className="mb-2 text-sm font-medium">Account Type</p>
                    <select 
                        className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        onChange={(e) => setAccountType(e.target.value)} 
                        value={accountType} 
                        required
                    >
                        <option value="">Select Account Type</option>
                        <option value="Savings">Savings</option>
                        <option value="Current">Current</option>
                        <option value="Business">Business</option>
                    </select>
                </div>

                {/* Bank Name */}
                <div>
                    <p className="mb-2 text-sm font-medium">Bank Name</p>
                    <input 
                        type="text" 
                        value={bankName} 
                        onChange={(e) => setBankName(e.target.value)} 
                        required 
                        className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>

                {/* IFSC Code */}
                <div>
                    <p className="mb-2 text-sm font-medium">IFSC Code</p>
                    <input 
                        type="text" 
                        value={ifscCode} 
                        onChange={(e) => setIfscCode(e.target.value)} 
                        required 
                        className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>

                {/* Address */}
                <div>
                    <p className="mb-2 text-sm font-medium">Bank Address</p>
                    <input 
                        type="text" 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                        required 
                        className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>

                {/* Mobile Number */}
                <div>
                    <p className="mb-2 text-sm font-medium">Mobile Number</p>
                    <input 
                        type="number" 
                        value={mobileNumber} 
                        onChange={(e) => setMobileNumber(e.target.value)} 
                        required 
                        className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>

                {/* Email */}
                <div>
                    <p className="mb-2 text-sm font-medium">Email</p>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>

                {/* Processing Fee */}
                <div>
                    <p className="mb-2 text-sm font-medium">Processing Fee</p>
                    <input 
                        type="number" 
                        value={processingFee} 
                        onChange={(e) => setProcessingFee(e.target.value)} 
                        required 
                        className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>

                {/* Agreement Fee */}
                <div>
                    <p className="mb-2 text-sm font-medium">Agreement Fee</p>
                    <input 
                        type="text" 
                        value={agreementFee} 
                        onChange={(e) => setAgreementFee(e.target.value)} 
                        required 
                        className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>

                {/* QR Code File Upload */}
                <div>
                    <p className="mb-2 text-sm font-medium">Upload QR Code</p>
                    <input 
                        type="file" 
                        onChange={(e) => setQr(e.target.files[0])} 
                        required 
                        accept="image/*" 
                        className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <button 
                type="submit" 
                className="w-full py-3 mt-6 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Add Bank
            </button>
        </form>
    );
};

export default AddBank;
