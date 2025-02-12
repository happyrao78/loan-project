"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Bot, X, Mic } from 'lucide-react';
import { Forward } from 'lucide-react';

const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleSendMessage = async (message) => {
        setMessages((prev) => [...prev, { text: message, isUser: true }]);
        setInputValue("");

        // Call backend API for response
        try {
            const response = await axios.post('https://krishna-full-stack-tjyc.vercel.app/ask-question', {
                question: message,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const botMessage = response.data.answer;  // Text response from the bot
            const audioUrl = response.data.audioUrl;  // Audio URL from the TTS

            // Set the bot's text response in the messages
            setMessages((prev) => [...prev, { text: botMessage, isUser: false }]);

            // Play the audio response automatically if the audio URL is available
            if (audioUrl) {
                const audio = new Audio(audioUrl);
                audio.play().catch((error) => {
                    console.error("Audio playback failed:", error);
                });
            }

        } catch (error) {
            console.error("Error fetching response:", error);
            setMessages((prev) => [...prev, { text: "Please try again !", isUser: false }]);
        }
    };

    const handleVoiceInput = () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "en-US";
        recognition.start();

        recognition.onresult = (event) => {
            const speech = event.results[0][0].transcript;
            handleSendMessage(speech);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
        };
    };

    return (
        <div>
            {/* Chatbot Icon */}
            <motion.div
                className={`chatbot-icon fixed bottom-5 right-5 p-3 bg-black rounded-full shadow-lg cursor-pointer z-50 ${isOpen ? "hidden" : "block"}`}
                onClick={() => setIsOpen(true)}
                whileTap={{ scale: 0.9 }}
            >
                <Bot size={34} color="white" />
            </motion.div>

            {/* Chatbot Popup */}
            {isOpen && (
                <div className="chatbot-container p-4 bg-white border rounded-lg shadow-lg fixed bottom-5 right-5 w-90 max-h-[80vh] flex flex-col z-50">
                    <div className="flex justify-between items-center mb-2 font-body">
                        <h2 className="text-md lg:text-xl font-heading font-semibold ">Chatbot</h2>
                        <button onClick={() => setIsOpen(false)} className="">
                            <X size={20} />
                        </button>
                    </div>
                    <div className="messages flex-grow mb-4 overflow-y-auto font-body text-sm">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.isUser ? "text-right" : "text-left"} mb-2`}
                            style={{ maxWidth: "85%", width: "300px" }} >
                                <span className={`inline-block p-2 rounded-lg ${msg.isUser ? "bg-black text-white " : "bg-lightGray text-black "} whitespace-normal break-words max-w-[90%]`}
                                style={{ wordWrap: "break-word", whiteSpace: "normal" }}
                                >
                                    {msg.text}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="input-group flex font-body text-sm">
                        <input
                            type="text"
                            className="flex-grow border rounded-l-lg p-2 font-body "
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type a message..."
                        />
                        <button
                            className="bg-gradient text-black rounded-r-lg px-4 border "
                            onClick={() => handleSendMessage(inputValue)}
                        >
                            <Forward size={18} color="black" />
                        </button>
                        <button
                            className="ml-2 bg-gradient text-black rounded-lg p-2 border"
                            onClick={handleVoiceInput}
                        >
                            <Mic size={18} color="black" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBot;