import React from "react";
import loan from "../assets/loan.jpg";
import Navbar from "../components/Navbar";
import InteractiveButton from "../components/Button";
import { IoIosArrowForward, IoIosArrowRoundForward } from "react-icons/io";
import AboutUs from "../components/AboutUs";
import Services from "../components/Services";
import LoanTypes from "../components/LoanTypes";
import FeedbackSlider from "../components/Feedback";
import Partners from "../components/Partners";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import ChatBot from "../components/Chatbot";

const About = () => {
    return (
        <div className="relative bg-white z-0">
            <Navbar z={10}/>
            <div className="relative">
                <img src={loan} alt="" className="w-[100vw] h-[60vh] object-cover object-center" />
                {/* Black Overlay */}
                <div className="absolute inset-0 bg-darkGray opacity-70"></div>
                <h2 className="absolute text-3xl md:text-4xl lg:text-6xl font-bold mb-12 font-heading text-primary text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                   About Us
                </h2>
            </div>
           
            
            {/* <form className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[16vw] py-16">
                {[
                    { label: "Full Name", placeholder: "Enter name" },
                    { label: "Phone Number", placeholder: "Enter number" },
                    { label: "Email", placeholder: "Enter email" },
                    { label: "Aadhar Number", placeholder: "Enter Aadhar Number" },
                    { label: "PAN Number", placeholder: "Enter Pan Number" },
                    { label: "Account Number", placeholder: "Enter Account Number" },
                    { label: "IFSC Number", placeholder: "Enter IFSC Code" },
                    { label: "Loan Amount", placeholder: "Enter Loan Amount" },
                    { label: "Bank Name", placeholder: "Enter Bank Name" }
                ].map((field, index) => (
                    <div key={index} className="flex flex-col">
                        <label className="text-darkGray font-bold mb-1 font-body">{field.label}</label>
                        <input
                            type="text"
                            placeholder={field.placeholder}
                            className="font-body p-3 border rounded-lg bg-lightSeaGreen/30 focus:ring-2 focus:ring-primary outline-none"
                        />
                    </div>
                ))}
                <div className="flex flex-col">
                    <label className="text-darkGray font-bold mb-1">Loan Type</label>
                    <select className="p-3 border rounded-lg bg-lightSeaGreen/30 focus:ring-2 focus:ring-primary outline-none font-body">
                        <option>Personal Loan</option>
                        <option>Home Loan</option>
                        <option>Car Loan</option>
                    </select>
                </div>
                <div className="flex flex-col ">
                    <label className="text-darkGray font-bold mb-1">Duration</label>
                    <select className="p-3 border rounded-lg bg-lightSeaGreen/30 focus:ring-2 focus:ring-primary outline-none font-body">
                        <option>1 Year</option>
                        <option>2 Years</option>
                        <option>5 Years</option>
                    </select>
                </div>
                <div className=" flex w-full mt-6 justify-center">
                <InteractiveButton
                        buttonText="Submit Application"
                        hoverText="Submit Application"
                        bgColor="bg-primary"
                        textColor="text-white"
                        hoverBgColor="hover:bg-darkGray"
                        hoverTextColor="hover:text-white"
                        property="w-full" to="/contact"
                        icon=<IoIosArrowForward /> />
                </div>
            </form> */}


            {/* <AboutUs /> */}
            <LoanTypes/>
            <Partners/>
            <FeedbackSlider/>

            <div className="py-8 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw] ">
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
            <ChatBot />

            <Footer/>
        </div>
    );
};

export default About;