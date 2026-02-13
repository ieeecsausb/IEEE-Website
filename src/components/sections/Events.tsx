"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const events = [
    {
        title: "Web Development Workshop",
        description: "Master React & Next.js in this hands-on session.",
        date: "MAR 15",
        time: "10:00 AM - 4:00 PM",
        imageGradient: "from-orange-400 to-red-500",
    },
    {
        title: "AI/ML Bootcamp",
        description: "From theory to practice: Building your first model.",
        date: "APR 05",
        time: "9:00 AM - 5:00 PM",
        imageGradient: "from-blue-400 to-indigo-500",
    },
    {
        title: "Hackathon 2026",
        description: "Code for impact in our annual 24-hour hackathon.",
        date: "MAY 20",
        time: "Start: 6:00 PM",
        imageGradient: "from-purple-400 to-pink-500",
    },
    {
        title: "Industry Connect",
        description: "Meet tech leaders and explore career opportunities.",
        date: "JUN 10",
        time: "2:00 PM - 5:00 PM",
        imageGradient: "from-green-400 to-teal-500",
    },
];

export const Events = () => {
    return (
        <section id="events" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        UPCOMING EVENTS
                    </h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {events.map((event, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="h-full flex flex-col group cursor-pointer border-gray-200 hover:border-primary/50 transition-colors">
                                <div
                                    className={`h-48 bg-gradient-to-br ${event.imageGradient} relative overflow-hidden`}
                                >
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-primary font-bold px-3 py-1 rounded-full text-sm shadow-md">
                                        {event.date}
                                    </div>
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                                        {event.title}
                                    </h3>
                                    <p className="text-gray-600 mb-6 flex-grow">
                                        {event.description}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex items-center text-sm text-gray-500 gap-2">
                                            <Clock size={16} />
                                            <span>{event.time}</span>
                                        </div>
                                        <Button variant="ghost" size="sm" className="gap-2 px-0 hover:bg-transparent hover:text-primary text-primary font-semibold">
                                            Register <ArrowRight size={16} />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
