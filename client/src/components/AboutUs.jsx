import React from 'react';
import homeabout from '../assets/home-about.png';
import { IoIosArrowForward } from 'react-icons/io';
import InteractiveButton from './Button';
import serviceellipse from '../assets/service-ellipse.png';

const AboutUs = () => {
    return (
        <div className="relative w-full h-full bg-white" id='about'>
            <div
                className="absolute  text-white left-0 top-0 z-0"
            >
                <img src={serviceellipse} alt="" />
            </div>
            {/* Background Image and Content */}
            <div className="relative w-full py-12 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw] flex flex-col lg:flex-row gap-8 lg:gap-28 items-center bg-white/20 backdrop-blur-lg border border-white/30  z-50">

                {/* Left */}
                <div className="relative lg:w-1/2 flex items-center justify-center">
                    <img src={homeabout} alt="Radial Blur" className="w-full h-full object-cover overflow-hidden" />
                </div>

                {/* Right */}
                <div className="flex flex-col w-full lg:w-1/2 py-4 lg:py-[4vw] text-center lg:text-left items-center sm:items-center lg:items-start">

                    <p className="text-body font-heading text-primary font-bold mb-2">About us</p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 font-heading text-darkGray lg:leading-tight">
                        The core mission <br />behind all our work
                    </h2>
                    <p className="font-body text-sm sm:text-sm md:text-md lg:text-md mb-6 text-slate-600 text-body w-full lg:w-[80%]">
                    At DigitalFinServ, we are dedicated to making loans fast, secure, and accessible for everyone. With a network of top lenders, we help individuals and businesses find the best loan solutions with transparent terms and hassle-free approvals. Your financial growth is our mission!

                    </p>

                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-center lg:text-left">
                        <div className="flex flex-col justify-center lg:justify-start items-center lg:items-start gap-1">
                            <h2 className="text-3xl text-primary font-heading">5k+</h2>
                            <p className="font-body text-sm text-black">Happy Customers <br />Helped</p>
                        </div>
                        <div className="flex flex-col justify-center lg:justify-start items-center lg:items-start gap-1">
                            <h2 className="text-3xl text-primary font-heading">6k+</h2>
                            <p className="font-body text-sm text-black">Loans Successfully <br />Processed</p>
                        </div>
                    </div>

                   

                    <InteractiveButton
                        buttonText="See More"
                        hoverText="See More"
                        bgColor="bg-primary"
                        textColor="text-white"
                        hoverBgColor="hover:bg-darkGray"
                        hoverTextColor="hover:text-white"
                        property="mt-8" to="/about"
                        icon=<IoIosArrowForward /> />

                </div>
            </div>
        </div>
    );
};

export default AboutUs;
