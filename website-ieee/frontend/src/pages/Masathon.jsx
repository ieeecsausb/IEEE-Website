/* ============================================================
   IEEE MASATHON 2026 — National-level Game Development Hackathon
   IEEE Madras Section

   Built as ONE continuous Mario level rather than a stack of
   differently-themed panels: a single sky gradient runs the full
   page, one floor is pinned to the bottom of the viewport, and
   every card shares the same panel language.

   Nothing on this page is hidden behind an interaction. The
   coins, the Goomba and the flagpole are optional fun.
   ============================================================ */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/masathon.css';
import posterMain from '../assets/upcoming-events/masathon-poster.png';
import posterAbout from '../assets/upcoming-events/masathon-about.png';
import posterRules from '../assets/upcoming-events/masathon-rules.png';
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
   OFFICIAL EVENT DATA — IEEE MASATHON 2026
   ============================================================ */

const REGISTER_URL = 'https://docs.google.com/forms/d/15ti4EU_eesn1vpdBXHUJ9fVsLudJK-RR2tyuYmvxYQ4/viewform?edit_requested=true';

const ABOUT =
    'IEEE MASATHON 2026 is a national-level hackathon conducted by the IEEE Computer Society AU-CEG and IEEE Madras Section. The competition combines creativity and technical excellence through a two-round format where teams first pitch an original idea and then build a functional prototype.';

const KEY_FACTS = [
    { k: 'FORMAT', v: 'NATIONAL LEVEL', s: 'Two rounds' },
    { k: 'PRIZE POOL', v: '₹40,000', s: 'Total' },
    { k: 'TEAM SIZE', v: '2 – 4', s: 'Members' },
    { k: 'IEEE MEMBERS', v: '₹250', s: 'Valid ID required' },
    { k: 'NON-IEEE', v: '₹500', s: 'Per participant' },
];

const TRACKS = [
    { n: 'Generative AI & Intelligent Game Systems', c: '#ff2bd1', icon: STAR },
    { n: 'Computer Vision & Perception', c: '#00e5ff', icon: FLOWER },
    { n: 'Games for Learning & Skill Development', c: '#43b047', icon: MUSHROOM },
    { n: 'Natural Language Processing & Conversational AI', c: '#ff6b6b', icon: ONEUP },
    { n: 'Multiplayer & Online Games', c: '#7b5cff', icon: COIN },
    { n: 'Accessibility-First Game Design', c: '#fbd000', icon: QBLOCK },
    { n: 'Procedural Generation & Game Tools', c: '#4ecdc4', icon: STAR },
    { n: 'Narrative, Culture & Social Impact', c: '#ff9f45', icon: MUSHROOM },
    { n: 'Responsible & Explainable AI', c: '#b5e853', icon: FLOWER },
];

const ROUNDS = [
    {
        tag: 'ROUND 1',
        title: 'Online Concept Submission',
        accent: '#43b047',
        pipe: 140,
        what: [
            'Submit via PPT (official templates provided) or Video Pitch.',
            'Must include the concept, core idea, key features, approach, technology/AI stack (where applicable), development plan, and team roles.',
        ],
        judged: ['Functionality', 'Technical execution', 'Gameplay experience', 'Polish', 'Documentation'],
    },
    {
        tag: 'ROUND 2',
        title: 'Offline Prototype Development (8 Hours)',
        accent: '#e52521',
        pipe: 200,
        note: '8 HOURS',
        what: [
            '8-hour offline hackathon with live mentor guidance.',
            'Requires live demonstration, source code submission, and final presentation.',
        ],
        judged: ['Functionality', 'Technical execution', 'Gameplay experience', 'Polish', 'Documentation'],
    },
];

const DATES = [
    { d: '09.08.2026', iso: '2026-08-09', label: 'Round 1 Begins', icon: COIN },
    { d: '16.08.2026', iso: '2026-08-16', label: 'Round 1 Concept Submission Deadline', icon: MUSHROOM },
    { d: '18.08.2026', iso: '2026-08-18', label: 'Round 1 Results Announcement', icon: FLOWER },
    { d: '21.08.2026', iso: '2026-08-21', label: 'Round 2 Final Registration Deadline', icon: ONEUP },
    { d: '29.08.2026', iso: '2026-08-29', label: 'Round 2 Offline Hackathon & Demo', icon: STAR, final: true },
];

const ENTRY = [
    {
        k: 'TEAM SIZE',
        v: '2 – 4 MEMBERS',
        s: 'Cross-college and interdisciplinary teams encouraged.',
        c: '#00e5ff',
        icon: MUSHROOM,
    },
    { k: 'IEEE MEMBERS', v: '₹250', s: 'Per participant (Valid IEEE Membership ID required).', c: '#43b047', icon: STAR },
    { k: 'NON-IEEE MEMBERS', v: '₹500', s: 'Per participant.', c: '#fbd000', icon: COIN },
];

const AI_RULES = [
    'Moderate use of AI tools permitted for coding, debugging, and productivity.',
    "Core design, implementation, and presentation must be the team's original work with proper attribution for third-party assets.",
];

const SUBMIT_CHECKLIST = [
    'Round 1 — PPT on the official templates, or a video pitch.',
    'Round 1 — concept, core idea, key features, approach, technology/AI stack, development plan, team roles.',
    'Round 2 — live demonstration of the working prototype.',
    'Round 2 — source code submission.',
    'Round 2 — final presentation.',
];

const POSTERS = [
    { src: posterMain, cap: 'MASATHON' },
    { src: posterAbout, cap: 'ABOUT & TRACKS' },
    { src: posterRules, cap: 'RULES & FEES' },
];

const CONTACTS = [
    { name: 'Shaan Narendran', phone: '+91 9790810625' },
    { name: 'Shreem Seth', phone: '+91 9840420025' },
    { name: 'Ojaskrisshnan', phone: '+91 9488520812' },
    { name: 'Swayamprabha', phone: '+91 93846 70972' },
];

/* Sections that hide a collectable coin. */
const SECTIONS = [
    { id: 'about', label: 'ABOUT' },
    { id: 'tracks', label: 'TRACKS' },
    { id: 'rounds', label: 'FORMAT' },
    { id: 'dates', label: 'DATES' },
    { id: 'entry', label: 'ENTRY' },
    { id: 'rules', label: 'RULES' },
    { id: 'prizes', label: 'PRIZES' },
    { id: 'posters', label: 'POSTERS' },
    { id: 'contact', label: 'CONTACT' },
];
const TOTAL_COINS = SECTIONS.length;

/* ============================================================
   PIECES
   ============================================================ */

function Mario({ size = 92, running = true, jumping = false, className = '', style }) {
    const [frame, setFrame] = useState(0);
    useEffect(() => {
        if (!running || jumping) return undefined;
        const id = setInterval(() => setFrame((v) => (v + 1) % MARIO_RUN_CYCLE.length), 95);
        return () => clearInterval(id);
    }, [running, jumping]);
    const map = jumping ? MARIO_JUMP : running ? MARIO_RUN_CYCLE[frame] : MARIO_STAND;
    return <PixelSprite map={map} className={className} style={{ width: size * 0.75, height: size, ...style }} />;
}

/** Identical header for every section — this is what makes the page feel like one place. */
function SectionHead({ world, title, sub, light, coinSlot }) {
    return (
        <header className="text-center" style={{ marginBottom: 'clamp(34px, 5vw, 56px)' }}>
            <div className="flex items-center justify-center gap-4">
                <span className="ma-badge">{world}</span>
                {coinSlot}
            </div>
            <h2 className="ma-h2 ma-shadow-text">{title}</h2>
            {sub ? <p className={`ma-sub ${light ? 'ma-sub-light' : ''}`}>{sub}</p> : null}
        </header>
    );
}

/** The optional game: one coin per section. Never blocks anything. */
function CoinPickup({ got, onGet }) {
    return (
        <button
            type="button"
            className="ma-collect"
            data-got={got}
            onClick={got ? undefined : onGet}
            aria-label={got ? 'Coin collected' : 'Collect the coin'}
            title={got ? 'Collected' : 'Collect this coin'}
        >
            <PixelSprite map={COIN} className={got ? '' : 'ma-coin-spin'} style={{ width: 22, height: 28 }} />
        </button>
    );
}

/* ============================================================
   PAGE
   ============================================================ */

export default function Masathon() {
    const { play, muted, toggleMute } = useChiptune();
    const rootRef = useRef(null);
    const heroRef = useRef(null);
    const cloudsRef = useRef(null);

    const [coins, setCoins] = useState({});
    const [fx, setFx] = useState([]);
    const [active, setActive] = useState('about');
    const [flagDown, setFlagDown] = useState(false);
    const [cleared, setCleared] = useState(false);
    const [lightbox, setLightbox] = useState(null);
    const [heroJump, setHeroJump] = useState(false);
    const [now, setNow] = useState(() => Date.now());

    const coinCount = Object.keys(coins).length;
    const allCoins = coinCount === TOTAL_COINS;

    /* ---------- next milestone + countdown ---------- */
    const nextDate = useMemo(() => DATES.find((d) => new Date(`${d.iso}T09:00:00+05:30`).getTime() > now), [now]);
    const countdown = useMemo(() => {
        if (!nextDate) return null;
        const diff = new Date(`${nextDate.iso}T09:00:00+05:30`).getTime() - now;
        return {
            d: Math.floor(diff / 86400000),
            h: Math.floor((diff / 3600000) % 24),
            m: Math.floor((diff / 60000) % 60),
            s: Math.floor((diff / 1000) % 60),
        };
    }, [nextDate, now]);

    useEffect(() => {
        const id = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(id);
    }, []);

    /* ---------- floating fx ---------- */
    const spawnFx = useCallback((e, text, sprite = COIN) => {
        const x = e?.clientX ?? window.innerWidth / 2;
        const y = e?.clientY ?? window.innerHeight / 2;
        const id = `${Date.now()}-${Math.random()}`;
        setFx((p) => [...p, { id, x, y, text, sprite }]);
        setTimeout(() => setFx((p) => p.filter((f) => f.id !== id)), 1000);
    }, []);

    const grabCoin = useCallback(
        (id, e) => {
            if (coins[id]) return;
            const next = { ...coins, [id]: true };
            setCoins(next);
            if (Object.keys(next).length === TOTAL_COINS) {
                play('oneup');
                spawnFx(e, 'ALL COINS!', ONEUP);
            } else {
                play('coin');
                spawnFx(e, '+1', COIN);
            }
        },
        [coins, play, spawnFx],
    );

    /* ---------- nav ---------- */
    const goTo = useCallback(
        (id) => {
            play('select');
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        },
        [play],
    );

    /* ---------- scroll spy ---------- */
    useEffect(() => {
        const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
        if (!els.length) return undefined;
        const obs = new IntersectionObserver(
            (entries) => {
                const vis = entries.filter((en) => en.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                if (vis[0]) setActive(vis[0].target.id);
            },
            { rootMargin: '-140px 0px -55% 0px', threshold: [0.1, 0.35, 0.7] },
        );
        els.forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, []);

    /* ---------- parallax + reveals ---------- */
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (cloudsRef.current) {
                gsap.to(cloudsRef.current, {
                    yPercent: 40,
                    ease: 'none',
                    scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
                });
            }
            gsap.utils.toArray('.ma-reveal').forEach((el) => {
                gsap.fromTo(
                    el,
                    { opacity: 0, y: 34 },
                    { opacity: 1, y: 0, duration: 0.45, ease: 'steps(5)', scrollTrigger: { trigger: el, start: 'top 90%' } },
                );
            });
        }, rootRef);
        return () => ctx.revert();
    }, []);

    const stompGoomba = (e) => {
        play('stomp');
        spawnFx(e, 'BONK', GOOMBA);
    };

    const touchFlagpole = () => {
        if (flagDown) return;
        setFlagDown(true);
        play('flag');
        setTimeout(() => {
            setCleared(true);
            play('clear');
        }, 1350);
    };

    const pad = (n, l = 2) => String(n).padStart(l, '0');

    const coinFor = (id) => <CoinPickup got={!!coins[id]} onGet={(e) => grabCoin(id, e)} />;

    /* ============================================================ */
    return (
        <div ref={rootRef} className="ma-root">
            {/* ─────────── floating score fx ─────────── */}
            <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 80 }}>
                {fx.map((f) => (
                    <div key={f.id} style={{ position: 'absolute', left: f.x, top: f.y }}>
                        <PixelSprite map={f.sprite} className="ma-coin-pop" style={{ position: 'absolute', width: 26, height: 32 }} />
                        <span
                            className="ma-score-float ma-shadow-text"
                            style={{ position: 'absolute', top: -6, fontSize: 12, whiteSpace: 'nowrap' }}
                        >
                            {f.text}
                        </span>
                    </div>
                ))}
            </div>

            {/* ─────────── sticky section nav ─────────── */}
            <nav className="ma-nav">
                <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center gap-2">
                    <div className="flex items-center gap-1.5 shrink-0 pr-2" title="Coins collected">
                        <PixelSprite map={COIN} className="ma-coin-spin" style={{ width: 13, height: 17 }} />
                        <span style={{ fontSize: 10, color: allCoins ? '#43b047' : '#fbd000' }}>
                            {pad(coinCount)}/{pad(TOTAL_COINS)}
                        </span>
                    </div>

                    <div className="flex-1 flex items-center overflow-x-auto ma-hide-scroll">
                        {SECTIONS.map((s) => (
                            <button
                                key={s.id}
                                type="button"
                                className="ma-nav-link"
                                data-active={active === s.id}
                                onClick={() => goTo(s.id)}
                            >
                                {s.label}
                            </button>
                        ))}
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
                            fontSize: 7.5,
                            padding: '6px 8px',
                            background: muted ? '#4a4a55' : '#43b047',
                            color: '#fff',
                            border: '3px solid #000',
                            cursor: 'pointer',
                        }}
                        title={muted ? 'Sound off' : 'Sound on'}
                    >
                        {muted ? 'SFX OFF' : 'SFX ON'}
                    </button>

                    <button
                        type="button"
                        onClick={() => goTo('register')}
                        className="ma-btn ma-btn-gold ma-btn-sm shrink-0 hidden sm:inline-block"
                    >
                        REGISTER
                    </button>
                </div>
            </nav>

            {/* ─────────── the world ─────────── */}
            <div className="ma-world" style={{ paddingBottom: 'var(--ma-floor-h)' }}>
                {/* drifting clouds, behind everything */}
                <div ref={cloudsRef} className="absolute inset-x-0 top-0 pointer-events-none" style={{ height: '160vh', zIndex: 1 }}>
                    {[
                        { top: '6%', dur: 64, w: 190 },
                        { top: '14%', dur: 86, w: 120 },
                        { top: '24%', dur: 74, w: 155 },
                        { top: '34%', dur: 96, w: 100 },
                        { top: '46%', dur: 80, w: 170 },
                    ].map((c, i) => (
                        <div
                            key={i}
                            className="ma-cloud absolute"
                            style={{ top: c.top, left: '112vw', animationDuration: `${c.dur}s`, animationDelay: `${-i * 17}s` }}
                        >
                            <PixelCloud width={c.w} />
                        </div>
                    ))}
                </div>

                {/* ══════════════ HERO ══════════════ */}
                <section
                    id="start"
                    ref={heroRef}
                    className="relative"
                    style={{ paddingTop: 'clamp(48px, 7vw, 80px)', paddingBottom: 'clamp(40px, 6vw, 72px)', zIndex: 10 }}
                >
                    <div className="max-w-6xl mx-auto px-4 text-center">
                        <p className="ma-shadow-text" style={{ fontSize: 9, color: '#fff', marginBottom: 20 }}>
                            IEEE MADRAS SECTION &middot; COMPUTER SOCIETY
                        </p>

                        <h1
                            className="ma-shadow-text"
                            style={{
                                fontSize: 'clamp(26px, 7vw, 76px)',
                                color: '#fbd000',
                                margin: '0 0 8px',
                                lineHeight: 1.25,
                                textShadow: '4px 4px 0 #e8890c, 8px 8px 0 #000',
                            }}
                        >
                            IEEE MASATHON
                        </h1>
                        <p
                            className="ma-shadow-text"
                            style={{ fontSize: 'clamp(20px, 5vw, 48px)', color: '#fff', margin: '0 0 26px' }}
                        >
                            2026
                        </p>

                        <div className="ma-bevel inline-block" style={{ background: '#e2b96b', padding: '16px 26px', maxWidth: '92vw' }}>
                            <p style={{ fontSize: 'clamp(9px, 2.1vw, 15px)', color: '#000', margin: 0, lineHeight: 1.9 }}>
                                NATIONAL LEVEL
                                <br />
                                HACKATHON
                            </p>
                        </div>

                        {/* facts, visible immediately — no clicking required */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4" style={{ margin: '38px 0 34px' }}>
                            {KEY_FACTS.map((f) => (
                                <div key={f.k} className="ma-panel" style={{ ['--accent']: '#fbd000', padding: '18px 12px' }}>
                                    <span className="ma-kicker" style={{ ['--accent']: '#43b047' }}>
                                        {f.k}
                                    </span>
                                    <div style={{ fontSize: 'clamp(11px,2.3vw,16px)', color: '#fff', marginBottom: 10 }}>{f.v}</div>
                                    <div style={{ fontSize: 7, color: 'var(--ma-muted)' }}>{f.s}</div>
                                </div>
                            ))}
                        </div>

                        {/* countdown to the next milestone */}
                        {nextDate && countdown ? (
                            <div style={{ marginBottom: 34 }}>
                                <p style={{ fontSize: 8, color: '#dbe9ff', marginBottom: 16 }}>
                                    NEXT: {nextDate.label.toUpperCase()} &middot; {nextDate.d}
                                </p>
                                <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
                                    {[
                                        ['DAYS', countdown.d],
                                        ['HRS', countdown.h],
                                        ['MIN', countdown.m],
                                        ['SEC', countdown.s],
                                    ].map(([label, val]) => (
                                        <div key={label} className="ma-border" style={{ background: '#000', padding: '11px 13px', minWidth: 62 }}>
                                            <div style={{ fontSize: 'clamp(13px,2.8vw,20px)', color: '#fbd000' }}>{pad(val)}</div>
                                            <div style={{ fontSize: 6.5, color: '#fff', marginTop: 8 }}>{label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="ma-border inline-block" style={{ background: '#000', padding: '14px 18px', marginBottom: 34 }}>
                                <span style={{ fontSize: 9, color: '#fbd000' }}>HACKATHON &middot; 29.08.2026</span>
                            </div>
                        )}

                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href={REGISTER_URL}
                                target="_blank"
                                rel="noreferrer"
                                className="ma-btn ma-btn-gold"
                                style={{ fontSize: 'clamp(9px,1.9vw,13px)' }}
                                onClick={() => play('powerup')}
                            >
                                REGISTER NOW &#9654;
                            </a>
                            <button
                                type="button"
                                className="ma-btn"
                                style={{ fontSize: 'clamp(9px,1.9vw,13px)' }}
                                onClick={() => {
                                    play('jump');
                                    setHeroJump(true);
                                    setTimeout(() => setHeroJump(false), 620);
                                    goTo('about');
                                }}
                            >
                                &#9660; EXPLORE
                            </button>
                        </div>

                        <p style={{ fontSize: 7.5, color: '#dbe9ff', marginTop: 26 }}>
                            TIP: THERE IS ONE COIN HIDDEN IN EVERY SECTION. FIND ALL {TOTAL_COINS}.
                        </p>
                    </div>

                    {/* scenery sitting on the horizon */}
                    <div className="relative pointer-events-none select-none" style={{ height: 120, marginTop: 30 }}>
                        <PixelHill width={300} dark style={{ position: 'absolute', left: '4%', bottom: 0 }} />
                        <PixelBush width={170} style={{ position: 'absolute', left: '30%', bottom: 0 }} />
                        <PixelHill width={220} style={{ position: 'absolute', left: '52%', bottom: 0 }} />
                        <PixelBush width={130} style={{ position: 'absolute', right: '8%', bottom: 0 }} />
                    </div>
                </section>

                {/* ══════════════ ABOUT ══════════════ */}
                <section id="about" className="ma-section" style={{ scrollMarginTop: 120 }}>
                    <div className="max-w-5xl mx-auto px-4">
                        <SectionHead world="WORLD 1-1" title="ABOUT THE EVENT" coinSlot={coinFor('about')} />
                        <div className="ma-panel ma-reveal" style={{ ['--accent']: '#43b047', padding: 'clamp(24px,4vw,40px)' }}>
                            <p style={{ fontSize: 'clamp(8.5px,1.7vw,11px)', color: '#fff', lineHeight: 2.6, margin: 0 }}>{ABOUT}</p>
                        </div>

                        <div className="grid sm:grid-cols-3 gap-4" style={{ marginTop: 26 }}>
                            {[
                                { k: 'CONDUCTED BY', v: 'IEEE Computer Society AU-CEG and IEEE Madras Section', c: '#00e5ff' },
                                { k: 'VENUE', v: 'Vivekananda Auditorium, Anna University CEG Campus, Sardar Patel Road, Guindy, Chennai - 600025', c: '#ff9f45' },
                                { k: 'TAGLINE', v: 'IMAGINE . BUILD . PLAY', c: '#b5e853' },
                            ].map((x) => (
                                <div key={x.k} className="ma-panel ma-panel-hover ma-reveal" style={{ ['--accent']: x.c }}>
                                    <span className="ma-kicker" style={{ ['--accent']: x.c }}>
                                        {x.k}
                                    </span>
                                    <div style={{ fontSize: 9.5, color: '#fff', lineHeight: 2 }}>{x.v}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════ TRACKS ══════════════ */}
                <section id="tracks" className="ma-section" style={{ scrollMarginTop: 120 }}>
                    <div className="max-w-6xl mx-auto px-4">
                        <SectionHead
                            world="WORLD 1-2"
                            title="ROUND 1 TRACKS"
                            sub="NINE TRACKS. PICK THE ONE YOUR IDEA BELONGS TO."
                            coinSlot={coinFor('tracks')}
                        />
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                            {TRACKS.map((t, i) => (
                                <article
                                    key={t.n}
                                    className="ma-panel ma-panel-hover ma-reveal"
                                    style={{ ['--accent']: t.c }}
                                    onMouseEnter={() => play('select')}
                                >
                                    <div className="flex items-center gap-3" style={{ marginBottom: 16 }}>
                                        <PixelSprite map={t.icon} style={{ width: 22, height: 22, flexShrink: 0 }} />
                                        <span style={{ fontSize: 8, color: t.c }}>TRACK {pad(i + 1)}</span>
                                    </div>
                                    <h3 style={{ fontSize: 9.5, color: '#fff', margin: 0, lineHeight: 2.1 }}>{t.n}</h3>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════ FORMAT ══════════════ */}
                <section id="rounds" className="ma-section" style={{ scrollMarginTop: 120 }}>
                    <div className="max-w-6xl mx-auto px-4">
                        <SectionHead
                            world="WORLD 1-3"
                            title="HACKATHON FORMAT"
                            sub="TWO ROUNDS. PITCH THE IDEA, THEN BUILD IT."
                            coinSlot={coinFor('rounds')}
                        />
                        <div className="grid md:grid-cols-2 gap-6">
                            {ROUNDS.map((r) => (
                                <article key={r.tag} className="ma-panel ma-reveal" style={{ ['--accent']: r.accent, padding: 'clamp(24px,3vw,34px)' }}>
                                    <div className="flex items-start justify-between gap-4" style={{ marginBottom: 22 }}>
                                        <div>
                                            <span className="ma-kicker" style={{ ['--accent']: r.accent }}>
                                                {r.tag}
                                            </span>
                                            <h3 style={{ fontSize: 'clamp(10px,2vw,13px)', color: '#fff', margin: 0, lineHeight: 2 }}>
                                                {r.title}
                                            </h3>
                                            {r.note ? (
                                                <span
                                                    className="ma-border inline-block"
                                                    style={{ background: r.accent, color: '#fff', fontSize: 8, padding: '7px 10px', marginTop: 16 }}
                                                >
                                                    {r.note}
                                                </span>
                                            ) : null}
                                        </div>
                                        <PixelPipe width={68} height={r.pipe} className="shrink-0 hidden sm:block" />
                                    </div>

                                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px' }}>
                                        {r.what.map((w) => (
                                            <li key={w} className="flex items-start gap-3" style={{ marginBottom: 14 }}>
                                                <PixelSprite map={COIN} style={{ width: 11, height: 14, flexShrink: 0, marginTop: 4 }} />
                                                <span style={{ fontSize: 8.5, color: 'var(--ma-body)', lineHeight: 2.3 }}>{w}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div style={{ borderTop: '4px solid #000', paddingTop: 20 }}>
                                        <span className="ma-kicker" style={{ ['--accent']: '#fbd000' }}>
                                            EVALUATED ON
                                        </span>
                                        <div className="flex flex-wrap gap-2">
                                            {r.judged.map((j) => (
                                                <span
                                                    key={j}
                                                    style={{
                                                        fontSize: 7.5,
                                                        color: '#fff',
                                                        background: '#000',
                                                        border: `3px solid ${r.accent}`,
                                                        padding: '7px 9px',
                                                    }}
                                                >
                                                    {j}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════ DATES ══════════════ */}
                <section id="dates" className="ma-section" style={{ scrollMarginTop: 120 }}>
                    <div className="max-w-4xl mx-auto px-4">
                        <SectionHead world="WORLD 1-4" title="IMPORTANT DATES" sub="FIVE CHECKPOINTS TO THE FINISH." coinSlot={coinFor('dates')} />
                        <div className="relative">
                            <div className="ma-rail hidden sm:block" />
                            {DATES.map((d) => {
                                const past = new Date(`${d.iso}T09:00:00+05:30`).getTime() < now;
                                const isNext = nextDate?.iso === d.iso;
                                return (
                                    <div key={d.iso} className="ma-reveal flex items-start gap-4 sm:gap-6" style={{ marginBottom: 18 }}>
                                        <div
                                            className="shrink-0 relative"
                                            style={{ width: 60, display: 'flex', justifyContent: 'center', paddingTop: 20, zIndex: 2 }}
                                        >
                                            <PixelSprite
                                                map={d.icon}
                                                className={isNext ? 'ma-bob-sm' : ''}
                                                style={{ width: 34, height: 34, opacity: past && !isNext ? 0.45 : 1 }}
                                            />
                                        </div>
                                        <div
                                            className="ma-panel flex-1"
                                            style={{
                                                ['--accent']: isNext ? '#fbd000' : d.final ? '#e52521' : '#43b047',
                                                padding: '18px 18px',
                                                opacity: past && !isNext ? 0.72 : 1,
                                            }}
                                        >
                                            <div className="flex flex-wrap items-center gap-3" style={{ marginBottom: 12 }}>
                                                <span
                                                    style={{
                                                        fontSize: 9,
                                                        color: '#000',
                                                        background: isNext ? '#fbd000' : '#e2b96b',
                                                        padding: '7px 9px',
                                                    }}
                                                >
                                                    {d.d}
                                                </span>
                                                {isNext ? (
                                                    <span className="ma-blink" style={{ fontSize: 7, color: '#fbd000' }}>
                                                        &#9654; UP NEXT
                                                    </span>
                                                ) : null}
                                                {d.final ? <span style={{ fontSize: 7, color: '#e52521' }}>MAIN EVENT</span> : null}
                                            </div>
                                            <div style={{ fontSize: 9, color: '#fff', lineHeight: 2.1 }}>{d.label}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ══════════════ ENTRY ══════════════ */}
                <section id="entry" className="ma-section" style={{ scrollMarginTop: 120 }}>
                    <div className="max-w-5xl mx-auto px-4">
                        <SectionHead
                            world="WORLD 1-5"
                            title="ELIGIBILITY & REGISTRATION FEES"
                            sub="REG. FEE ONLY FOR ROUND 2."
                            coinSlot={coinFor('entry')}
                        />
                        <div className="grid sm:grid-cols-3 gap-5">
                            {ENTRY.map((x) => (
                                <div key={x.k} className="ma-panel ma-panel-hover ma-reveal text-center" style={{ ['--accent']: x.c, padding: '30px 18px' }}>
                                    <PixelSprite map={x.icon} style={{ width: 38, height: 38, margin: '0 auto 20px' }} />
                                    <span className="ma-kicker" style={{ ['--accent']: x.c }}>
                                        {x.k}
                                    </span>
                                    <div style={{ fontSize: 'clamp(12px,2.4vw,18px)', color: x.c, marginBottom: 16 }}>{x.v}</div>
                                    <p style={{ fontSize: 8, color: 'var(--ma-body)', margin: 0 }}>{x.s}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════ RULES ══════════════ */}
                <section id="rules" className="ma-section" style={{ scrollMarginTop: 120 }}>
                    <div className="max-w-5xl mx-auto px-4">
                        <SectionHead world="WORLD 1-6" title="RULES & SUBMISSIONS" sub="READ THIS BEFORE YOU BUILD." coinSlot={coinFor('rules')} />
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="ma-panel ma-reveal" style={{ ['--accent']: '#ff2bd1', padding: 'clamp(24px,3vw,32px)' }}>
                                <div className="flex items-center gap-3" style={{ marginBottom: 22 }}>
                                    <PixelSprite map={STAR} style={{ width: 24, height: 24 }} />
                                    <h3 style={{ fontSize: 10, color: '#fff', margin: 0 }}>AI &amp; ASSET RULES</h3>
                                </div>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {AI_RULES.map((r, i) => (
                                        <li key={r} className="flex items-start gap-3" style={{ marginBottom: 18 }}>
                                            <span
                                                className="shrink-0"
                                                style={{ background: '#ff2bd1', color: '#fff', fontSize: 8, padding: '6px 8px', border: '3px solid #000' }}
                                            >
                                                {pad(i + 1)}
                                            </span>
                                            <span style={{ fontSize: 8.5, color: 'var(--ma-body)', lineHeight: 2.4 }}>{r}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="ma-panel ma-reveal" style={{ ['--accent']: '#00e5ff', padding: 'clamp(24px,3vw,32px)' }}>
                                <div className="flex items-center gap-3" style={{ marginBottom: 22 }}>
                                    <PixelSprite map={QBLOCK} style={{ width: 24, height: 24 }} />
                                    <h3 style={{ fontSize: 10, color: '#fff', margin: 0 }}>WHAT YOU SUBMIT</h3>
                                </div>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {SUBMIT_CHECKLIST.map((s) => (
                                        <li key={s} className="flex items-start gap-3" style={{ marginBottom: 15 }}>
                                            <PixelSprite map={COIN} style={{ width: 11, height: 14, flexShrink: 0, marginTop: 4 }} />
                                            <span style={{ fontSize: 8.5, color: 'var(--ma-body)', lineHeight: 2.3 }}>{s}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════════════ PRIZES ══════════════ */}
                <section id="prizes" className="ma-section" style={{ scrollMarginTop: 120 }}>
                    <div className="max-w-5xl mx-auto px-4">
                        <SectionHead world="WORLD 1-7" title="PRIZE POOL ₹40,000" sub="AWARDED ACROSS THE WINNING TEAMS." coinSlot={coinFor('prizes')} />

                        <div className="flex items-end justify-center gap-2 sm:gap-6" style={{ marginBottom: 34 }}>
                            {[
                                { p: '2ND', sprite: MUSHROOM, h: 120, c: '#d8d8e0' },
                                { p: '1ST', sprite: STAR, h: 186, c: '#fbd000' },
                                { p: '3RD', sprite: FLOWER, h: 84, c: '#cd7f32' },
                            ].map((x) => (
                                <div key={x.p} className="ma-reveal flex flex-col items-center" style={{ width: '31%', maxWidth: 200 }}>
                                    <PixelSprite
                                        map={x.sprite}
                                        className={x.p === '1ST' ? 'ma-bob ma-star-hue' : 'ma-bob-sm'}
                                        style={{ width: x.p === '1ST' ? 58 : 44, height: x.p === '1ST' ? 58 : 44, marginBottom: 16 }}
                                    />
                                    <div
                                        className="w-full"
                                        style={{
                                            height: x.h,
                                            backgroundImage: BRICK_TILE,
                                            backgroundSize: '40px 40px',
                                            imageRendering: 'pixelated',
                                        }}
                                    />
                                    <div className="ma-border w-full" style={{ background: '#000', color: x.c, fontSize: 10, padding: '12px 4px', marginTop: 10 }}>
                                        {x.p}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <p className="text-center" style={{ fontSize: 8, color: '#3b1a05' }}>
                            PRIZE BREAKDOWN ANNOUNCED AT THE EVENT.
                        </p>
                    </div>
                </section>

                {/* ══════════════ POSTERS ══════════════ */}
                <section id="posters" className="ma-section" style={{ scrollMarginTop: 120 }}>
                    <div className="max-w-5xl mx-auto px-4">
                        <SectionHead world="BONUS" title="OFFICIAL POSTERS" sub="TAP ANY CARTRIDGE TO ENLARGE." coinSlot={coinFor('posters')} />
                        <div className="grid sm:grid-cols-3 gap-5">
                            {POSTERS.map((p) => (
                                <button
                                    key={p.cap}
                                    type="button"
                                    className="ma-reveal ma-border"
                                    onClick={() => {
                                        play('powerup');
                                        setLightbox(p.src);
                                    }}
                                    style={{ background: '#1b1b26', padding: 12, cursor: 'zoom-in' }}
                                >
                                    <img src={p.src} alt={`Masathon poster — ${p.cap}`} style={{ display: 'block', width: '100%', border: '3px solid #000' }} />
                                    <div style={{ fontSize: 7.5, color: '#fbd000', marginTop: 12 }}>{p.cap}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════ CONTACT ══════════════ */}
                <section id="contact" className="ma-section" style={{ scrollMarginTop: 120 }}>
                    <div className="max-w-4xl mx-auto px-4">
                        <SectionHead world="WORLD 1-8" title="CONTACT US" coinSlot={coinFor('contact')} />
                        <div className="grid sm:grid-cols-2 gap-4">
                            {CONTACTS.map((c) => (
                                <div key={c.name} className="ma-panel ma-panel-hover ma-reveal" style={{ ['--accent']: '#fbd000', padding: '22px 20px' }}>
                                    <div style={{ fontSize: 9.5, color: '#fff', marginBottom: 10 }}>{c.name}</div>
                                    <a href={`tel:${c.phone.replace(/\s/g, '')}`} style={{ fontSize: 8.5, color: '#fbd000', textDecoration: 'none' }}>{c.phone}</a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════ REGISTER / FLAGPOLE ══════════════ */}
                <section id="register" className="ma-section" style={{ scrollMarginTop: 120, paddingBottom: 40 }}>
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <SectionHead world="WORLD 1-C" title="ENTER MASATHON 2026" sub="REGISTRATION CLOSES 21.08.2026." />

                        <div className="ma-panel ma-reveal" style={{ ['--accent']: '#fbd000', padding: 'clamp(26px,4vw,44px)' }}>
                            <div className="grid sm:grid-cols-3 gap-4" style={{ marginBottom: 30 }}>
                                {[
                                    ['IEEE MEMBERS', '₹250 / PERSON'],
                                    ['NON-IEEE', '₹500 / PERSON'],
                                    ['TEAM SIZE', '2–4'],
                                ].map(([k, v]) => (
                                    <div key={k} style={{ background: '#000', padding: '18px 10px', border: '4px solid #1e1e2a' }}>
                                        <div style={{ fontSize: 7, color: '#43b047', marginBottom: 14 }}>{k}</div>
                                        <div style={{ fontSize: 10, color: '#fff' }}>{v}</div>
                                    </div>
                                ))}
                            </div>

                            <a
                                href={REGISTER_URL}
                                target="_blank"
                                rel="noreferrer"
                                className="ma-btn ma-btn-gold"
                                style={{ fontSize: 'clamp(10px,2vw,14px)' }}
                                onClick={() => play('powerup')}
                            >
                                REGISTER YOUR TEAM &#9654;
                            </a>

                            <p style={{ fontSize: 7.5, color: 'var(--ma-muted)', marginTop: 24 }}>
                                ROUND 1 CONCEPT DEADLINE &middot; 16.08.2026
                            </p>
                        </div>
                    </div>

                    {/* flagpole scene — optional flourish, nothing depends on it */}
                    <div className="relative max-w-6xl mx-auto" style={{ height: 330, marginTop: 40 }}>
                        <div className="absolute" style={{ left: '12%', bottom: 0 }}>
                            <PixelFlagpole height={250} flagClass={flagDown ? 'ma-flag-down' : ''} flagStyle={{ ['--drop']: '170px' }} />
                        </div>
                        <div className="absolute" style={{ right: '6%', bottom: 0 }}>
                            <PixelCastle width={200} />
                        </div>
                        <div className="absolute hidden sm:block" style={{ left: '2%', bottom: 0 }}>
                            <div className="ma-mario-jog">
                                <Mario size={84} running={!cleared} />
                            </div>
                        </div>

                        {cleared &&
                            [
                                { l: '30%', b: 230, c: '#fbd000', d: '0s' },
                                { l: '48%', b: 268, c: '#e52521', d: '0.3s' },
                                { l: '62%', b: 214, c: '#43b047', d: '0.6s' },
                            ].map((f, i) => (
                                <div key={i} className="ma-firework absolute" style={{ left: f.l, bottom: f.b, animationDelay: f.d }}>
                                    {[[0, -20], [0, 20], [-20, 0], [20, 0], [-14, -14], [14, -14], [-14, 14], [14, 14]].map(([x, y], k) => (
                                        <span key={k} style={{ position: 'absolute', left: x, top: y, width: 6, height: 6, background: f.c }} />
                                    ))}
                                </div>
                            ))}
                    </div>

                    <div className="text-center px-4">
                        {!cleared ? (
                            <button type="button" className="ma-btn ma-btn-green" onClick={touchFlagpole} style={{ fontSize: 9 }}>
                                &#9654; GRAB THE FLAG
                            </button>
                        ) : (
                            <div className="ma-border inline-block" style={{ background: '#000', padding: '20px 26px' }}>
                                <div className="ma-blink" style={{ fontSize: 'clamp(11px,2.6vw,18px)', color: '#fbd000', marginBottom: 16 }}>
                                    COURSE CLEAR!
                                </div>
                                <p style={{ fontSize: 8, color: '#fff', margin: 0 }}>
                                    COINS FOUND: {pad(coinCount)}/{pad(TOTAL_COINS)}
                                    {allCoins ? ' — PERFECT RUN' : ''}
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* ══════════════ FOOTER STRIP ══════════════ */}
                <section className="relative" style={{ zIndex: 10, paddingBottom: 40 }}>
                    <div className="ma-marquee" style={{ opacity: 0.85 }}>
                        {[0, 1].map((k) => (
                            <span key={k} className="ma-shadow-text ma-nowrap" style={{ fontSize: 13, color: '#fff', paddingRight: 40 }}>
                                IMAGINE &nbsp;.&nbsp; BUILD &nbsp;.&nbsp; PLAY &nbsp;.&nbsp; IMAGINE &nbsp;.&nbsp; BUILD &nbsp;.&nbsp; PLAY &nbsp;.&nbsp;
                            </span>
                        ))}
                    </div>
                    <div className="max-w-4xl mx-auto px-4 text-center" style={{ marginTop: 34 }}>
                        <div className="flex items-center justify-center gap-5 flex-wrap" style={{ marginBottom: 22 }}>
                            <PixelSprite map={MARIO_STAND} style={{ width: 26, height: 34 }} />
                            <PixelSprite map={GOOMBA} style={{ width: 30, height: 30 }} />
                            <PixelSprite map={COIN} className="ma-coin-spin" style={{ width: 19, height: 24 }} />
                            <PixelSprite map={MUSHROOM} style={{ width: 30, height: 30 }} />
                            <PixelSprite map={STAR} className="ma-star-hue" style={{ width: 30, height: 30 }} />
                            <PixelSprite map={USEDBLOCK} style={{ width: 28, height: 28 }} />
                        </div>
                        <p style={{ fontSize: 8, color: '#f3d9c2', lineHeight: 2.4 }}>
                            IEEE MASATHON 2026 &middot; IEEE COMPUTER SOCIETY AU-CEG &middot; IEEE MADRAS SECTION
                            <br />
                            VIVEKANANDA AUDITORIUM, CEG CAMPUS &middot; IMAGINE . BUILD . PLAY
                        </p>
                        <p style={{ fontSize: 6.5, color: '#c9a68c', marginTop: 18 }}>
                            FAN-MADE PIXEL ART DRAWN FOR THIS PAGE. NOT AFFILIATED WITH NINTENDO.
                        </p>
                    </div>
                </section>
            </div>

            {/* ─────────── fixed floor: always standing on the level ─────────── */}
            <div className="ma-floor" aria-hidden="true">
                <div className="ma-floor-grass" />
                <div className="ma-floor-dirt" />
            </div>
            <div className="fixed left-0 w-full pointer-events-none" style={{ bottom: 58, zIndex: 41 }}>
                <div className="ma-run-across">
                    <div className={heroJump ? 'ma-hop' : 'ma-mario-jog'}>
                        <Mario size={72} running={!heroJump} jumping={heroJump} />
                    </div>
                </div>
            </div>
            <div className="fixed left-0 w-full" style={{ bottom: 58, zIndex: 42, pointerEvents: 'none' }}>
                <div className="ma-patrol" style={{ ['--range']: '58vw', animationDuration: '19s', width: 'max-content', marginLeft: '18vw' }}>
                    <button
                        type="button"
                        onClick={stompGoomba}
                        aria-label="Stomp the Goomba"
                        className="ma-waddle"
                        style={{ pointerEvents: 'auto', background: 'none', border: 0, padding: 0, cursor: 'pointer', transformOrigin: 'bottom center' }}
                    >
                        <PixelSprite map={GOOMBA} style={{ width: 40, height: 40 }} />
                    </button>
                </div>
            </div>

            {/* ─────────── poster lightbox ─────────── */}
            {lightbox && (
                <div
                    role="presentation"
                    onClick={() => setLightbox(null)}
                    className="fixed inset-0 flex items-center justify-center p-4"
                    style={{ background: 'rgba(0,0,0,0.94)', zIndex: 9998, cursor: 'zoom-out' }}
                >
                    <img src={lightbox} alt="Masathon poster enlarged" style={{ maxHeight: '86vh', maxWidth: '92vw', border: '6px solid #fbd000' }} />
                    <button type="button" onClick={() => setLightbox(null)} className="ma-btn ma-btn-sm" style={{ position: 'absolute', top: 120, right: 20 }}>
                        CLOSE &times;
                    </button>
                </div>
            )}
        </div>
    );
}
