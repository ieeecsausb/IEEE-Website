"use client";

import React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Instagram } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
            <div className="container mx-auto px-6 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-primary font-bold">
                        CS
                    </div>
                    <span className="font-bold text-xl">IEEE CS AU-CEG</span>
                </div>

                <p className="text-gray-400 mb-8 text-center max-w-md">
                    Building tomorrow's tech leaders through innovation, collaboration,
                    and code.
                </p>

                <div className="flex gap-6 mb-8">
                    {[Linkedin, Instagram, Github, Mail].map((Icon, idx) => (
                        <Link
                            key={idx}
                            href="#"
                            className="text-gray-400 hover:text-primary transition-colors transform hover:scale-110"
                        >
                            <Icon size={24} />
                        </Link>
                    ))}
                </div>

                <div className="w-full h-px bg-gray-800 mb-8" />

                <p className="text-gray-500 text-sm">
                    © {new Date().getFullYear()} IEEE Computer Society AU-CEG Student
                    Branch Chapter. All rights reserved.
                </p>
            </div>
        </footer>
    );
};
