
import React, { useState, useEffect } from "react";
import axios from "axios";
import loan from "../assets/loan.jpg";
import Navbar from "../components/Navbar";
import InteractiveButton from "../components/Button";
import { IoIosArrowForward } from "react-icons/io";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import ChatBot from "../components/Chatbot";

const TrackLoan = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [loanStatus, setLoanStatus] = useState(null);
    const [error, setError] = useState("");
    const [selectedFee, setSelectedFee] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [banks, setBanks] = useState([]);
    const [timeLeft, setTimeLeft] = useState(600);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        let timer;
        if (showModal && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        closeModal();
                        toast.warning("Payment time expired. Please try again.");
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [showModal]);

    const openModal = (feeType) => {
        if (!banks.length) {
            console.error("Banks data not available");
            return;
        }

        let amount;
        switch (feeType) {
            case "Processing Fee":
                amount = banks[0]?.processingFee;
                break;
            case "Agreement Fee":
                amount = banks[0]?.agreementFee;
                break;
            case "Transfer Charge":
                amount = banks[0]?.transferCharge;
                break;
            case "TDS & Bank Service Charge":
                amount = banks[0]?.serviceCharge;
                break;
            default:
                amount = 0;
        }
        setTimeLeft(600); 
        setSelectedFee({ feeType, amount, bankDetails: banks[0]?.bankDetails });
        setShowModal(true);
    };



    const closeModal = () => {
        setShowModal(false);
        setSelectedFee(null);
        setTimeLeft(600); 
    };

    const fetchBanks = async () => {
        try {
            setLoading(true);
            const response = await axios.get("https://loan-project-backend.onrender.com/api/bank/list", {

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

    useEffect(() => {
        fetchBanks();
    }, []);

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
            const response = await axios.post("https://loan-project-backend.onrender.com/api/loan/track-loan", {
            // const response = await axios.post("http://localhost:5000/api/loan/track-loan", {
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


                </div>

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
                                    <span className="text-gray-600">Applicant Name</span>
                                    <span className="font-semibold">{loanStatus[0].fullName}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Email</span>
                                    <span className="font-semibold">{loanStatus[0].email}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Mobile No.</span>
                                    <span className="font-semibold">{loanStatus[0].phoneNumber}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Aadhar Number</span>
                                    <span className="font-semibold uppercase">{loanStatus[0].aadharNumber}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">PAN Number</span>
                                    <span className="font-semibold uppercase">{loanStatus[0].panNumber}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Applicant Name</span>
                                    <span className="font-semibold">{loanStatus[0].fullName}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Loan Amount</span>
                                    <span className="font-semibold">Rs. {loanStatus[0].loanAmount}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Loan Tenure</span>
                                    <span className="font-semibold">{loanStatus[0].duration} years</span>
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
                                <div className="">
                                    {/* Show Payment Status Table ONLY if loan is approved */}
                                    {loanStatus[0]?.loanStatus?.toLowerCase() === "approved" && (
                                        <div className="bg-white">
                                            {/* <h4 className="text-lg font-semibold text-darkGray mb-4">Payment Status</h4> */}
                                            <div className="space-y-4">
                                                {/* Processing Fee */}
                                                {loanStatus[0]?.showProcessingPayment && (
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-600">Processing Fee:</span>
                                                        <span className={`font-semibold ${loanStatus[0]?.processingFeePaid ? "text-green-600" : "text-red-600"}`}>
                                                            {loanStatus[0]?.processingFeePaid ? "Paid" : "Pending"}
                                                        </span>
                                                    </div>
                                                )}

                                                {/* Agreement Fee */}
                                                {loanStatus[0]?.showAgreementPayment && (
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-600">Agreement Fee:</span>
                                                        <span className={`font-semibold ${loanStatus[0]?.agreementFeePaid ? "text-green-600" : "text-red-600"}`}>
                                                            {loanStatus[0]?.agreementFeePaid ? "Paid" : "Pending"}
                                                        </span>
                                                    </div>
                                                )}

                                                {/* Transfer Charge */}
                                                {loanStatus[0]?.showTransferPayment && (
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-600">Transfer Charge:</span>
                                                        <span className={`font-semibold ${loanStatus[0]?.transferChargePaid ? "text-green-600" : "text-red-600"}`}>
                                                            {loanStatus[0]?.transferChargePaid ? "Paid" : "Pending"}
                                                        </span>
                                                    </div>
                                                )}

                                                {/* TDS & Bank Service Charge */}
                                                {loanStatus[0]?.showServicePayment && (
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-600">TDS & Bank Service Charge:</span>
                                                        <span className={`font-semibold ${loanStatus[0]?.serviceChargePaid ? "text-green-600" : "text-red-600"}`}>
                                                            {loanStatus[0]?.serviceChargePaid ? "Paid" : "Pending"}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}


                                </div>
                                {/* Payment Buttons - Only show when enabled */}
                                <div className="mt-6 space-y-4">
                                {loanStatus[0]?.loanStatus?.toLowerCase() === "approved" && (
                                    <div className="bg-white">
                                    {loanStatus[0]?.showProcessingPayment && !loanStatus[0]?.processingFeePaid && (
                                        <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-darkGray"
                                            onClick={() => openModal("Processing Fee", banks[0]?.processingFee)}
                                        >
                                            Pay Processing Fee
                                        </button>
                                    )}

                                    {loanStatus[0]?.showAgreementPayment && !loanStatus[0]?.agreementFeePaid && (
                                        <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-darkGray"
                                            onClick={() => openModal("Agreement Fee", banks[0]?.agreementFee)}
                                        >
                                            Pay Agreement Fee
                                        </button>
                                    )}

                                    {loanStatus[0]?.showTransferPayment && !loanStatus[0]?.transferChargePaid && (
                                        <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-darkGray"
                                            onClick={() => openModal("Transfer Charge", banks[0]?.transferCharge)}
                                        >
                                            Pay Transfer Charge
                                        </button>
                                    )}


                                    {loanStatus[0]?.showServicePayment && !loanStatus[0]?.serviceChargePaid && (
                                        <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-darkGray"
                                            onClick={() => openModal("TDS & Bank Service Charge", banks[0]?.serviceCharge)}
                                        >
                                            Pay TDS & Bank Service Charge
                                        </button>
                                    )}
                                </div>
                                )}
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
            {showModal && selectedFee && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 font-body">
                    <div className="bg-white p-6 py-8 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-semibold mb-4 font-body text-center">Payment Details</h3>
                        <div className="text-red-600 font-semibold m-2 mx-auto align-middle text-center">
                        Time Left: {formatTime(timeLeft)}
                    </div>
                        {/* <p className="text-gray-700"><strong>Fee Type:</strong> {selectedFee.feeType}</p>
                        <p className="text-gray-700"><strong>Amount:</strong> ₹{selectedFee.amount}</p>
                        <p className="text-gray-700 "><strong >Bank Name: </strong> {banks[0].bankName || "N/A"}</p>
                        <p className="text-gray-700 "><strong >Account Holder Name: </strong> {banks[0].Holdername || "N/A"}</p>
                        <p className="text-gray-700 "><strong >Account Number: </strong> {banks[0].accountNumber || "N/A"}</p>
                        <p className="text-gray-700 "><strong >IFSC Code: </strong> {banks[0].ifscCode || "N/A"}</p>
                        <p className="text-gray-700 "><strong >Contact Number: </strong> {banks[0].mobileNumber || "N/A"}</p>
                        <p className="text-gray-700 "><strong >Email: </strong> {banks[0].email || "N/A"}</p>

                        <p className="text-gray-700 "><strong >QR Code: </strong> </p>
                        <img
                            src={banks[0].qr}
                            alt="Bank QR Code"
                            className="w-full h-auto max-w-[200px] mx-auto"
                        /> */}

                        <div className="space-y-2 text-xs ">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 ">Fee Type:</span>
                                <span className="font-semibold"> {selectedFee.feeType}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 ">Amount:</span>
                                <span className="font-semibold"> ₹{selectedFee.amount}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 ">Bank Name: </span>
                                <span className="font-semibold"> {banks[0].bankName || "N/A"}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 ">Account Holder Name: </span>
                                <span className="font-semibold"> {banks[0].Holdername || "N/A"}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 ">Account Number: </span>
                                <span className="font-semibold">{banks[0].accountNumber || "N/A"}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 ">IFSC Code:  </span>
                                <span className="font-semibold">{banks[0].ifscCode || "N/A"}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 ">Contact Number: </span>
                                <span className="font-semibold"> {banks[0].mobileNumber || "N/A"}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 ">Email: </span>
                                <span className="font-semibold"> {banks[0].email || "N/A"}</span>
                            </div>

                            <p className="text-gray-700 "><strong >QR Code: </strong> </p>
                            <img
                                src={banks[0].qr}
                                alt="Bank QR Code"
                                className="w-full h-auto max-w-[200px] mx-auto"
                            />

                        </div>



                        <div className="mt-4 flex justify-end">
                            <button onClick={closeModal} className="px-4 py-2 bg-red-500 text-white rounded-md mr-2">Cancel Payment</button>

                        </div>
                    </div>
                </div>
            )}




<ChatBot />

            <Footer />
        </div>
    );
};

export default TrackLoan;