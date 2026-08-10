import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import teamHero from '../assets/team-hero.jpeg';
import worldWideLogo from '../assets/ieee-cs-worldwide-logo.png';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const containerRef = useRef(null);

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

    return (
        <div className="min-h-screen bg-ieee-warm-white dark:bg-ieee-dark transition-colors duration-300" ref={containerRef}>
            
            {/* Header Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-ieee-dark py-24 md:py-32 shadow-xl">
                 {/* Subtle glowing circuit-like background effect */}
                 <div className="absolute top-[-50%] right-[-10%] w-[80%] h-[200%] bg-ieee-orange rounded-full filter blur-[150px] opacity-[0.04] pointer-events-none"></div>
                 <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[100%] bg-blue-500 rounded-full filter blur-[120px] opacity-[0.03] pointer-events-none"></div>
                 
                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center fade-up mt-10 md:mt-0">
                      <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-lg">
                          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-ieee-orange to-orange-400">Us</span>
                      </h1>
                      <p className="text-lg md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                          We are a dynamic community of technologists, bridging academic excellence with real-world innovation.
                      </p>
                 </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                
                {/* Global IEEE CS Section */}
                <div className="flex flex-col lg:flex-row items-center gap-16 mb-32 fade-up">
                    <div className="lg:w-1/2 order-2 lg:order-1 flex justify-center group">
                         <div className="relative w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 transform transition-transform duration-500 group-hover:scale-105">
                             <div className="absolute inset-0 bg-gradient-to-br from-ieee-orange/10 to-transparent rounded-3xl opacity-50"></div>
                             <img src={worldWideLogo} alt="IEEE CS Worldwide" className="relative z-10 w-full object-contain filter drop-shadow-md" />
                         </div>
                    </div>
                    <div className="lg:w-1/2 order-1 lg:order-2">
                        <h2 className="text-sm font-bold text-ieee-orange tracking-widest uppercase mb-3 flex items-center gap-2">
                            <span className="w-8 h-0.5 bg-ieee-orange"></span> Global Impact
                        </h2>
                        <h3 className="text-3xl md:text-5xl font-extrabold text-ieee-dark dark:text-white mb-6 leading-tight">
                            The World's Largest Network of Computer Professionals
                        </h3>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                            The IEEE Computer Society is the premier source for information, inspiration, and collaboration in computer science and engineering. Connecting members worldwide, it empowers the people who advance technology by delivering essential technical information, networking opportunities, and career development tools.
                        </p>
                        <blockquote className="text-lg text-gray-700 dark:text-gray-400 leading-relaxed border-l-4 border-ieee-orange pl-6 py-2 italic bg-orange-50/50 dark:bg-ieee-dark-card/50 rounded-r-lg">
                            "Dedicated to the world's computer science and engineering professionals, IEEE CS is driving the future of technology."
                        </blockquote>
                    </div>
                </div>

                {/* Our Student Branch Section */}
                <div className="relative bg-white dark:bg-ieee-dark-card rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden fade-up group transition-all duration-300 hover:shadow-3xl">
                    
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 via-ieee-orange to-red-500 z-20"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative z-10">
                        {/* Content Side */}
                        <div className="p-10 md:p-16 lg:py-24 flex flex-col justify-center bg-white/90 dark:bg-ieee-dark-card/90 backdrop-blur-sm z-10">
                            <h2 className="text-sm font-bold text-ieee-orange tracking-widest uppercase mb-3 flex items-center gap-2">
                                <span className="w-8 h-0.5 bg-ieee-orange"></span> Our Chapter
                            </h2>
                            <h3 className="text-3xl md:text-4xl font-extrabold text-ieee-dark dark:text-white mb-8 leading-tight">
                                Anna University Student Branch
                            </h3>
                            <div className="space-y-6 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                <p>
                                    Operating under the IEEE Madras Section, our Student Branch Chapter is a vibrant, student-led community focused on advancing knowledge and innovation in computing.
                                </p>
                                <p>
                                    We provide a robust platform for students to hone their technical and professional skills through hands-on workshops, competitive hackathons, and collaborative open-source projects.
                                </p>
                                <p>
                                    Our core mission is to seamlessly bridge academic learning with real-world application, connecting enthusiastic students to global opportunities, industry best practices, and a network of like-minded professionals.
                                </p>
                            </div>
                            <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <span className="inline-block px-8 py-4 bg-gradient-to-r from-ieee-orange to-orange-500 text-white font-bold rounded-full shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-1 text-center">
                                    Join IEEE. Be part of IEEE CS.
                                </span>
                                <span className="text-ieee-orange font-bold tracking-wider text-xl animate-pulse">
                                    Grow with us. ✨
                                </span>
                            </div>
                        </div>

                        {/* Image Side */}
                        <div className="relative h-96 lg:h-auto overflow-hidden">
                            {/* Overlay mask for smooth text visibility on mobile */}
                            <div className="absolute inset-0 bg-gradient-to-t from-ieee-dark/80 via-transparent to-transparent z-10 lg:hidden"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-ieee-dark-card to-transparent w-1/3 z-10 hidden lg:block pointer-events-none"></div>
                            
                            <img
                                src={teamHero}
                                alt="IEEE Computer Society Team"
                                className="absolute inset-0 w-full h-full object-cover object-center transform transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;
