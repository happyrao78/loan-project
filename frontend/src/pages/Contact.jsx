// import React, { useState } from "react";
// import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
// import { IoIosArrowForward } from "react-icons/io";
// import InteractiveButton from "../components/Button";
// import toast, { Toaster } from "react-hot-toast";
// import Navbar from "../components/Navbar";
// import loan from "../assets/loan.jpg";
// import Footer from "../components/Footer";

// const ContactUs = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const apiUrl = "https://api.web3forms.com/submit";

//     const submissionData = {
//       access_key: "a84c972a-7e7d-4972-ad6a-dc145974b74e", // Replace with your Web3 Forms access key
//       ...formData,
//     };

//     try {
//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(submissionData),
//       });

//       if (response.ok) {
//         toast.success("Message sent successfully!");
//         setFormData({
//           firstName: "",
//           lastName: "",
//           email: "",
//           phone: "",
//           message: "",
//         });
//       } else {
//         throw new Error("Failed to send message");
//       }
//     } catch (error) {
//       toast.error("Message not sent. Please try again.");
//     }
//   };

//   return (
//     <div className=" w-full" id="contact">
//       <Toaster />

//       <Navbar z={50}/>
//       <div className="relative">
//         <img src={loan} alt="" className="w-[100vw] h-[60vh] object-cover object-center" />
//         {/* Black Overlay */}
//         <div className="absolute inset-0 bg-darkGray opacity-70"></div>
//         <h2 className="absolute text-3xl md:text-4xl lg:text-6xl font-bold mb-12 font-heading text-primary text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//           Contact Us
//         </h2>
//       </div>
//       <div className="flex flex-col md:flex-row justify-between items-start w-full gap-12 py-16  px-[5vw] sm:px-[5vw] md:px-[7vw] lg:px-[8vw] ">
//         <div className="flex-1 space-y-6 bg-primary/30 backdrop-blur-lg border border-gray/30  shadow-lg shadow-lightSeaGreen rounded-lg  p-6">
//           <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-2xl font-semibold font-heading text-darkGray">
//             Let's Talk
//           </h2>
//           <p className="text-gray-600 font-body text-sm sm:text-base text-slate-600">
//           At DigitalFinServ, we combine technology and finance to provide seamless loan solutions. From personal loans to business financing, we ensure a fast, secure, and hassle-free experience tailored to your needs.
//           </p>
//           <div className="space-y-6">
//             <p className="flex flex-col gap-1 font-body">
//               <span className="font-semibold font-heading text-sm sm:text-base">Our email:</span>
//               <span className="text-slate-600">support@digitalfinserv.in</span>
//             </p>
//             <p className="flex flex-col gap-1 font-body">
//               <span className="font-semibold font-heading text-sm sm:text-base">Call us:</span>
//               <span className="text-slate-600"> +91 XXXXXXXXXX | +91 XXXXXXXXXX</span>
//             </p>
//             <p className="flex flex-col gap-1 font-body">
//               <span className="font-semibold font-heading text-sm sm:text-base">Find us:</span>
//               <a
//                 href="https://maps.google.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 hover:underline"
//               >
//                 Open Google Maps
//               </a>
//             </p>
//           </div>
//           <div className="flex space-x-4">
//             <a
//               href="https://wa.me/918595864036"

//               className="hover:text-gray-400 p-2 bg-white text-primary rounded-full hover:text-white hover:bg-darkGray flex items-center justify-center"
//             >
//               <FaWhatsapp size={20}
//               // href="https://wa.me/917015064173"

//               />
//             </a>
//             <a
//               href="#"
//               className="hover:text-gray-400 p-2 bg-white text-primary rounded-full hover:text-white hover:bg-darkGray flex items-center justify-center"
//             >
//               <FaInstagram size={20} />
//             </a>
//             <a
//               href="#"
//               className="hover:text-gray-400 p-2 bg-white text-primary rounded-full hover:text-white hover:bg-darkGray  flex items-center justify-center"
//             >
//               <FaLinkedin size={20} />
//             </a>
//           </div>
//         </div>

//         {/* Form Section */}
//         <div className="flex-1  bg-primary/40 backdrop-blur-lg border border-gray/30  shadow-lg shadow-lightSeaGreen rounded-lg  p-6  w-full">
//           <h2 className="text-center text-3xl md:text-4xl lg:text-2xl font-semibold  mb-8 font-heading text-darkGray lg:leading-tight ">
//             How much do you need?
//           </h2>
//           <form className="space-y-4">
//             {/* First and Last Name */}
//             <div className="flex flex-col md:flex-row gap-4">
//               <div className="flex flex-col items-start gap-2 text-body w-full">
//                 <label htmlFor="firstName" className="text-sm sm:text-base text-slate-800 font-body">
//                   Name
//                 </label>
//                 <input
//                   id="firstName"
//                   name="firstName"
//                   type="text"
//                   //   value={formData.firstName}
//                   //   onChange={handleChange}
//                   required
//                   className="w-full bg-lightGray border-b-2 border-gray p-2 text-sm sm:text-base"
//                 />
//               </div>
//               <div className="flex flex-col items-start gap-2 text-body w-full">
//                 <label htmlFor="lastName" className="text-sm sm:text-base text-slate-800 font-body">
//                   Email
//                 </label>
//                 <input
//                   id="lastName"
//                   name="lastName"
//                   type="text"
//                   //   value={formData.lastName}
//                   //   onChange={handleChange}
//                   required
//                   className="w-full bg-lightGray border-b-2 border-gray p-2 text-sm sm:text-base"
//                 />
//               </div>
//             </div>

//             {/* Email and Phone */}
//             <div className="flex flex-col md:flex-row gap-4">
//               <div className="flex flex-col items-start gap-2 text-body w-full">
//                 <label htmlFor="email" className="text-sm sm:text-base text-slate-800 font-body">
//                   Phone Number
//                 </label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   //   value={formData.email}
//                   //   onChange={handleChange}
//                   required
//                   className="w-full bg-lightGray border-b-2 border-gray p-2 text-sm sm:text-base"
//                 />
//               </div>
//               <div className="flex flex-col items-start gap-2 text-body w-full">
//                 <label htmlFor="phone" className="text-sm sm:text-base text-slate-800 font-body">
//                   Loan Amount
//                 </label>
//                 <input
//                   id="phone"
//                   name="phone"
//                   type="number"
//                   //   value={formData.phone}
//                   //   onChange={handleChange}
//                   className="w-full bg-lightGray border-b-2 border-gray p-2 text-sm sm:text-base"
//                 />
//               </div>
//             </div>

//             {/* Message */}
//             <div className="flex flex-col gap-2">
//               <label htmlFor="message" className="text-sm sm:text-base text-slate-800 font-body">
//                 Message
//               </label>
//               <textarea
//                 id="message"
//                 name="message"
//                 // value={formData.message}
//                 // onChange={handleChange}
//                 required
//                 className="w-full bg-lightGray border-b-2 border-gray p-2 h-32 text-sm sm:text-base"
//               ></textarea>
//             </div>

//             {/* Submit Button */}
//             {/* <InteractiveButton
//                             buttonText="Submit Form"
//                             hoverText="Submit Form"
//                             bgColor="bg-black"
//                             textColor="text-white"
//                             hoverBgColor="hover:bg-white"
//                             hoverTextColor="hover:text-black"
//                             property="mt-6 mx-auto md:mx-0"
//                             icon={<IoIosArrowForward />}
//                         /> */}


//             <InteractiveButton
//               buttonText="Start your Free Trial"
//               hoverText="Start your Free Trial"
//               bgColor="bg-darkGray"
//               textColor="text-white"
//               hoverBgColor="hover:bg-primary"
//               hoverTextColor="hover:text-white"
//               property="mt-6 mx-auto md:mx-0" to="/contact"
//               icon=<IoIosArrowForward /> />
//           </form>
//         </div>
//       </div>
//       <Footer />
//     </div>

//   );
// };

// export default ContactUs;


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
  const [status, setStatus] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
  
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
      if (result.success) {
        setStatus("Your message has been sent successfully!");
        e.target.reset();
      } else {
        setStatus("Oops! Something went wrong.");
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
              <span className="text-slate-600">+91 XXXXXXXXXX | +91 XXXXXXXXXX</span>
            </p>
            <p className="flex flex-col gap-1 font-body">
              <span className="font-semibold">Find us:</span>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Open Google Maps
              </a>
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="https://wa.me/918595864036" className="p-2 bg-white text-primary rounded-full hover:text-white hover:bg-darkGray">
              <FaWhatsapp size={20} />
            </a>
            <a href="#" className="p-2 bg-white text-primary rounded-full hover:text-white hover:bg-darkGray">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="p-2 bg-white text-primary rounded-full hover:text-white hover:bg-darkGray">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex-1 bg-primary/40 backdrop-blur-lg border border-gray/30 shadow-lg shadow-lightSeaGreen rounded-lg p-6 w-full">
                <h2 className="text-center text-3xl md:text-4xl lg:text-2xl font-semibold mb-8 font-heading text-darkGray lg:leading-tight">
                    How much do you need?
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="hidden" name="access_key" value={import.meta.env.VITE_WEB3FORMS_ACCESS_KEY} />

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
