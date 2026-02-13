"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Clock, ArrowRight, Calendar, MapPin } from "lucide-react";
import { getEvents, type Event } from "@/lib/api";

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");

    useEffect(() => {
        async function loadEvents() {
            const data = await getEvents();
            setEvents(data);
        }
        loadEvents();
    }, []);

    const today = new Date().toISOString().split('T')[0];
    const filteredEvents = events.filter(event =>
        filter === "upcoming" ? event.date >= today : event.date < today
    ).sort((a, b) => {
        // Ascending for upcoming, Descending for past
        return filter === "upcoming" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date);
    });

    return (
        <main className="pt-24 pb-20 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Events</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                        Explore our workshops, hackathons, and seminars designed to elevate your tech skills.
                    </p>

                    <div className="flex justify-center gap-4 bg-white p-2 rounded-full shadow-sm max-w-xs mx-auto border border-gray-100">
                        <button
                            onClick={() => setFilter("upcoming")}
                            className={`flex-1 py-2 px-6 rounded-full font-medium transition-all ${filter === "upcoming" ? "bg-primary text-white shadow-md" : "text-gray-500 hover:text-primary"}`}
                        >
                            Upcoming
                        </button>
                        <button
                            onClick={() => setFilter("past")}
                            className={`flex-1 py-2 px-6 rounded-full font-medium transition-all ${filter === "past" ? "bg-primary text-white shadow-md" : "text-gray-500 hover:text-primary"}`}
                        >
                            Past
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {filteredEvents.map((event) => (
                            <motion.div
                                key={event.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Card className="h-full flex flex-col group cursor-pointer border-gray-200 hover:border-primary/50 transition-colors">
                                    <div className={`h-48 bg-gradient-to-br ${event.imageGradient} relative overflow-hidden`}>
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-primary font-bold px-3 py-1 rounded-full text-sm shadow-md">
                                            {event.category}
                                        </div>
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 font-medium">
                                            <Calendar size={14} className="text-primary" />
                                            {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </div>
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">{event.title}</h3>
                                        <p className="text-gray-600 mb-6 flex-grow line-clamp-3 text-sm">{event.description}</p>

                                        <div className="space-y-3 mt-auto">
                                            <div className="flex items-center text-xs text-gray-500 gap-2">
                                                <Clock size={14} />
                                                <span>{event.time}</span>
                                            </div>
                                            <div className="flex items-center text-xs text-gray-500 gap-2">
                                                <MapPin size={14} />
                                                <span>{event.location}</span>
                                            </div>
                                            <div className="pt-4 border-t border-gray-100">
                                                <Button variant="ghost" size="sm" className="w-full justify-between px-0 hover:bg-transparent hover:text-primary text-primary font-semibold group-hover:px-2 transition-all">
                                                    {filter === "upcoming" ? "Register Now" : "View Details"} <ArrowRight size={16} />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredEvents.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        <p>No {filter} events found.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
