"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ children, className, hoverEffect = true, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                className={cn(
                    "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden",
                    className
                )}
                whileHover={
                    hoverEffect
                        ? {
                            y: -8,
                            boxShadow: "0 20px 40px -5px rgba(0, 0, 0, 0.1)",
                        }
                        : undefined
                }
                transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);

Card.displayName = "Card";
