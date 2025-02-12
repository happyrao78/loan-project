import React from 'react'
import Herobg from '../assets/Hero-bg.png';
import Navbar from '../components/Navbar';
import { IoIosArrowForward } from 'react-icons/io';

import InteractiveButton from '../components/Button';

import webdev from "../assets/web-ev.png"
import { CgWebsite } from 'react-icons/cg';
import { MdOutlineComputer, MdOutlineDevicesOther } from 'react-icons/md';
import { IoDiamond } from 'react-icons/io5';
import { Link } from "react-router-dom"
import Marquee from 'react-fast-marquee';
import Footer from '../components/Footer';
import ProjectImg from "../assets/Projects.png"
import { FiLayout } from 'react-icons/fi';
import { GiClick } from 'react-icons/gi';
import { FaPaintBrush } from 'react-icons/fa';
import { HiOutlineTemplate } from 'react-icons/hi';
import { BiRefresh } from 'react-icons/bi';

const WebDesign = () => {
    const skills = [
        {
            name: "HTML5",
            description: "The standard markup language for creating web pages.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg",
        },
        {
            name: "CSS3",
            description: "Used for styling and designing web pages with colors, layouts, and animations.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg",
        },
        {
            name: "JavaScript",
            description: "A programming language that brings interactivity to web pages.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
        },
        {
            name: "React",
            description: "A JavaScript library for building user interfaces with components.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
        },
        {
            name: "Tailwind CSS",
            description: "A utility-first CSS framework for rapid UI development.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
        },
        {
            name: "Figma",
            description: "A collaborative interface design tool for creating UI/UX designs.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
        },
        {
            name: "Adobe Photoshop",
            description: "A tool for creating and editing images and graphics.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg",
        },
        {
            name: "Adobe Illustrator",
            description: "A vector graphics editor for creating illustrations, logos, and designs.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg",
        },
        {
            name: "Bootstrap",
            description: "A front-end framework for developing responsive and mobile-first websites.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Bootstrap_logo.svg",
        },
        {
            name: "WordPress",
            description: "A popular content management system for creating websites and blogs.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/09/Wordpress-Logo.svg",
        },
    ];


    const services = [
        {
            title: "Responsive Web Design",
            description: "Craft visually appealing websites that adapt seamlessly to all screen sizes, ensuring a great user experience on desktops, tablets, and mobile devices.",
            icon: <MdOutlineDevicesOther />, // Replace with your preferred icon component
            // to: "/responsive-design",
        },
        {
            title: "UI/UX Design",
            description: "Design user interfaces and experiences that are intuitive and engaging, enhancing usability and user satisfaction.",
            icon: <FiLayout />, // Replace with your preferred icon component
            // to: "/ui-ux-design",
        },
        {
            title: "Landing Page Design",
            description: "Create high-converting landing pages tailored to your campaigns, boosting lead generation and sales.",
            icon: <GiClick />, // Replace with your preferred icon component
            // to: "/landing-page-design",
        },
        {
            title: "Custom Graphics & Illustrations",
            description: "Design bespoke graphics and illustrations that align with your brand identity, enhancing your website's visual appeal.",
            icon: <FaPaintBrush />, // Replace with your preferred icon component
            // to: "/custom-graphics",
        },
        {
            title: "Wireframing & Prototyping",
            description: "Develop interactive prototypes and detailed wireframes to visualize your website's structure before development.",
            icon: <HiOutlineTemplate />, // Replace with your preferred icon component
            // to: "/wireframing-prototyping",
        },
        {
            title: "Website Redesign",
            description: "Revamp your existing website with a modern and updated design, improving aesthetics and functionality.",
            icon: <BiRefresh />, // Replace with your preferred icon component
            // to: "/website-redesign",
        },
    ];

    const projects = [
        {
            title: "Content Marketing",
            description: "Our team creates ",
            // icon: <FaPencil />,
            img: ProjectImg,
        },
        {
            title: "Graphic Design",
            description: "Unlock the power ",
            // icon: <FaPenFancy />,
            img: ProjectImg,
        },
        {
            title: "Digital Marketing",
            description: "Elevate your brand's ",
            // icon: <HiSpeakerphone />,
            img: ProjectImg,
        },
        {
            title: "Web Design",
            description: "We specialize ",
            // icon: <CgWebsite />,
            img: ProjectImg,
        },
    ];


    return (
        <div className="relative w-full h-full bg-darkGray" id='home'>
            {/* Navbar */}
            <div className="relative z-20">
                <Navbar />
            </div>

            {/* Background Image and Content */}
            <div className='relative'>
                <div
                    className="w-full absolute inset-0 bg-cover bg-center h-full flex flex-col items-center justify-center text-white z-10 bg-repeat "
                    style={{
                        backgroundImage: `url(${Herobg})`,
                    }}
                ></div>

                <div className="relative w-full py-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[10vw] flex flex-col lg:flex-row gap-8 lg:gap-20 items-center">
                    {/* Left */}
                    <div className="flex flex-col w-full lg:w-1/2 py-4 lg:py-[4vw] text-center lg:text-left items-center sm:items-center lg:items-start">

                        <p className="text-body font-heading text-primary font-bold mb-2">Web Design Services</p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 font-heading text-white lg:leading-tight">
                            Your Vision, Perfectly Designed.
                        </h2>
                        <p className="font-body text-sm sm:text-sm md:text-md lg:text-md mb-6 text-gray text-body w-full lg:w-[80%]">
                        We're a team of strategic creators and digital innovators, united in our pursuit of mastery and joy.
                        </p>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-center lg:text-left">
                            <div className="flex flex-col justify-center lg:justify-start items-center lg:items-start gap-1">
                                <h2 className="text-3xl text-primary font-heading">30+</h2>
                                <p className="font-body text-sm text-white">Companies helped</p>
                            </div>
                            <div className="flex flex-col justify-center lg:justify-start items-center lg:items-start gap-1">
                                <h2 className="text-3xl text-primary font-heading">25.8%</h2>
                                <p className="font-body text-sm text-white">Revenue Generated</p>
                            </div>
                        </div>

                        {/* <button className="mt-8 px-4 py-2 bg-white text-black rounded-full transition max-w-fit text-body flex items-center justify-center gap-2 mx-auto lg:mx-0">
                            <span className="bg-black text-body rounded-full p-1">
                                <IoIosArrowForward className="text-white" />
                            </span>
                            <p className="font-body flex justify-center items-center">Start your Free Trial</p>
                        </button> */}

                        <InteractiveButton
                            buttonText="Start Now"
                            hoverText="Get in Touch"
                            bgColor="bg-white"
                            textColor="text-black"
                            hoverBgColor="hover:bg-black"
                            hoverTextColor="hover:text-white"
                            property="mt-8 "
                            icon=<IoIosArrowForward />
                        />

                    </div>

                    {/* Right */}
                    <div className="relative lg:w-1/2 flex items-center justify-center">
                        {/* Circular Design */}
                        <div className="relative ">
                            {/* <img src={RadialBlur} alt="Radial Blur" className="absolute inset-0 w-full h-full scale-120" /> */}
                            {/* <img src={SecondCircle} alt="Second Circle" className="absolute inset-0 w-full h-full scale-110" />
                <img src={FirstCircle} alt="First Circle" className="absolute inset-0 scale-90" /> */}
                            <img src={webdev} alt="Hero Image" className=" lg:scale-150 " />
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-16 bg-white px-4 sm:px-[5vw] md:px-[7vw] lg:px-[10vw] lg:z-150" id='services'>
                <div className="text-center mb-12">
                    <p className="text-body font-heading text-primary font-bold mb-2 text-center ">Web Development Services</p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 font-heading text-black lg:leading-tight">
                        High Impact Services <br /> for your Business
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className={`p-6 rounded-xl flex flex-col items-center justify-center bg-lightGray hover:bg-black hover:text-white transition duration-300 ease-in-out group`}
                        >
                            <div className="text-4xl mb-6 flex items-center justify-center bg-black group-hover:bg-white text-white group-hover:text-black p-4 rounded-full">{service.icon}</div>
                            <h3 className="text-2xl font-semibold mb-2 font-heading text-center">{service.title}</h3>
                            <p className="text-sm font-body text-center">{service.description}</p>
                            {/* <Link to={service.to} className="mt-8 px-4 py-2 bg-white text-black rounded-full transition max-w-fit text-body flex items-center justify-center gap-2 mx-auto lg:mx-0">
                                    <span className="bg-black text-body rounded-full p-1">
                                        <IoIosArrowForward className="text-white" />
                                    </span>
                                    <p className="font-body flex justify-center items-center">Learn More</p>
                                </Link> */}
                        </div>
                    ))}
                </div>
                <div className="mt-12 relative bg-gray-800 bg-lightGray rounded-xl overflow-hidden flex flex-col items-center justify-center p-8">



                    <div className=" relative bg-gray-800 bg-lightGray rounded-xl overflow-hidden flex flex-col items-center justify-center p-2">

                        {/* Content */}
                        <div className="relative z-10 text-start lg:flex justify-center items-center sm:gap-1 gap-1 lg:gap-8 lg:w-full">
                            <h2 className="w-full sm:w-full md:w-1/2 text-md md:text-4xl lg:text-3xl font-semibold font-heading text-black lg:leading-tight flex justify-center items-center lg:w-full text-center lg:text-left">
                            Give your old site a fresh, modern look for just $350
                            </h2>
                            <Link to="/contact" className="px-4 py-2 bg-white text-black rounded-full transition min-w-fit text-body flex items-center justify-center gap-2 lg:mx-0 mt-4 sm:mt-4 lg:mt-0">
                                <span className="bg-black text-body rounded-full p-1">
                                    <IoIosArrowForward className="text-white" />
                                </span>
                                <p className="text-sm sm:text-sm font-body flex justify-center items-center">Get Started</p>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

            <div className="py-16 bg-darkGray px-4 sm:px-[5vw] md:px-[7vw] lg:px-[10vw] lg:z-150" >
                <div className="text-center mb-12">
                    <p className="text-body font-heading text-primary font-bold mb-2 text-center ">Tech Stack</p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 font-heading text-white lg:leading-tight">
                        Technologies We Work With
                    </h2>
                </div>
                <Marquee autoFill="true" pauseOnHover="false" className="overflow-hidden no-scrollbar">
                    {skills.map((skill) => (
                        <div key={skill.name} className="block-container w-40 h-40">
                            <h2 className='font-body p-2 text-center mb-2 text-white'>{skill.name}</h2>
                            <div className="btn-back rounded-xl" />
                            <div className="btn-front rounded-xl flex justify-center items-center">
                                <img
                                    src={skill.imageUrl}
                                    alt={skill.name}
                                    className="w-1/2 h-1/2 object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </Marquee>
            </div>
            {/* <div className="py-16 bg-white px-4 sm:px-[5vw] md:px-[7vw] lg:px-[10vw] relative" id="projects"> */}
                {/* Heading */}
                {/* <div className="text-center">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 font-heading text-black lg:leading-tight">
                        Our Projects
                    </h2>
                </div> */}

                {/* Showcase Grid */}
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 sm:gap-6 lg:gap-x-8">
                    {projects.map((projects, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded-xl flex flex-col items-center justify-center transition duration-300 ease-in-out group ${index % 2 === 0 ? "lg:mt-16" : "lg:-mt-16"
                                } `}
                        >
                            <img
                                src={projects.img}
                                alt={projects.title}
                                className="w-85 h-64 sm:h-72 md:h-80 lg:h-50 object-cover rounded-lg overflow-hidden hover:scale-105 transition-all ease-in-out"
                            />
                            <h3 className="text-lg sm:text-xl font-semibold sm:mt-4 lg:mt-4 font-heading text-center">
                                {projects.title}
                            </h3>
                            <p className="font-body text-sm sm:text-base text-center sm:mt-1 lg:mt-1">
                                {projects.description}
                            </p>
                        </div>
                    ))}
                </div> */}

                {/* Button */}
                {/* <button className="lg:absolute px-4 py-2 bg-black text-white rounded-full transition max-w-fit sm:max-w-fit lg:max-w-fit text-body flex items-center justify-center gap-2 mx-auto lg:m-4 top-40 left-44 sm:mt-8 mt-6">
                <span className="bg-white text-body rounded-full p-1">
                    <IoIosArrowForward className="text-black" />
                </span>
                <p className='font-body flex justify-center items-center'>Start your Free Trial</p>
            </button> */}

                {/* <InteractiveButton
                    buttonText="Get in Touch"
                    hoverText="Get in Touch"
                    bgColor="bg-black"
                    textColor="text-white"
                    hoverBgColor="hover:bg-white"
                    hoverTextColor="hover:text-black"
                    property="hidden sm:hidden lg:absolute lg:m-4 top-40 left-44 sm:mt-8 mt-6" to="/contact"
                    icon=<IoIosArrowForward />
                />
            </div>*/ }

            <div className="py-8 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[10vw] bg-white">
    <div className="relative bg-gray-800 text-white bg-darkGray rounded-xl overflow-hidden flex flex-col items-center justify-center p-8">
        {/* Content */}
        <div className="relative z-10 text-start flex flex-col sm:flex-row justify-center items-center sm:gap-4 gap-4 lg:gap-8">
            <h2 className="w-full sm:w-1/2 lg:w-full text-xl md:text-3xl lg:text-4xl font-semibold font-heading text-white lg:leading-tight text-center sm:text-left">
                Enough talk, let's get to work
            </h2>
            <Link to="/contact" className="px-4 py-2 bg-white text-black rounded-full transition min-w-fit text-body flex items-center justify-center gap-2 mt-4 sm:mt-0 mx-auto lg:mx-0">
                <span className="bg-black text-body rounded-full p-1">
                    <IoIosArrowForward className="text-white" />
                </span>
                <p className="text-sm sm:text-sm font-body flex justify-center items-center">Contact Us</p>
            </Link>
        </div>
    </div>
</div>




            <Footer />
        </div>

    )
}

export default WebDesign