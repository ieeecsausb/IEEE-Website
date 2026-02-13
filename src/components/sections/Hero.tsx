"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Logo } from "@/components/ui/Logo";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        // Entrance Animation
        tl.fromTo(logoRef.current,
            { scale: 0.5, opacity: 0, rotationX: 45 },
            { scale: 1, opacity: 1, rotationX: 0, duration: 1.5, ease: "power4.out" }
        )
            .fromTo(textRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
                "-=0.5"
            )
            .fromTo(indicatorRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1 },
                "-=0.5"
            );

        // Magnetic / Parallax Effect on Mouse Move
        const handleMouseMove = (e: MouseEvent) => {
            if (!logoRef.current) return;
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            // Calculate mouse position relative to center (-1 to 1)
            const x = (clientX / innerWidth) * 2 - 1;
            const y = (clientY / innerHeight) * 2 - 1;

            gsap.to(logoRef.current, {
                x: x * 30, // Move 30px
                y: y * 30,
                rotationY: x * 10, // Tilt 10 degrees
                rotationX: -y * 10,
                duration: 0.5,
                ease: "power2.out"
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Scroll Indicator Bounce
        gsap.to(indicatorRef.current, {
            y: 10,
            repeat: -1,
            yoyo: true,
            duration: 1.5,
            ease: "sine.inOut"
        });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-[#fafafa]">
            {/* Minimalist Background Subtle Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-[#f5f5f5] to-[#eeeeee] opacity-80 pointer-events-none" />

            <div className="container px-4 relative z-10 flex flex-col items-center">
                {/* 3D Container for Logo */}
                <div
                    ref={logoRef}
                    className="w-full max-w-[700px] perspective-1000"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <Logo className="w-full h-auto drop-shadow-2xl" />
                </div>

                {/* Minimalist Text */}
                <div ref={textRef} className="mt-12 text-center">
                    <h2 className="text-xl md:text-3xl font-light tracking-[0.2em] text-gray-800 uppercase">
                        Advancing Technology for Humanity
                    </h2>

                    {/* Minimal clean button */}
                    <div className="mt-12">
                        <Button
                            href="/events"
                            variant="ghost"
                            size="lg"
                            className="text-primary hover:bg-primary/5 tracking-widest uppercase text-sm border-b border-transparent hover:border-primary transition-all rounded-none px-8"
                        >
                            Enter Experience
                        </Button>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div ref={indicatorRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400">
                <ChevronDown size={32} />
            </div>
        </section>
    );
};
