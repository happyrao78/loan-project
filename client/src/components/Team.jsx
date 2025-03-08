import React from "react";
import { FaLinkedinIn, FaGithub, FaInstagram, FaWhatsapp } from "react-icons/fa";
import heroimg from "../assets/teamimg.png";
// import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import InteractiveButton from "./Button";

const Team = () => {
    const teamData = [
        {
            id: 1,
            name: "Krishna Kumar",
            role: "Founder",
            // image: heroimg,
            socialLinks: {
                // linkedin: "https://www.linkedin.com/in/happy-yadav-16b2a4287/",
                // github: "https://github.com/happyrao78",
                // instagram: "https://www.instagram.com/happy.raao/?__pwa=1",
                whatsapp: "https://wa.me/+917015064173",
            },
        },
        {
            id: 2,
            name: "Aarav Chugh",
            role: "Founder",
            // image: heroimg,
            socialLinks: {
                // linkedin: "",
                // github: "",
                // instagram: "",
                whatsapp: "https://wa.me/+919255591520",
            },
        },
    ];

    return (
        <div className="py-20 px-[5vw] sm:px-[5vw] md:px-[7vw] lg:px-[10vw]  ">

            <div className="bg-lightGray flex flex-col lg:flex-row items-center justify-center rounded-xl p-2  sm:p-2 lg:p-8">

                {/* Center Text */}
                <div className="flex-1 text-center sm:text-center lg:text-start flex flex-col justify-start items-center lg:items-start px-4 mb-8 lg:mb-0 bg-lightGray">
                    <p className=" p-2 text-md font-heading text-primary font-bold mb-2  ">
                        Our Team
                    </p>
                    <h2 className=" p-2 text-3xl md:text-4xl lg:text-5xl font-semibold font-heading text-black lg:leading-tight mb-2">
                        Meet Us
                    </h2>
                    <p className="text-sm text-gray-600 font-body p-2">
                        "At CodeSphereX, we empower founders to bring their visions to life. Our tailored solutions are designed to meet the unique challenges of startups, ensuring scalable growth, innovative technology, and a strong digital presence from the ground up."
                    </p>

                    <InteractiveButton
                        buttonText="Get in Touch"
                        hoverText="Get in Touch"
                        bgColor="bg-black"
                        textColor="text-white"
                        hoverBgColor="hover:bg-white"
                        hoverTextColor="hover:text-black"
                        property=" mt-6 mx-auto md:mx-0" to="/contact"
                        icon=<IoIosArrowForward />

                    />
                </div>

                <div className="flex flex-col text-center mb-8 lg:mb-0 gap-4 sm:w-full w-full lg:w-1/3">
                    <div className="border border-gray-300 rounded-xl p-4 bg-black">
                        {/* <img
                        src={teamData[0].image}
                        alt={teamData[0].name}
                        className="w-48 h-48 mx-auto mb-4 rounded-full"
                    /> */}
                        <h3 className="text-xl font-semibold font-heading text-white">{teamData[0].name}</h3>
                        <h6 className="text-sm font-semibold font-heading text-white">{teamData[0].role}</h6>
                        <div className="flex justify-center gap-3 mt-4">
                            {/* <a href={teamData[0].socialLinks.linkedin}>
                            <FaLinkedinIn className="text-white" />
                        </a>
                        <a href={teamData[0].socialLinks.github}>
                            <FaGithub className="text-white" />
                        </a>
                        <a href={teamData[0].socialLinks.instagram}>
                            <FaInstagram className="text-white" />
                        </a> */}
                            <a href={teamData[0].socialLinks.whatsapp}>
                                <FaWhatsapp className="text-white" />
                            </a>
                        </div>
                    </div>

                    <div className="flex-1 text-center mb-8 lg:mb-0 w-full">
                        <div className="border border-gray-300 rounded-xl p-4 bg-black">
                            {/* <img
                        src={teamData[0].image}
                        alt={teamData[0].name}
                        className="w-48 h-48 mx-auto mb-4 rounded-full"
                    /> */}
                            <h3 className="text-xl font-semibold font-heading text-white">{teamData[1].name}</h3>
                            <h6 className="text-sm font-semibold font-heading text-white">{teamData[1].role}</h6>
                            <div className="flex justify-center gap-3 mt-4">
                                {/* <a href={teamData[0].socialLinks.linkedin}>
                            <FaLinkedinIn className="text-white" />
                        </a>
                        <a href={teamData[0].socialLinks.github}>
                            <FaGithub className="text-white" />
                        </a>
                        <a href={teamData[0].socialLinks.instagram}>
                            <FaInstagram className="text-white" />
                        </a> */}
                                <a href={teamData[1].socialLinks.whatsapp}>
                                    <FaWhatsapp className="text-white" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>

    );
};

export default Team;
