import React from 'react'
import serviceellipse from '../assets/service-ellipse.png'
import Marquee from 'react-fast-marquee';

const Partners = () => {

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


    // const skills = [
    //     {
    //         name: "State Bank of India",
    //         description: "India's largest public sector bank offering comprehensive banking services.",
    //         imageUrl: "https://www.onlinesbi.sbi/documents/43611/1122261/SBI_Logo.svg"
    //     },
    //     {
    //         name: "HDFC Bank",
    //         description: "One of India's leading private sector banks known for digital banking solutions.",
    //         imageUrl: "https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/dc043313-44d6-4501-af71-22e18df86c0f/common/logo.svg"
    //     },
    //     {
    //         name: "ICICI Bank",
    //         description: "Major private sector bank providing innovative banking and financial services.",
    //         imageUrl: "https://www.icicibank.com/content/dam/icicibank/india/managed-assets/images/Revamp-2021/icici-new-logo.svg"
    //     },
    //     {
    //         name: "Punjab National Bank",
    //         description: "One of the largest public sector banks with extensive branch network.",
    //         imageUrl: "https://www.pnbindia.in/images/PNB_Logo.png"
    //     },
    //     {
    //         name: "Axis Bank",
    //         description: "Private sector bank offering comprehensive retail and corporate banking solutions.",
    //         imageUrl: "https://www.axisbank.com/assets/images/logo-white.png"
    //     },
    //     {
    //         name: "Bank of Baroda",
    //         description: "Major public sector bank with strong presence in rural and urban areas.",
    //         imageUrl: "https://www.bankofbaroda.in/-/media/project/bob/countrywebsites/india/home/logo.svg"
    //     },
    //     {
    //         name: "Kotak Mahindra Bank",
    //         description: "Private sector bank known for innovative financial products and services.",
    //         imageUrl: "https://www.kotak.com/content/dam/Kotak/kotak-logo.png"
    //     },
    //     {
    //         name: "Canara Bank",
    //         description: "Public sector bank with extensive network and diverse banking solutions.",
    //         imageUrl: "https://canarabank.com/assets/images/Canara_Bank.png"
    //     },
    //     {
    //         name: "Union Bank of India",
    //         description: "Large public sector bank offering comprehensive banking services.",
    //         imageUrl: "https://www.unionbankofindia.co.in/assets/images/logo.png"
    //     },
    //     {
    //         name: "IndusInd Bank",
    //         description: "Private sector bank known for innovative banking solutions and services.",
    //         imageUrl: "https://www.indusind.com/content/dam/indusind-corporate/common/logo/indusind-bank-logo.svg"
    //     }
    // ];

    return (
        <div className="relative py-8  px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw] " >
            <div
                className="absolute  text-white left-0 top-0 z-0"
            >
                <img src={serviceellipse} alt="" />
            </div>
            <div className='bg-lightSeaGreen/30 backdrop-blur-lg border border-white/30 shadow-lg py-4 z-50 rounded-lg'>
                <div className="text-center mb-12">
                    <p className="text-body font-heading text-primary font-bold mb-2 text-center ">10+ Partners</p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 font-heading text-darkGray lg:leading-tight">
                        Our Partners
                    </h2>
                </div>
                <Marquee autoFill="true" pauseOnHover="false" className="overflow-hidden no-scrollbar">
                    {skills.map((skill) => (
                        <div key={skill.name} className="block-container w-40 h-40">
                            {/* <h2 className='font-body p-2 text-center mb-2 text-white'>{skill.name}</h2> */}
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
        </div>
    )
}

export default Partners