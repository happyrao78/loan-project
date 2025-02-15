// import React from 'react';
// import homeabout from '../assets/home-about.png';
// import { IoIosArrowForward } from 'react-icons/io';
// import InteractiveButton from './Button';
// import serviceellipse from '../assets/service-ellipse.png';

// const Steps = () => {
//     return (
//         <div className="relative w-full h-full bg-white" id='about'>
//             <div
//                 className="absolute  text-white left-0 top-0 z-0"
//             >
//                 <img src={serviceellipse} alt="" />
//             </div>
//             {/* Background Image and Content */}
//             <div className="relative w-full py-20 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw] flex flex-col lg:flex-row gap-8 lg:gap-28 items-center bg-white/20 backdrop-blur-lg border border-white/30  transition duration-300 ease-in-out group z-50">

//                 {/* Left */}

//                 <div className="flex flex-col w-full lg:w-1/2 py-4 lg:py-[4vw] text-center lg:text-left items-center sm:items-center lg:items-start">

//                     <p className="text-body font-heading text-primary font-bold mb-2">About us</p>
//                     <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 font-heading text-darkGray lg:leading-tight">
//                         The core mission <br />behind all our work
//                     </h2>
//                     <p className="font-body text-sm sm:text-sm md:text-md lg:text-md mb-6 text-black text-body w-full lg:w-[80%]">
//                         At CodeSphereX, We believe in transforming ideas into impactful digital solutions. With innovation, precision, and creativity, we craft websites, apps, and designs that empower businesses to thrive in the digital age. Your success is our mission.
//                     </p>

//                     <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-center lg:text-left">
//                         <div className="flex flex-col justify-center lg:justify-start items-center lg:items-start gap-1">
//                             <h2 className="text-3xl text-primary font-heading">30+</h2>
//                             <p className="font-body text-sm text-black">Companies helped</p>
//                         </div>
//                         <div className="flex flex-col justify-center lg:justify-start items-center lg:items-start gap-1">
//                             <h2 className="text-3xl text-primary font-heading">25.8%</h2>
//                             <p className="font-body text-sm text-black">Revenue Generated</p>
//                         </div>
//                     </div>

//                     {/* <button className="mt-8 px-4 py-2 bg-white text-black rounded-full transition max-w-fit text-body flex items-center justify-center gap-2 mx-auto lg:mx-0">
//                             <span className="bg-black text-body rounded-full p-1">
//                                 <IoIosArrowForward className="text-white" />
//                             </span>
//                             <p className="font-body flex justify-center items-center">Start your Free Trial</p>
//                         </button> */}

//                     <InteractiveButton
//                         buttonText="Start your Free Trial"
//                         hoverText="Start your Free Trial"
//                         bgColor="bg-primary"
//                         textColor="text-white"
//                         hoverBgColor="hover:bg-darkGray"
//                         hoverTextColor="hover:text-white"
//                         property="mt-8" to="/contact"
//                         icon=<IoIosArrowForward /> />

//                 </div>
//                         {/* Right */}
//                 <div className="relative lg:w-1/2 flex items-center justify-center">
//                     <img src={homeabout} alt="Radial Blur" className="w-full h-full object-cover overflow-hidden" />
//                 </div>


//             </div>
//         </div>
//     );
// };

// export default Steps;


import React from 'react';
import homeabout from '../assets/home-about.png';
import { IoIosArrowForward } from 'react-icons/io';
import heroellipse from '../assets/hero-ellipse.png';
import serviceellipse from '../assets/service-ellipse.png';
import InteractiveButton from './Button';

const steps = [
    { title: "Share Your Information", description: "Tell us about your financial needs and preferences. This helps us match you with the best lenders and real, personalized loan offers." },
    { title: " Compare & Choose", description: "Get access to multiple loan options with transparent rates. Compare and select the one that best fits your goals." },
    { title: "Get Approved & Fund Your Goal", description: "Our loan specialists verify your details for a smooth approval process. Once approved, your funds are quickly disbursed." },
    { title: "Sign & Finalize", description: "Review your loan terms, sign your documents digitally, and enjoy a 100% transparent process—no hidden fees, only what’s mentioned!" },
    // { title: "Funds on Their Way", description: "We'll ask you a few questions to better understand your financial situation and preferences. This helps us narrow down your lender and rate eligibility. What you receive are real rates, not mere estimates." }
];

const Steps = () => {
    return (
        <div className="relative w-full h-full  bg-white/20 backdrop-blur-lg border border-white/30  " id='about'>
            <div className="absolute text-white right-0 top-0 lg:z-0 sm:hidden hidden lg:block">
                <img src={heroellipse} alt="" style={{ transform: "scaleX(-1)" }} />
            </div>

            <div
                className="absolute  text-white left-0 lg:z-[-1] sm:hidden hidden lg:block"
            >
                <img src={heroellipse} alt="" />
            </div>

            <div className='text-center mt-16'>
                <p className="text-body font-heading text-primary font-bold mb-2">Four Step Procedure</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 font-heading text-darkGray lg:leading-tight ">
                    You deserve a better business loan
                </h2>
            </div>

            <div className="relative w-full py-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw] flex flex-col lg:flex-row gap-8 lg:gap-28 items-center  group z-50">

                {/* Left - Steps List */}
                <div className=" flex flex-col w-full lg:w-1/2 bg-lightSeaGreen/30 backdrop-blur-lg border border-gray/30  shadow-lg shadow-lightSeaGreen rounded-lg z-50">
                    {steps.map((step, index) => (
                        <div key={index} className="p-4 border-b border-gray flex items-start gap-4 z-50">
                            <h3 className="text-primary font-bold text-lg">{`0${index + 1}.`}</h3>
                            <div>
                                <h4 className="text-lg font-semibold text-darkGray font-body">{step.title}</h4>
                                <p className="text-sm text-slate-600 font-body mt-2">{step.description}</p>
                            </div>
                            {/* <IoIosArrowForward className="text-primary text-xl ml-auto" /> */}
                        </div>
                    ))}
                </div>

                {/* Right - Image */}
                {/* <div className="relative lg:w-1/2 flex items-center justify-center">
                    <img src={homeabout} alt="Radial Blur" className="w-full h-full object-cover overflow-hidden" />
                </div> */}

                <div className="flex-1  bg-primary/40 backdrop-blur-lg border border-gray/30  shadow-lg shadow-lightSeaGreen rounded-lg  p-6  w-full">
                    <h2 className="text-center text-3xl md:text-4xl lg:text-2xl font-semibold  mb-8 font-heading text-darkGray lg:leading-tight ">
                        How much do you need?
                    </h2>
                    <form className="space-y-4">
                        {/* First and Last Name */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex flex-col items-start gap-2 text-body w-full">
                                <label htmlFor="firstName" className="text-sm sm:text-base text-slate-800 font-body">
                                    Name
                                </label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    //   value={formData.firstName}
                                    //   onChange={handleChange}
                                    required
                                    className="w-full bg-lightGray border-b-2 border-gray p-2 text-sm sm:text-base"
                                />
                            </div>
                            <div className="flex flex-col items-start gap-2 text-body w-full">
                                <label htmlFor="lastName" className="text-sm sm:text-base text-slate-800 font-body">
                                    Email
                                </label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    //   value={formData.lastName}
                                    //   onChange={handleChange}
                                    required
                                    className="w-full bg-lightGray border-b-2 border-gray p-2 text-sm sm:text-base"
                                />
                            </div>
                        </div>

                        {/* Email and Phone */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex flex-col items-start gap-2 text-body w-full">
                                <label htmlFor="email" className="text-sm sm:text-base text-slate-800 font-body">
                                    Phone Number
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    //   value={formData.email}
                                    //   onChange={handleChange}
                                    required
                                    className="w-full bg-lightGray border-b-2 border-gray p-2 text-sm sm:text-base"
                                />
                            </div>
                            <div className="flex flex-col items-start gap-2 text-body w-full">
                                <label htmlFor="phone" className="text-sm sm:text-base text-slate-800 font-body">
                                    Loan Amount
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="number"
                                    //   value={formData.phone}
                                    //   onChange={handleChange}
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
                                // value={formData.message}
                                // onChange={handleChange}
                                required
                                className="w-full bg-lightGray border-b-2 border-gray p-2 h-32 text-sm sm:text-base"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        {/* <InteractiveButton
                            buttonText="Submit Form"
                            hoverText="Submit Form"
                            bgColor="bg-black"
                            textColor="text-white"
                            hoverBgColor="hover:bg-white"
                            hoverTextColor="hover:text-black"
                            property="mt-6 mx-auto md:mx-0"
                            icon={<IoIosArrowForward />}
                        /> */}


                        <InteractiveButton
                            buttonText="Submit Form"
                            hoverText="Submit Form"
                            bgColor="bg-darkGray"
                            textColor="text-white"
                            hoverBgColor="hover:bg-primary"
                            hoverTextColor="hover:text-white"
                            property="mt-6 mx-auto md:mx-0" 
                            type="submit"
                            icon=<IoIosArrowForward /> 
                            />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Steps;
