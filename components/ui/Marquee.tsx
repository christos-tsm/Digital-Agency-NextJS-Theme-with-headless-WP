'use client'

import { sanitizeHTML } from "@/lib/utils/sanitize-html";
import { useEffect, useRef } from "react";

interface MarqueeProps {
    children: React.ReactNode;
    speed?: number;
    className?: string;
    textClassName?: string;
}

export default function Marquee({ children, speed = 0.2, className = 'bg-primary', textClassName = 'text-white' }: MarqueeProps) {
    const marqueeRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number>(3);

    useEffect(() => {
        const parentElement = marqueeRef.current;
        if (!parentElement) return;

        const firstElement = parentElement.children[0] as HTMLElement;
        if (!firstElement) return;

        let i = 0;

        const animate = () => {
            firstElement.style.marginLeft = `-${i}px`;
            if (i > firstElement.clientWidth) {
                i = 0;
            }
            i = i + speed;
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [speed]);

    return (
        <section className={`overflow-hidden flex items-center gap-5 py-5 ${className}`}>
            <div ref={marqueeRef} className="flex items-center gap-2">
                <div className={`text-xl md:text-3xl text-nowrap font-en font-bold leading-none flex items-center gap-5 ${textClassName}`} dangerouslySetInnerHTML={{ __html: sanitizeHTML(children as string) }} />
                <div className={`text-xl md:text-3xl text-nowrap font-en font-bold leading-none flex items-center gap-5 ${textClassName}`} dangerouslySetInnerHTML={{ __html: sanitizeHTML(children as string) }} />
                <div className={`text-xl md:text-3xl text-nowrap font-en font-bold leading-none flex items-center gap-5 ${textClassName}`} dangerouslySetInnerHTML={{ __html: sanitizeHTML(children as string) }} />
            </div>
        </section>
    );
}