import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import EventCarousel from '../components/EventCarousel';
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



const STATS = [
    { label: 'Active Members', value: 25, suffix: '+', code: 'MBR_COUNT', icon: '◈' },
    { label: 'Yearly Events',  value: 10, suffix: '+', code: 'EVT_ANNUAL', icon: '◉' },
    { label: 'Conferences Held', value: 7, suffix: '+', code: 'CONF_HELD', icon: '◆' },
    { label: 'Years Strong',   value: 2,  suffix: '',  code: 'YRS_ACTIVE', icon: '▲' },
];

const Home = () => {
    const heroRef    = useRef(null);
    const heroImgRef = useRef(null);
    const statsRef   = useRef(null);
    const textRef    = useRef(null);
    const counterRefs = useRef([]);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(textRef.current.children,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.06, duration: 0.8, ease: "power2.out" }
        );

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

        // Stats section entrance + counter animation
        gsap.fromTo(statsRef.current,
            { opacity: 0, y: 40 },
            {
                opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
                scrollTrigger: {
                    trigger: statsRef.current,
                    start: "top 82%",
                    onEnter: () => {
                        STATS.forEach((stat, i) => {
                            const el = counterRefs.current[i];
                            if (!el) return;
                            const obj = { val: 0 };
                            gsap.to(obj, {
                                val: stat.value,
                                duration: 2,
                                ease: "power2.out",
                                delay: i * 0.12,
                                onUpdate: () => {
                                    el.textContent = Math.round(obj.val) + stat.suffix;
                                },
                            });
                        });
                    },
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
            <section className="relative py-20 overflow-hidden bg-ieee-light dark:bg-ieee-dark transition-colors duration-300">

                {/* Subtle orange dot pattern — matches site palette, very light */}
                <div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,107,53,0.08) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                }} />

                {/* Top accent line matching the site's orange */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-ieee-orange/40 to-transparent" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={statsRef}>

                    {/* Header — same style as Events section */}
                    <div className="text-center mb-14">
                        <h4 className="text-ieee-orange font-bold uppercase tracking-wider mb-2 text-sm">Our Impact</h4>
                        <h2 className="text-3xl md:text-4xl font-bold text-ieee-dark dark:text-white transition-colors duration-300">
                            By the <span className="text-ieee-orange">Numbers</span>
                        </h2>
                        <div className="w-16 h-[2px] bg-ieee-orange/40 mx-auto mt-4 rounded-full" />
                    </div>

                    {/* Stat cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                        {STATS.map((stat, i) => (
                            <div
                                key={i}
                                className="group relative bg-white dark:bg-ieee-dark-card rounded-2xl p-8 text-center
                                           border border-gray-200/60 dark:border-white/5
                                           shadow-sm hover:shadow-lg hover:-translate-y-1
                                           transition-all duration-300 overflow-hidden cursor-default"
                            >
                                {/* Subtle orange left accent bar */}
                                <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-r-full
                                               bg-ieee-orange/20 group-hover:bg-ieee-orange/70
                                               transition-colors duration-300" />

                                {/* Orange glow wash on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-ieee-orange/0 to-ieee-orange/0
                                               group-hover:from-ieee-orange/5 group-hover:to-transparent
                                               transition-all duration-500 pointer-events-none rounded-2xl" />

                                {/* Counter */}
                                <div
                                    ref={el => counterRefs.current[i] = el}
                                    className="text-5xl md:text-6xl font-extrabold text-ieee-dark dark:text-white
                                               mb-2 leading-none tracking-tight
                                               group-hover:text-ieee-orange transition-colors duration-300"
                                >
                                    0{stat.suffix}
                                </div>

                                {/* Label */}
                                <div className="text-xs font-semibold tracking-[0.18em] uppercase
                                               text-gray-400 dark:text-gray-500
                                               group-hover:text-gray-600 dark:group-hover:text-gray-300
                                               transition-colors duration-300 mt-1">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer line */}
                    <p className="text-center mt-10 text-xs font-medium tracking-[0.25em] uppercase
                                  text-gray-300 dark:text-gray-600">
                        IEEE CS · Anna University Student Branch · Est. 2023
                    </p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-ieee-orange/40 to-transparent" />
            </section>
            {/* Events Carousel */}
            <section className="py-20 bg-orange-50/30 dark:bg-ieee-dark-card transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h4 className="text-ieee-orange font-bold uppercase tracking-wider mb-2 text-center">Our Events</h4>
                    <h2 className="text-3xl md:text-4xl font-bold text-ieee-dark dark:text-ieee-white mb-10 transition-colors duration-300 text-center">The Journey So Far</h2>
                    <EventCarousel />
                </div>
            </section>
        </div>
    );
};

export default Home;

