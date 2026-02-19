import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const Events = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(containerRef.current.children,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0 }
        );
    }, []);

    return (
        <div className="min-h-screen bg-ieee-warm-white dark:bg-ieee-dark transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <h1 className="text-4xl font-bold text-ieee-orange mb-8 text-center">Upcoming Events</h1>
                <div className="space-y-8" ref={containerRef}>
                    {[1, 2, 3].map((event) => (
                        <div key={event} className="group relative flex flex-col md:flex-row bg-white dark:bg-ieee-dark-card rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-orange-900/20">
                            <div className="md:w-1/3 bg-gray-200 dark:bg-ieee-dark-accent h-48 md:h-auto flex items-center justify-center text-gray-400 dark:text-gray-500 overflow-hidden">
                                <span className="transform group-hover:scale-110 transition-transform duration-500">Event Image</span>
                            </div>
                            <div className="p-8 md:w-2/3 flex flex-col justify-center">
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-ieee-orange transition-colors">Tech Symposium 2023</h2>
                                    <span className="text-ieee-orange font-bold text-xs uppercase tracking-wider bg-orange-50 dark:bg-ieee-dark-card px-3 py-1 rounded-full border border-orange-100 dark:border-orange-900/30">Workshop</span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                    Join us for an immersive workshop on the latest industry trends. Guest speakers from top tech companies will share their insights.
                                </p>
                                <div className="flex justify-between items-center mt-auto border-t border-gray-100 dark:border-orange-900/20 pt-6">
                                    <div className="text-sm text-gray-500 dark:text-gray-400 flex gap-4">
                                        <span className="flex items-center gap-1">📅 Oct 25, 2023</span>
                                        <span className="flex items-center gap-1">📍 Main Auditorium</span>
                                    </div>
                                    <button className="px-6 py-2 bg-ieee-orange text-white rounded-full font-bold hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg transform hover:scale-105">Register Now</button>
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
