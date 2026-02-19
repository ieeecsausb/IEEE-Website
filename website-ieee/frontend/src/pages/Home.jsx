import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import ieeeLogo from '../assets/ieee-logo.png';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const heroRef = useRef(null);
    const statsRef = useRef(null);
    const aboutRef = useRef(null);
    const logoRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Sleek Logo Reveal - smooth scale with gentle ease
        tl.fromTo(logoRef.current,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.2, ease: "expo.out" }
        )
            // Text reveals with a smooth cascade
            .fromTo(textRef.current.children,
                { y: 24, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.1, duration: 0.9, ease: "power2.out" },
                "-=0.6"
            )
            // CTA buttons fade in softly
            .fromTo(heroRef.current.querySelector('.hero-content'),
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
                "-=0.5"
            );

        // Stats Animation - smoother
        gsap.fromTo(
            statsRef.current,
            { opacity: 0, y: 24 },
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: statsRef.current,
                    start: "top 85%",
                },
            }
        );

        // About Preview Animation - smoother
        gsap.fromTo(
            aboutRef.current,
            { opacity: 0, x: -30 },
            {
                opacity: 1,
                x: 0,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: aboutRef.current,
                    start: "top 80%",
                },
            }
        );
    }, []);

    return (
        <div className="w-full">
            {/* Hero Section - Custom Animation Style */}
            <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-ieee-warm-white dark:bg-ieee-dark transition-colors duration-300" ref={heroRef}>
                {/* Background Decor - Subtle orange gradient */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-15 dark:opacity-10 pointer-events-none">
                    <div className="absolute -top-[10%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-ieee-orange blur-[140px] mix-blend-multiply dark:mix-blend-screen animate-blob"></div>
                    <div className="absolute top-[50%] -left-[15%] w-[45vw] h-[45vw] rounded-full bg-orange-300 dark:bg-orange-600 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-[10%] right-[20%] w-[35vw] h-[35vw] rounded-full bg-orange-200 dark:bg-orange-700 blur-[110px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-4000"></div>
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
                    {/* Animated Logo Container */}
                    <div className="mb-8 relative" ref={logoRef}>
                        <div className="absolute inset-0 bg-ieee-orange rounded-full blur-3xl opacity-25 dark:opacity-35 scale-[1.8]"></div>
                        <img src={ieeeLogo} alt="IEEE Logo" className="h-32 md:h-48 w-auto relative z-10 drop-shadow-2xl" />
                    </div>

                    {/* Animated Text */}
                    <div className="text-center" ref={textRef}>
                        <h1 className="text-5xl md:text-8xl font-bold text-ieee-dark dark:text-ieee-white tracking-tight mb-2">
                            IEEE <span className="text-ieee-orange">CS</span>
                        </h1>
                        <h2 className="text-2xl md:text-5xl font-bold text-gray-600 dark:text-gray-300 tracking-widest uppercase mb-6">
                            Anna University
                        </h2>
                    </div>

                    {/* Hero Content / CTA */}
                    <div className="hero-content mt-8 flex flex-col sm:flex-row gap-4 opacity-0">
                        <Link to="/contact" className="px-8 py-3 bg-ieee-orange text-white font-bold rounded-full hover:bg-opacity-90 transition-transform transform hover:scale-105 shadow-lg">
                            Join Our Chapter
                        </Link>
                        <Link to="/events" className="px-8 py-3 bg-white dark:bg-ieee-dark-card text-ieee-dark dark:text-ieee-white border border-gray-200 dark:border-orange-900/30 font-bold rounded-full hover:bg-gray-50 dark:hover:bg-ieee-dark-accent transition-transform transform hover:scale-105 shadow-md">
                            Upcoming Events
                        </Link>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce dark:text-white text-ieee-dark">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-ieee-warm-white dark:bg-ieee-dark transition-colors duration-300 border-t border-gray-100 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center" ref={statsRef}>
                        {[
                            { label: 'Active Members', value: '500+' },
                            { label: 'Yearly Events', value: '50+' },
                            { label: 'Projects Built', value: '25+' },
                            { label: 'Legacy Years', value: '15' },
                        ].map((stat, index) => (
                            <div key={index} className="p-6 bg-ieee-light dark:bg-ieee-dark-card rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-ieee-orange dark:hover:border-ieee-orange group">
                                <div className="text-4xl font-bold text-ieee-dark dark:text-ieee-white mb-2 group-hover:text-ieee-orange transition-colors">{stat.value}</div>
                                <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Preview */}
            <section className="py-20 bg-gray-50 dark:bg-ieee-dark-card transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
                    <div className="w-full md:w-1/2 h-80 bg-gray-300 dark:bg-ieee-dark-accent rounded-2xl flex items-center justify-center text-gray-500 dark:text-gray-400 font-bold text-xl relative overflow-hidden group transition-colors duration-300 shadow-lg">
                        About Image
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-500"></div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-ieee-orange rounded-full opacity-20 blur-2xl"></div>
                    </div>
                    <div className="w-full md:w-1/2" ref={aboutRef}>
                        <h4 className="text-ieee-orange font-bold uppercase tracking-wider mb-2">About Us</h4>
                        <h2 className="text-3xl md:text-4xl font-bold text-ieee-dark dark:text-ieee-white mb-6 transition-colors duration-300">Innovating for Humanity</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed transition-colors duration-300">
                            The IEEE Computer Society Anna University Chapter is a vibrant community of innovators, thinkers, and builders. We bridge the gap between academic learning and industry demands through hands-on technical workshops, hackathons, and collaborative projects.
                        </p>
                        <Link to="/about" className="text-ieee-dark dark:text-ieee-white font-bold hover:text-ieee-orange dark:hover:text-ieee-orange text-lg inline-flex items-center transition-colors">
                            Discover Our Mission
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
