import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PopupForm = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Show the popup after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);
    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formEndpoint = "https://api.web3forms.com/submit";

    const formData = {
      access_key: "8c1faef5-4354-4e6b-b812-9687c9243ee8", // Your web3forms access key
      subject: "New Loan Application Request",
      name: name,
      email: email,
      phone: phone,
      message: `
*New Loan Application Request*
Name: ${name}
Phone: ${phone}
Email: ${email}
      `.trim(),
    };

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        // Close the popup after successful submission
        setTimeout(() => setShowPopup(false), 1500);
      } else {
        alert("There was an error submitting the form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("There was an error submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApplyOnly = () => {
    navigate("/apply-form");
  };

  const handleSaveAndApply = async () => {
    // First save the data
    if (name && phone && email) {
      await handleSubmit({ preventDefault: () => {} });
      // Then navigate to apply form
    //   navigate("/apply-form");
    } else {
      alert("Please fill in all required fields before proceeding.");
    }
  };

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-[9999] px-4">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-2xl relative overflow-hidden">
            {/* Decorative top bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-teal-400"></div>
            
            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 focus:outline-none bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
              aria-label="Close Popup"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Title and Subtitle */}
            <div className="text-center mb-6 mt-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Get Your Loan Today
              </h2>
              <p className="text-gray-600">
                Fast approvals with competitive rates
              </p>
              <div className="h-1 w-20 bg-blue-500 mx-auto mt-3 rounded-full"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="relative">
                <label htmlFor="name" className="text-sm font-medium text-gray-700 block mb-1">
                  Full Name*
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="relative">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700 block mb-1">
                  Phone Number*
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    +91
                  </span>
                  <input
                    id="phone"
                    type="tel"
                    className="w-full border border-gray-300 rounded-r-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="relative">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-1">
                  Email Address*
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Assurance */}
              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <p className="flex items-center gap-2 text-green-600 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  Your data is secure and encrypted
                </p>
                <p className="flex items-center gap-2 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  Get results in less than 2 minutes
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleApplyOnly}
                  className="w-1/2 bg-gray-100 text-gray-800 hover:bg-gray-200 py-3 rounded-lg font-medium transition text-sm border border-gray-300"
                >
                  Apply Now
                </button>
                <button
                  type="button"
                  onClick={handleSaveAndApply}
                  className={`w-1/2 ${
                    isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                  } text-white py-3 rounded-lg font-medium transition text-sm shadow-md`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save & Apply"}
                </button>
              </div>
            </form>

            {isSubmitting && (
              <div className="text-center mt-4">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PopupForm;