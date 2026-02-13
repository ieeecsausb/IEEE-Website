"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Terminal, Users, Lightbulb } from "lucide-react";

const features = [
    {
        title: "Technical Excellence",
        description:
            "Cutting-edge workshops and hands-on coding sessions to master the latest technologies.",
        icon: Terminal,
    },
    {
        title: "Community",
        description:
            "Network with passionate tech enthusiasts, industry leaders, and like-minded innovators.",
        icon: Users,
    },
    {
        title: "Innovation",
        description:
            "Transform ideas into impactful projects through hackathons and collaborative development.",
        icon: Lightbulb,
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const About = () => {
    return (
        <section id="about" className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                        ABOUT US
                    </h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
                </motion.div>

                {/* Feature Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
                >
                    {features.map((feature, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <Card className="h-full p-8 flex flex-col items-center text-center border-t-4 border-t-transparent hover:border-t-primary transition-all duration-300">
                                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white mb-6 shadow-lg shadow-primary/20">
                                    <feature.icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Mission Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="bg-gradient-to-r from-primary-dark to-primary rounded-3xl p-8 md:p-16 text-center text-white shadow-2xl shadow-primary/30"
                >
                    <h3 className="text-2xl md:text-3xl font-bold mb-6">OUR MISSION</h3>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed opacity-90 font-medium">
                        To foster a vibrant community of computer science enthusiasts,
                        providing platforms for learning, collaboration, and innovation. We
                        bridge the gap between academic knowledge and industry requirements,
                        preparing students for successful tech careers.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
