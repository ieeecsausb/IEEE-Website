import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import ieeeLogo from '../assets/ieee-logo.png';
import teamHero from '../assets/team-hero.jpeg';

gsap.registerPlugin(ScrollTrigger);

// Ken Burns keyframe injected once
const kenBurnsStyle = `
@keyframes kenBurns {
  0%   { transform: scale(1);    }
  100% { transform: scale(1.06); }
}
.ken-burns {
  animation: kenBurns 10s ease-out forwards;
  transform-origin: center 55%;
}
`;
if (typeof document !== 'undefined' && !document.getElementById('ken-burns-style')) {
    const el = document.createElement('style');
    el.id = 'ken-burns-style';
    el.textContent = kenBurnsStyle;
    document.head.appendChild(el);
}

const Home = () => {
    const heroRef = useRef(null);
    const heroImgRef = useRef(null);
    const statsRef = useRef(null);
    const aboutRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Text reveals with a smooth cascade
        tl.fromTo(textRef.current.children,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.06, duration: 0.8, ease: "power2.out" }
        );

        // ── Parallax: hero image drifts upward as user scrolls down ──
        gsap.to(heroImgRef.current, {
            yPercent: -12,
            ease: "none",
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        });

        // Stats Animation - smoother
        gsap.fromTo(
            statsRef.current,
            { opacity: 0, y: 30 },
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
            {/* Hero Section - Team Photo Background */}
            <section className="relative h-screen flex flex-col items-center justify-start overflow-hidden" ref={heroRef}>
                {/* Background Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                        ref={heroImgRef}
                        src={teamHero}
                        alt="IEEE CS AU Team"
                        className="w-full h-full object-cover ken-burns"
                        style={{ objectPosition: 'center 55%' }}
                    />
                    {/* Top gradient for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/85 via-gray-900/35 to-transparent"></div>
                    {/* Subtle vignette — dark radial frame around edges */}
                    <div className="absolute inset-0" style={{
                        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)'
                    }}></div>
                </div>

                <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-7xl mx-auto" style={{ paddingTop: '3.5rem' }}>
                    {/* Main Title - Professional & Clean (High contrast) */}
                    <div className="text-center" ref={textRef}>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-2 drop-shadow-2xl">
                            IEEE <span className="text-ieee-orange">CS</span>
                        </h1>
                        <div className="flex flex-col items-center">
                            <h2 className="text-xl md:text-3xl font-bold text-gray-100 tracking-[0.25em] uppercase py-2 border-b-2 border-ieee-orange/80 shadow-sm">
                                Anna University
                            </h2>
                            {/* Student Branch Subtitle - Clean & Professional */}
                            <span className="text-sm md:text-base font-semibold tracking-[0.4em] text-ieee-orange uppercase mt-1 opacity-90 text-shadow-sm">
                                Student Branch
                            </span>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator - Minimal replacement for buttons */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-white/80 animate-bounce cursor-pointer">
                    <span className="text-xs uppercase tracking-widest font-medium">Scroll Down</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7" /></svg>
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
                            <div key={index} className="p-6 bg-orange-50 dark:bg-ieee-dark-card rounded-2xl shadow-sm hover:shadow-md transition-[box-shadow,border-color] duration-300 border border-transparent hover:border-ieee-orange dark:hover:border-ieee-orange group">
                                <div className="text-4xl font-bold text-ieee-dark dark:text-ieee-white mb-2 group-hover:text-ieee-orange transition-colors">{stat.value}</div>
                                <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Preview */}
            <section className="py-20 bg-orange-50/30 dark:bg-ieee-dark-card transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
                    <div className="w-full md:w-1/2 h-80 bg-orange-100/60 dark:bg-ieee-dark-accent rounded-2xl flex items-center justify-center text-gray-500 dark:text-gray-400 font-bold text-xl relative overflow-hidden group transition-colors duration-300 shadow-lg">
                        {/* Background Decor - Subtle warm gradient */}
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-15 dark:opacity-10 pointer-events-none">
                            <div className="absolute -top-[10%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-ieee-orange blur-[140px] mix-blend-multiply dark:mix-blend-screen animate-blob"></div>
                            <div className="absolute top-[50%] -left-[15%] w-[45vw] h-[45vw] rounded-full bg-orange-300 dark:bg-orange-600 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000"></div>
                            <div className="absolute -bottom-[10%] right-[20%] w-[35vw] h-[35vw] rounded-full bg-amber-200 dark:bg-orange-700 blur-[110px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-4000"></div>
                        </div>
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

