"use client";

import { motion } from "framer-motion";

export const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={className}>
            <svg
                viewBox="0 0 500 150"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                {/* Yellow Circle Background */}
                <motion.circle
                    cx="75"
                    cy="75"
                    r="70"
                    fill="#FFB81C" // IEEE Gold/Yellow
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                />

                {/* Phi Symbol (Stylized) - White */}
                <motion.path
                    d="M75 125C75 125 75 135 60 135H90C75 135 75 125 75 125V25C75 25 75 15 90 15H60C75 15 75 25 75 25V125Z" // Vertical bar base
                    fill="#FFFFFF"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                />

                {/* The Loop of the Phi */}
                <motion.path
                    d="M75 45 C50 45 35 60 35 75 C35 90 50 105 75 105 C100 105 115 90 115 75 C115 60 100 45 75 45 M75 30 C110 30 130 55 130 75 C130 95 110 120 75 120 C40 120 20 95 20 75 C20 55 40 30 75 30"
                    fill="#FFFFFF"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
                />

                {/* IEEE Text */}
                <motion.text
                    x="160"
                    y="50"
                    fontFamily="Arial, sans-serif"
                    fontWeight="bold"
                    fontSize="32"
                    fill="#000000"
                    initial={{ opacity: 0, x: 180 }}
                    animate={{ opacity: 1, x: 160 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    IEEE
                </motion.text>

                {/* COMPUTER SOCIETY Text */}
                <motion.text
                    x="160"
                    y="95"
                    fontFamily="Arial, sans-serif"
                    fontWeight="900"
                    fontSize="52"
                    fill="#000000"
                    initial={{ opacity: 0, x: 180 }}
                    animate={{ opacity: 1, x: 160 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                >
                    COMPUTER
                </motion.text>
                <motion.text
                    x="160"
                    y="140"
                    fontFamily="Arial, sans-serif"
                    fontWeight="900"
                    fontSize="52"
                    fill="#000000"
                    initial={{ opacity: 0, x: 180 }}
                    animate={{ opacity: 1, x: 160 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    SOCIETY
                </motion.text>
            </svg>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center mt-2 font-bold text-gray-800 text-sm md:text-xl tracking-widest uppercase"
            >
                AU-CEG Student Branch Chapter
            </motion.div>
        </div>
    );
};
