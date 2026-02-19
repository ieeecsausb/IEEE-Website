import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const About = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(containerRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
    }, []);

    return (
        <div className="min-h-screen bg-ieee-warm-white dark:bg-ieee-dark transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" ref={containerRef}>
                <h1 className="text-4xl font-bold text-ieee-orange mb-8 text-center pt-20">About Us</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="h-64 bg-gray-200 dark:bg-ieee-dark-accent rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400">
                        About Image Placeholder
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-ieee-dark dark:text-ieee-white mb-4">What is IEEE?</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            IEEE is the world's largest technical professional organization dedicated to advancing technology for the benefit of humanity.
                        </p>
                        <h2 className="text-2xl font-bold text-ieee-dark dark:text-ieee-white mb-4">Our Vision</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            To be essential to the global technical community and to technical professionals everywhere, and to be universally recognized for the contributions of technology and of technical professionals in improving global conditions.
                        </p>
                    </div>
                </div>
                {/* Timeline and Team sections would go here */}
            </div>
        </div>
    );
};

export default About;
