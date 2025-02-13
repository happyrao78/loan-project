import React, { useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Import the useAuth hook
import logo from "../assets/logo.png";
import { IoIosArrowBack, IoIosArrowForward, IoMdCall } from 'react-icons/io';
import { RiMenu5Fill } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';
import InteractiveButton from './Button';
// import { Link} from 'react-router-dom';

const Navbar = ({z}) => {
    const { isLoggedIn, setIsLoggedIn } = useAuth(); // Access authentication state and setter
    const [menuVisible, setMenuVisible] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // Get current location (page)

    // Handle login button
    const handleLogin = () => {
        setIsLoggedIn(true); // Set login state
        navigate('/auth');
    };

    // Handle logout button
    const handleLogout = () => {
        setIsLoggedIn(false); // Set logout state
        setDropdownVisible(false); // Close dropdown
        navigate('/'); // Redirect to home page
    };

    // Toggle mobile menu
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    // Check if the current page is home
    const isHomePage = location.pathname === '/';

    return (
        <nav className="flex items-center justify-between text-white pt-2 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw] lg:py-6 z-50 top-0 left-0 w-full ">
            {/* Logo */}
            <Link to="/" className="">
                <img
                    src={logo}
                    alt="Logo"
                    className="w-0.8 h-auto sm:w-0.8 sm:h-auto lg:w-full lg:h-full"
                />
            </Link>


            {/* Desktop Menu */}
            <ul className="hidden md:flex gap-8 text-[16px] text-darkGray font-semibold ">
                {/* <a href='#home' className="hover:text-gray-400 transition font-body">Home</a> */}
                <a
                    href="/about"
                    className="relative font-body hover:text-gray-400 transition after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:rounded-full after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                >
                    About
                </a>
                {/* <a
                    href="#services"
                    className="relative font-body hover:text-gray-400 transition after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:rounded-full after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                >
                    Services
                </a> */}
                {/* <a
                    href="#projects"
                    className="relative font-body hover:text-gray-400 transition after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:rounded-full after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                >
                    Projects
                </a>
                <a
                    href="#feedback"
                    className="relative font-body hover:text-gray-400 transition after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-gray-400 after:transition-all after:duration-300 hover:after:w-full"
                >
                    Feedback
                </a> */}
                <a
                    href="/apply-form"
                    className="relative font-body hover:text-gray-400 transition after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:rounded-full after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                >
                    Apply Loan
                </a>
                <a
                    href="/track-loan"
                    className="relative font-body hover:text-gray-400 transition after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:rounded-full after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                >
                    Track Loan
                </a>
                <a
                    href="/emi-calculator"
                    className="relative font-body hover:text-gray-400 transition after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:rounded-full after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                >
                    EMI Calculator
                </a>
                <a
                    href="/contact"
                    className="relative font-body hover:text-gray-400 transition after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:rounded-full after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                >
                    Contact Us
                </a>

            </ul>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 ">
                {/* {!isLoggedIn ? (
                    <>
                        <button
                            className="px-4 py-2 transition font-body hidden md:flex gap-8 text-[17px] bg-white text-black rounded-full"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                        <Link
                            to="/contact" className="px-4 py-2 transition font-body hidden md:flex gap-8 text-[17px] bg-white text-black rounded-full"
                        >
                            Get in Touch
                        </Link>
                    </>
                ) : (
                    <div className="relative">
                        
                        <FaUserCircle
                            className="text-2xl cursor-pointer"
                            onClick={() => setDropdownVisible(!dropdownVisible)}
                        />
                       
                        {dropdownVisible && (
                            <div className="font-body absolute right-0 mt-2 w-48 bg-white text-black rounded-lg ">
                                <button
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )} */}

                <InteractiveButton
                    buttonText="Call Now"
                    hoverText="+91 xxxxxx"
                    bgColor="bg-primary"
                    textColor="text-white"
                    hoverBgColor="hover:bg-darkGray"
                    hoverTextColor="hover:text-white"
                    property="w-full hidden  sm:hidden lg:block" to="/contact"
                    icon=<IoMdCall/> />

                {/* Mobile Menu Toggle */}
                <RiMenu5Fill
                    className="text-xl text-primary cursor-pointer block  md:hidden "
                    onClick={toggleMenu}
                />
            </div>
            {menuVisible && (
                <div className="fixed inset-0 "></div>
            )}

            {/* Mobile Menu */}
                        {menuVisible && (
                            <div className="fixed top-0 right-0 w-4/5 h-screen text-darkGray font-heading flex flex-col items-center gap-0 transition-all justify-start border border-white ease-in-out overflow-hidden bg-white/50 backdrop-blur-lg" style={{ zIndex: z }}>
                                <div
                                    onClick={toggleMenu}
                                    className="flex items-center text-lg hover:text-gray-400 py-2 pl-6 border-b border-primary w-full text-left "
                                >
                                    <IoIosArrowBack className="text-primary" />
                                    <p>Back</p>
                                </div>
                                {/* <a
                                    href="#home"
                                    className="text-lg hover:text-gray-400 py-2 pl-6 border w-full text-left"
                                    onClick={toggleMenu}
                                >
                                    Home
                                </a> */}
                    <a
                        href="/about"
                        className="text-lg hover:text-gray-400 py-2 pl-6 border-b border-primary w-full text-left"
                        onClick={toggleMenu}
                    >
                        About
                    </a>
                    <a
                        href="/apply-form"
                        className="text-lg hover:text-gray-400 py-2 pl-6 border-b border-primary w-full text-left"
                        onClick={toggleMenu}
                    >
                        Apply Loan
                    </a>
                    {/* <a
                        href="#projects"
                        className="text-lg hover:text-gray-400 py-2 pl-6 border w-full text-left"
                        onClick={toggleMenu}
                    >
                        Projects
                    </a> */}

<a
                        href="/track-loan"
                        className="text-lg hover:text-gray-400 py-2 pl-6 border-b border-primary w-full text-left"
                        onClick={toggleMenu}
                    >
                        Track Loan
                    </a>
                    <a
                        href="/emi-calculator"
                        className="text-lg hover:text-gray-400 py-2 pl-6 border-b border-primary w-full text-left"
                        onClick={toggleMenu}
                    >
                        Emi Calculator
                    </a>

                    <a
                        href="/contact"
                        className="text-lg hover:text-gray-400 py-2 pl-6 border-b border-primary w-full text-left"
                        onClick={toggleMenu}
                    >
                        Contact Us
                    </a>
                    <a
                        href="/emi-calculator"
                        className="text-lg hover:text-gray-400 py-2 pl-6 border-b border-primary w-full text-left"
                        onClick={toggleMenu}
                    >
                        Call Now
                    </a>
                    {/* {!isLoggedIn ? (
                        <button
                            className="text-lg hover:text-gray-400 py-2 pl-6 border-b w-full text-left"
                            onClick={() => {
                                toggleMenu();
                                handleLogin();
                            }}
                        >
                            Login
                        </button>
                    ) : (
                        <button
                            className="text-lg hover:text-gray-400 py-2 pl-6 border-b w-full text-left"
                            onClick={() => {
                                toggleMenu();
                                handleLogout();
                            }}
                        >
                            Logout
                        </button>
                    )} */}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
