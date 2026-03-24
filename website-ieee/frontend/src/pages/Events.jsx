import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import currentevent1 from '../assets/Level-up-ITRIX.png';

const Events = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            containerRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
        );
    }, []);
    const upcomingEvents = [
        {
            id: 1,
            title: "Level Up - ITRIX",
            type: "Tech Event",
            date: "Mar 28, 2026",
            location: "2nd floor lab, IT department",
            description: `LEVEL UP – where decision-making is as important as debugging. 💻
            30 MCQs to test your fundamentals.
            4 domains to master.
            1 final race to dominate.
            Every choice counts. Every second matters.
            Bring your team. Bring your A-game. Let’s see who makes it to the Final Lap. 🚀`,
            imgloc: currentevent1
        },
        {
            id: 2,
            title: "Paper Presentation",
            type: "Presentation",
            date: "Nov 12, 2024",
            location: "CS Lab 3",
            description: "A technical paper presentation event that provides a platform for students to present innovative ideas, research findings, and advancements in emerging technologies."
        }
    ];

    return (
        <div className="min-h-screen bg-ieee-warm-white dark:bg-ieee-dark transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24" ref={containerRef}>
                <h1 className="text-4xl font-bold text-ieee-orange mb-8 text-center">Upcoming Events</h1>
                <div className="space-y-8">
                    {upcomingEvents.map((event) => (
                        <div key={event.id} className="group relative flex flex-col md:flex-row bg-white dark:bg-ieee-dark-card rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transform hover:-translate-y-1 transition-[transform,box-shadow] duration-300 border border-gray-100 dark:border-orange-900/20">
                            <div className="md:w-1/3 bg-gray-200 dark:bg-ieee-dark-accent h-48 md:h-auto flex items-center justify-center text-gray-400 dark:text-gray-500 overflow-hidden">
                                <span className="transform group-hover:scale-110 transition-transform duration-500"><img src={event.imgloc} alt="Event Image"></img></span>
                            </div>
                            <div className="p-8 md:w-2/3 flex flex-col justify-center">
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-ieee-orange transition-colors">{event.title}</h2>
                                    <span className="text-ieee-orange font-bold text-xs uppercase tracking-wider bg-orange-50 dark:bg-ieee-dark-card px-3 py-1 rounded-full border border-orange-100 dark:border-orange-900/30">{event.type}</span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed whitespace-pre-line">
                                    {event.description}
                                </p>
                                <div className="flex justify-between items-center mt-auto border-t border-gray-100 dark:border-orange-900/20 pt-6">
                                    <div className="text-sm text-gray-500 dark:text-gray-400 flex gap-4">
                                        <span className="flex items-center gap-1">📅 {event.date}</span>
                                        <span className="flex items-center gap-1">📍 {event.location}</span>
                                    </div>
                                    <button className="px-6 py-2 bg-ieee-orange text-white rounded-full font-bold hover:bg-opacity-90 transition-opacity shadow-md hover:shadow-lg transform hover:scale-105">Register Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Events;
