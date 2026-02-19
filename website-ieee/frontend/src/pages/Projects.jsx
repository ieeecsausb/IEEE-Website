import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const Projects = () => {
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
                <h1 className="text-4xl font-bold text-ieee-orange mb-8 text-center">Our Projects</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={containerRef}>
                    {[1, 2, 3, 4, 5, 6].map((project) => (
                        <div key={project} className="group bg-white dark:bg-ieee-dark-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100 dark:border-orange-900/20">
                            <div className="h-56 bg-gray-200 dark:bg-ieee-dark-accent overflow-hidden flex items-center justify-center text-gray-400 dark:text-gray-500 relative">
                                <span className="relative z-10 font-medium">Project Image</span>
                                <div className="absolute inset-0 bg-ieee-orange opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-ieee-orange uppercase tracking-wider">Hardware</span>
                                    <span className="text-xs text-gray-400 dark:text-gray-500">2023</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-ieee-orange transition-colors">Smart IoT System</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">
                                    An automated system for monitoring environmental conditions using IoT sensors.
                                </p>
                                <a href="#" className="inline-flex items-center text-ieee-orange font-bold hover:underline text-sm group-hover:translate-x-1 transition-transform">
                                    View on GitHub
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;
