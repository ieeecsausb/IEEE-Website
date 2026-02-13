"use client";

import React from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";

const members = [
    { name: "Suresh Kumar", role: "President" },
    { name: "Priya Sharma", role: "Vice President" },
    { name: "Rahul Verma", role: "Technical Lead" },
    { name: "Anita Raj", role: "Design Lead" },
    { name: "Arun Patel", role: "Events Coordinator" },
    { name: "Meera Nair", role: "PR & Marketing" },
    { name: "Vikram Singh", role: "Content Lead" },
    { name: "Anjali Gupta", role: "Treasurer" },
];

export const Members = () => {
    return (
        <section id="members" className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">OUR TEAM</h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {members.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -5 }}
                            className="flex flex-col items-center group"
                        >
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 mb-4 flex items-center justify-center overflow-hidden shadow-md group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                                <User size={64} className="text-gray-50 bg-gray-400 p-2 rounded-full w-full h-full" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 group-hover:text-primary transition-colors">
                                {member.name}
                            </h3>
                            <p className="text-primary font-medium text-sm">{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
