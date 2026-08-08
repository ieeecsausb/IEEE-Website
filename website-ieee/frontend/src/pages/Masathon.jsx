/* ============================================================
   MASATHON — Game Development Hackathon
   IEEE Computer Society Student Branch, CEG · Anna University

   A side-scrolling, fully playable event page. Every block can be
   hit, every Goomba can be stomped, every pipe warps you somewhere.
   ============================================================ */

import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/masathon.css';
import posterImg from '../assets/upcoming-events/masathon-poster.png';
import {
    PixelSprite,
    MARIO_STAND,
    MARIO_RUN_CYCLE,
    MARIO_JUMP,
    GOOMBA,
    COIN,
    MUSHROOM,
    ONEUP,
    STAR,
    FLOWER,
    QBLOCK,
    USEDBLOCK,
    BRICK,
    BRICK_TILE,
    PixelCloud,
    PixelHill,
    PixelBush,
    PixelPipe,
    PixelCastle,
    PixelFlagpole,
} from '../components/masathon/PixelArt';
import { useChiptune } from '../components/masathon/useChiptune';

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   EVENT DATA  (placeholder content — swap for the real details)
   ============================================================ */

const EVENT_START = new Date('2026-09-12T09:00:00+05:30');
const REGISTER_URL = 'https://forms.gle/masathon-2026-placeholder';

const WARP_PIPES = [
    { id: 'tracks', label: 'TRACKS', world: '1-1', h: 150 },
    { id: 'blocks', label: 'INTEL', world: '1-2', h: 190 },
    { id: 'schedule', label: 'LEVELS', world: '1-3', h: 230 },
    { id: 'prizes', label: 'PRIZES', world: '1-4', h: 190 },
    { id: 'register', label: 'ENTER', world: '1-C', h: 150 },
];

const TRACKS = [
    {
        tag: 'AI',
        height: 340,
        title: 'AI-Powered Gameplay',
        blurb:
            'Enemies that learn your habits. Levels that build themselves. Bosses that adapt mid-fight. Make the machine an opponent worth beating.',
        ideas: ['Procedural level generation', 'Adaptive difficulty', 'NPCs with real memory'],
        color: '#ff2bd1',
    },
    {
        tag: 'VR',
        height: 200,
        title: 'Virtual Worlds',
        blurb:
            'Twelve hours of runtime, one headset, and a world nobody has stood inside before. Build somewhere people will not want to leave.',
        ideas: ['Room-scale puzzles', 'Physics playgrounds', 'Motion-comfort design'],
        color: '#7b5cff',
    },
    {
        tag: 'AR',
        height: 270,
        title: 'Augmented Reality',
        blurb:
            'The pitch outside Vivek Auditorium is a racetrack. The staircase is a dungeon. Paint your game on top of the campus.',
        ideas: ['Marker-based play', 'Location questing', 'Shared multiplayer AR'],
        color: '#00e5ff',
    },
];

const FACTS = [
    { k: 'PRIZE POOL', v: '₹40,000', s: 'Split across the top three teams', coins: 200 },
    { k: 'VENUE', v: 'Vivek Auditorium', s: 'CEG Campus, Anna University', coins: 200 },
    { k: 'DURATION', v: '24 HOURS', s: 'Sat 09:00 → Sun 09:00', coins: 200 },
    { k: 'TEAM SIZE', v: '2 – 4', s: 'Solo entries get matched on-site', coins: 200 },
    { k: 'ENTRY FEE', v: '₹150 / head', s: '₹100 for IEEE members', coins: 200 },
    { k: 'SEATS', v: '40 TEAMS', s: 'Shortlisted from the idea round', coins: 1000 },
];

const SCHEDULE = [
    { t: '08:00', d: 'DAY 1', title: 'Check-In', body: 'Badges, team verification, and a free breakfast that is better than it needs to be.', icon: 'coin' },
    { t: '09:00', d: 'DAY 1', title: 'Opening Ceremony', body: 'Rules, judging criteria, and the problem statement drop. Do not be late for this one.', icon: 'flag' },
    { t: '10:00', d: 'DAY 1', title: 'Hacking Begins', body: 'Engines fire up. Unity, Unreal, Godot, Bevy — whatever gets you to a build.', icon: 'star' },
    { t: '14:00', d: 'DAY 1', title: 'Mentor Round 1', body: 'Studio devs walk the floor. Bring your scope problems, not your bugs.', icon: 'mushroom' },
    { t: '20:00', d: 'DAY 1', title: 'Asset Jam', body: 'Surprise mini-challenge. Ship a working mechanic in 60 minutes for bonus points.', icon: 'flower' },
    { t: '00:00', d: 'NIGHT', title: 'Midnight Checkpoint', body: 'Playable vertical slice due. Caffeine, pizza, and a leaderboard reveal.', icon: 'coin' },
    { t: '06:00', d: 'DAY 2', title: 'Final Build Lock', body: 'Repos freeze. Whatever compiles is what you demo. No exceptions.', icon: 'flag' },
    { t: '09:00', d: 'DAY 2', title: 'Demo Runs', body: 'Six minutes on the big screen. Judges play it themselves — make it obvious.', icon: 'star' },
    { t: '12:00', d: 'DAY 2', title: 'Course Clear', body: 'Awards, prize handover, and the group photo nobody is ready for.', icon: 'castle' },
];

const PRIZES = [
    { place: '2ND', amount: '₹12,000', sprite: MUSHROOM, h: 150, extra: 'Runner-up trophy + swag crate', color: '#c0c0c0' },
    { place: '1ST', amount: '₹20,000', sprite: STAR, h: 230, extra: 'Champion trophy + mentorship at a partner studio', color: '#fbd000' },
    { place: '3RD', amount: '₹8,000', sprite: FLOWER, h: 110, extra: 'Bronze trophy + swag crate', color: '#cd7f32' },
];

const BONUS_PRIZES = [
    { title: 'Best Art Direction', amount: 'Drawing tablet', note: 'Judged on visual identity alone.' },
    { title: 'Best Sound Design', amount: 'Studio headphones', note: 'Original audio only — no stock loops.' },
    { title: 'Wildcard Pick', amount: '₹2,000', note: "The judges' most-played build of the night." },
];

const RULES = [
    'Teams of 2 to 4. Every member must be a currently enrolled student with a valid ID.',
    'All code and art must be written during the 24 hours. Engines, libraries and free asset packs are fine — declare them.',
    'Pre-built game logic from an older project is not allowed. Boilerplate and setup scripts are.',
    'AI coding assistants are permitted, but you must be able to explain every line you ship.',
    'Your build must run on the venue machines: Windows 11, 16 GB RAM, mid-range GPU. Test early.',
    'One submission per team: a playable build, a public repo, and a 90-second gameplay video.',
    'Judging is 30% originality, 25% technical execution, 25% playability, 20% presentation.',
    "The organisers' decision is final. Be decent to each other and to the venue.",
];

const FAQ = [
    { q: 'Do I need a team before registering?', a: 'No. Register solo and we will run a team-matching session 30 minutes before the opening ceremony.' },
    { q: 'Which engine should I use?', a: 'Any of them. Unity, Unreal, Godot, Bevy, LOVE, or raw WebGL. Judges care about the game, not the toolchain.' },
    { q: 'Is VR/AR hardware provided?', a: 'We have 6 headsets and 4 AR-capable tablets on rotation. Bring your own if you can — slots are first come, first served.' },
    { q: 'Can first-years participate?', a: 'Yes, and roughly a third of last year’s finalists were first-years. Come anyway.' },
    { q: 'What about food and sleep?', a: 'Four meals, unlimited coffee, and a quiet room with mats. Sleep is a strategy, not a weakness.' },
    { q: 'How do I get the entry fee back if I cannot make it?', a: 'Full refund up to 72 hours before the event. After that we have already ordered your pizza.' },
];

const JUDGES = [
    { name: 'A. RAMANATHAN', role: 'Senior Gameplay Engineer', org: 'Studio placeholder', hue: 0 },
    { name: 'K. MEENAKSHI', role: 'Technical Art Director', org: 'Studio placeholder', hue: 90 },
    { name: 'D. SURYA', role: 'XR Research Lead', org: 'Lab placeholder', hue: 200 },
    { name: 'P. NANDHINI', role: 'Indie Founder & Designer', org: 'Studio placeholder', hue: 290 },
];

const SPONSORS = ['TITLE SPONSOR', 'ENGINE PARTNER', 'CLOUD PARTNER', 'SWAG PARTNER', 'FOOD PARTNER', 'MEDIA PARTNER'];

const ICON_MAP = { coin: COIN, flag: STAR, star: STAR, mushroom: MUSHROOM, flower: FLOWER, castle: ONEUP };

/* ============================================================
   SMALL PIECES
   ============================================================ */

function Mario({ size = 96, running = true, jumping = false, flip = false, className = '', style }) {
    const [frame, setFrame] = useState(0);
    useEffect(() => {
        if (!running || jumping) return undefined;
        const id = setInterval(() => setFrame((v) => (v + 1) % MARIO_RUN_CYCLE.length), 95);
        return () => clearInterval(id);
    }, [running, jumping]);
    const map = jumping ? MARIO_JUMP : running ? MARIO_RUN_CYCLE[frame] : MARIO_STAND;
    return (
        <PixelSprite map={map} flip={flip} className={className} style={{ width: size * 0.75, height: size, ...style }} />
    );
}

function Ground({ height = 96, topHeight = 16 }) {
    return (
        <div className="absolute bottom-0 left-0 w-full pointer-events-none select-none">
            <div className="ma-ground-top w-full" style={{ height: topHeight }} />
            <div className="ma-ground w-full" style={{ height }} />
        </div>
    );
}

function Goomba({ left, range = 200, duration = 9, size = 54, onStomp, bottom = 106 }) {
    const [dead, setDead] = useState(false);
    const stomp = (e) => {
        if (dead) return;
        setDead(true);
        onStomp?.(e);
        setTimeout(() => setDead(false), 5200);
    };
    return (
        <div
            className="ma-patrol absolute"
            style={{ left, bottom, ['--range']: `${range}px`, animationDuration: `${duration}s`, zIndex: 5 }}
        >
            <button
                type="button"
                onClick={stomp}
                aria-label="Stomp the Goomba"
                className={dead ? 'ma-squish' : 'ma-waddle'}
                style={{ display: 'block', background: 'none', border: 0, padding: 0, cursor: 'pointer', transformOrigin: 'bottom center' }}
            >
                <PixelSprite map={GOOMBA} style={{ width: size, height: size }} />
            </button>
        </div>
    );
}

/** A ? block that bumps, pops a coin, then turns into a used block. */
function QBlock({ size = 76, hit, onHit, floating = true, invisible = false, ariaLabel }) {
    const [bump, setBump] = useState(false);
    const click = (e) => {
        setBump(true);
        setTimeout(() => setBump(false), 300);
        onHit?.(e);
    };
    return (
        <button
            type="button"
            onClick={click}
            aria-label={ariaLabel || 'Hit the block'}
            className={bump ? 'ma-bump' : floating ? 'ma-bob-sm' : ''}
            style={{
                display: 'block',
                background: 'none',
                border: 0,
                padding: 0,
                cursor: 'pointer',
                width: size,
                height: size,
                opacity: invisible && !hit ? 0 : 1,
            }}
        >
            <PixelSprite map={hit ? USEDBLOCK : QBLOCK} style={{ width: size, height: size }} />
        </button>
    );
}

/** A brick that shatters into four spinning shards. */
function BrickBlock({ size = 72, broken, onBreak, label }) {
    const [shards, setShards] = useState(false);
    const click = (e) => {
        if (broken) return;
        setShards(true);
        onBreak?.(e);
        setTimeout(() => setShards(false), 800);
    };
    const shardStyles = [
        { '--dx': '-70px', '--dy': '110px', '--rot': '-320deg' },
        { '--dx': '70px', '--dy': '110px', '--rot': '320deg' },
        { '--dx': '-52px', '--dy': '-60px', '--rot': '-200deg' },
        { '--dx': '52px', '--dy': '-60px', '--rot': '200deg' },
    ];
    return (
        <div style={{ position: 'relative', width: size, height: size }}>
            {!broken && (
                <button
                    type="button"
                    onClick={click}
                    aria-label={label ? `Smash brick: ${label}` : 'Smash the brick'}
                    style={{ display: 'block', background: 'none', border: 0, padding: 0, cursor: 'pointer', width: size, height: size }}
                >
                    <PixelSprite map={BRICK} style={{ width: size, height: size }} />
                </button>
            )}
            {shards &&
                shardStyles.map((s, i) => (
                    <PixelSprite
                        key={i}
                        map={BRICK}
                        className="ma-shard"
                        style={{ position: 'absolute', left: size / 4, top: size / 4, width: size / 2, height: size / 2, ...s }}
                    />
                ))}
        </div>
    );
}

/* ============================================================
   PAGE
   ============================================================ */

export default function Masathon() {
    const { play, muted, toggleMute } = useChiptune();
    const rootRef = useRef(null);
    const heroRef = useRef(null);
    const cloudsFarRef = useRef(null);
    const cloudsNearRef = useRef(null);
    const hillsRef = useRef(null);

    const [coins, setCoins] = useState(0);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [fx, setFx] = useState([]);
    const [warp, setWarp] = useState(null);
    const [hitBlocks, setHitBlocks] = useState({});
    const [brokenBricks, setBrokenBricks] = useState({});
    const [flagDown, setFlagDown] = useState(false);
    const [cleared, setCleared] = useState(false);
    const [lightbox, setLightbox] = useState(false);
    const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0, s: 0 });
    const [heroJump, setHeroJump] = useState(false);

    /* ---------------- countdown ---------------- */
    useEffect(() => {
        const tick = () => {
            const diff = Math.max(0, EVENT_START.getTime() - Date.now());
            setCountdown({
                d: Math.floor(diff / 86400000),
                h: Math.floor((diff / 3600000) % 24),
                m: Math.floor((diff / 60000) % 60),
                s: Math.floor((diff / 1000) % 60),
            });
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    /* ---------------- floating fx layer ---------------- */
    const spawnFx = useCallback((e, text, sprite = COIN) => {
        const x = e?.clientX ?? window.innerWidth / 2;
        const y = e?.clientY ?? window.innerHeight / 2;
        const id = `${Date.now()}-${Math.random()}`;
        setFx((prev) => [...prev, { id, x, y, text, sprite }]);
        setTimeout(() => setFx((prev) => prev.filter((f) => f.id !== id)), 1000);
    }, []);

    const award = useCallback(
        (e, { coins: c = 1, points = 200, text, sprite, sound = 'coin' } = {}) => {
            play(sound);
            if (c) setCoins((v) => Math.min(99, v + c));
            setScore((v) => v + points);
            spawnFx(e, text ?? `${points}`, sprite);
        },
        [play, spawnFx],
    );

    /* ---------------- warp navigation ---------------- */
    const warpTo = useCallback(
        (id) => {
            play('warp');
            setWarp('close');
            window.setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' });
                setWarp('open');
                window.setTimeout(() => setWarp(null), 420);
            }, 400);
        },
        [play],
    );

    /* ---------------- parallax ---------------- */
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (cloudsFarRef.current) {
                gsap.to(cloudsFarRef.current, {
                    yPercent: 28,
                    ease: 'none',
                    scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
                });
            }
            if (cloudsNearRef.current) {
                gsap.to(cloudsNearRef.current, {
                    yPercent: 55,
                    ease: 'none',
                    scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
                });
            }
            if (hillsRef.current) {
                gsap.to(hillsRef.current, {
                    yPercent: -12,
                    ease: 'none',
                    scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
                });
            }
            gsap.utils.toArray('.ma-reveal').forEach((el) => {
                gsap.fromTo(
                    el,
                    { opacity: 0, y: 42 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: 'steps(6)',
                        scrollTrigger: { trigger: el, start: 'top 88%' },
                    },
                );
            });
        }, rootRef);
        return () => ctx.revert();
    }, []);

    /* ---------------- hero mouse parallax ---------------- */
    useEffect(() => {
        const hero = heroRef.current;
        if (!hero) return undefined;
        const move = (e) => {
            const r = hero.getBoundingClientRect();
            const dx = (e.clientX - r.width / 2) / r.width;
            const dy = (e.clientY - r.height / 2) / r.height;
            gsap.to(cloudsNearRef.current, { x: dx * 34, y: dy * 14, duration: 0.7, overwrite: true });
            gsap.to(cloudsFarRef.current, { x: dx * 16, y: dy * 7, duration: 0.9, overwrite: true });
        };
        hero.addEventListener('mousemove', move);
        return () => hero.removeEventListener('mousemove', move);
    }, []);

    /* ---------------- handlers ---------------- */
    const hitFact = (i, e) => {
        if (hitBlocks[`f${i}`]) {
            play('bump');
            return;
        }
        setHitBlocks((p) => ({ ...p, [`f${i}`]: true }));
        award(e, { coins: 1, points: FACTS[i].coins, text: `${FACTS[i].coins}` });
    };

    const hitHeroBlock = (i, e) => {
        const key = `h${i}`;
        if (hitBlocks[key]) {
            play('bump');
            return;
        }
        setHitBlocks((p) => ({ ...p, [key]: true }));
        if (i === 2) {
            play('powerup');
            setScore((v) => v + 1000);
            spawnFx(e, '1000', MUSHROOM);
        } else {
            award(e, { coins: 1, points: 200 });
        }
    };

    const hitSecret = (e) => {
        if (hitBlocks.secret) {
            play('bump');
            return;
        }
        setHitBlocks((p) => ({ ...p, secret: true }));
        play('oneup');
        setLives((v) => Math.min(9, v + 1));
        setScore((v) => v + 5000);
        spawnFx(e, '1-UP', ONEUP);
    };

    const smashFaq = (i, e) => {
        setBrokenBricks((p) => ({ ...p, [i]: true }));
        play('break');
        setScore((v) => v + 50);
        spawnFx(e, '50', BRICK);
    };

    const touchFlagpole = () => {
        if (flagDown) return;
        setFlagDown(true);
        play('flag');
        window.setTimeout(() => {
            setCleared(true);
            play('clear');
            setScore((v) => v + 5000);
        }, 1350);
    };

    const stompGoomba = (e) => {
        play('stomp');
        setScore((v) => v + 100);
        spawnFx(e, '100', GOOMBA);
    };

    const pad = (n, l = 2) => String(n).padStart(l, '0');

    /* ============================================================ */
    return (
        <div ref={rootRef} className="ma-root">
            {/* ═══════════════ WARP OVERLAY ═══════════════ */}
            <div
                className={`ma-warp-overlay ${warp === 'close' ? 'ma-iris-close' : warp === 'open' ? 'ma-iris-open' : ''}`}
                style={{ display: warp ? 'block' : 'none' }}
            />

            {/* ═══════════════ FLOATING FX ═══════════════ */}
            <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 70 }}>
                {fx.map((f) => (
                    <div key={f.id} style={{ position: 'absolute', left: f.x, top: f.y }}>
                        <PixelSprite
                            map={f.sprite || COIN}
                            className="ma-coin-pop"
                            style={{ position: 'absolute', width: 28, height: 34, left: 0, top: 0 }}
                        />
                        <span
                            className="ma-score-float ma-shadow-text"
                            style={{ position: 'absolute', left: 0, top: -6, fontSize: 13, color: '#fff', whiteSpace: 'nowrap' }}
                        >
                            {f.text}
                        </span>
                    </div>
                ))}
            </div>

            {/* ═══════════════ HUD ═══════════════ */}
            <div
                className="fixed left-0 w-full"
                style={{ top: 64, zIndex: 55, background: 'rgba(0,0,0,0.86)', borderBottom: '4px solid #fbd000' }}
            >
                <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex items-center justify-between gap-2 sm:gap-6 overflow-x-auto ma-hide-scroll">
                    <div className="flex items-center gap-1.5 shrink-0">
                        <span style={{ fontSize: 9, color: '#fbd000' }}>MASATHON</span>
                        <span style={{ fontSize: 11, color: '#fff' }}>{pad(score, 6)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                        <PixelSprite map={COIN} className="ma-coin-spin" style={{ width: 14, height: 18 }} />
                        <span style={{ fontSize: 11, color: '#fff' }}>&times;{pad(coins)}</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-1.5 shrink-0">
                        <PixelSprite map={MARIO_STAND} style={{ width: 13, height: 18 }} />
                        <span style={{ fontSize: 11, color: '#fff' }}>&times;{lives}</span>
                    </div>
                    <div className="flex flex-col items-center shrink-0">
                        <span style={{ fontSize: 8, color: '#fbd000' }}>WORLD</span>
                        <span style={{ fontSize: 11, color: '#fff' }}>9-26</span>
                    </div>
                    <div className="flex flex-col items-center shrink-0">
                        <span style={{ fontSize: 8, color: '#fbd000' }}>TIME</span>
                        <span style={{ fontSize: 11, color: '#fff' }}>{pad(countdown.d, 3)}</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            toggleMute();
                            play('select');
                        }}
                        className="shrink-0"
                        style={{
                            fontFamily: 'inherit',
                            fontSize: 8,
                            padding: '5px 9px',
                            background: muted ? '#555' : '#43b047',
                            color: '#fff',
                            border: '3px solid #000',
                            cursor: 'pointer',
                        }}
                    >
                        {muted ? 'SFX OFF' : 'SFX ON'}
                    </button>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════
                HERO — TITLE SCREEN
               ═══════════════════════════════════════════════════════ */}
            <section
                id="start"
                ref={heroRef}
                className="ma-sky ma-crt relative overflow-hidden"
                style={{ minHeight: '108vh', paddingTop: 96 }}
            >
                {/* far clouds */}
                <div ref={cloudsFarRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0.75 }}>
                    {[
                        { top: '9%', dur: 78, w: 100, delay: 0 },
                        { top: '20%', dur: 96, w: 78, delay: -30 },
                        { top: '32%', dur: 88, w: 92, delay: -58 },
                    ].map((c, i) => (
                        <div
                            key={i}
                            className="ma-cloud absolute"
                            style={{ top: c.top, left: '108vw', animationDuration: `${c.dur}s`, animationDelay: `${c.delay}s` }}
                        >
                            <PixelCloud width={c.w} />
                        </div>
                    ))}
                </div>

                {/* near clouds */}
                <div ref={cloudsNearRef} className="absolute inset-0 pointer-events-none">
                    {[
                        { top: '13%', dur: 46, w: 170, delay: -8 },
                        { top: '28%', dur: 54, w: 140, delay: -34 },
                        { top: '6%', dur: 62, w: 200, delay: -50 },
                    ].map((c, i) => (
                        <div
                            key={i}
                            className="ma-cloud absolute"
                            style={{ top: c.top, left: '110vw', animationDuration: `${c.dur}s`, animationDelay: `${c.delay}s` }}
                        >
                            <PixelCloud width={c.w} />
                        </div>
                    ))}
                </div>

                {/* hills + bushes */}
                <div ref={hillsRef} className="absolute left-0 w-full pointer-events-none" style={{ bottom: 96 }}>
                    <PixelHill width={340} dark style={{ position: 'absolute', left: '3%', bottom: -6 }} />
                    <PixelHill width={220} style={{ position: 'absolute', left: '34%', bottom: -6 }} />
                    <PixelHill width={300} dark style={{ position: 'absolute', right: '4%', bottom: -6 }} />
                    <PixelBush width={190} style={{ position: 'absolute', left: '22%', bottom: -4 }} />
                    <PixelBush width={150} style={{ position: 'absolute', right: '24%', bottom: -4 }} />
                    <PixelBush width={120} style={{ position: 'absolute', left: '62%', bottom: -4 }} />
                </div>

                {/* title stack */}
                <div className="relative z-20 max-w-6xl mx-auto px-4 text-center" style={{ paddingTop: 24 }}>
                    <p className="ma-shadow-text ma-blink" style={{ fontSize: 11, color: '#fff', marginBottom: 22 }}>
                        IEEE COMPUTER SOCIETY &middot; CEG
                    </p>

                    <h1
                        className="ma-title"
                        style={{ fontSize: 'clamp(30px, 8.2vw, 96px)', margin: '0 0 30px', letterSpacing: '0.04em' }}
                    >
                        MASATHON
                    </h1>

                    {/* tan plaque, straight off the poster */}
                    <div
                        className="ma-bevel inline-block"
                        style={{ background: '#e2b96b', padding: '18px 30px', margin: '0 auto 34px', maxWidth: '92vw' }}
                    >
                        <p style={{ fontSize: 'clamp(11px, 2.4vw, 20px)', color: '#000', lineHeight: 1.7, margin: 0 }}>
                            GAME DEVELOPMENT
                            <br />
                            HACKATHON
                        </p>
                    </div>

                    {/* floating ? blocks + the secret one */}
                    <div className="flex items-end justify-center gap-4 sm:gap-8 flex-wrap" style={{ marginBottom: 30 }}>
                        {[0, 1, 2, 3].map((i) => (
                            <div key={i} style={{ marginBottom: i === 2 ? 44 : 0 }}>
                                <QBlock
                                    size={64}
                                    hit={!!hitBlocks[`h${i}`]}
                                    onHit={(e) => hitHeroBlock(i, e)}
                                    ariaLabel="Hit the question block for coins"
                                />
                            </div>
                        ))}
                        {/* invisible 1-UP block — classic */}
                        <div style={{ marginBottom: 70 }} title="?">
                            <QBlock
                                size={56}
                                invisible
                                floating={false}
                                hit={!!hitBlocks.secret}
                                onHit={hitSecret}
                                ariaLabel="Hidden block"
                            />
                        </div>
                    </div>

                    {/* countdown */}
                    <div className="flex justify-center gap-2 sm:gap-3 flex-wrap" style={{ marginBottom: 30 }}>
                        {[
                            ['DAYS', countdown.d],
                            ['HRS', countdown.h],
                            ['MIN', countdown.m],
                            ['SEC', countdown.s],
                        ].map(([label, val]) => (
                            <div
                                key={label}
                                className="ma-border"
                                style={{ background: '#000', padding: '10px 12px', minWidth: 62 }}
                            >
                                <div style={{ fontSize: 'clamp(14px,3vw,22px)', color: '#fbd000' }}>{pad(val)}</div>
                                <div style={{ fontSize: 7, color: '#fff', marginTop: 6 }}>{label}</div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap justify-center gap-4" style={{ marginBottom: 18 }}>
                        <button
                            type="button"
                            className="ma-btn"
                            style={{ fontSize: 'clamp(10px,2vw,14px)' }}
                            onClick={() => {
                                play('jump');
                                setHeroJump(true);
                                setTimeout(() => setHeroJump(false), 620);
                                warpTo('warpzone');
                            }}
                        >
                            &#9654; PRESS START
                        </button>
                        <button
                            type="button"
                            className="ma-btn ma-btn-gold"
                            style={{ fontSize: 'clamp(10px,2vw,14px)' }}
                            onClick={() => {
                                play('select');
                                warpTo('register');
                            }}
                        >
                            REGISTER
                        </button>
                    </div>

                    <p className="ma-shadow-text" style={{ fontSize: 9, color: '#fff', opacity: 0.9 }}>
                        &#9650; TIP: HIT THE BLOCKS. STOMP THE GOOMBAS. ENTER THE PIPES.
                    </p>
                </div>

                {/* Goombas on the ground */}
                <Goomba left="6%" range={260} duration={11} onStomp={stompGoomba} />
                <Goomba left="52%" range={200} duration={9} size={48} onStomp={stompGoomba} />
                <Goomba left="78%" range={160} duration={8} size={44} onStomp={stompGoomba} />

                {/* Mario jogging along the ground */}
                <div className="absolute" style={{ bottom: 106, left: 0, width: '100%', zIndex: 6, pointerEvents: 'none' }}>
                    <div className="ma-run-across">
                        <div className={heroJump ? 'ma-hop' : 'ma-mario-jog'}>
                            <Mario size={96} running={!heroJump} jumping={heroJump} />
                        </div>
                    </div>
                </div>

                {/* ground + tagline */}
                <div className="absolute bottom-0 left-0 w-full" style={{ zIndex: 4 }}>
                    <div className="ma-ground-top w-full" style={{ height: 16 }} />
                    <div className="ma-ground w-full relative flex items-center" style={{ height: 96 }}>
                        <div className="ma-marquee">
                            {[0, 1].map((k) => (
                                <span key={k} className="ma-shadow-text ma-nowrap" style={{ fontSize: 15, color: '#fff', paddingRight: 48 }}>
                                    IMAGINE &nbsp;.&nbsp; BUILD &nbsp;.&nbsp; PLAY &nbsp;.&nbsp; IMAGINE &nbsp;.&nbsp; BUILD &nbsp;.&nbsp; PLAY &nbsp;.&nbsp;
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
                WARP ZONE
               ═══════════════════════════════════════════════════════ */}
            <section id="warpzone" className="ma-sky-cave relative overflow-hidden" style={{ paddingTop: 90, paddingBottom: 0 }}>
                <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
                    <p className="ma-reveal ma-shadow-text" style={{ fontSize: 'clamp(13px,3vw,24px)', color: '#fff', marginBottom: 12 }}>
                        WELCOME TO WARP ZONE!
                    </p>
                    <p className="ma-reveal" style={{ fontSize: 9, color: '#43b047', marginBottom: 56, lineHeight: 2 }}>
                        PICK A PIPE. WE WILL DO THE REST.
                    </p>

                    <div className="flex items-end justify-center gap-3 sm:gap-8 flex-wrap" style={{ paddingBottom: 0 }}>
                        {WARP_PIPES.map((p) => (
                            <div key={p.id} className="ma-reveal flex flex-col items-center" style={{ minWidth: 92 }}>
                                <span className="ma-blink" style={{ fontSize: 9, color: '#fbd000', marginBottom: 10 }}>
                                    {p.world}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => warpTo(p.id)}
                                    className="ma-pipe"
                                    aria-label={`Warp to ${p.label}`}
                                    style={{ background: 'none', border: 0, padding: 0 }}
                                >
                                    <PixelPipe width={104} height={p.h} glow />
                                </button>
                                <span
                                    className="ma-border"
                                    style={{ background: '#000', color: '#fff', fontSize: 9, padding: '7px 9px', marginTop: 18 }}
                                >
                                    {p.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="ma-ground-top w-full" style={{ height: 14, marginTop: 44 }} />
                <div className="ma-ground w-full" style={{ height: 56 }} />
            </section>

            {/* ═══════════════════════════════════════════════════════
                TRACKS
               ═══════════════════════════════════════════════════════ */}
            <section id="tracks" className="ma-sky relative overflow-hidden" style={{ paddingTop: 110, paddingBottom: 0 }}>
                <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.85 }}>
                    <div className="ma-cloud absolute" style={{ top: '8%', left: '110vw', animationDuration: '58s' }}>
                        <PixelCloud width={150} />
                    </div>
                    <div className="ma-cloud absolute" style={{ top: '22%', left: '112vw', animationDuration: '74s', animationDelay: '-25s' }}>
                        <PixelCloud width={110} />
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-4 relative z-10">
                    <header className="text-center" style={{ marginBottom: 18 }}>
                        <span className="ma-border" style={{ background: '#000', color: '#fbd000', fontSize: 9, padding: '7px 12px' }}>
                            WORLD 1-1
                        </span>
                        <h2 className="ma-shadow-text" style={{ fontSize: 'clamp(17px,4.4vw,38px)', color: '#fff', margin: '26px 0 12px' }}>
                            CHOOSE YOUR TRACK
                        </h2>
                        <p style={{ fontSize: 9, color: '#fff', lineHeight: 2.2, maxWidth: 620, margin: '0 auto' }}>
                            THREE PLATFORMS. ONE TROPHY AT THE TOP.
                            <br />
                            PICK ONE AT CHECK-IN &mdash; OR CLIMB THEM ALL.
                        </p>
                    </header>
                </div>

                {/* the poster's platform layout, made real */}
                <div className="relative max-w-6xl mx-auto px-4" style={{ height: 460, marginTop: 40 }}>
                    {TRACKS.map((t, i) => (
                        <div
                            key={t.tag}
                            className="absolute flex flex-col items-center"
                            style={{ left: `${8 + i * 30}%`, bottom: 0 }}
                        >
                            <span
                                className="ma-glitch ma-bob"
                                data-text={t.tag}
                                style={{
                                    fontSize: 'clamp(24px,5.5vw,50px)',
                                    marginBottom: 16,
                                    animationDelay: `${i * 0.3}s`,
                                    color: '#fff',
                                }}
                            >
                                {t.tag}
                            </span>
                            <PixelPipe width={104} height={t.height} />
                        </div>
                    ))}
                    {/* trophy platform */}
                    <div className="absolute flex flex-col items-center" style={{ right: '4%', bottom: 0 }}>
                        <PixelSprite map={STAR} className="ma-bob ma-star-hue" style={{ width: 64, height: 64, marginBottom: 14 }} />
                        <PixelPipe width={110} height={410} />
                    </div>
                    {/* Mario at the base, looking up */}
                    <div className="absolute hidden md:block" style={{ left: 0, bottom: 0 }}>
                        <Mario size={92} running />
                    </div>
                </div>

                <div className="ma-ground-top w-full" style={{ height: 16 }} />
                <div className="ma-ground w-full" style={{ height: 40 }} />

                {/* track detail cards */}
                <div className="bg-black" style={{ paddingTop: 64, paddingBottom: 74 }}>
                    <div className="max-w-6xl mx-auto px-4 grid gap-7 md:grid-cols-3">
                        {TRACKS.map((t) => (
                            <article
                                key={t.tag}
                                className="ma-reveal ma-border"
                                style={{ background: '#101010', padding: '28px 22px', borderTop: `6px solid ${t.color}` }}
                            >
                                <span className="ma-glitch" data-text={t.tag} style={{ fontSize: 26, color: '#fff' }}>
                                    {t.tag}
                                </span>
                                <h3 style={{ fontSize: 11, color: '#fbd000', margin: '20px 0 16px', lineHeight: 1.9 }}>{t.title}</h3>
                                <p style={{ fontSize: 8.5, color: '#d6d6d6', lineHeight: 2.3, marginBottom: 20 }}>{t.blurb}</p>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {t.ideas.map((idea) => (
                                        <li key={idea} className="flex items-start gap-2.5" style={{ marginBottom: 12 }}>
                                            <PixelSprite map={COIN} style={{ width: 11, height: 14, flexShrink: 0, marginTop: 2 }} />
                                            <span style={{ fontSize: 8, color: '#9de79f', lineHeight: 1.9 }}>{idea}</span>
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
                INTEL — ? BLOCKS
               ═══════════════════════════════════════════════════════ */}
            <section id="blocks" className="ma-sky-night relative overflow-hidden" style={{ paddingTop: 96, paddingBottom: 0 }}>
                {/* stars in the night sky */}
                <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 34 }).map((_, i) => (
                        <span
                            key={i}
                            className="ma-blink absolute"
                            style={{
                                left: `${(i * 37) % 100}%`,
                                top: `${(i * 61) % 70}%`,
                                width: 3,
                                height: 3,
                                background: '#fff',
                                animationDelay: `${(i % 7) * 0.35}s`,
                                opacity: 0.8,
                            }}
                        />
                    ))}
                </div>

                <div className="max-w-6xl mx-auto px-4 relative z-10 text-center">
                    <span className="ma-border" style={{ background: '#000', color: '#fbd000', fontSize: 9, padding: '7px 12px' }}>
                        WORLD 1-2
                    </span>
                    <h2 className="ma-shadow-text" style={{ fontSize: 'clamp(17px,4.4vw,38px)', color: '#fff', margin: '26px 0 14px' }}>
                        HIT THE BLOCKS
                    </h2>
                    <p style={{ fontSize: 9, color: '#8fc7ff', lineHeight: 2.2, marginBottom: 60 }}>
                        SIX BLOCKS. SIX THINGS YOU NEED TO KNOW.
                    </p>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" style={{ paddingBottom: 70 }}>
                        {FACTS.map((f, i) => {
                            const open = !!hitBlocks[`f${i}`];
                            return (
                                <div key={f.k} className="ma-reveal flex flex-col items-center">
                                    <QBlock size={78} hit={open} onHit={(e) => hitFact(i, e)} ariaLabel={`Reveal ${f.k}`} />
                                    <div
                                        className="ma-border"
                                        style={{
                                            marginTop: 26,
                                            background: open ? '#000' : 'rgba(0,0,0,0.35)',
                                            padding: '18px 14px',
                                            width: '100%',
                                            minHeight: 118,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            transition: 'background 0.25s',
                                        }}
                                    >
                                        {open ? (
                                            <>
                                                <div style={{ fontSize: 8, color: '#43b047', marginBottom: 14 }}>{f.k}</div>
                                                <div style={{ fontSize: 'clamp(12px,2.4vw,17px)', color: '#fbd000', marginBottom: 12 }}>{f.v}</div>
                                                <div style={{ fontSize: 7.5, color: '#bdbdbd', lineHeight: 2 }}>{f.s}</div>
                                            </>
                                        ) : (
                                            <div className="ma-blink" style={{ fontSize: 9, color: '#666' }}>
                                                ? ? ? ? ?
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="ma-ground-top w-full" style={{ height: 16 }} />
                <div className="ma-ground w-full" style={{ height: 60 }} />
            </section>

            {/* ═══════════════════════════════════════════════════════
                SCHEDULE — SIDE-SCROLLING LEVEL
               ═══════════════════════════════════════════════════════ */}
            <section id="schedule" className="ma-sky relative overflow-hidden" style={{ paddingTop: 96 }}>
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <span className="ma-border" style={{ background: '#000', color: '#fbd000', fontSize: 9, padding: '7px 12px' }}>
                        WORLD 1-3
                    </span>
                    <h2 className="ma-shadow-text" style={{ fontSize: 'clamp(17px,4.4vw,38px)', color: '#fff', margin: '26px 0 14px' }}>
                        RUN THE LEVEL
                    </h2>
                    <p style={{ fontSize: 9, color: '#fff', lineHeight: 2.2, marginBottom: 20 }}>
                        SCROLL SIDEWAYS &rarr; TWENTY-FOUR HOURS, CHECKPOINT BY CHECKPOINT
                    </p>
                    <p className="ma-blink" style={{ fontSize: 8, color: '#000', marginBottom: 36 }}>
                        &#9668; DRAG / SWIPE &#9658;
                    </p>
                </div>

                {/* horizontal level strip */}
                <div className="relative overflow-x-auto ma-hide-scroll" style={{ scrollSnapType: 'x mandatory' }}>
                    <div className="relative flex items-end" style={{ width: 'max-content', paddingLeft: 32, paddingRight: 64, height: 470 }}>
                        {SCHEDULE.map((s, i) => (
                            <div
                                key={s.title}
                                className="relative flex flex-col items-center justify-end"
                                style={{ width: 260, height: '100%', scrollSnapAlign: 'center' }}
                            >
                                {/* floating info block */}
                                <div
                                    className="ma-border"
                                    style={{
                                        background: '#000',
                                        padding: '16px 14px',
                                        width: 214,
                                        marginBottom: i % 2 === 0 ? 30 : 118,
                                    }}
                                >
                                    <div className="flex items-center gap-2" style={{ marginBottom: 12 }}>
                                        <PixelSprite map={ICON_MAP[s.icon] || COIN} style={{ width: 15, height: 17 }} />
                                        <span style={{ fontSize: 8, color: '#43b047' }}>{s.d}</span>
                                        <span style={{ fontSize: 8, color: '#fbd000', marginLeft: 'auto' }}>{s.t}</span>
                                    </div>
                                    <div style={{ fontSize: 10, color: '#fff', marginBottom: 12, lineHeight: 1.8 }}>{s.title}</div>
                                    <div style={{ fontSize: 7.5, color: '#b9b9b9', lineHeight: 2.1 }}>{s.body}</div>
                                </div>

                                {/* checkpoint flag on a block tower */}
                                <div className="flex flex-col items-center" style={{ marginBottom: 78 }}>
                                    <div
                                        style={{
                                            width: 5,
                                            height: i % 2 === 0 ? 74 : 40,
                                            background: '#fff',
                                            boxShadow: '-2px 0 0 0 #000, 2px 0 0 0 #000',
                                        }}
                                    />
                                    <PixelSprite map={USEDBLOCK} style={{ width: 40, height: 40 }} />
                                </div>

                                {/* step number on the ground */}
                                <div className="absolute" style={{ bottom: 22, fontSize: 9, color: '#fff' }}>
                                    <span className="ma-shadow-text">{pad(i + 1)}</span>
                                </div>
                            </div>
                        ))}

                        {/* castle at the end of the level */}
                        <div className="flex flex-col items-center justify-end" style={{ marginBottom: 74, paddingLeft: 24 }}>
                            <PixelCastle width={210} />
                        </div>

                        <Ground height={70} topHeight={14} />
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
                PRIZES
               ═══════════════════════════════════════════════════════ */}
            <section id="prizes" className="ma-sky-sunset relative overflow-hidden" style={{ paddingTop: 96 }}>
                <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
                    <span className="ma-border" style={{ background: '#000', color: '#fbd000', fontSize: 9, padding: '7px 12px' }}>
                        WORLD 1-4
                    </span>
                    <h2 className="ma-shadow-text" style={{ fontSize: 'clamp(17px,4.4vw,38px)', color: '#fff', margin: '26px 0 14px' }}>
                        PRIZE POOL &#8377;40,000
                    </h2>
                    <p style={{ fontSize: 9, color: '#ffe8c4', lineHeight: 2.2, marginBottom: 66 }}>
                        POWER-UPS FOR THE TOP THREE
                    </p>

                    {/* podium of blocks */}
                    <div className="flex items-end justify-center gap-3 sm:gap-8" style={{ marginBottom: 56 }}>
                        {PRIZES.map((p) => (
                            <div key={p.place} className="ma-reveal flex flex-col items-center" style={{ width: '31%', maxWidth: 230 }}>
                                <PixelSprite
                                    map={p.sprite}
                                    className={p.place === '1ST' ? 'ma-bob ma-star-hue' : 'ma-bob-sm'}
                                    style={{ width: p.place === '1ST' ? 66 : 52, height: p.place === '1ST' ? 66 : 52, marginBottom: 16 }}
                                />
                                <div style={{ fontSize: 'clamp(11px,2.3vw,17px)', color: p.color, marginBottom: 16 }}>{p.amount}</div>
                                {/* stacked bricks forming the podium (one tiled background, not 200 sprites) */}
                                <div
                                    className="w-full"
                                    style={{
                                        height: p.h,
                                        backgroundImage: BRICK_TILE,
                                        backgroundSize: '44px 44px',
                                        backgroundRepeat: 'repeat',
                                        imageRendering: 'pixelated',
                                    }}
                                />
                                <div
                                    className="ma-border w-full"
                                    style={{ background: '#000', color: p.color, fontSize: 10, padding: '11px 6px', marginTop: 12 }}
                                >
                                    {p.place}
                                </div>
                                <p style={{ fontSize: 7.5, color: '#3a1a00', lineHeight: 2, marginTop: 18 }}>{p.extra}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid gap-6 sm:grid-cols-3" style={{ paddingBottom: 80 }}>
                        {BONUS_PRIZES.map((b) => (
                            <div key={b.title} className="ma-reveal ma-border" style={{ background: '#000', padding: '22px 16px' }}>
                                <PixelSprite map={COIN} className="ma-coin-spin" style={{ width: 18, height: 22, margin: '0 auto 16px' }} />
                                <div style={{ fontSize: 9, color: '#fbd000', marginBottom: 14, lineHeight: 1.9 }}>{b.title}</div>
                                <div style={{ fontSize: 10, color: '#fff', marginBottom: 14 }}>{b.amount}</div>
                                <div style={{ fontSize: 7.5, color: '#a9a9a9', lineHeight: 2 }}>{b.note}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="ma-ground-top w-full" style={{ height: 16 }} />
                <div className="ma-ground w-full" style={{ height: 56 }} />
            </section>

            {/* ═══════════════════════════════════════════════════════
                RULES — INSTRUCTION BOOKLET
               ═══════════════════════════════════════════════════════ */}
            <section id="rules" className="relative" style={{ background: '#0b0b0b', paddingTop: 96, paddingBottom: 96 }}>
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center" style={{ marginBottom: 52 }}>
                        <span className="ma-border" style={{ background: '#000', color: '#fbd000', fontSize: 9, padding: '7px 12px' }}>
                            INSTRUCTION BOOKLET
                        </span>
                        <h2 className="ma-shadow-text" style={{ fontSize: 'clamp(17px,4.4vw,34px)', color: '#fff', margin: '26px 0 0' }}>
                            HOW TO PLAY
                        </h2>
                    </div>

                    <div className="ma-reveal ma-border-lg" style={{ background: '#f3e6c8', padding: 'clamp(22px,4vw,44px)' }}>
                        <div className="flex items-center gap-3" style={{ marginBottom: 30, borderBottom: '4px solid #000', paddingBottom: 18 }}>
                            <PixelSprite map={MARIO_STAND} style={{ width: 26, height: 34 }} />
                            <span style={{ fontSize: 10, color: '#000' }}>RULES &amp; JUDGING</span>
                        </div>
                        <ol style={{ listStyle: 'none', padding: 0, margin: 0, counterReset: 'r' }}>
                            {RULES.map((r, i) => (
                                <li key={r} className="flex items-start gap-4" style={{ marginBottom: 22 }}>
                                    <span
                                        className="shrink-0"
                                        style={{
                                            background: '#e52521',
                                            color: '#fff',
                                            fontSize: 9,
                                            padding: '7px 8px',
                                            border: '3px solid #000',
                                            minWidth: 34,
                                            textAlign: 'center',
                                        }}
                                    >
                                        {pad(i + 1)}
                                    </span>
                                    <span style={{ fontSize: 8.5, color: '#241a08', lineHeight: 2.3 }}>{r}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
                CHARACTER SELECT — JUDGES
               ═══════════════════════════════════════════════════════ */}
            <section id="judges" className="relative overflow-hidden" style={{ background: '#12123a', paddingTop: 90, paddingBottom: 90 }}>
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="ma-shadow-text" style={{ fontSize: 'clamp(15px,4vw,32px)', color: '#fff', marginBottom: 14 }}>
                        CHARACTER SELECT
                    </h2>
                    <p style={{ fontSize: 9, color: '#8fc7ff', lineHeight: 2.2, marginBottom: 52 }}>
                        THE PANEL WHO WILL PLAY YOUR BUILD
                    </p>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {JUDGES.map((j) => (
                            <div
                                key={j.name}
                                className="ma-reveal ma-border group"
                                style={{ background: '#000', padding: '26px 16px', cursor: 'pointer' }}
                                onMouseEnter={() => play('select')}
                            >
                                <PixelSprite
                                    map={MARIO_STAND}
                                    style={{
                                        width: 52,
                                        height: 68,
                                        margin: '0 auto 20px',
                                        filter: `hue-rotate(${j.hue}deg)`,
                                    }}
                                />
                                <div style={{ fontSize: 9, color: '#fbd000', marginBottom: 14, lineHeight: 1.9 }}>{j.name}</div>
                                <div style={{ fontSize: 7.5, color: '#fff', marginBottom: 10, lineHeight: 2 }}>{j.role}</div>
                                <div style={{ fontSize: 7, color: '#7c7c7c' }}>{j.org}</div>
                                <div className="ma-cursor" style={{ marginTop: 18, fontSize: 8, color: '#43b047' }}>
                                    &#9654; READY
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* sponsors */}
                    <h3 className="ma-shadow-text" style={{ fontSize: 'clamp(12px,3vw,20px)', color: '#fff', margin: '76px 0 34px' }}>
                        POWERED BY
                    </h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {SPONSORS.map((s) => (
                            <div
                                key={s}
                                className="ma-reveal ma-border"
                                style={{ background: '#e2b96b', color: '#000', fontSize: 8, padding: '16px 18px' }}
                            >
                                {s}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
                FAQ — BREAKABLE BRICKS
               ═══════════════════════════════════════════════════════ */}
            <section id="faq" className="ma-sky-cave relative" style={{ paddingTop: 90, paddingBottom: 0 }}>
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <h2 className="ma-shadow-text" style={{ fontSize: 'clamp(15px,4vw,32px)', color: '#fff', marginBottom: 14 }}>
                        SMASH FOR ANSWERS
                    </h2>
                    <p style={{ fontSize: 9, color: '#43b047', lineHeight: 2.2, marginBottom: 58 }}>
                        BREAK A BRICK TO OPEN THE QUESTION
                    </p>

                    <div className="grid gap-8 sm:grid-cols-2" style={{ paddingBottom: 80 }}>
                        {FAQ.map((f, i) => {
                            const open = !!brokenBricks[i];
                            return (
                                <div key={f.q} className="ma-reveal flex items-start gap-5 text-left">
                                    <div style={{ flexShrink: 0 }}>
                                        <BrickBlock size={68} broken={open} onBreak={(e) => smashFaq(i, e)} label={f.q} />
                                    </div>
                                    <div
                                        className="ma-border"
                                        style={{ background: '#000', padding: '16px 14px', flex: 1, minHeight: 96 }}
                                    >
                                        <div style={{ fontSize: 8.5, color: '#fbd000', marginBottom: 14, lineHeight: 2 }}>{f.q}</div>
                                        {open ? (
                                            <div style={{ fontSize: 7.5, color: '#cfcfcf', lineHeight: 2.2 }}>{f.a}</div>
                                        ) : (
                                            <div className="ma-blink" style={{ fontSize: 7.5, color: '#555' }}>
                                                &#9664; SMASH THE BRICK
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="ma-ground-top w-full" style={{ height: 14 }} />
                <div className="ma-ground w-full" style={{ height: 50 }} />
            </section>

            {/* ═══════════════════════════════════════════════════════
                THE CARTRIDGE — official poster
               ═══════════════════════════════════════════════════════ */}
            <section className="relative" style={{ background: '#171717', paddingTop: 84, paddingBottom: 84 }}>
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="ma-shadow-text" style={{ fontSize: 'clamp(13px,3.2vw,24px)', color: '#fff', marginBottom: 14 }}>
                        INSERT CARTRIDGE
                    </h2>
                    <p style={{ fontSize: 8.5, color: '#8a8a8a', lineHeight: 2.2, marginBottom: 44 }}>
                        THE OFFICIAL MASATHON POSTER &mdash; TAP TO ENLARGE
                    </p>
                    <button
                        type="button"
                        onClick={() => {
                            play('powerup');
                            setLightbox(true);
                        }}
                        className="ma-reveal inline-block"
                        style={{ background: '#2a2a2a', padding: 18, border: '6px solid #000', cursor: 'pointer', maxWidth: '100%' }}
                    >
                        <img
                            src={posterImg}
                            alt="Masathon game development hackathon poster"
                            style={{ display: 'block', width: '100%', maxWidth: 420, height: 'auto', border: '4px solid #000' }}
                        />
                        <div style={{ fontSize: 8, color: '#fbd000', marginTop: 16 }}>MASATHON &nbsp;&middot;&nbsp; 2026 &nbsp;&middot;&nbsp; IEEE CS</div>
                    </button>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
                FLAGPOLE FINALE — REGISTER
               ═══════════════════════════════════════════════════════ */}
            <section id="register" className="ma-sky-sunset relative overflow-hidden" style={{ paddingTop: 92 }}>
                <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
                    <span className="ma-border" style={{ background: '#000', color: '#fbd000', fontSize: 9, padding: '7px 12px' }}>
                        WORLD 1-C
                    </span>
                    <h2 className="ma-shadow-text" style={{ fontSize: 'clamp(16px,4.4vw,36px)', color: '#fff', margin: '26px 0 16px' }}>
                        TOUCH THE FLAGPOLE
                    </h2>
                    <p style={{ fontSize: 9, color: '#3a1a00', lineHeight: 2.2, marginBottom: 12 }}>
                        SEPTEMBER 12 &ndash; 13, 2026 &nbsp;&middot;&nbsp; VIVEK AUDITORIUM
                    </p>
                </div>

                {/* the scene */}
                <div className="relative" style={{ height: 440, marginTop: 30 }}>
                    <div className="absolute" style={{ left: '14%', bottom: 108 }}>
                        <PixelFlagpole
                            height={310}
                            flagClass={flagDown ? 'ma-flag-down' : ''}
                            flagStyle={{ ['--drop']: '224px' }}
                        />
                    </div>

                    <div className="absolute" style={{ right: '8%', bottom: 108 }}>
                        <PixelCastle width={250} />
                    </div>

                    {/* Mario walks toward the pole */}
                    <div className="absolute" style={{ left: '4%', bottom: 108 }}>
                        <div className="ma-mario-jog">
                            <Mario size={92} running={!cleared} />
                        </div>
                    </div>

                    {/* fireworks after clearing */}
                    {cleared &&
                        [
                            { l: '28%', b: 300, c: '#fbd000', d: '0s' },
                            { l: '46%', b: 350, c: '#e52521', d: '0.25s' },
                            { l: '62%', b: 290, c: '#43b047', d: '0.5s' },
                            { l: '38%', b: 250, c: '#00e5ff', d: '0.75s' },
                        ].map((f, i) => (
                            <div
                                key={i}
                                className="ma-firework absolute"
                                style={{ left: f.l, bottom: f.b, animationDelay: f.d, animationIterationCount: 'infinite' }}
                            >
                                {[
                                    [0, -22], [0, 22], [-22, 0], [22, 0],
                                    [-15, -15], [15, -15], [-15, 15], [15, 15],
                                ].map(([x, y], k) => (
                                    <span
                                        key={k}
                                        style={{
                                            position: 'absolute',
                                            left: x,
                                            top: y,
                                            width: 7,
                                            height: 7,
                                            background: f.c,
                                        }}
                                    />
                                ))}
                            </div>
                        ))}

                    <Ground height={96} topHeight={16} />
                </div>

                {/* CTA panel */}
                <div style={{ background: '#000', paddingTop: 64, paddingBottom: 80 }}>
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        {!cleared ? (
                            <>
                                <button type="button" className="ma-btn ma-btn-green" onClick={touchFlagpole} style={{ fontSize: 'clamp(10px,2vw,14px)' }}>
                                    &#9654; GRAB THE FLAG
                                </button>
                                <p style={{ fontSize: 8, color: '#666', marginTop: 26, lineHeight: 2 }}>
                                    (YES, YOU HAVE TO. THAT IS THE RULE.)
                                </p>
                            </>
                        ) : (
                            <div className="ma-border-lg" style={{ background: '#0d0d0d', padding: 'clamp(26px,5vw,50px)' }}>
                                <div className="ma-blink" style={{ fontSize: 'clamp(13px,3.4vw,26px)', color: '#fbd000', marginBottom: 26 }}>
                                    COURSE CLEAR!
                                </div>
                                <p style={{ fontSize: 9, color: '#fff', lineHeight: 2.4, marginBottom: 34 }}>
                                    YOU FOUND {coins} COIN{coins === 1 ? '' : 'S'} AND SCORED {pad(score, 6)}.
                                    <br />
                                    NOW GO BUILD SOMETHING WORTH PLAYING.
                                </p>

                                <div className="grid gap-4 sm:grid-cols-3" style={{ marginBottom: 36 }}>
                                    {[
                                        ['FEE', '₹150 / HEAD'],
                                        ['IEEE MEMBERS', '₹100 / HEAD'],
                                        ['CLOSES', 'SEP 05, 2026'],
                                    ].map(([k, v]) => (
                                        <div key={k} className="ma-border" style={{ background: '#000', padding: '18px 12px' }}>
                                            <div style={{ fontSize: 7.5, color: '#43b047', marginBottom: 14 }}>{k}</div>
                                            <div style={{ fontSize: 10, color: '#fff' }}>{v}</div>
                                        </div>
                                    ))}
                                </div>

                                <a
                                    href={REGISTER_URL}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="ma-btn ma-btn-gold inline-block"
                                    style={{ fontSize: 'clamp(10px,2vw,14px)', textDecoration: 'none' }}
                                    onClick={() => play('oneup')}
                                >
                                    REGISTER YOUR TEAM &#9654;
                                </a>

                                <p style={{ fontSize: 7.5, color: '#5a5a5a', marginTop: 28, lineHeight: 2.2 }}>
                                    QUESTIONS? MAIL IEEECS.CEG@GMAIL.COM
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
                GAME OVER STRIP
               ═══════════════════════════════════════════════════════ */}
            <section className="relative" style={{ background: '#000', paddingTop: 56, paddingBottom: 64 }}>
                <div className="max-w-5xl mx-auto px-4 flex flex-col items-center gap-7 text-center">
                    <div className="flex items-center gap-6 flex-wrap justify-center">
                        <PixelSprite map={MARIO_STAND} style={{ width: 30, height: 40 }} />
                        <PixelSprite map={GOOMBA} style={{ width: 34, height: 34 }} />
                        <PixelSprite map={COIN} className="ma-coin-spin" style={{ width: 22, height: 28 }} />
                        <PixelSprite map={MUSHROOM} style={{ width: 34, height: 34 }} />
                        <PixelSprite map={STAR} className="ma-star-hue" style={{ width: 34, height: 34 }} />
                        <PixelSprite map={FLOWER} style={{ width: 34, height: 34 }} />
                    </div>
                    <p style={{ fontSize: 9, color: '#fff', lineHeight: 2.4 }}>
                        MASATHON &nbsp;&middot;&nbsp; IEEE COMPUTER SOCIETY
                        <br />
                        COLLEGE OF ENGINEERING, GUINDY
                    </p>
                    <button
                        type="button"
                        className="ma-btn"
                        style={{ fontSize: 10 }}
                        onClick={() => {
                            play('pause');
                            warpTo('start');
                        }}
                    >
                        &#8635; BACK TO TITLE SCREEN
                    </button>
                    <p style={{ fontSize: 7, color: '#3d3d3d', lineHeight: 2.2, marginTop: 8 }}>
                        NOT AFFILIATED WITH NINTENDO. ALL SPRITES DRAWN FROM SCRATCH FOR THIS PAGE.
                    </p>
                </div>
            </section>

            {/* ═══════════════ POSTER LIGHTBOX ═══════════════ */}
            {lightbox && (
                <div
                    role="presentation"
                    onClick={() => setLightbox(false)}
                    className="fixed inset-0 flex items-center justify-center p-4"
                    style={{ background: 'rgba(0,0,0,0.93)', zIndex: 9998, cursor: 'zoom-out' }}
                >
                    <img
                        src={posterImg}
                        alt="Masathon poster enlarged"
                        style={{ maxHeight: '88vh', maxWidth: '92vw', border: '6px solid #fbd000' }}
                    />
                    <button
                        type="button"
                        onClick={() => setLightbox(false)}
                        className="ma-btn"
                        style={{ position: 'absolute', top: 88, right: 20, fontSize: 9 }}
                    >
                        CLOSE &times;
                    </button>
                </div>
            )}
        </div>
    );
}
