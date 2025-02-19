import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-darkGray text-white py-10">
            <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-[2fr_1fr_1fr_2fr] md:grid-cols-4 gap-10 sm:gap-10 lg:gap-28">
                {/* Logo and Description */}
                <div>
                    <h2 className="text-xl font-bold mb-4 font-heading">DigitalFinServ</h2>
                    <p className="text-sm w-[100%] font-body">
                    We're a team of financial experts and tech-driven innovators, dedicated to making loans faster, easier, and more accessible. With transparency and efficiency at our core, we connect you to top lenders, ensuring a secure and hassle-free borrowing experience.
                    </p>
                </div>

                {/* Pages Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 font-heading">Pages</h3>
                    <ul className="space-y-4 text-sm font-body">
                       
                        <li>
                        <a href="/">Home</a></li>
                        <li>
                        <a href="/about">About</a></li>
                        
                        <li>
                        <a href="/contact">Contact Us</a></li>
                       
                       
                    </ul>
                    
                </div>
                          
                {/* Utility Pages Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 font-heading">Utility Pages</h3>
                    <ul className="space-y-4 text-sm font-body">
                        {/* <li>Style Guide</li>
                        <li>Instruction</li>
                        <li>License</li>
                        <li>Changelog</li>
                        <li>Error 404</li>
                        <li>Password Protected</li> */}
                        <li>
                        <a href="/apply-form">Apply Loan</a></li>
                        <li>
                        <a href="/track-loan">Track Loan</a></li>
                        <li>
                        <a href="/emi-calculator">EMI Calculator</a></li>
                    </ul>
                </div>


                

                {/* Subscribe */}
                {/* <div>
                    <h3 className="text-lg font-semibold mb-4 font-heading">Subscribe</h3>
                    <form className="flex w-full relative">
                        <input
                            type="email"
                            placeholder="Enter your email here"
                            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none text-sm sm:text-sm text-gray-700 text-body"
                        />
                        <button
                            type="submit"
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 px-6 py-1 bg-black text-white rounded-full hover:bg-gray-800 transition text-md font-body"
                        >
                            Subscribe
                        </button>
                    </form>
                </div> */}

            </div>

            {/* Bottom Section */}
            <div className="mt-10 border-t border-gray-700 pt-6 text-sm">
  <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row sm:text-start md:justify-between items-start lg:mx-auto lg:px-4 gap-4">
    <div className="flex flex-col">
      <p className="text-lg font-semibold font-heading my-2">Copyright by</p>
      <p className="font-body text-sm">Designed by DigitalFinserv</p>
    </div>

    <div>
      <p className="text-lg font-semibold font-heading my-2">Address</p>
      <p className="font-body text-sm">NBP Green Heights, C-68, Bandra Kurla Complex Rd,</p>
      <p className="font-body text-sm">opposite to MCA Club, F Block BKC,</p>
      <p className="font-body text-sm">Bandra East, Mumbai, Maharashtra 400051</p>
    </div>

    <div>
      <p className="text-lg font-semibold font-heading my-2">Contact</p>
      <p className="font-body text-sm">+91 8981323486</p>
    </div>

    <div>
      <p className="text-lg font-semibold font-heading my-2">Email</p>
      <p className="font-body text-sm">support@digitalfinserv.in</p>
    </div>

    {/* Social Icons */}
    {/* <div className="flex space-x-4 justify-center items-center mt-4">
      
      <a
        href="#"
        className="hover:text-gray-400 p-2 bg-white text-primary rounded-full hover:text-white hover:bg-darkGray  flex items-center justify-center"
      >
        <FaInstagram size={20} />
      </a>
      <a
        href="#"
        className="hover:text-gray-400 p-2 bg-white text-primary rounded-full hover:text-white hover:bg-darkGray  flex items-center justify-center"
      >
        <FaFacebook size={20} />
      </a> 
      <a
        href="#"
        className="hover:text-gray-400 p-2 bg-white text-primary rounded-full hover:text-white hover:bg-darkGray  flex items-center justify-center"
      >
        <FaLinkedin size={20} />
      </a> 
    </div> */}
  </div>
</div>

        </footer>
    );
};

export default Footer;
