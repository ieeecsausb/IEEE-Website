import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import currentevent1 from '../assets/upcoming-events/Level-up-ITRIX.png';
import currentevent2 from '../assets/upcoming-events/paper-presentation-placeholder.jpeg';
import posterImg from '../assets/upcoming-events/PAPER presentation event poster.png';
import neonovaPast from '../assets/PAST EVENT - neonova.png';

gsap.registerPlugin(ScrollTrigger);

const Events = () => {
    const containerRef = useRef(null);
    const [selectedPoster, setSelectedPoster] = useState(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".fade-up",
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const upcomingEvents = [
        {
            id: 2,
            title: "IEEE Paper Presentation Contest 2026\nInnovating for a sustainable future",
            type: "Presentation",
            date: "Apr 11, 2026",
            location: "Department of CSE, CEG",
            description: "A platform for undergraduate students to present innovative ideas and research contributions addressing real-world challenges.\n\nEmphasizes research aligned with the United Nations Sustainable Development Goals (SDGs).",
            imgloc: currentevent2,
            registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLScpzuT5qftux0zSR_hmpYXFwXBSAHtQjfJSChZGAqQcvfkt9Q/closedform",
            status: "upcoming",
            posterDetails: posterImg
        }
    ];

    const pastEvents = [
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
            Bring your team. Bring your A-game. Let's see who makes it to the Final Lap. 🚀`,
            imgloc: currentevent1,
            status: "past"
        },
        {
            id: 3,
            title: "NEONOVA'26 — Ideathon",
            type: "Ideathon",
            date: "Feb 20, 2026",
            location: "Temenos Lab",
            description: `Where bold ideas meet real-world impact! Teams of 2–4 competed to build innovative solutions across Healthcare, Cyber Security, Responsible AI, and Sustainability — judged on creativity, feasibility, and presentation.

👥 Team Size: 2–4 Members  |  ⏰ 09:30 AM – 05:00 PM
💵 Prize Pool: ₹6,000`,
            imgloc: neonovaPast,
            status: "past"
        }
    ];

    const renderEvent = (event) => (
        <div key={event.id} className={`group relative flex flex-col md:flex-row bg-white dark:bg-ieee-dark-card rounded-2xl shadow-lg border border-gray-100 dark:border-orange-900/20 overflow-hidden md:h-[450px] w-full transform transition-[transform,box-shadow,filter] duration-500 hover:-translate-y-1 hover:shadow-2xl ${event.status === 'past' ? 'bg-gray-50/50 dark:bg-ieee-dark-card/50 grayscale-[20%] hover:grayscale-0' : ''}`}>
            {/* Image section */}
            <div className="md:w-1/3 bg-gray-200 dark:bg-ieee-dark-accent h-64 md:h-full flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                <img src={event.imgloc} alt="Event Image" className={`w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ${event.status === 'past' ? 'opacity-80' : ''}`} />
                {event.status === 'past' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] z-10 w-full h-full pointer-events-none transition-opacity duration-500 group-hover:bg-black/20">
                        <div className="bg-red-500/90 text-white font-extrabold text-xl py-2 px-6 rounded-full tracking-widest uppercase shadow-lg drop-shadow-md border-2 border-white/20 transform -rotate-12 group-hover:scale-110 transition-transform duration-300">
                            Event Over
                        </div>
                    </div>
                )}
            </div>

            {/* Text & Information section */}
            <div className="p-8 md:w-2/3 flex flex-col h-full relative">
                <div className="flex justify-between items-start mb-4 flex-shrink-0">
                    <h2 className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r transition-all duration-300 whitespace-pre-line ${event.status === 'past' ? 'from-gray-600 to-gray-500 dark:from-gray-300 dark:to-gray-400 group-hover:from-gray-800 group-hover:to-gray-600' : 'from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 group-hover:from-ieee-orange group-hover:to-orange-500'}`}>
                        {event.title}
                    </h2>
                    <span className="text-ieee-orange font-bold text-xs uppercase tracking-wider bg-orange-50 dark:bg-ieee-dark-card px-3 py-1 rounded-full border border-orange-100 dark:border-orange-900/30 ml-4 flex-shrink-0">
                        {event.type}
                    </span>
                </div>

                {/* Description */}
                <div className="relative flex-grow mb-6 overflow-hidden">
                    <div className="absolute inset-0 overflow-y-auto pr-2 custom-scrollbar">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line text-justify md:text-left">
                            {event.description}
                        </p>
                        {event.status === 'past' && (
                            <p className="mt-4 italic text-sm text-gray-400 dark:text-gray-500 font-semibold border-l-4 border-gray-300 dark:border-gray-700 pl-3">This event has already concluded.</p>
                        )}
                    </div>
                </div>

                {/* Footer Section */}
                <div className="flex justify-between items-center mt-auto border-t border-gray-100 dark:border-orange-900/20 pt-6 flex-shrink-0 z-10 relative">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400 flex flex-wrap gap-4 items-center">
                        <span className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-md border border-gray-100 dark:border-gray-700 shadow-sm">
                            <span aria-hidden="true">📅</span> {event.date}
                        </span>
                        <span className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-md border border-gray-100 dark:border-gray-700 shadow-sm">
                            <span aria-hidden="true">📍</span> {event.location}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        {event.posterDetails && (
                            <button
                                onClick={() => setSelectedPoster(event.posterDetails)}
                                className="group/btn flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-ieee-orange dark:hover:text-ieee-orange transition-all duration-300 border-b-2 border-transparent hover:border-ieee-orange"
                            >
                                <svg className="w-5 h-5 transition-transform group-hover/btn:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                View Details
                            </button>
                        )}
                        {event.status === 'past' ? (
                            <button className="px-6 py-2.5 bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full font-bold cursor-not-allowed uppercase text-sm tracking-wider shadow-inner transition-colors duration-300" disabled>
                                Closed
                            </button>
                        ) : (
                            <a href={event.registrationLink} target="_blank" rel="noopener noreferrer" className="px-8 py-2.5 bg-ieee-orange text-white rounded-full font-bold hover:bg-orange-600 transition-all shadow-md hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 inline-block cursor-pointer flex items-center gap-2">
                                Register Now 🌟
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-ieee-warm-white dark:bg-ieee-dark transition-colors duration-300" ref={containerRef}>

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-ieee-dark py-24 md:py-32 shadow-xl">
                {/* Subtle glowing background orbs */}
                <div className="absolute top-[-50%] right-[-10%] w-[80%] h-[200%] bg-ieee-orange rounded-full filter blur-[150px] opacity-[0.04] pointer-events-none"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[100%] bg-blue-500 rounded-full filter blur-[120px] opacity-[0.03] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center fade-up mt-10 md:mt-0">
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-lg">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-ieee-orange to-orange-400">Events</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                        Workshops, hackathons, and competitions that push the boundaries of innovation.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">

                {/* Upcoming Events Section */}
                <div className="mb-20 fade-up">
                    <div className="flex items-center justify-center mb-12 relative">
                        <h2 className="text-sm font-bold text-ieee-orange tracking-widest uppercase flex items-center gap-2 z-10 bg-ieee-warm-white dark:bg-ieee-dark px-6">
                            <span className="w-8 h-0.5 bg-ieee-orange"></span> Upcoming Events <span className="w-8 h-0.5 bg-ieee-orange"></span>
                        </h2>
                        <div className="absolute inset-x-0 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-ieee-orange/30 to-transparent -z-0"></div>
                    </div>
                    {upcomingEvents.length > 0 ? (
                        <div className="space-y-10">
                            {upcomingEvents.map(renderEvent)}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400 italic text-lg bg-gray-50 dark:bg-ieee-dark-card/50 py-12 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm">Stay tuned for future events!</p>
                    )}
                </div>

                {/* Past Events Section */}
                <div className="fade-up">
                    <div className="flex items-center justify-center mb-12 relative">
                        <h2 className="text-sm font-bold text-gray-400 dark:text-gray-500 tracking-widest uppercase flex items-center gap-2 z-10 bg-ieee-warm-white dark:bg-ieee-dark px-6">
                            <span className="w-8 h-0.5 bg-gray-300 dark:bg-gray-600"></span> Past Events <span className="w-8 h-0.5 bg-gray-300 dark:bg-gray-600"></span>
                        </h2>
                        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent -z-0"></div>
                    </div>
                    {pastEvents.length > 0 ? (
                        <div className="space-y-10">
                            {pastEvents.map(renderEvent)}
                        </div>
                    ) : null}
                </div>

            </div>

            {/* Event Poster Modal */}
            {selectedPoster && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-opacity duration-300" onClick={() => setSelectedPoster(null)}>
                    <div className="relative max-h-full max-w-5xl w-full flex flex-col items-center justify-center transform transition-transform duration-300 scale-100" onClick={e => e.stopPropagation()}>
                        <button
                            className="absolute -top-12 right-0 sm:-right-8 text-white/70 hover:text-white hover:rotate-90 transition-all duration-300 bg-black/20 hover:bg-black/40 rounded-full p-2"
                            onClick={() => setSelectedPoster(null)}
                            title="Close"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                        <img
                            src={selectedPoster}
                            alt="Event Poster"
                            className="max-h-[85vh] w-auto max-w-full rounded-xl shadow-2xl object-contain border border-white/10"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Events;
