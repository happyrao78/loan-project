import React, { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import InteractiveButton from "../components/Button";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import loan from "../assets/loan.jpg";
import Footer from "../components/Footer";
import ChatBot from "../components/Chatbot";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    loan_amount: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = "https://api.web3forms.com/submit";

    const submissionData = {
      access_key: "285a9345-19a9-4823-a704-97f2e9ef47d8", // Replace with your Web3 Forms access key
      ...formData,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        toast.success("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          loan_amount: "",
          message: "",
        });
        setStatus("Message sent successfully!");
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast.error("Message not sent. Please try again.");
      setStatus("Message not sent. Please try again.");
    }
  };

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="w-full" id="contact">
      <Toaster />
      <ChatBot />

      <Navbar z={50} />
      <div className="relative">
        <img src={loan} alt="Loan" className="w-full h-[60vh] object-cover object-center" />
        <div className="absolute inset-0 bg-darkGray opacity-70"></div>
        <h2 className="absolute text-3xl md:text-4xl lg:text-6xl font-bold text-primary text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          Contact Us
        </h2>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start w-full gap-12 py-16 px-[5vw] md:px-[7vw] lg:px-[8vw]">
        <div className="flex-1 space-y-6 bg-primary/30 backdrop-blur-lg border border-gray/30 shadow-lg shadow-lightSeaGreen rounded-lg p-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold font-heading text-darkGray">
            Let's Talk
          </h2>
          <p className="text-gray-600 font-body text-sm sm:text-base">
            At DigitalFinServ, we combine technology and finance to provide seamless loan solutions. From personal loans to business financing, we ensure a fast, secure, and hassle-free experience tailored to your needs.
          </p>
          <div className="space-y-6">
            <p className="flex flex-col gap-1 font-body">
              <span className="font-semibold">Our email:</span>
              <span className="text-slate-600">support@digitalfinserv.in</span>
            </p>
            <p className="flex flex-col gap-1 font-body">
              <span className="font-semibold">Call us:</span>
              <span className="text-slate-600">+91 8981323486</span>
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex-1 bg-primary/40 backdrop-blur-lg border border-gray/30 shadow-lg shadow-lightSeaGreen rounded-lg p-6 w-full">
          <h2 className="text-center text-3xl md:text-4xl lg:text-2xl font-semibold mb-8 font-heading text-darkGray lg:leading-tight">
            How much do you need?
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="access_key" value="285a9345-19a9-4823-a704-97f2e9ef47d8" />

            {/* Name and Email */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col items-start gap-2 text-body w-full">
                <label htmlFor="name" className="text-sm sm:text-base text-slate-800 font-body">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-lightGray border-b-2 border-gray p-2 text-sm sm:text-base"
                />
              </div>
              <div className="flex flex-col items-start gap-2 text-body w-full">
                <label htmlFor="email" className="text-sm sm:text-base text-slate-800 font-body">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-lightGray border-b-2 border-gray p-2 text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Phone and Loan Amount */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col items-start gap-2 text-body w-full">
                <label htmlFor="phone" className="text-sm sm:text-base text-slate-800 font-body">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-lightGray border-b-2 border-gray p-2 text-sm sm:text-base"
                />
              </div>
              <div className="flex flex-col items-start gap-2 text-body w-full">
                <label htmlFor="loan_amount" className="text-sm sm:text-base text-slate-800 font-body">
                  Loan Amount
                </label>
                <input
                  id="loan_amount"
                  name="loan_amount"
                  type="number"
                  value={formData.loan_amount}
                  onChange={handleChange}
                  required
                  className="w-full bg-lightGray border-b-2 border-gray p-2 text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm sm:text-base text-slate-800 font-body">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-lightGray border-b-2 border-gray p-2 h-32 text-sm sm:text-base"
              ></textarea>
            </div>

            {/* Submit Button */}
            <InteractiveButton
              buttonText="Enquire Now"
              hoverText="Submit Form"
              bgColor="bg-darkGray"
              textColor="text-white"
              hoverBgColor="hover:bg-primary"
              hoverTextColor="hover:text-white"
              property="mt-6 mx-auto md:mx-0"
              type="submit"
              icon={<IoIosArrowForward />}
            />
          </form>

          {/* Status Message */}
          {status && (
            <p className="mt-4 text-center text-sm font-semibold text-green-600 font-body transition-all ease-in-out">
              {status}
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;