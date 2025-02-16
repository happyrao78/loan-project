// import React from 'react';
// import homeabout from '../assets/home-about.png';
// import { IoIosArrowForward } from 'react-icons/io';
// import heroellipse from '../assets/hero-ellipse.png';
// import serviceellipse from '../assets/service-ellipse.png';
// import InteractiveButton from './Button';

// const steps = [
//     { title: "Share Your Information", description: "Tell us about your financial needs and preferences. This helps us match you with the best lenders and real, personalized loan offers." },
//     { title: " Compare & Choose", description: "Get access to multiple loan options with transparent rates. Compare and select the one that best fits your goals." },
//     { title: "Get Approved & Fund Your Goal", description: "Our loan specialists verify your details for a smooth approval process. Once approved, your funds are quickly disbursed." },
//     { title: "Sign & Finalize", description: "Review your loan terms, sign your documents digitally, and enjoy a 100% transparent process—no hidden fees, only what’s mentioned!" },
//     // { title: "Funds on Their Way", description: "We'll ask you a few questions to better understand your financial situation and preferences. This helps us narrow down your lender and rate eligibility. What you receive are real rates, not mere estimates." }
// ];

// const Steps = () => {
//     return (
//         <div className="relative w-full h-full  bg-white/20 backdrop-blur-lg border border-white/30  " id='about'>
//             <div className="absolute text-white right-0 top-0 lg:z-0 sm:hidden hidden lg:block">
//                 <img src={heroellipse} alt="" style={{ transform: "scaleX(-1)" }} />
//             </div>

//             <div
//                 className="absolute  text-white left-0 lg:z-[-1] sm:hidden hidden lg:block"
//             >
//                 <img src={heroellipse} alt="" />
//             </div>

//             <div className='text-center mt-16'>
//                 <p className="text-body font-heading text-primary font-bold mb-2">Four Step Procedure</p>
//                 <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 font-heading text-darkGray lg:leading-tight ">
//                     You deserve a better business loan
//                 </h2>
//             </div>

//             <div className="relative w-full py-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw] flex flex-col lg:flex-row gap-8 lg:gap-28 items-center  group z-50">

//                 {/* Left - Steps List */}
//                 <div className=" flex flex-col w-full lg:w-1/2 bg-lightSeaGreen/30 backdrop-blur-lg border border-gray/30  shadow-lg shadow-lightSeaGreen rounded-lg z-50">
//                     {steps.map((step, index) => (
//                         <div key={index} className="p-4 border-b border-gray flex items-start gap-4 z-50">
//                             <h3 className="text-primary font-bold text-lg">{`0${index + 1}.`}</h3>
//                             <div>
//                                 <h4 className="text-lg font-semibold text-darkGray font-body">{step.title}</h4>
//                                 <p className="text-sm text-slate-600 font-body mt-2">{step.description}</p>
//                             </div>
//                             {/* <IoIosArrowForward className="text-primary text-xl ml-auto" /> */}
//                         </div>
//                     ))}
//                 </div>

//                 {/* Right - Image */}
//                 {/* <div className="relative lg:w-1/2 flex items-center justify-center">
//                     <img src={homeabout} alt="Radial Blur" className="w-full h-full object-cover overflow-hidden" />
//                 </div> */}

//                 <div className="flex-1  bg-primary/40 backdrop-blur-lg border border-gray/30  shadow-lg shadow-lightSeaGreen rounded-lg  p-6  w-full">
//                     <h2 className="text-center text-3xl md:text-4xl lg:text-2xl font-semibold  mb-8 font-heading text-darkGray lg:leading-tight ">
//                         How much do you need?
//                     </h2>
//                     <form className="space-y-4">
//                         {/* First and Last Name */}
//                         <div className="flex flex-col md:flex-row gap-4">
//                             <div className="flex flex-col items-start gap-2 text-body w-full">
//                                 <label htmlFor="firstName" className="text-sm sm:text-base text-slate-800 font-body">
//                                     Name
//                                 </label>
//                                 <input
//                                     id="firstName"
//                                     name="firstName"
//                                     type="text"
//                                     //   value={formData.firstName}
//                                     //   onChange={handleChange}
//                                     required
//                                     className="w-full bg-lightGray border-b-2 border-gray p-2 text-sm sm:text-base"
//                                 />
//                             </div>
//                             <div className="flex flex-col items-start gap-2 text-body w-full">
//                                 <label htmlFor="lastName" className="text-sm sm:text-base text-slate-800 font-body">
//                                     Email
//                                 </label>
//                                 <input
//                                     id="lastName"
//                                     name="lastName"
//                                     type="text"
//                                     //   value={formData.lastName}
//                                     //   onChange={handleChange}
//                                     required
//                                     className="w-full bg-lightGray border-b-2 border-gray p-2 text-sm sm:text-base"
//                                 />
//                             </div>
//                         </div>

//                         {/* Email and Phone */}
//                         <div className="flex flex-col md:flex-row gap-4">
//                             <div className="flex flex-col items-start gap-2 text-body w-full">
//                                 <label htmlFor="email" className="text-sm sm:text-base text-slate-800 font-body">
//                                     Phone Number
//                                 </label>
//                                 <input
//                                     id="email"
//                                     name="email"
//                                     type="email"
//                                     //   value={formData.email}
//                                     //   onChange={handleChange}
//                                     required
//                                     className="w-full bg-lightGray border-b-2 border-gray p-2 text-sm sm:text-base"
//                                 />
//                             </div>
//                             <div className="flex flex-col items-start gap-2 text-body w-full">
//                                 <label htmlFor="phone" className="text-sm sm:text-base text-slate-800 font-body">
//                                     Loan Amount
//                                 </label>
//                                 <input
//                                     id="phone"
//                                     name="phone"
//                                     type="number"
//                                     //   value={formData.phone}
//                                     //   onChange={handleChange}
//                                     className="w-full bg-lightGray border-b-2 border-gray p-2 text-sm sm:text-base"
//                                 />
//                             </div>
//                         </div>

//                         {/* Message */}
//                         <div className="flex flex-col gap-2">
//                             <label htmlFor="message" className="text-sm sm:text-base text-slate-800 font-body">
//                                 Message
//                             </label>
//                             <textarea
//                                 id="message"
//                                 name="message"
//                                 // value={formData.message}
//                                 // onChange={handleChange}
//                                 required
//                                 className="w-full bg-lightGray border-b-2 border-gray p-2 h-32 text-sm sm:text-base"
//                             ></textarea>
//                         </div>

                       

//                         <InteractiveButton
//                             buttonText="Enquire Now"
//                             hoverText="Submit Form"
//                             bgColor="bg-darkGray"
//                             textColor="text-white"
//                             hoverBgColor="hover:bg-primary"
//                             hoverTextColor="hover:text-white"
//                             property="mt-6 mx-auto md:mx-0" 
//                             type="submit"
//                             icon=<IoIosArrowForward /> 
//                             />
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Steps;



import React, { useEffect, useState } from "react";
import homeabout from "../assets/home-about.png";
import { IoIosArrowForward } from "react-icons/io";
import heroellipse from "../assets/hero-ellipse.png";
import InteractiveButton from "./Button";

const steps = [
  {
    title: "Share Your Information",
    description:
      "Tell us about your financial needs and preferences. This helps us match you with the best lenders and real, personalized loan offers.",
  },
  {
    title: "Compare & Choose",
    description:
      "Get access to multiple loan options with transparent rates. Compare and select the one that best fits your goals.",
  },
  {
    title: "Get Approved & Fund Your Goal",
    description:
      "Our loan specialists verify your details for a smooth approval process. Once approved, your funds are quickly disbursed.",
  },
  {
    title: "Sign & Finalize",
    description:
      "Review your loan terms, sign your documents digitally, and enjoy a 100% transparent process—no hidden fees, only what’s mentioned!",
  },
];

const Steps = () => {
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
    <div className="relative w-full h-full bg-white/20 backdrop-blur-lg border border-white/30" id="about">
        {/* Background Elements */}
        <div className="absolute text-white right-0 top-0 lg:z-0 sm:hidden hidden lg:block">
            <img src={heroellipse} alt="" style={{ transform: "scaleX(-1)" }} />
        </div>

        <div className="absolute text-white left-0 lg:z-[-1] sm:hidden hidden lg:block">
            <img src={heroellipse} alt="" />
        </div>

        {/* Heading */}
        <div className="text-center mt-16">
            <p className="text-body font-heading text-primary font-bold mb-2">Four Step Procedure</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 font-heading text-darkGray lg:leading-tight">
                You deserve a better business loan
            </h2>
        </div>

        {/* Steps Section */}
        <div className="relative w-full py-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw] flex flex-col lg:flex-row gap-8 lg:gap-28 items-center group z-50">
            {/* Steps List */}
            <div className="flex flex-col w-full lg:w-1/2 bg-lightSeaGreen/30 backdrop-blur-lg border border-gray/30 shadow-lg shadow-lightSeaGreen rounded-lg z-50">
                {steps.map((step, index) => (
                    <div key={index} className="p-4 border-b border-gray flex items-start gap-4 z-50">
                        <h3 className="text-primary font-bold text-lg">{`0${index + 1}.`}</h3>
                        <div>
                            <h4 className="text-lg font-semibold text-darkGray font-body">{step.title}</h4>
                            <p className="text-sm text-slate-600 font-body mt-2">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Contact Form */}
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
    </div>
);


};

export default Steps;

