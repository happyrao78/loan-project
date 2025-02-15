import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import serviceellipse from "../assets/service-ellipse.png";
import heroellipse from "../assets/hero-ellipse.png";

const faqData = [
    {
        question: "What types of loans does DigitalFinServ offer?",
        answer:
            "We provide personal loans, business loans, home loans, and more from top lenders with flexible repayment options.",
    },
    {
        question: "How quickly can I get my loan approved?",
        answer:
            "Approval times vary, but many loans get approved within 24 hours, with funds disbursed shortly after.",
    },
    {
        question: "Are there any hidden charges?",
        answer:
            "No! We believe in 100% transparency—all charges are clearly mentioned upfront.",
    },
    {
        question: "What documents are required for loan approval?",
        answer:
            "Basic KYC documents, income proof, and bank statements are typically needed, depending on the loan type.",
    },
    {
        question: " Can I repay my loan early?",
        answer:
            "Yes! We offer zero prepayment charges on eligible loans, so you can repay early without extra fees.",
    },
    {
        question: "How do I check my loan eligibility?",
        answer:
            "Simply fill out our online form, and we’ll match you with the best loan options based on your profile.",
    },
    {
        question: "Is my information safe with DigitalFinServ?",
        answer:
            "Absolutely! We use advanced security protocols to keep your personal and financial data secure.",
    },
    {
        question: "How do I apply for a loan?",
        answer:
            "Click Apply Now, fill in your details, upload documents, and get instant loan offers from top lenders! ",
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
