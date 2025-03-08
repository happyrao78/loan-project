import React from 'react';
import Herobg from '../assets/Hero-bg.png';
import Navbar from './Navbar';
import { IoIosArrowForward } from 'react-icons/io';
import heroimg from "../assets/hero-img.png";
import rating from "../assets/rating.png";

// import heroimg from "../assets/hero-imgg.png";
import brandone from "../assets/brandone.png";
import brandtwo from "../assets/brandtwo.png";
import brandthree from "../assets/brandthree.png";
import InteractiveButton from './Button';
import TypingEffect from 'react-typing-effect';
import heroellipse from "../assets/hero-ellipse.png";

const Hero = () => {
    return (
        <div className="relative w-full h-full bg-white" id='home'>
            {/* Navbar */}
            <div className="relative z-20">
                <Navbar />
            </div>

            {/* Background Image and Content */}
            

            <div className="relative w-full py-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw] flex flex-col lg:flex-row gap-8 lg:gap-5 items-center z-0 sm:z-0  lg:z-20">
            <div
                className="absolute inset-0  text-white left-0 top-12 "
                
            >
                <img src={heroellipse} alt=""  />
            </div>
                {/* Left */}
                <div className="flex flex-col w-full lg:w-1/2 py-4 lg:py-[4vw] text-center items-center sm:items-center lg:text-left lg:items-start z-20">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading text-primary lg:leading-tight">Get Loans From</h3>
                    <h2 className="text-3xl md:text-4xl lg:text-6xl font-extrabold mb-4 font-heading text-darkGray lg:leading-tight">
                        Top Lenders,
                        <br />
                        All in One Place
                    </h2>

                    <ul className="font-body  mb-6 text-gray-700  w-[100%] sm:w-[100%] lg:w-[80%] space-y-2  sm:text-center sm:flex sm:flex-col sm:justify-center sm:items-start flex flex-col justify-center items-start lg:justify-start lg:items-start ">
                        <li className="flex items-center gap-2 text-slate-600 ml-9 sm:ml-9 lg:ml-0 text-[13px] sm:text-[13px] lg:text-[16px] ">
                            <span className=" text-white bg-green-500 h-5 w-5 p-1 rounded-full flex justify-center items-center">✔</span> <p className=''>Compare & Choose the Best Loan Offers</p>
                        </li>
                        <li className="flex items-center gap-2 text-slate-600 ml-9 sm:ml-9 lg:ml-0 text-[13px] sm:text-[13px] lg:text-[16px]">
                            <span className= "text-xxs sm:text-xxs lg:text-sm text-white bg-green-500 h-5 w-5 p-1 rounded-full flex justify-center items-center">✔</span>  Lowest Rates Starting from 5.20% APR
                        </li>
                        <li className="flex items-center gap-2 text-slate-600 ml-9 sm:ml-9 lg:ml-0 text-[13px] sm:text-[13px] lg:text-[16px]">
                            <span className="text-xxs sm:text-xxs lg:text-sm text-white bg-green-500 h-5 w-5 p-1 rounded-full flex justify-center items-center">✔</span> Fast, Secure & Hassle-Free Process
                        </li>
                    </ul>
                    {/* <button className="px-4 py-2 bg-white text-black hover:bg-black hover:text-white rounded-full transition-all w-max-w-fit sm:max-w-fit lg:max-w-fit text-body flex items-center justify-center gap-2 mx-auto lg:mx-0 ease-in-out group z-50">
                        <span className="bg-black group-hover:bg-white text-body rounded-full p-1">
                            <IoIosArrowForward className="text-white group-hover:text-black" />
                        </span>
                        <p className='flex justify-center items-center font-body'>Start your Free Trial</p>
                    </button> */}

                    <InteractiveButton
                        buttonText="Apply Now"
                        hoverText="Apply Now "
                        bgColor="bg-primary"
                        textColor="text-white"
                        hoverBgColor="hover:bg-darkGray"
                        hoverTextColor="hover:text-white"
                        property="" to="/apply-form"
                        icon=<IoIosArrowForward /> />

                    {/* Trusted logos */}
                    <div className="mt-10 flex items-center  justify-center gap-2">
                        {/* Trusted By Leading Brands */}
                        
                        {/* Logos Section */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                            <img src={rating} alt="Greenish" className="h-6 w-auto lg:h-10" />
                            {/* <img src={brandtwo} alt="Automation" className="h-6 w-auto lg:h-10" />
                            <img src={brandthree} alt="Leafe" className="h-6 w-auto lg:h-10" /> */}
                            {/* <img src={brandone} alt="Mindfulness" className="h-6 w-auto lg:h-10" /> */}
                        </div>
                        <p className="text-sm font-heading text-slate-600 text-center lg:text-left flex items-center justify-center">
                        50,000+ clients around the world
                        </p>
                    </div>

                </div>

                {/* Right */}
                <div className="relative lg:w-1/2 flex items-center justify-center w-full h-full">
                    {/* Circular Design */}
                    <div className="relative lg:absolute w-[100%] h-auto  sm:w-[100%] sm:h-auto lg:w-full lg:h-[500px] lg:right-7">
                        <img src={heroimg} alt="Radial Blur" className=" w-full h-full  scale-110" />
                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
