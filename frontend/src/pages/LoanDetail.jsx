// import React from "react";
// import { useParams } from "react-router-dom";
// import { FaBuilding, FaHome, FaLandmark, FaIndustry, FaHandshake, FaBusinessTime, FaMoneyCheckAlt, FaUniversity, FaWallet } from "react-icons/fa";
// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";

// import loan from "../assets/loan.jpg";
// import InteractiveButton from "../components/Button";
// import { IoIosArrowForward, IoIosArrowRoundForward } from "react-icons/io";
// import { Link } from "react-router-dom";
// import homeabout from '../assets/home-about.png';


// import serviceellipse from '../assets/service-ellipse.png';
// import Steps from "../components/Steps";

// const loanDetails = {
//     "personal-loan": {
//         title: "Personal Loan",
//         description: "A personal loan is an unsecured loan that provides financial flexibility for various personal needs such as medical emergencies, weddings, travel, home renovation, or debt consolidation. Since it's unsecured, there’s no need for collateral, making it an attractive option for salaried and self-employed individuals.",
//         icon: <FaWallet />,
//         benefits: ["✔ Loan amounts ranging from ₹50,000 to ₹50 Lakhs?",
//             "✔ Fixed interest rates ensure predictable monthly payments",
//             "✔ Flexible repayment tenure from 12 to 60 months",
//             "✔ Quick approval with minimal documentation",
//             "✔ No restrictions on how you use the funds",],
//         cta:"With DigitalFinServ, you can apply for a personal loan online and receive funds within 24-48 hours, ensuring you never face financial hurdles.",
//     },
//     "business-loans": {
//         title: "Business Loans",
//         description: "Unsecured business loans up to INR 75 Lakhs* with easy EMI options.",
//         icon: <FaBusinessTime />,
//     },
//     "loan-against-property": {
//         title: "Loan Against Property",
//         description: "Get a competitive property loan up to ₹5 Crores* with low interest rates.",
//         icon: <FaLandmark />,
//     },
//     "nri-home-loan": {
//         title: "NRI Home Loan",
//         description: "Helping NRIs achieve their dream of owning a home in India.",
//         icon: <FaHome />,
//     },
// };

// // const LoanDetail = () => {
// //   const { loanType } = useParams();
// //   const loan = loanDetails[loanType];

// //   if (!loan) {
// //     return <p className="text-center text-lg text-red-500">Loan type not found!</p>;
// //   }

// //   return (
// //     <div className="relative py-16 bg-white px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw] " id="loan-detail">
// //       <div className="p-6 rounded-2xl flex flex-col items-center justify-center
// //                       bg-lightSeaGreen/30 backdrop-blur-lg border border-white/30 shadow-lg 
// //                       transition duration-300 ease-in-out group z-50"
// //       >
// //         <div className="text-4xl mb-6 flex items-center justify-center text-primary p-4 rounded-full">
// //           {loan.icon}
// //         </div>
// //         <h3 className="text-3xl font-semibold mb-2 font-heading text-darkGray">{loan.title}</h3>
// //         <p className="text-sm font-body text-center text-slate-600">{loan.description}</p>
// //       </div>
// //     </div>
// //   );
// // };


// const LoanDetail = () => {
//     return (
//         <div className="relative bg-white z-0">
//             <Navbar z={10} />
//             <div className="relative">
//                 <img src={loan} alt="" className="w-[100vw] h-[60vh] object-cover object-center" />
//                 {/* Black Overlay */}
//                 <div className="absolute inset-0 bg-darkGray opacity-70"></div>
//                 <h2 className="absolute text-3xl md:text-4xl lg:text-6xl font-bold mb-12 font-heading text-primary text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                     About Us
//                 </h2>
//             </div>



//             <div className="py-8 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw] ">

//                 <div className="flex flex-col lg:flex-row gap-8 lg:gap-28 items-center bg-white/20 backdrop-blur-lg border border-white/30  z-50">
//                     {/* Left */}
//                     <div className="relative lg:w-1/2 flex items-center justify-center">
//                         <img src={homeabout} alt="Radial Blur" className="w-full h-full object-cover overflow-hidden" />
//                     </div>

//                     {/* Right */}
//                     <div className="flex flex-col w-full lg:w-1/2 py-4 lg:py-[4vw] text-center lg:text-left items-center sm:items-center lg:items-start">

//                         <p className="text-body font-heading text-primary font-bold mb-2">About us</p>
//                         <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 font-heading text-darkGray lg:leading-tight">
//                             The core mission <br />behind all our work
//                         </h2>
//                         <p className="font-body text-sm sm:text-sm md:text-md lg:text-md mb-6 text-slate-600 text-body w-full lg:w-[80%]">
//                             At DigitalFinServ, we are dedicated to making loans fast, secure, and accessible for everyone. With a network of top lenders, we help individuals and businesses find the best loan solutions with transparent terms and hassle-free approvals. Your financial growth is our mission!

//                         </p>

//                         <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-center lg:text-left">
//                             <div className="flex flex-col justify-center lg:justify-start items-center lg:items-start gap-1">
//                                 <h2 className="text-3xl text-primary font-heading">5k+</h2>
//                                 <p className="font-body text-sm text-black">Happy Customers <br />Helped</p>
//                             </div>
//                             <div className="flex flex-col justify-center lg:justify-start items-center lg:items-start gap-1">
//                                 <h2 className="text-3xl text-primary font-heading">6k+</h2>
//                                 <p className="font-body text-sm text-black">Loans Successfully <br />Processed</p>
//                             </div>
//                         </div>



//                         <InteractiveButton
//                             buttonText="See More"
//                             hoverText="See More"
//                             bgColor="bg-primary"
//                             textColor="text-white"
//                             hoverBgColor="hover:bg-darkGray"
//                             hoverTextColor="hover:text-white"
//                             property="mt-8" to="/about"
//                             icon=<IoIosArrowForward /> />

//                     </div>

//                 </div>


//             </div>
//             <Steps />
//             <Footer />
//         </div>
//     );
// };

// export default LoanDetail;



import React from "react";
import { useParams } from "react-router-dom";
import { FaWallet, FaBusinessTime, FaLandmark, FaHome } from "react-icons/fa";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import loanimg from "../assets/loan.jpg";
import InteractiveButton from "../components/Button";
import { IoIosArrowForward } from "react-icons/io";
import homeabout from "../assets/home-about.png";
import Steps from "../components/Steps";

const loanDetails = {
    "personal-loan": {
        title: "Personal Loan",
        description: "A personal loan is an unsecured loan that provides financial flexibility for various personal needs such as medical emergencies, weddings, travel, home renovation, or debt consolidation.",
        // icon: <FaWallet />,
        benefits: [
            "Loan amounts ranging from ₹50,000 to ₹50 Lakhs",
            "Fixed interest rates ensure predictable monthly payments",
            "Flexible repayment tenure from 12 to 60 months",
            "Quick approval with minimal documentation",
            "No restrictions on how you use the funds",
        ],
        cta: "With DigitalFinServ, you can apply for a personal loan online and receive funds within 24-48 hours."
    },
    "business-loan": {
        title: "Business Loan",
        description: "A business loan is an excellent funding option for entrepreneurs and business owners looking to expand operations, purchase inventory, invest in equipment, or manage working capital.",
        // icon: <FaBusinessTime />,
        benefits: [
            "Unsecured business loans up to ₹75 Lakhs",
            "No collateral required for eligible businesses",
            "Flexible repayment options with tenures up to 5 years",
            "Low-interest rates based on creditworthiness",
            "Quick processing with minimal paperwork",
        ],
        cta: "This loan is ideal for startups, MSMEs, and established businesses looking for growth capital."
    },
    "loan-against-property": {
        title: "Loan Against Property (LAP)",
        description: "A Loan Against Property (LAP) allows you to unlock the value of your owned property to get secured financing at lower interest rates.",
        // icon: <FaLandmark />,
        benefits: [
            "Loan amounts up to ₹5 Crore",
            "Lower interest rates than unsecured loans",
            "Suitable for both residential and commercial properties",
            "Longer repayment tenure of up to 15-20 years",
            "Funds can be used for business expansion, education, weddings, or medical emergencies",
        ],
        cta: "With DigitalFinServ, you can leverage your property’s value without selling it and get access to large loan amounts easily."
    },
    "nri-home-loan": {
        title: "NRI Home Loan",
        description: "For Non-Resident Indians (NRIs) dreaming of owning a home in India, our NRI Home Loan offers a seamless financing solution.",
        // icon: <FaHome />,
        benefits: [
            "Competitive interest rates for NRIs",
            "Loan tenure up to 30 years",
            "Hassle-free online process with digital documentation",
            "Can be used for home purchase, construction, or renovation",
            "Complies with RBI guidelines for NRI financing",
        ],
        cta: "With our dedicated NRI services, you can buy property in India without the hassle of frequent visits."
    },
    "home-loan": {
        title: "Home Loan",
        description: "A home loan provides long-term financing for purchasing or constructing a house at affordable interest rates.",
        // icon: <FaBuilding />,
        benefits: [
            "Loan amounts based on property value",
            "Flexible tenure up to 30 years",
            "Attractive interest rates for salaried and self-employed applicants",
            "Tax benefits under Section 80C and Section 24(b)",
            "Balance transfer option available to reduce EMI burden",
        ],
        cta: "At DigitalFinServ, we ensure fast approval, low EMIs, and hassle-free processing for all homebuyers."
    },
    "plot-purchase-loan": {
        title: "Plot Purchase Loan",
        description: "If you are planning to buy a plot of land for investment or home construction, our plot purchase loan provides financial assistance tailored to your needs.",
        // icon: <FaMap />,
        benefits: [
            "Finance up to 80% of plot value",
            "Competitive interest rates and tenure up to 15 years",
            "Available for residential and investment purposes",
            "Suitable for government-approved plots",
        ],
        cta: "With our easy financing options, you can own your dream plot without financial stress."
    },
    "industrial-property-loan": {
        title: "Industrial Property Purchase Loan",
        description: "An industrial loan helps manufacturers, exporters, and business owners acquire industrial spaces, factories, or warehouses.",
        // icon: <FaIndustry />,
        benefits: [
            "High loan amounts based on property valuation",
            "Available for new or existing industrial units",
            "Longer repayment tenure for affordable EMIs",
            "Tax benefits for business owners",
        ],
        cta: "This loan provides the right financial support for purchasing industrial land, factory premises, or warehouse space."
    },
    "commercial-property-loan": {
        title: "Commercial Property Purchase Loan",
        description: "A commercial property loan is ideal for businesses looking to buy office spaces, retail outlets, or rental properties.",
        // icon: <FaStore />,
        benefits: [
            "Finance available for shops, offices, and commercial buildings",
            "Loan amounts based on property value and business income",
            "Flexible repayment options for business owners",
            "Low interest rates for eligible applicants",
        ],
        cta: "If you're expanding your business or investing in commercial real estate, this loan is a great financial tool."
    },
    "overdraft-facility": {
        title: "Overdraft Facility",
        description: "An overdraft loan is a flexible credit line where you can withdraw funds as needed and pay interest only on the used amount.",
        // icon: <FaCreditCard />,
        benefits: [
            "No fixed EMI—interest is charged only on the amount utilized",
            "Available for salaried professionals, businesses, and self-employed individuals",
            "No prepayment penalties",
            "Ideal for managing cash flow fluctuations",
        ],
        cta: "Perfect for business owners and professionals who need an emergency fund without committing to a fixed loan."
    },
    "education-loan": {
        title: "Education Loan",
        description: "Education loans help students pursue higher studies in India or abroad without financial constraints.",
        // icon: <FaGraduationCap />,
        benefits: [
            "Loan covers tuition fees, hostel charges, travel, and study materials",
            "Low-interest rates with repayment after course completion",
            "Available for recognized universities in India and abroad",
            "Subsidy options for eligible students under government schemes",
        ],
        cta: "Investing in education is investing in the future, and our education loan ensures you can achieve your academic dreams."
    },
    "car-loan": {
        title: "Car Loan",
        description: "A car loan helps you finance the purchase of a new or used vehicle with easy repayment options.",
        // icon: <FaCar />,
        benefits: [
            "Up to 100% financing on on-road price",
            "Flexible tenure up to 7 years",
            "Low-interest rates for salaried and self-employed individuals",
            "Quick disbursal and minimal paperwork",
        ],
        cta: "With DigitalFinServ, you can drive home your dream car without financial burden."
    }
};


const LoanDetail = () => {
    const { loanType } = useParams();
    const loan = loanDetails[loanType] || {};

    return (
        <div className="relative bg-white z-0">
            <Navbar z={10} />
            <div className="relative">
                <img src={loanimg} alt="" className="w-[100vw] h-[60vh] object-cover object-center" />
                <div className="absolute inset-0 bg-darkGray opacity-70"></div>
                <h2 className="absolute text-3xl md:text-4xl lg:text-6xl font-bold text-primary text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-body">
                    {loan.title || "About Us"}
                </h2>
            </div>
            <div className="py-8 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw] mt-8">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-28 items-center bg-white/20 backdrop-blur-lg border border-white/30 ">
                    <div className="relative lg:w-1/2 flex items-center justify-center">
                        <img src={homeabout} alt="Radial Blur" className="w-full h-full object-cover overflow-hidden" />
                    </div>
                    <div className="flex flex-col w-full lg:w-1/2 py-4 lg:py-[4vw] text-center lg:text-left items-center sm:items-center lg:items-start">
                        {/* <div className="text-4xl mb-4 flex items-center justify-center text-primary">
                            {loan.icon}
                        </div> */}
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 font-heading text-darkGray lg:leading-tight">
                            {loan.title || "The core mission behind all our work"}
                        </h2>
                        <p className="font-body text-sm sm:text-sm md:text-md lg:text-md mb-6 text-slate-600 text-body w-full lg:w-[80%]">
                            {loan.description || "At DigitalFinServ, we are dedicated to making loans fast, secure, and accessible for everyone."}
                        </p>
                        {loan.benefits && (
                            <ul className="text-left text-darkGray mb-6 font-body text-sm sm:text-sm md:text-md lg:text-md">
                                {loan.benefits.map((benefit, index) => (
                                    <li key={index} className="mb-2 flex items-center">
                                        <IoIosArrowForward className="mr-2 text-primary" />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {loan.cta && <p className="text-primary font-bold font-body mb-4">{loan.cta}</p>}
                        <InteractiveButton
                            buttonText="Apply Now"
                            hoverText="Apply Now"
                            bgColor="bg-primary"
                            textColor="text-white"
                            hoverBgColor="hover:bg-darkGray"
                            hoverTextColor="hover:text-white"
                            property=""
                            to="/apply-form"
                            icon={<IoIosArrowForward />}
                        />
                    </div>
                </div>
            </div>
            <Steps />
            <Footer />
        </div>
    );
};

export default LoanDetail;
