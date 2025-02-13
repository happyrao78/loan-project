import React from "react";
import loan from "../assets/loan.jpg";
import Navbar from "../components/Navbar";
import InteractiveButton from "../components/Button";
import { IoIosArrowForward } from "react-icons/io";

const Form = () => {
    return (
        <div className="relative bg-white">
            <Navbar />
            <div className="relative">
                <img src={loan} alt="" className="w-[100vw] h-[60vh] object-cover object-center" />
                {/* Black Overlay */}
                <div className="absolute inset-0 bg-darkGray opacity-70"></div>
                <h2 className="absolute text-3xl md:text-4xl lg:text-6xl font-bold mb-12 font-heading text-primary text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    Loan Application Form
                </h2>
            </div>
           
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[16vw] py-16">
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
            </form>
        </div>
    );
};

export default Form;
