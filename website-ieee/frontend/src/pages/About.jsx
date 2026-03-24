import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import teamHero from '../assets/team-hero.jpeg';

const About = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(containerRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
    }, []);

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-ieee-warm-white dark:bg-ieee-dark transition-colors duration-300">
            <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8" ref={containerRef}>
                <h1 className="text-4xl font-bold text-ieee-orange mb-8 text-center">About Us</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div className="overflow-hidden rounded-2xl shadow-md">
                        <img
                            src={teamHero}
                            alt="IEEE Computer Society Team"
                            className="h-80 w-full object-cover"
                        />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-ieee-dark dark:text-ieee-white mb-4">
                            IEEE Computer Society Student Branch Chapter
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            The IEEE Computer Society Student Branch Chapter at Anna University is a student-led community focused on advancing knowledge and innovation in computing.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Operating under the IEEE Madras Section and the global IEEE Computer Society network, we provide a platform for students to develop technical and professional skills through workshops, hackathons, and collaborative projects.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Our goal is to bridge academic learning with real-world application while connecting students to global opportunities and industry practices.
                        </p>
                        <p className="text-ieee-orange font-semibold">
                            Join IEEE. Be part of IEEE CS. Grow with us.
                        </p>
                    </div>
                </div>
                {/* Timeline and Team sections would go here */}
            </div>
        </div>
    );
};

export default About;
