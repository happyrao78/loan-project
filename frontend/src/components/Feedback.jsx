// import React, { useState } from "react";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import feedbackimg from "../assets/feedbackimg.png";
// import feedbackimg2 from "../assets/image.png";
// import feedbackimg3 from "../assets/hish.png";

// const feedbacks = [
//   {
//     id: 1,
//     name: "Happy Yadav",
//     position: "Business Owner",
//     feedback:
//       "The platform's services are exceptional! The team understood my requirements perfectly and delivered beyond my expectations. Highly recommend their expertise to anyone looking for quality work. The platform's services are exceptional! The team understood my requirements perfectly and delivered beyond my expectations. Highly recommend their expertise to anyone looking for quality work. ",
//     image: feedbackimg2, // Replace with the actual image URL
//   },
//   {
//     id: 2,
//     name: "Hishita Gupta",
//     position: "Tech Enthusiast",
//     feedback:
//       "Incredible experience! The team was professional, attentive, and delivered solutions that truly met my needs. I’m impressed with their commitment to quality and innovation.The platform's services are exceptional! The team understood my requirements perfectly and delivered beyond my expectations. Highly recommend their expertise to anyone looking for quality work. ",
//     image: feedbackimg3, // Replace with the actual image URL
//   },
//   {
//     id: 3,
//     name: "Kunal Singh",
//     position: "Startup Founder",
//     feedback:
//       "Amazing service! They made the entire process seamless and delivered a top-notch solution that’s helping my business grow. I’ll definitely be working with them again.The platform's services are exceptional! The team understood my requirements perfectly and delivered beyond my expectations. Highly recommend their expertise to anyone looking for quality work. ",
//     image: feedbackimg, // Replace with the actual image URL
//   },
  
// ];

// const FeedbackSlider = () => {
//   const [current, setCurrent] = useState(0);

//   const nextFeedback = () => {
//     setCurrent((prev) => (prev + 1) % feedbacks.length);
//   };

//   const prevFeedback = () => {
//     setCurrent((prev) => (prev - 1 + feedbacks.length) % feedbacks.length);
//   };

//   return (
//     <div className="px-[5vw] py-10 sm:py-10 lg:py-16 sm:px-[5vw] md:px-[7vw] lg:px-[8vw] ">
//     <div className="bg-lightSeaGreen/30 backdrop-blur-lg border border-white/30 shadow-lg rounded-lg p-10 lg:p-12 lg:px-20 text-center w-full  mx-auto">
//       <img
//         src={feedbacks[current].image}
//         alt={feedbacks[current].name}
//         className="w-20 h-20 rounded-full mx-auto mb-4 text-whit border border-primary "
//       />
//       <p className="w-full sm:w-full lg:w-3/4 text-sm lg:text-lg font-semibold font-heading mb-4 text-center lg:min-h-16 text-darkGray flex justify-center mx-auto">
//         “{feedbacks[current].feedback}”
//       </p>
//       <p className="text-sm font-bold font-heading text-primary">{feedbacks[current].name}</p>
//       <p className="text-xs text-gray-500 font-body text-slate-600">{feedbacks[current].position}</p>

//       {/* Navigation Buttons */}
//       <div className="flex items-center justify-center mt-6 gap-2">
//         <button
//           onClick={prevFeedback}
//           className="p-3 hover:text-primary border border-white text-white rounded-full bg-primary hover:bg-darkGray transition"
//         >
//           <FaArrowLeft />
//         </button>
//         <button
//           onClick={nextFeedback}
//           className="p-3  hover:text-primary border border-white text-white rounded-full bg-primary hover:bg-darkGray  transition"
//         >
//           <FaArrowRight />
//         </button>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default FeedbackSlider;

import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";

const FeedbackSlider = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}`+"/api/ui/feedback"); // Replace with your actual API endpoint
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  const nextFeedback = () => {
    setCurrent((prev) => (prev + 1) % feedbacks.length);
  };

  const prevFeedback = () => {
    setCurrent((prev) => (prev - 1 + feedbacks.length) % feedbacks.length);
  };

  if (feedbacks.length === 0) {
    return <p className="text-center text-gray-500">Loading feedbacks...</p>;
  }

  return (
    <div className="px-[5vw] py-10 sm:py-10 lg:py-16 sm:px-[5vw] md:px-[7vw] lg:px-[8vw] ">
      <div className="bg-lightSeaGreen/30 backdrop-blur-lg border border-white/30 shadow-lg rounded-lg p-10 lg:p-12 lg:px-20 text-center w-full mx-auto">
        <img
          src={feedbacks[current].image}
          alt={feedbacks[current].name}
          className="w-20 h-20 rounded-full mx-auto mb-4 border border-primary"
        />
        <p className="w-full sm:w-full lg:w-3/4 text-sm lg:text-lg font-semibold font-heading mb-4 text-center lg:min-h-16 text-darkGray flex justify-center mx-auto">
          “{feedbacks[current].feedback}”
        </p>
        <p className="text-sm font-bold font-heading text-primary">{feedbacks[current].name}</p>
        <p className="text-xs text-gray-500 font-body text-slate-600">{feedbacks[current].position}</p>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-center mt-6 gap-2">
          <button
            onClick={prevFeedback}
            className="p-3 hover:text-primary border border-white text-white rounded-full bg-primary hover:bg-darkGray transition"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={nextFeedback}
            className="p-3 hover:text-primary border border-white text-white rounded-full bg-primary hover:bg-darkGray transition"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSlider;






