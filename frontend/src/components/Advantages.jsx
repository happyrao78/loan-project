import React from "react";
import { BiShieldAlt2, BiTransferAlt, BiMoneyWithdraw } from "react-icons/bi";
import serviceellipse from "../assets/service-ellipse.png";

const services = [
    {
        title: "Safe and Secure Payments",
        description: "Enjoy secure payments for peace of mind in all your financial transactions.",
        icon: <BiShieldAlt2 />
    },
    {
        title: "Quick Payments Process",
        description: "Swift and hassle-free, our payment process ensures quick transactions for your convenience.",
        icon: <BiTransferAlt />
    },
    {
        title: "No Prepayment Charges",
        description: "No prepayment charges—freely settle your loan ahead of schedule without any extra fees.",
        icon: <BiMoneyWithdraw />
    }
];


const Advantages = () => {
    return (
        <div className="relative py-20 bg-white px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw] " id="services">
            <div
                className="absolute  text-white right-0 top-0 z-10"
            >
                <img src={serviceellipse} alt="" style={{ transform: "scaleX(-1)" }} />
            </div>

            <p className="text-body font-heading text-primary font-bold mb-2 text-center">Easy , Simple , Free</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-12 font-heading text-darkGray lg:leading-tight text-center">
            Why Choose Credit  <br />for Your Personal Loans Needs?
            </h2>


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

export default Advantages;
