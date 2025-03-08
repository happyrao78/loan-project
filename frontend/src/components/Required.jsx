import React from 'react';
import homeabout from '../assets/home-about.png';
import { IoIosArrowForward } from 'react-icons/io';
import InteractiveButton from './Button';
import serviceellipse from '../assets/service-ellipse.png';

const Required = () => {
    return (
        <div className="relative w-full h-full bg-white" id='about'>
            <div
                className="absolute  text-white left-0 top-0 z-0"
            >
                <img src={serviceellipse} alt="" />
            </div>
            {/* Background Image and Content */}
            <div className="relative w-full py-12 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw] flex flex-col lg:flex-row gap-8 lg:gap-28 items-center bg-white/20 backdrop-blur-lg border border-white/30  z-50">

                {/* /* Left */}
                                <div className="flex flex-col w-full lg:w-1/2 py-4 lg:py-[4vw] text-center lg:text-left items-center sm:items-center lg:items-start">

                                    <p className="text-body font-heading text-primary font-bold mb-2">Simple, Secure & Hassle-Free Loan Process</p>
                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 font-heading text-darkGray lg:leading-tight">
                                    Documents you need to get started
                                    </h2>
                                    <p className="font-body text-sm sm:text-sm md:text-md lg:text-md mb-6 text-slate-600 text-body w-full lg:w-[80%]">
                                    We believe getting a loan should be quick, easy, and stress-free. At DigitalFinServ, we connect you with top lenders who offer transparent terms and fast approvals—so you can focus on what truly matters.

                                    </p>
                                    <ul className="text-left text-darkGray mb-6 font-body text-xl sm:text-xl md:text-md lg:text-xl font-semibold">
                                        
                                            <li className="mb-2 flex items-center hover:text-primary ">
                                                <IoIosArrowForward className="mr-2 text-primary" />
                                                <p className='cursor-pointer hover:scale-105 transition-all ease-in-out hover:underline'>Aadhar Card</p>
                                            </li>
                                            <li className="mb-2 flex items-center hover:text-primary">
                                                <IoIosArrowForward className="mr-2 text-primary" />
                                               <p className='cursor-pointer hover:scale-105 transition-all ease-in-out hover:underline'>Pan Card</p> 
                                            </li>
                                            <li className="mb-2 flex items-center hover:text-primary">
                                                <IoIosArrowForward className="mr-2 text-primary" />
                                                <p className='cursor-pointer hover:scale-105 transition-all ease-in-out hover:underline'>Bank Account Details</p>
                                            </li>
                                        
                                    </ul>

                                    {/* <p className="text-primary font-bold font-body mb-4">No lengthy paperwork. No hidden charges. Just a smooth and efficient process!</p> */}

                                    {/* <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-center lg:text-left">
                                        <div className="flex flex-col justify-center lg:justify-start items-center lg:items-start gap-1">
                                            <h2 className="text-3xl text-primary font-heading">5k+</h2>
                                            <p className="font-body text-sm text-black">Happy Customers <br />Helped</p>
                                        </div>
                                        <div className="flex flex-col justify-center lg:justify-start items-center lg:items-start gap-1">
                                            <h2 className="text-3xl text-primary font-heading">6k+</h2>
                                            <p className="font-body text-sm text-black">Loans Successfully <br />Processed</p>
                                        </div>
                                    </div> */}



                    <InteractiveButton
                        buttonText="Apply Now"
                        hoverText="Apply Now"
                        bgColor="bg-primary"
                        textColor="text-white"
                        hoverBgColor="hover:bg-darkGray"
                        hoverTextColor="hover:text-white"
                        property="mt-4" to="/apply-form"
                        icon=<IoIosArrowForward /> />

                </div>


                {/* Right */}
                <div className="relative lg:w-1/2 flex items-center justify-center">
                    <img src={homeabout} alt="Radial Blur" className="w-full h-full object-cover overflow-hidden" />
                </div>



            </div>
        </div>
    );
};

export default Required;
