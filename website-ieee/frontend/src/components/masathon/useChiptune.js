import { useRef, useCallback, useState } from 'react';

/**
 * Tiny NES-style sound engine built on the Web Audio API.
 * No audio files — every effect is synthesised from square/triangle
 * oscillators and a noise buffer, exactly like the 2A03 chip did it.
 */
export function useChiptune() {
    const ctxRef = useRef(null);
    const [muted, setMuted] = useState(false);
    const mutedRef = useRef(false);

    const ctx = useCallback(() => {
        if (typeof window === 'undefined') return null;
        if (!ctxRef.current) {
            const AC = window.AudioContext || window.webkitAudioContext;
            if (!AC) return null;
            ctxRef.current = new AC();
        }
        if (ctxRef.current.state === 'suspended') ctxRef.current.resume();
        return ctxRef.current;
    }, []);

    const toggleMute = useCallback(() => {
        mutedRef.current = !mutedRef.current;
        setMuted(mutedRef.current);
    }, []);

    /** One square-wave note. */
    const note = useCallback(
        (freq, start, dur, { type = 'square', gain = 0.09, slideTo = null } = {}) => {
            const ac = ctx();
            if (!ac || mutedRef.current) return;
            const t = ac.currentTime + start;
            const osc = ac.createOscillator();
            const g = ac.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, t);
            if (slideTo) osc.frequency.exponentialRampToValueAtTime(Math.max(20, slideTo), t + dur);
            g.gain.setValueAtTime(0.0001, t);
            g.gain.exponentialRampToValueAtTime(gain, t + 0.008);
            g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
            osc.connect(g).connect(ac.destination);
            osc.start(t);
            osc.stop(t + dur + 0.02);
        },
        [ctx],
    );

    /** White-noise burst — used for brick smash / stomp crunch. */
    const noise = useCallback(
        (start, dur, gain = 0.12) => {
            const ac = ctx();
            if (!ac || mutedRef.current) return;
            const t = ac.currentTime + start;
            const frames = Math.floor(ac.sampleRate * dur);
            const buf = ac.createBuffer(1, frames, ac.sampleRate);
            const data = buf.getChannelData(0);
            for (let i = 0; i < frames; i++) data[i] = Math.random() * 2 - 1;
            const src = ac.createBufferSource();
            src.buffer = buf;
            const filter = ac.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(1800, t);
            filter.frequency.exponentialRampToValueAtTime(400, t + dur);
            const g = ac.createGain();
            g.gain.setValueAtTime(gain, t);
            g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
            src.connect(filter).connect(g).connect(ac.destination);
            src.start(t);
            src.stop(t + dur);
        },
        [ctx],
    );

    const play = useCallback(
        (name) => {
            switch (name) {
                case 'coin':
                    note(987.77, 0, 0.07, { gain: 0.08 });
                    note(1318.51, 0.07, 0.42, { gain: 0.08 });
                    break;
                case 'bump':
                    note(240, 0, 0.09, { gain: 0.1, slideTo: 110 });
                    break;
                case 'break':
                    noise(0, 0.22, 0.14);
                    note(320, 0, 0.14, { gain: 0.07, slideTo: 90 });
                    break;
                case 'jump':
                    note(392, 0, 0.16, { gain: 0.08, slideTo: 1046 });
                    break;
                case 'stomp':
                    note(880, 0, 0.05, { gain: 0.08, slideTo: 160 });
                    noise(0, 0.09, 0.07);
                    break;
                case 'powerup':
                    [523, 659, 784, 1046, 1318].forEach((f, i) => note(f, i * 0.055, 0.09, { gain: 0.07 }));
                    break;
                case 'oneup':
                    [1318, 1568, 2637, 2093, 2349, 3136].forEach((f, i) => note(f, i * 0.09, 0.11, { gain: 0.07 }));
                    break;
                case 'warp':
                    for (let i = 0; i < 7; i++) note(1000 - i * 110, i * 0.045, 0.07, { gain: 0.06, type: 'triangle' });
                    break;
                case 'select':
                    note(1046, 0, 0.05, { gain: 0.07 });
                    break;
                case 'pause':
                    note(659, 0, 0.06, { gain: 0.07 });
                    note(523, 0.07, 0.1, { gain: 0.07 });
                    break;
                case 'flag':
                    for (let i = 0; i < 16; i++) note(1600 - i * 88, i * 0.045, 0.06, { gain: 0.05 });
                    break;
                case 'clear': {
                    // Abridged "course clear" fanfare
                    const mel = [
                        [523, 0.0], [659, 0.13], [784, 0.26], [1046, 0.39],
                        [1318, 0.52], [1568, 0.65], [2093, 0.78], [1568, 1.0], [2093, 1.15],
                    ];
                    mel.forEach(([f, t]) => note(f, t, 0.16, { gain: 0.07 }));
                    break;
                }
                default:
                    break;
            }
        },
        [note, noise],
    );

    return { play, muted, toggleMute };
}
