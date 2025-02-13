import React, { useState } from "react";
import axios from "axios";
import loan from "../assets/loan.jpg";
import Navbar from "../components/Navbar";
import InteractiveButton from "../components/Button";
import { IoIosArrowForward } from "react-icons/io";

const Form = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        aadhar: "",
        pan: "",
        account: "",
        ifsc: "",
        loanAmount: "",
        bankName: "",
        loanType: "Personal Loan",
        duration: "1 Year",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await axios.post("http://localhost:5000/api/submit-loan", formData);
            setMessage(response.data.message);
        } catch (error) {
            setMessage("Error submitting application. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative bg-white">
            <Navbar z={50}/>
            <div className="relative">
                <img src={loan} alt="" className="w-[100vw] h-[60vh] object-cover object-center" />
                <div className="absolute inset-0 bg-darkGray opacity-70"></div>
                <h2 className="absolute text-3xl md:text-4xl lg:text-6xl font-bold mb-12 font-heading text-primary text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    Loan Application Form
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[16vw] py-16">
                {[
                    { label: "Full Name", name: "fullName", placeholder: "Enter name" },
                    { label: "Phone Number", name: "phone", placeholder: "Enter number" },
                    { label: "Email", name: "email", placeholder: "Enter email" },
                    { label: "Aadhar Number", name: "aadhar", placeholder: "Enter Aadhar Number" },
                    { label: "PAN Number", name: "pan", placeholder: "Enter Pan Number" },
                    { label: "Account Number", name: "account", placeholder: "Enter Account Number" },
                    { label: "IFSC Number", name: "ifsc", placeholder: "Enter IFSC Code" },
                    { label: "Loan Amount", name: "loanAmount", placeholder: "Enter Loan Amount" },
                    { label: "Bank Name", name: "bankName", placeholder: "Enter Bank Name" },
                ].map((field, index) => (
                    <div key={index} className="flex flex-col">
                        <label className="text-darkGray font-bold mb-1 font-body">{field.label}</label>
                        <input
                            type="text"
                            name={field.name}
                            placeholder={field.placeholder}
                            value={formData[field.name]}
                            onChange={handleChange}
                            className="font-body p-3 border rounded-lg bg-lightSeaGreen/30 focus:ring-2 focus:ring-primary outline-none"
                            required
                        />
                    </div>
                ))}

                <div className="flex flex-col">
                    <label className="text-darkGray font-bold mb-1">Loan Type</label>
                    <select
                        name="loanType"
                        value={formData.loanType}
                        onChange={handleChange}
                        className="p-3 border rounded-lg bg-lightSeaGreen/30 focus:ring-2 focus:ring-primary outline-none font-body"
                    >
                        <option>Personal Loan</option>
                        <option>Home Loan</option>
                        <option>Car Loan</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-darkGray font-bold mb-1">Duration</label>
                    <select
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        className="p-3 border rounded-lg bg-lightSeaGreen/30 focus:ring-2 focus:ring-primary outline-none font-body"
                    >
                        <option>1 Year</option>
                        <option>2 Years</option>
                        <option>5 Years</option>
                    </select>
                </div>

                <div className="flex w-full mt-6 justify-center">
                    <InteractiveButton
                        buttonText={loading ? "Submitting..." : "Submit Application"}
                        hoverText="Submit Application"
                        bgColor="bg-primary"
                        textColor="text-white"
                        hoverBgColor="hover:bg-darkGray"
                        hoverTextColor="hover:text-white"
                        property="w-full"
                        icon={<IoIosArrowForward />}
                    />
                </div>

                {message && (
                    <div className="col-span-1 md:col-span-2 text-center text-lg font-semibold text-primary">
                        {message}
                    </div>
                )}
            </form>
        </div>
    );
};

export default Form;
