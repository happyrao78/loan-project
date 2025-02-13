import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import InteractiveButton from "../components/Button";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import loan from "../assets/loan.jpg";
import Footer from "../components/Footer";
import Emi from "../components/Emi";
import { Link } from "react-router-dom";
import Steps from "../components/Steps";

const EmiCalculator = () => {


    return (
        <div className=" w-full" id="contact">
            <Toaster />

            <Navbar z={50}/>
            <div className="relative">
                <img src={loan} alt="" className="w-[100vw] h-[60vh] object-cover object-center" />
                {/* Black Overlay */}
                <div className="absolute inset-0 bg-darkGray opacity-70"></div>
                <h2 className="absolute text-3xl md:text-4xl lg:text-6xl font-bold mb-12 font-heading text-primary text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    EMI Calculator
                </h2>
            </div>
            <div className="flex flex-col lg:flex-col md:flex-row justify-between items-start w-full gap-12 py-6  px-[5vw] sm:px-[5vw] md:px-[7vw] lg:px-[8vw] lg:mt-8">
                <Emi />
                
            </div>

            <Steps/>
            <div className="py-6 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw] ">
                    <div className="bg-lightSeaGreen/30 backdrop-blur-lg border border-white/30 shadow-lg relative bg-gray-800 text-darkGray rounded-xl overflow-hidden flex flex-col items-center justify-center p-8">
                        {/* Content */}
                        <div className="relative z-10 text-start flex flex-col sm:flex-row justify-center items-center sm:gap-4 gap-4 lg:gap-8">
                            <h2 className="w-full sm:w-1/2 lg:w-full text-xl md:text-3xl lg:text-4xl font-semibold font-heading text-darkGray lg:leading-tight text-center sm:text-left">
                                Enough talk, let's get to work
                            </h2>
                            <Link to="/contact" className="px-8 py-2 bg-primary text-black rounded-lg transition min-w-fit text-body flex items-center justify-center gap-2 mt-4 sm:mt-0 mx-auto lg:mx-0">
                                {/* <span className="bg-darkGray text-body rounded-full p-1">
                                <IoIosArrowRoundForward className="text-white" />
                            </span> */}
                                <p className="text-sm sm:text-sm font-body flex justify-center items-center text-white">Contact Us</p>
                            </Link>
                        </div>
                    </div>
                </div>
            <Footer />
        </div>

    );
};

export default EmiCalculator;
