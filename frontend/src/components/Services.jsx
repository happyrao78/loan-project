import React from "react";
import { FaCheckCircle, FaFileAlt,FaMoneyBillWave} from "react-icons/fa";
import serviceellipse from "../assets/service-ellipse.png";

const services = [
  {
    title: "Choose Your Amount",
    description: "Select the perfect loan amount and terms that suit your needs. Flexible options, tailored for you!",
    icon: <FaMoneyBillWave />, // Represents money selection
    // to: "/choose-amount",
  },
  {
    title: "Provide Documents",
    description: "Just submit basic documents for quick and hassle-free verification. No unnecessary paperwork!",
    icon: <FaFileAlt />, // Represents document submission
    // to: "/provide-document",
  },
  {
    title: "Get Instant Approval",
    description: "Our loan experts verify and approve your loan with 100% transparency—no hidden charges, only what’s mentioned!",
    icon: <FaCheckCircle />, // Represents approval
    // to: "/approved-loan",
  },
];


const Services = () => {
  return (
    <div className="relative py-16 bg-white px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw] " id="services">
      <div
        className="absolute  text-white right-0 top-0 z-10"
      >
        <img src={serviceellipse} alt="" style={{ transform: "scaleX(-1)" }} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {services.map((service, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl flex flex-col items-center justify-center
                       bg-lightSeaGreen/30 backdrop-blur-lg border border-white/30 shadow-lg 
                       transition duration-300 ease-in-out group hover:bg-white/20 hover:-translate-y-2 z-50"
          >
            <div className="text-4xl mb-6 flex items-center justify-center bg-primary text-white p-4 rounded-full">
              {service.icon}
            </div>
            <h3 className="text-3xl font-semibold mb-2 font-heading text-darkGray text-center">{service.title}</h3>
            <p className="text-sm font-body text-center text-slate-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
