import React from 'react'
import Herobg from '../assets/Hero-bg.png';
import Navbar from '../components/Navbar';
import { IoIosArrowForward } from 'react-icons/io';

import InteractiveButton from '../components/Button';

import webdev from "../assets/web-ev.png"
import { CgWebsite } from 'react-icons/cg';
import { MdOutlineComputer, MdOutlineDevicesOther, MdOutlineSmartphone } from 'react-icons/md';
import { IoDiamond } from 'react-icons/io5';
import { Link } from "react-router-dom"
import Marquee from 'react-fast-marquee';
import Footer from '../components/Footer';
import ProjectImg from "../assets/Projects.png"
import { FiLayout, FiSmartphone } from 'react-icons/fi';
import { GiClick, GiShare } from 'react-icons/gi';
import { FaPaintBrush } from 'react-icons/fa';
import { HiOutlineTemplate } from 'react-icons/hi';
import { BiRefresh } from 'react-icons/bi';
import { AiOutlineCluster } from 'react-icons/ai';
import { VscChecklist } from 'react-icons/vsc';
import { HiOutlineWrench } from 'react-icons/hi2';
import appdev from "../assets/app-dev.png"

const AppDev = () => {
    const skills = [
        {
            name: "JavaScript",
            description: "The backbone of interactive web and mobile application development.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
        },
        {
            name: "React Native",
            description: "A popular framework for building cross-platform mobile applications.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
        },
        {
            name: "Node.js",
            description: "A runtime for building scalable and high-performance backend services.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
        },
        {
            name: "Swift",
            description: "A powerful programming language for iOS app development.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Swift_logo.svg",
        },
        {
            name: "Kotlin",
            description: "A modern programming language for Android app development.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/74/Kotlin_Icon.png",
        },
        {
            name: "Firebase",
            description: "A platform for building and scaling real-time mobile and web applications.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/37/Firebase_Logo.svg",
        },
        {
            name: "MongoDB",
            description: "A NoSQL database for managing app data efficiently.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg",
        },
        {
            name: "GraphQL",
            description: "A query language for APIs, enabling efficient data fetching in apps.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg",
        },
        {
            name: "Dart",
            description: "The programming language behind Flutter for creating beautiful apps.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Dart-logo.png",
        },
        {
            name: "Flutter",
            description: "An open-source framework for building natively compiled applications for mobile, web, and desktop.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png",
        },
    ];



    const services = [
        {
            title: "Custom Mobile App Development",
            description: "Build fully customized mobile applications tailored to your business needs, delivering exceptional user experiences.",
            icon: <MdOutlineSmartphone />, // Replace with your preferred icon component
            // to: "/custom-mobile-app",
        },
        {
            title: "Cross-Platform App Development",
            description: "Develop apps that work seamlessly across iOS, Android, and web platforms using frameworks like Flutter and React Native.",
            icon: <GiShare />, // Replace with your preferred icon component
            // to: "/cross-platform",
        },
        {
            title: "Enterprise App Solutions",
            description: "Deliver scalable and secure enterprise-level apps designed for optimal performance and data management.",
            icon: <AiOutlineCluster />, // Replace with your preferred icon component
            // to: "/enterprise-apps",
        },
        {
            title: "UI/UX Design for Apps",
            description: "Create engaging and user-friendly interfaces for your applications, ensuring a smooth and intuitive experience.",
            icon: <FiSmartphone />, // Replace with your preferred icon component
            // to: "/app-ui-ux",
        },
        {
            title: "App Testing & QA",
            description: "Ensure your app's reliability and performance with our rigorous testing and quality assurance services.",
            icon: <VscChecklist />, // Replace with your preferred icon component
            // to: "/app-testing",
        },
        {
            title: "App Maintenance & Support",
            description: "Provide ongoing support and updates to keep your app running smoothly and meeting evolving user needs.",
            icon: <HiOutlineWrench />, // Replace with your preferred icon component
            // to: "/app-maintenance",
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
                            Transform Your Ideas into Cutting-Edge Mobile Apps
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
                    <div className="relative lg:w-1/2 flex items-center justify-center ">
                        {/* Circular Design */}
                        <div className="relative overflow-hidden">
                            {/* <img src={RadialBlur} alt="Radial Blur" className="absolute inset-0 w-full h-full scale-120" /> */}
                            {/* <img src={SecondCircle} alt="Second Circle" className="absolute inset-0 w-full h-full scale-110" />
                <img src={FirstCircle} alt="First Circle" className="absolute inset-0 scale-90" /> */}
                            <img src={appdev} alt="Hero Image" className="scale-125 object-contain" />
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
                {/* <div className="py-8 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[10vw] bg-white"> */}
                <div className="mt-12 relative bg-gray-800 bg-lightGray rounded-xl overflow-hidden flex flex-col items-center justify-center p-8">

                    {/* Content */}
                    <div className="relative z-10 text-start lg:flex justify-center items-center sm:gap-1 gap-1 lg:gap-8 lg:w-full">
                        <h2 className="w-full sm:w-full md:w-1/2 text-md md:text-4xl lg:text-3xl font-semibold font-heading text-black lg:leading-tight flex justify-center items-center lg:w-full text-center lg:text-left">
                            Turn your vision into reality with a high-quality app for just $900    </h2>
                        <Link to="/contact" className="px-4 py-2 bg-white text-black rounded-full transition min-w-fit text-body flex items-center justify-center gap-2 lg:mx-0 mt-4 sm:mt-4 lg:mt-0">
                            <span className="bg-black text-body rounded-full p-1">
                                <IoIosArrowForward className="text-white" />
                            </span>
                            <p className="text-sm sm:text-sm font-body flex justify-center items-center">Get Started</p>
                        </Link>
                    </div>
                </div>

                {/* </div> */}
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

export default AppDev