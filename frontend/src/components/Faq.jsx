import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import serviceellipse from "../assets/service-ellipse.png";
import heroellipse from "../assets/hero-ellipse.png";

const faqData = [
    {
        question: "What interest rate can I expect?",
        answer:
            "Generally, the shorter the loan term, the lower the interest rate offered by most loan companies. Some lenders even offer an autopay discount if you authorize your monthly loan payments to be directly withdrawn from your checking account or savings account. Qualifying for lower rates depends on your credit score, loan term, and other factors.",
    },
    {
        question: "What can I use a personal loan for?",
        answer:
            "You can use a personal loan for various purposes, including debt consolidation, home improvements, medical expenses, or other financial needs.",
    },
    {
        question: "How can I get a personal loan?",
        answer:
            "To get a personal loan, you typically need to apply online or at a bank, provide necessary documentation, and meet the lender’s credit and income requirements.",
    },
    {
        question: "What is a personal loan?",
        answer:
            "A personal loan is a fixed-amount loan that you repay over time with interest. It can be used for various personal expenses.",
    },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="relative py-20 bg-white px-4 sm:px-[5vw] md:px-[7vw] lg:px-[0vw] " id="faq">

            <div
                className="absolute  text-white right-0 top-0 z-0"
            >
                <img src={serviceellipse} alt="" style={{ transform: "scaleX(-1)" }} className="z-0" />
            </div>

            <div
                className="absolute  text-white left-0 top-[-80] z-0"
            >
                <img src={heroellipse} alt=""  className="z-0" />
            </div>

            <div className="bg-white/20 backdrop-blur-lg z-50 lg:px-[8vw]">
                <p className="text-body font-heading text-primary font-bold mb-2 text-center">Have Questions?</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-12 font-heading text-darkGray lg:leading-tight text-center">
                    Frequently Asked Questions
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                    {faqData.map((item, index) => (
                        <div
                            key={index}
                            className="p-6 rounded-xl bg-lightSeaGreen/30 backdrop-blur-lg border border-white/30 shadow-lg 
            transition duration-300 ease-in-out group hover:bg-white/20 hover:-translate-y-2 z-50"
                        >
                            <button
                                className="z-50 flex items-center justify-between w-full text-left font-semibold text-darkGray text-lg font-heading"
                                onClick={() => toggleFAQ(index)}
                            >
                                {item.question}
                                {openIndex === index ? (
                                    <Minus size={20} className="text-primary" />
                                ) : (
                                    <Plus size={20} className="text-primary" />
                                )}
                            </button>
                            {openIndex === index && (
                                <div className="mt-4 text-sm text-slate-600 font-heading">{item.answer}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
