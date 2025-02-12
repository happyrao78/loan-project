import React from "react";
import { CgWebsite } from "react-icons/cg";
import { FaPenFancy } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { HiSpeakerphone } from "react-icons/hi";
import { IoIosArrowForward } from "react-icons/io";
import ProjectImg from "../assets/Projects.png";
import InteractiveButton from "./Button";

const services = [
    {
        title: "Content Marketing",
        description: "Our team creates ",
        icon: <FaPencil />,
        img: ProjectImg,
    },
    {
        title: "Graphic Design",
        description: "Unlock the power ",
        icon: <FaPenFancy />,
        img: ProjectImg,
    },
    {
        title: "Digital Marketing",
        description: "Elevate your brand's ",
        icon: <HiSpeakerphone />,
        img: ProjectImg,
    },
    {
        title: "Web Design",
        description: "We specialize ",
        icon: <CgWebsite />,
        img: ProjectImg,
    },
];

const Projects = () => {
    return (
        <div className="py-16 bg-white px-4 sm:px-[5vw] md:px-[7vw] lg:px-[10vw] relative" id="projects">
            {/* Heading */}
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 font-heading text-black lg:leading-tight">
                    Recent Showcase
                </h2>
            </div>

            {/* Showcase Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 sm:gap-6 lg:gap-x-8">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className={`p-4 rounded-xl flex flex-col items-center justify-center transition duration-300 ease-in-out group ${index % 2 === 0 ? "lg:mt-16" : "lg:-mt-16"
                            } ` }
                    >
                        <img
                            src={service.img}
                            alt={service.title}
                            className="w-85 h-64 sm:h-72 md:h-80 lg:h-50 object-cover rounded-lg overflow-hidden hover:scale-105 transition-all ease-in-out"
                        />
                        <h3 className="text-lg sm:text-xl font-semibold sm:mt-4 lg:mt-4 font-heading text-center">
                            {service.title}
                        </h3>
                        <p className="font-body text-sm sm:text-base text-center sm:mt-1 lg:mt-1">
                            {service.description}
                        </p>
                    </div>
                ))}
            </div>

            {/* Button */}
            {/* <button className="lg:absolute px-4 py-2 bg-black text-white rounded-full transition max-w-fit sm:max-w-fit lg:max-w-fit text-body flex items-center justify-center gap-2 mx-auto lg:m-4 top-40 left-44 sm:mt-8 mt-6">
                <span className="bg-white text-body rounded-full p-1">
                    <IoIosArrowForward className="text-black" />
                </span>
                <p className='font-body flex justify-center items-center'>Start your Free Trial</p>
            </button> */}

            <InteractiveButton
                            buttonText="Get in Touch"
                            hoverText="Get in Touch"
                            bgColor="bg-black"
                            textColor="text-white"
                            hoverBgColor="hover:bg-white"
                            hoverTextColor="hover:text-black"
                            property="hidden sm:hidden lg:absolute lg:m-4 top-40 left-44 sm:mt-8 mt-6"
                            icon= <IoIosArrowForward/>
                        />
        </div>
    );
};

export default Projects;
