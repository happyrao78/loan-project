
import React, { useState } from "react";
import axios from "axios";
import loan from "../assets/loan.jpg";
import Navbar from "../components/Navbar";
import InteractiveButton from "../components/Button";
import { IoIosArrowForward } from "react-icons/io";
import Footer from "../components/Footer";

const TrackLoan = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [loanStatus, setLoanStatus] = useState(null);
    const [error, setError] = useState("");

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        if (value.length <= 10) {
            setPhoneNumber(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (phoneNumber.length !== 10) {
            setError("Please enter a valid 10-digit phone number");
            return;
        }

        setLoading(true);
        setError("");
        setLoanStatus(null);

        try {
            const response = await axios.post("http://localhost:5000/api/loan/track-loan", {
                phoneNumber: phoneNumber,
            });
            setLoanStatus(response.data.applications);
            console.log(response.data);
        } catch (error) {
            setError("Unable to fetch loan status. Please try again later.");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'processing':
                return 'text-yellow-600 bg-yellow-100';
            case 'approved':
                return 'text-green-600 bg-green-100';
            case 'rejected':
                return 'text-red-600 bg-red-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    return (
        <div className="relative bg-white">
            <Navbar z={50} />
            
            {/* Hero Section */}
            <div className="relative">
                <img src={loan} alt="" className="w-full h-[60vh] object-cover object-center" />
                <div className="absolute inset-0 bg-darkGray opacity-70"></div>
                <h2 className="absolute text-3xl md:text-4xl lg:text-6xl font-bold mb-12 font-heading text-primary text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    Track Loan Application
                </h2>
            </div>

            {/* Tracking Form */}
            <div className="max-w-2xl mx-auto px-4 py-16 font-body">
                <div className="bg-lightSeaGreen/30 rounded-2xl p-8 shadow-lg backdrop-blur-lg border border-white/30">
                    <h3 className="text-2xl font-bold text-darkGray mb-6 text-center">
                        Check Your Loan Application Status
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col">
                            <label className="text-darkGray font-bold mb-2">Phone Number</label>
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={handlePhoneChange}
                                placeholder="Enter your 10-digit phone number"
                                className="p-3 border rounded-lg bg-white/50 focus:ring-2 focus:ring-primary outline-none font-body"
                                required
                            />
                            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                        </div>

                        <InteractiveButton
                            buttonText={loading ? "Checking Status..." : "Track Application"}
                            hoverText="Track Application"
                            bgColor="bg-primary"
                            textColor="text-white"
                            hoverBgColor="hover:bg-darkGray"
                            hoverTextColor="hover:text-white"
                            property="w-full"
                            icon={<IoIosArrowForward />}
                            type="submit"
                        />
                    </form>

                    {/* Status Display */}
                    {loanStatus && !error && (
                        <div className="mt-8 p-6 rounded-lg bg-white">
                            <h4 className="text-lg font-semibold text-darkGray mb-4">Application Details</h4>
                            {loanStatus.length > 0 && (
                                <div className="space-y-4 mb-6 p-4 border rounded-lg">
                                    {/* <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Application ID</span>
                                        <span className="font-semibold">{loanStatus[0]._id}</span>
                                    </div> */}
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Loan Amount</span>
                                        <span className="font-semibold">{loanStatus[0].loanAmount}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Bank Name</span>
                                        <span className="font-semibold">{loanStatus[0].bankName}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Loan Type</span>
                                        <span className="font-semibold">{loanStatus[0].loanType}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Status</span>
                                        <span className={`font-semibold px-3 py-1 rounded-full ${getStatusColor(loanStatus[0].loanStatus)}`}>
                                            {loanStatus[0].loanStatus}
                                        </span>
                                    </div>
                                    {loanStatus[0].message && (
                                        <div className="text-sm text-gray-600 mt-4 p-4 bg-gray-50 rounded-lg">
                                            {loanStatus[0].message}
                                        </div>
                                    )}
                                </div>
                            )}
                            {loanStatus.length > 1 && (
                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={() => setLoanStatus([loanStatus[loanStatus.length - 1], ...loanStatus.slice(0, loanStatus.length - 1)])}
                                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-darkGray"
                                        disabled={loanStatus.length <= 1}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => setLoanStatus(loanStatus.slice(1))}
                                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-darkGray"
                                        disabled={loanStatus.length <= 1}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TrackLoan;