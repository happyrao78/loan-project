// import { useState } from "react";
// import { IoIosArrowForward } from "react-icons/io";
// import InteractiveButton from "./Button";

// const Emi = () => {
//     const [loanAmount, setLoanAmount] = useState(100000);
//     const [loanMonths, setLoanMonths] = useState(57);
//     const [interestRate, setInterestRate] = useState(1);

//     const calculateEMI = () => {
//         const monthlyRate = interestRate / 100 / 12;
//         const emi =
//             (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanMonths)) /
//             (Math.pow(1 + monthlyRate, loanMonths) - 1);
//         return isNaN(emi) ? 0 : emi.toFixed(2);
//     };

//     const totalInterest = (calculateEMI() * loanMonths - loanAmount).toFixed(2);
//     const totalAmountPayable = (parseFloat(totalInterest) + loanAmount).toFixed(2);

//     return (
//         <div className="w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
//             {/* <h2 className="text-xl font-bold text-center mb-4">Loan Calculator</h2> */}
//         <div className="flex flex-col md:flex-row gap-12">
//             <div className="w-1/2">

//                 <div className="mb-4">
//                     <label className="block text-sm font-semibold">Loan Amount</label>
//                     <input
//                         type="range"
//                         min="10000"
//                         max="15000000"
//                         value={loanAmount}
//                         onChange={(e) => setLoanAmount(parseInt(e.target.value))}
//                         className="w-full"
//                     />
//                     <span className="block text-right">₹{loanAmount}</span>
//                 </div>

//                 <div className="mb-4">
//                     <label className="block text-sm font-semibold">Loan Months</label>
//                     <input
//                         type="range"
//                         min="12"
//                         max="240"
//                         value={loanMonths}
//                         onChange={(e) => setLoanMonths(parseInt(e.target.value))}
//                         className="w-full"
//                     />
//                     <span className="block text-right">{loanMonths} Months</span>
//                 </div>

//                 <div className="mb-4">
//                     <label className="block text-sm font-semibold">Interest Rate (%)</label>
//                     <input
//                         type="range"
//                         min="1"
//                         max="15"
//                         value={interestRate}
//                         onChange={(e) => setInterestRate(parseFloat(e.target.value))}
//                         className="w-full"
//                     />
//                     <span className="block text-right">{interestRate}%</span>
//                 </div>

//             </div>

//             <div className="w-1/2">

//                 <div className="mt-6 p-4 bg-gray-100 rounded-lg">
//                     <h3 className="text-lg font-semibold">Monthly EMI: ₹{calculateEMI()}</h3>
//                     <p>Total Interest: ₹{totalInterest}</p>
//                     <p>Total Amount Payable: ₹{totalAmountPayable}</p>
//                     <p>Total Months: {loanMonths}</p>
//                     <p>Interest Rate: {interestRate}%</p>
//                 </div>
//                 <InteractiveButton
//                         buttonText="Apply For Loan"
//                         hoverText="Apply For Loan"
//                         bgColor="bg-primary"
//                         textColor="text-white"
//                         hoverBgColor="hover:bg-darkGray"
//                         hoverTextColor="hover:text-white"
//                         property="" to="/contact"
//                         icon=<IoIosArrowForward /> />
//             </div>
//             </div>
//         </div>
//     );
// };

// export default Emi;
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

const EMI = () => {
    const [loanAmount, setLoanAmount] = useState(100000);
    const [loanMonths, setLoanMonths] = useState(57);
    const [interestRate, setInterestRate] = useState(1);
    const [calculateInYear, setCalculateInYear] = useState(false);

    const calculateEMI = () => {
        const monthlyRate = interestRate / 100 / 12;
        const emi =
            (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanMonths)) /
            (Math.pow(1 + monthlyRate, loanMonths) - 1);
        return isNaN(emi) ? 0 : emi.toFixed(2);
    };

    const totalInterest = (calculateEMI() * loanMonths - loanAmount).toFixed(2);
    const totalAmountPayable = (parseFloat(totalInterest) + loanAmount).toFixed(2);

    return (
        <div className="relative bg-white w-full font-body">
            <div className="w-full">
                <div className="p-6 rounded-2xl bg-lightSeaGreen/30 backdrop-blur-lg border border-white/30 shadow-lg w-full">
                    <div className="flex flex-col md:flex-row gap-20 justify-between items-center">
                        {/* Left Column - Inputs */}
                        <div className="w-full md:w-1/2">
                            <div className="mb-6">
                                {/* <div className="flex items-center mb-4">
                                    <input
                                        type="checkbox"
                                        checked={calculateInYear}
                                        onChange={(e) => setCalculateInYear(e.target.checked)}
                                        className="mr-2"
                                    />
                                    <label className="text-sm text-gray-600">Calculate loan in year</label>
                                </div> */}
                                
                                <label className="block text-xl font-semibold mb-4 text-darkGray">Loan Amount</label>
                                <input
                                    type="range"
                                    min="100000"
                                    max="15000000"
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between mt-2">
                                    <span className="text-sm text-gray-500">₹100000</span>
                                    <span className="text-primary font-semibold">₹{loanAmount}</span>
                                    <span className="text-sm text-gray-500">₹15000000</span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-xl font-semibold mb-4 text-darkGray">Loan Months</label>
                                <input
                                    type="range"
                                    min="48"
                                    max="240"
                                    value={loanMonths}
                                    onChange={(e) => setLoanMonths(parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between mt-2">
                                    <span className="text-sm text-gray-500">48</span>
                                    <span className="text-primary font-semibold">{loanMonths} Months</span>
                                    <span className="text-sm text-gray-500">240</span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-xl font-semibold mb-4 text-darkGray">Interest Rate</label>
                                <input
                                    type="range"
                                    min="1"
                                    max="15"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between mt-2">
                                    <span className="text-sm text-gray-500">1%</span>
                                    <span className="text-primary font-semibold">{interestRate}%</span>
                                    <span className="text-sm text-gray-500">15%</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Results */}
                        <div className="w-full md:w-1/2 lg:w-1/2 h-full flex flex-col justify-center items-center">
                            <div className="bg-white p-6 rounded-lg shadow-md lg:w-full h-full">
                                <h3 className="text-3xl font-bold mb-6 text-darkGray">
                                    Monthly EMI: <span className="text-primary">₹{calculateEMI()}</span>
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Total Interest</span>
                                        <span className="text-darkGray font-semibold">₹{totalInterest}</span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Total Amount Payable</span>
                                        <span className="text-darkGray font-semibold">₹{totalAmountPayable}</span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Total Months</span>
                                        <span className="text-darkGray font-semibold">{loanMonths} Months</span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Interest Rate</span>
                                        <span className="text-darkGray font-semibold">{interestRate}%</span>
                                    </div>
                                </div>

                                <button className="mt-8 w-full bg-primary text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-darkGray transition-colors duration-300">
                                    Apply For Loan
                                    <IoIosArrowForward />
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-6 text-center">
                        *These calculators are provided only as general self-help Planning Tools. Results depend on other factors.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EMI;