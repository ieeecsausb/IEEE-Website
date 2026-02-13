"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    href?: string;
    className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            variant = "primary",
            size = "md",
            href,
            className,
            ...props
        },
        ref
    ) => {
        const baseStyles =
            "inline-flex items-center justify-center rounded-full font-semibold transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none";

        const variants = {
            primary:
                "bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20 hover:shadow-primary/40",
            secondary:
                "bg-white text-primary hover:bg-gray-50 border border-transparent shadow-md hover:shadow-lg",
            outline:
                "bg-transparent border-2 border-primary text-primary hover:bg-primary/5",
            ghost: "bg-transparent text-gray-600 hover:text-primary hover:bg-primary/5",
        };

        const sizes = {
            sm: "text-sm px-4 py-2",
            md: "text-base px-8 py-3",
            lg: "text-lg px-10 py-4",
        };

        const motionProps = {
            whileHover: { scale: 1.02, y: -2 },
            whileTap: { scale: 0.98 },
            transition: { type: "spring" as const, stiffness: 400, damping: 10 },
        };

        const classes = cn(
            baseStyles,
            variants[variant],
            sizes[size],
            className
        );

        if (href) {
            return (
                <Link href={href} legacyBehavior>
                    <motion.a className={classes} {...motionProps}>
                        {children}
                    </motion.a>
                </Link>
            );
        }

        return (
            <motion.button
                ref={ref}
                className={classes}
                {...motionProps}
                {...props}
            >
                {children}
            </motion.button>
        );
    }
);

Button.displayName = "Button";
