import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import InteractiveButton from "../components/Button";
import toast, { Toaster } from "react-hot-toast";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = "https://api.web3forms.com/submit";

    const submissionData = {
      access_key: "a84c972a-7e7d-4972-ad6a-dc145974b74e", // Replace with your Web3 Forms access key
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
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast.error("Message not sent. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-12 py-16 px-[5vw] sm:px-[5vw] md:px-[7vw] lg:px-[10vw] lg:mt-12" id="contact">
      <Toaster />
      <div className="flex flex-col md:flex-row justify-between items-start w-full gap-12">
        <div className="flex-1 space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold font-heading leading-snug">
            Let's Talk
          </h2>
          <p className="text-gray-600 font-body text-sm sm:text-base">
          At CodeSphereX, we blend creativity with technology to deliver groundbreaking solutions. From web platforms to mobile apps, every project is crafted with precision and innovation to empower your business.
          </p>
          <div className="space-y-6">
            <p className="flex flex-col gap-1 font-body">
              <span className="font-semibold font-heading text-sm sm:text-base">Our email:</span>
              <span>codespherex24@gmail.com</span>
            </p>
            <p className="flex flex-col gap-1 font-body">
              <span className="font-semibold font-heading text-sm sm:text-base">Call us:</span>
              <span>+917015064173 | +919255591520</span>
            </p>
            {/* <p className="flex flex-col gap-1 font-body">
              <span className="font-semibold font-heading text-sm sm:text-base">Find us:</span>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Open Google Maps
              </a>
            </p> */}
          </div>
          <div className="flex space-x-4">
            <a
              href="https://wa.me/917015064173"
              
              className="hover:text-gray-400 p-2 bg-white text-black rounded-full hover:text-white hover:bg-black flex items-center justify-center"
            >
              <FaWhatsapp size={20} 
              // href="https://wa.me/917015064173"

              />
            </a>
            {/* <a
              href="#"
              className="hover:text-gray-400 p-2 bg-white text-black rounded-full hover:text-white hover:bg-black flex items-center justify-center"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="#"
              className="hover:text-gray-400 p-2 bg-white text-black rounded-full hover:text-white hover:bg-black flex items-center justify-center"
            >
              <FaLinkedin size={20} />
            </a> */}
          </div>
        </div>

        {/* Form Section */}
        <div className="flex-1 bg-lightGray shadow-lg p-6 rounded-lg w-full">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First and Last Name */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col items-start gap-2 text-body w-full">
                <label htmlFor="firstName" className="text-sm sm:text-base text-gray-600 font-body">
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full bg-lightGray border-b-2 border-gray p-2 text-sm sm:text-base"
                />
              </div>
              <div className="flex flex-col items-start gap-2 text-body w-full">
                <label htmlFor="lastName" className="text-sm sm:text-base text-gray-600 font-body">
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full bg-lightGray border-b-2 border-gray p-2 text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col items-start gap-2 text-body w-full">
                <label htmlFor="email" className="text-sm sm:text-base text-gray-600 font-body">
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
              <div className="flex flex-col items-start gap-2 text-body w-full">
                <label htmlFor="phone" className="text-sm sm:text-base text-gray-600 font-body">
                  Phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-lightGray border-b-2 border-gray p-2 text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm sm:text-base text-gray-600 font-body">
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
              buttonText="Submit Form"
              hoverText="Submit Form"
              bgColor="bg-black"
              textColor="text-white"
              hoverBgColor="hover:bg-white"
              hoverTextColor="hover:text-black"
              property="mt-6 mx-auto md:mx-0"
              icon={<IoIosArrowForward />}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
