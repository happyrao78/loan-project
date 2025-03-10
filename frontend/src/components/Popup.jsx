import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PopupForm = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [msg, setMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Show the popup after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    if (e.preventDefault) e.preventDefault();
    
    // Form validation
    if (!name.trim() || !email.trim()) {
      setErrorMessage("Name and email are required fields");
      setSubmitStatus('error');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address");
      setSubmitStatus('error');
      return;
    }
    
    // Phone validation (optional - only validate if provided)
    if (phone && !/^\d{10}$/.test(phone)) {
      setErrorMessage("Please enter a valid 10-digit phone number");
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    try {
      // Parse loanAmount to ensure it's sent as a number
      const parsedLoanAmount = loanAmount ? parseInt(loanAmount, 10) : 0;
      
      // Create data object based on your schema
      const formData = {
        name: name,
        email: email,
        phone: phone ? parseInt(phone, 10) : null, // Convert to number as per your schema
        message: msg,
        loanAmount: parsedLoanAmount
      };

      // Send to your backend API
      const response = await axios.post('https://loan-project-backend.onrender.com/api/popup/add', formData);

      if (response.status === 201) {
        setSubmitStatus('success');
        // Clear form fields after successful submission
        setName("");
        setPhone("");
        setEmail("");
        setLoanAmount("");
        setMsg("");
        
        // Close the popup after successful submission
        setTimeout(() => setShowPopup(false), 1500);
      } else {
        setSubmitStatus('error');
        setErrorMessage("Server responded with an error. Please try again.");
        console.error("Error response:", response);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error("Error submitting the form:", error);
      
      // Handle specific error messages from the server
      if (error.response) {
        if (error.response.status === 400) {
          setErrorMessage(error.response.data.message || "Invalid form data. Please check your entries.");
        } else if (error.response.status === 409 || (error.response.data && error.response.data.message && error.response.data.message.includes("duplicate"))) {
          setErrorMessage("This email is already registered in our system.");
        } else {
          setErrorMessage("Server error. Please try again later.");
        }
      } else if (error.request) {
        // The request was made but no response was received
        setErrorMessage("No response from server. Please check your internet connection.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApplyOnly = () => {
    navigate("/apply-form");
  };

  const handleSaveAndApply = async () => {
    // First save the data
    if (name && email) {
      await handleSubmit({ preventDefault: () => {} });
      
      // Only navigate if submission was successful
      if (submitStatus === 'success') {
        navigate("/apply-form");
      }
    } else {
      setErrorMessage("Please fill in all required fields before proceeding.");
      setSubmitStatus('error');
    }
  };

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 font-heading flex items-center justify-center bg-black bg-opacity-70 z-[9999] p-8">
          <div className="bg-white w-full max-w-sm sm:max-w-sm rounded-lg shadow-2xl relative overflow-hidden">
            {/* Decorative top bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-teal-400"></div>
            
            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center transition-colors"
              aria-label="Close Popup"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
  
            {/* Title and Subtitle */}
            <div className="text-center mb-3 mt-4 px-4">
              <h2 className="text-lg font-bold text-gray-800 mb-1">
                Get Your Loan Today
              </h2>
              <p className="text-xs text-gray-600">
                Fast approvals with competitive rates
              </p>
              <div className="h-0.5 w-12 bg-blue-500 mx-auto mt-1.5 rounded-full"></div>
            </div>
  
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 px-4 pb-4">
              {/* Full Name */}
              <div className="relative">
                <label htmlFor="name" className="text-xs font-medium text-gray-700 block mb-1">
                  Full Name*
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full border border-gray-300 rounded-md py-1.5 px-3 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition text-xs"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
  
              {/* Phone Number */}
              <div className="relative">
                <label htmlFor="phone" className="text-xs font-medium text-gray-700 block mb-1">
                  Phone Number
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-xs">
                    +91
                  </span>
                  <input
                    id="phone"
                    type="tel"
                    className="w-full border border-gray-300 rounded-r-md py-1.5 px-3 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition text-xs"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => {
                      // Only allow numbers
                      const value = e.target.value.replace(/\D/g, '');
                      setPhone(value);
                    }}
                  />
                </div>
              </div>
  
              {/* Email Address */}
              <div className="relative">
                <label htmlFor="email" className="text-xs font-medium text-gray-700 block mb-1">
                  Email Address*
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full border border-gray-300 rounded-md py-1.5 px-3 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition text-xs"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
  
              {/* Loan Amount */}
              <div className="relative">
                <label htmlFor="loanAmount" className="text-xs font-medium text-gray-700 block mb-1">
                  Loan Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-xs">₹</span>
                  </div>
                  <input
                    id="loanAmount"
                    type="text"
                    className="w-full border border-gray-300 rounded-md py-1.5 pl-6 pr-3 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition text-xs"
                    placeholder="Enter Amount"
                    value={loanAmount}
                    onChange={(e) => {
                      // Only allow numbers
                      const value = e.target.value.replace(/\D/g, '');
                      setLoanAmount(value);
                    }}
                  />
                </div>
              </div>
  
              {/* Message - Optional based on space constraints */}
              <div className="relative">
                <label htmlFor="message" className="text-xs font-medium text-gray-700 block mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  className="w-full border border-gray-300 rounded-md py-1.5 px-3 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition text-xs h-12 resize-none"
                  placeholder="Enter your message"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                />
              </div>
  
              {/* Submission Status Message */}
              {submitStatus === 'success' && (
                <div className="bg-green-50 text-green-700 p-1.5 rounded-md text-xs flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  Your information has been saved successfully!
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="bg-red-50 text-red-700 p-1.5 rounded-md text-xs flex items-start gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <span>{errorMessage || "There was an error submitting your information. Please try again."}</span>
                </div>
              )}
  
              {/* Assurance - Condensed */}
              <div className="text-xs text-gray-600 bg-gray-50 p-1.5 rounded-md">
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  <p className="flex items-center gap-1 text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    Data secure
                  </p>
                  <p className="flex items-center gap-1 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    Results in 2 min
                  </p>
                </div>
              </div>
  
              {/* Action Buttons */}
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleApplyOnly}
                  className="w-1/2 bg-gray-100 text-gray-800 hover:bg-gray-200 py-1.5 rounded-md font-medium transition text-xs border border-gray-300"
                >
                  Apply Now
                </button>
                <button
                  type="button"
                  onClick={handleSaveAndApply}
                  className={`w-1/2 ${
                    isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                  } text-white py-1.5 rounded-md font-medium transition text-xs shadow`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save & Apply"}
                </button>
              </div>
            </form>
  
            {isSubmitting && (
              <div className="text-center mb-2">
                <div className="inline-block animate-spin rounded-full h-4 w-4 border-t-1 border-b-1 border-blue-500"></div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PopupForm;