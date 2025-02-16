import React from "react";
import { FaBuilding, FaHome, FaLandmark, FaIndustry, FaHandshake, FaBusinessTime, FaMoneyCheckAlt, FaUniversity, FaWallet, FaGraduationCap, FaCar } from "react-icons/fa";
import serviceellipse from "../assets/service-ellipse.png";
import { Link } from "react-router-dom";

const loantypes = [
  {
    title: "Personal Loan",
    description: "Personal loan is unsecured with fixed payments.",
    icon: <FaWallet />,
    to: "/personal-loan",
  },
  {
    title: "Business Loans",
    description: "Unsecured business loans up to INR 75 Lakhs*",
    icon: <FaBusinessTime />,
    to: "/business-loan",
  },
  {
    title: "Loan Against Property",
    description: "Competitive property loans up to INR 5 Cr*",
    icon: <FaLandmark />,
    to: "/loan-against-property",
  },
  {
    title: "NRI Home Loan",
    description: "Achieving the dream of owning a home in your home country is a major aspiration.",
    icon: <FaHome />,
    to: "/nri-home-loan",
  },
  {
    title: "Home Loans",
    description: "Apply for SMFG Grihashakti home loan today at affordable interest rates.",
    icon: <FaHome />,
    to: "/home-loan",
  },
  {
    title: "Plot Purchase Loan",
    description: "Investing in a plot of land has always been known as a prudent financial move in India.",
    icon: <FaBuilding />,
    to: "/plot-purchase-loan",
  },
  {
    title: "Industrial Purchase",
    description: "An industrial property purchase loan is a great financial instrument if you are...",
    icon: <FaIndustry />,
    to: "/industrial-property-loan",
  },
  {
    title: "Commercial Property Purchase Loan",
    description: "Acquiring a loan for purchasing commercial real estate includes...",
    icon: <FaHandshake />,
    to: "/commercial-property-loan",
  },
  {
    title: "Overdraft Facility",
    description: "A personal loan overdraft facility represents a versatile credit provision that is customized...",
    icon: <FaMoneyCheckAlt />,
    to: "/overdraft-facility",
  },
  {
    title: "Education Loan",
    description: "Education loans help students pursue higher studies in India or abroad without financial constraints.",
    icon: <FaGraduationCap />,
    to: "/education-loan",
  },
  {
    title: "Car Loan",
    description: "A car loan helps you finance the purchase of a new or used vehicle with easy repayment options.",
    icon: <FaCar />,
    to: "/car-loan",
  },
  
];

const LoanTypes = () => {
  return (
    <div className="relative py-16 bg-white px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw] " id="services">
      <div className="absolute text-white right-0 top-0 sm:z-[-1] z-[-1] lg:z-10">
        <img src={serviceellipse} alt="" style={{ transform: "scaleX(-1)" }} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {loantypes.map((loantype, index) => (
           <Link to={`/about${loantype.to}`} key={index}>
          <div
            key={index}
            className="p-6 rounded-2xl flex flex-col items-center justify-center
                       bg-lightSeaGreen/30 backdrop-blur-lg border border-white/30 shadow-lg 
                       transition duration-300 ease-in-out group hover:bg-white/20 hover:-translate-y-2 z-0 sm:z-0 lg:z-50"
          >
            <div className="text-4xl mb-6 flex items-center justify-center text-primary p-4 rounded-full">
              {loantype.icon}
            </div>
            <h3 className="text-3xl font-semibold mb-2 font-heading text-darkGray text-center">{loantype.title}</h3>
            <p className="text-sm font-body text-center text-slate-600">{loantype.description}</p>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LoanTypes;
