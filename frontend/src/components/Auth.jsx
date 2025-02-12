import React, { useState } from "react";
import Login from "./Login"; // Import Login component
import Signup from "./Signup"; // Import Signup component
import Herobg from "../assets/Hero-bg.png"

function Auth() {
    const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup

    return (
        <div className="relative h-full bg-darkGray flex items-center justify-center px-4 w-full">
            <div
                className="absolute inset-0 bg-cover bg-center h-full flex flex-col items-center justify-center text-white z-1 bg-repeat "
                style={{
                    backgroundImage: `url(${Herobg})`,
                }}
            ></div>
            <div className="w-full max-w-md p-4 overflow-hidden transform transition duration-500 ease-in-out ">
                <div className="flex justify-center mt-2">
                    {/* Login Button */}
                    <button
                        className={`w-1/2 text-center py-2 transition-transform duration-300 ${isLogin
                                ? "border-b-4 border-lightGray text-white font-heading font-semibold scale-105"
                                : "text-gray hover:text-lightGray font-heading font-semibold"
                            }`}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    {/* Signup Button */}
                    <button
                        className={`w-1/2 text-center py-2 transition-transform duration-300 ${!isLogin
                            ? "border-b-4 border-lightGray text-white font-heading font-semibold scale-105"
                            : "text-gray hover:text-lightGray font-heading font-semibold"
                        }`}
                        onClick={() => setIsLogin(false)}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Animated Container for Login and Signup */}
                <div
                    className={`transition-all duration-500 transform ${isLogin ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
                        }`}
                >
                    {isLogin && <Login />}
                </div>
                <div
                    className={`transition-all duration-500 transform ${!isLogin ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
                        }`}
                >
                    {!isLogin && <Signup />}
                </div>
            </div>
        </div>
    );
}

export default Auth;
