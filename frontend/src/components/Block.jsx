import { useState, useEffect } from "react";

export default function HackRxComponent() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-screen bg-black overflow-hidden relative">
      {/* Animated meteor lines */}
      <div className="absolute w-full h-full">
        {/* Multiple animated lines with responsive sizing */}
        <div className="absolute top-0 right-0 w-20 sm:w-24 md:w-32 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30 transform rotate-45 translate-y-12 sm:translate-y-16 md:translate-y-24 animate-meteor-1"></div>
        <div className="absolute bottom-1/4 left-0 w-24 sm:w-32 md:w-40 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30 transform -rotate-45 animate-meteor-2"></div>
        <div className="absolute bottom-0 right-1/4 w-32 sm:w-48 md:w-64 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30 transform -rotate-45 animate-meteor-3"></div>
        <div className="absolute top-1/3 left-1/3 w-24 sm:w-36 md:w-48 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30 transform rotate-45 animate-meteor-4"></div>
        <div className="absolute top-1/2 right-1/3 w-28 sm:w-40 md:w-56 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30 transform -rotate-45 animate-meteor-5"></div>
        <div className="absolute bottom-1/3 left-1/2 w-20 sm:w-32 md:w-40 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30 transform rotate-45 animate-meteor-6"></div>
      </div>

      {/* Content */}
      <div
        className={`flex flex-col items-center transition-opacity duration-1000 px-4 sm:px-6 md:px-8 ${loaded ? "opacity-100" : "opacity-0"}`}
      >
        <div className="text-gray-400 mb-4 sm:mb-5 md:mb-6 text-base sm:text-lg md:text-xl lg:text-2xl text-center">
          Access Paused (Sorry for the inconvenience)
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-5 md:mb-6 text-transparent bg-clip-text bg-gradient-to-b from-gray-300 to-gray-500 text-center">
          Payment Pending
        </h1>
        <div className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl mb-3 sm:mb-4 text-center">
          Developer's payment of ₹xx,xxx is pending.
        </div>
        <div className="text-gray-500 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-center">
          Kindly Ask Randhir Kumar to Pay Complete payment to developer to make
          website live.
        </div>
      </div>

      <style jsx>{`
        @keyframes meteor {
          0% {
            transform: translateX(-100px) translateY(-100px);
            opacity: 0;
          }
          20% {
            opacity: 0.5;
          }
          100% {
            transform: translateX(100vw) translateY(100vh);
            opacity: 0;
          }
        }

        @keyframes meteor-mobile {
          0% {
            transform: translateX(-50px) translateY(-50px);
            opacity: 0;
          }
          20% {
            opacity: 0.5;
          }
          100% {
            transform: translateX(100vw) translateY(100vh);
            opacity: 0;
          }
        }

        .animate-meteor-1 {
          animation: meteor 3s linear infinite;
        }

        .animate-meteor-2 {
          animation: meteor 4s linear infinite;
          animation-delay: 0.5s;
        }

        .animate-meteor-3 {
          animation: meteor 3.5s linear infinite;
          animation-delay: 1s;
        }

        .animate-meteor-4 {
          animation: meteor 4.5s linear infinite;
          animation-delay: 1.5s;
        }

        .animate-meteor-5 {
          animation: meteor 3s linear infinite;
          animation-delay: 2s;
        }

        .animate-meteor-6 {
          animation: meteor 3.5s linear infinite;
          animation-delay: 2.5s;
        }

        @media (max-width: 640px) {
          .animate-meteor-1,
          .animate-meteor-2,
          .animate-meteor-3,
          .animate-meteor-4,
          .animate-meteor-5,
          .animate-meteor-6 {
            animation-name: meteor-mobile;
          }
        }
      `}</style>
    </div>
  );
}
