"use client";

import React from "react";
import { motion } from "framer-motion";
// import { Whatsapp } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const ChatBot = () => {
    const handleWhatsAppClick = () => {
        const phoneNumber = "+918981323486"; // Replace with the actual phone number
        const whatsappUrl = `https://wa.me/${phoneNumber}`;
        window.open(whatsappUrl, "_blank");
    };

    return (
        <motion.div
            className="fixed bottom-5 right-5 p-2 bg-primary rounded-full shadow-lg cursor-pointer z-50"
            onClick={handleWhatsAppClick}
            whileTap={{ scale: 0.9 }}
        >
            <FaWhatsapp className="text-2xl sm:text-2xl lg:text-4xl" color="white" />
        </motion.div>
    );
};

export default ChatBot;
