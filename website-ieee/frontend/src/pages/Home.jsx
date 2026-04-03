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

// Circuit terminal styles
const circuitStyle = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&display=swap');

/* Light mode tokens */
:root {
  --st-bg:           #fff8f2;
  --st-cell-bg:      #ffffff;
  --st-cell-hover:   #fef3eb;
  --st-grid:         rgba(255,107,53,0.07);
  --st-number:       #1e1e1e;
  --st-label:        rgba(30,30,30,0.45);
  --st-code:         rgba(255,107,53,0.65);
  --st-corner:       rgba(255,107,53,0.55);
  --st-separator:    rgba(255,107,53,0.15);
  --st-border:       rgba(255,107,53,0.22);
  --st-footer:       rgba(255,107,53,0.35);
  --st-scan:         rgba(255,107,53,0.05);
  --st-heading:      #1e1e1e;
}

/* Dark mode tokens */
:root.dark {
  --st-bg:           #080808;
  --st-cell-bg:      #080808;
  --st-cell-hover:   #111111;
  --st-grid:         rgba(255,107,53,0.05);
  --st-number:       #ffffff;
  --st-label:        rgba(255,255,255,0.4);
  --st-code:         rgba(255,107,53,0.55);
  --st-corner:       rgba(255,107,53,0.6);
  --st-separator:    rgba(255,107,53,0.18);
  --st-border:       rgba(255,107,53,0.2);
  --st-footer:       rgba(255,107,53,0.3);
  --st-scan:         rgba(255,107,53,0.04);
  --st-heading:      #ffffff;
}

@keyframes scanLine {
  0%   { transform: translateY(-100%); }
  100% { transform: translateY(200%); }
}
@keyframes statusBlink {
  0%, 100% { opacity: 1;   box-shadow: 0 0 8px #ff6b35, 0 0 16px rgba(255,107,53,0.5); }
  50%       { opacity: 0.3; box-shadow: none; }
}
@keyframes borderPulse {
  0%, 100% { opacity: 0.15; }
  50%       { opacity: 0.45; }
}
.stat-cell            { background: var(--st-cell-bg) !important; }
.stat-cell:hover      { background: var(--st-cell-hover) !important; }
.stat-cell:hover .stat-glow-line { opacity: 1 !important; }
.stat-cell:hover .stat-number    { text-shadow: 0 0 60px rgba(255,107,53,0.6) !important; color: #ff6b35 !important; }
`;
if (typeof document !== 'undefined' && !document.getElementById('circuit-style')) {
    const el = document.createElement('style');
    el.id = 'circuit-style';
    el.textContent = circuitStyle;
    document.head.appendChild(el);
}

const STATS = [
    { label: 'Active Members', value: 40, suffix: '+', code: 'MBR_COUNT', icon: '◈' },
    { label: 'Yearly Events',  value: 10, suffix: '+', code: 'EVT_ANNUAL', icon: '◉' },
    { label: 'Projects Done',  value: 10, suffix: '+', code: 'PRJ_TOTAL',  icon: '◆' },
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

            {/* Stats Section — Circuit Terminal */}
            <section className="relative overflow-hidden" style={{ background: 'var(--st-bg)' }}>
                {/* Fine grid */}
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        linear-gradient(var(--st-grid) 1px, transparent 1px),
                        linear-gradient(90deg, var(--st-grid) 1px, transparent 1px)
                    `,
                    backgroundSize: '48px 48px',
                }} />

                {/* Slow scan-line sweep */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div style={{
                        position: 'absolute', left: 0, right: 0, height: '160px',
                        background: 'linear-gradient(180deg, transparent 0%, var(--st-scan) 50%, transparent 100%)',
                        animation: 'scanLine 8s linear infinite',
                    }} />
                </div>

                {/* Animated border top */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                    background: 'linear-gradient(90deg, transparent 0%, #ff6b35 30%, #ff6b35 70%, transparent 100%)',
                    animation: 'borderPulse 3s ease-in-out infinite',
                }} />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20" ref={statsRef}>

                    {/* Header */}
                    <div className="text-center mb-14">
                        <div style={{
                            fontFamily: "'Orbitron', monospace",
                            fontSize: '0.6rem',
                            letterSpacing: '0.6em',
                            color: 'var(--st-code)',
                            marginBottom: '10px',
                            textTransform: 'uppercase',
                        }}>
                            ── SYSTEM STATUS :: ONLINE ──
                        </div>
                        <h2 style={{
                            fontFamily: "'Orbitron', monospace",
                            fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                            fontWeight: 900,
                            color: 'var(--st-heading)',
                            letterSpacing: '0.08em',
                            lineHeight: 1.2,
                        }}>
                            BY THE <span style={{ color: '#ff6b35' }}>NUMBERS</span>
                        </h2>
                        <div style={{
                            width: '80px', height: '2px', margin: '16px auto 0',
                            background: 'linear-gradient(90deg, transparent, #ff6b35, transparent)',
                        }} />
                    </div>

                    {/* Stat grid — 1px orange separator lines */}
                    <div className="grid grid-cols-2 md:grid-cols-4" style={{
                        gap: '1px',
                        background: 'var(--st-separator)',
                        border: '1px solid var(--st-border)',
                        borderRadius: '6px',
                        overflow: 'hidden',
                    }}>
                        {STATS.map((stat, i) => (
                            <div
                                key={i}
                                className="stat-cell"
                                style={{
                                    padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1rem, 2.5vw, 2rem)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    cursor: 'default',
                                    transition: 'background 0.25s ease',
                                }}
                            >
                                {/* Corner brackets */}
                                <span style={{ position: 'absolute', top: 10, left: 10, width: 12, height: 12, borderTop: '1.5px solid var(--st-corner)', borderLeft: '1.5px solid var(--st-corner)', display: 'block' }} />
                                <span style={{ position: 'absolute', bottom: 10, right: 10, width: 12, height: 12, borderBottom: '1.5px solid var(--st-corner)', borderRight: '1.5px solid var(--st-corner)', display: 'block' }} />

                                {/* Status row */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                                    <span style={{
                                        width: 7, height: 7, borderRadius: '50%', display: 'inline-block', flexShrink: 0,
                                        background: '#ff6b35',
                                        animation: `statusBlink 2.2s ease-in-out infinite`,
                                        animationDelay: `${i * 0.5}s`,
                                    }} />
                                    <span style={{
                                        fontFamily: "'Orbitron', monospace",
                                        fontSize: '0.52rem',
                                        color: 'var(--st-code)',
                                        letterSpacing: '0.18em',
                                        textTransform: 'uppercase',
                                    }}>
                                        {stat.code}
                                    </span>
                                </div>

                                {/* Icon */}
                                <div style={{
                                    fontFamily: "'Orbitron', monospace",
                                    fontSize: '0.75rem',
                                    color: 'rgba(255,107,53,0.4)',
                                    marginBottom: 6,
                                    letterSpacing: '0.1em',
                                }}>
                                    {stat.icon}
                                </div>

                                {/* Counter */}
                                <div
                                    ref={el => counterRefs.current[i] = el}
                                    className="stat-number"
                                    style={{
                                        fontFamily: "'Orbitron', monospace",
                                        fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                                        fontWeight: 900,
                                        color: 'var(--st-number)',
                                        lineHeight: 1,
                                        textShadow: '0 0 30px rgba(255,107,53,0.15)',
                                        transition: 'color 0.3s, text-shadow 0.3s',
                                        marginBottom: 12,
                                    }}
                                >
                                    0{stat.suffix}
                                </div>

                                {/* Label */}
                                <div style={{
                                    fontFamily: "'Poppins', sans-serif",
                                    color: 'var(--st-label)',
                                    fontSize: '0.7rem',
                                    letterSpacing: '0.14em',
                                    textTransform: 'uppercase',
                                }}>
                                    {stat.label}
                                </div>

                                {/* Hover glow line at bottom */}
                                <div
                                    className="stat-glow-line"
                                    style={{
                                        position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
                                        background: 'linear-gradient(90deg, transparent, #ff6b35 40%, #ff6b35 60%, transparent)',
                                        opacity: 0,
                                        transition: 'opacity 0.3s ease',
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Footer tag line */}
                    <div style={{
                        textAlign: 'center', marginTop: 24,
                        fontFamily: "'Orbitron', monospace",
                        fontSize: '0.55rem',
                        color: 'var(--st-footer)',
                        letterSpacing: '0.4em',
                        textTransform: 'uppercase',
                    }}>
                        IEEE CS · Anna University Student Branch · Est. 2023
                    </div>
                </div>

                {/* Animated border bottom */}
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
                    background: 'linear-gradient(90deg, transparent 0%, #ff6b35 30%, #ff6b35 70%, transparent 100%)',
                    animation: 'borderPulse 3s ease-in-out infinite',
                    animationDelay: '1.5s',
                }} />
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

