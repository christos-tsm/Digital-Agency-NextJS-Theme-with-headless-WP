import { LucideCircleArrowOutUpRight } from "lucide-react";
import Link from "next/link"
import React from 'react'

interface PrimaryCTAInterface {
    children: React.ReactNode;
    href: string;
    hasArrowIcon?: boolean;
    className?: string;
}

const PrimaryCTA = ({ href, children, hasArrowIcon = false, className = "" }: PrimaryCTAInterface) => {
    return (
        <Link href={href} className={`cta ${!hasArrowIcon ? 'cta--primary' : 'cta--arrow'} group ${className}`}>
            {hasArrowIcon ?
                <span className="cta-arrow-container group-hover:[&>svg]:rotate-45 [&>svg]:duration-300">
                    <LucideCircleArrowOutUpRight />
                </span>
                : null}
            {children}
        </Link>
    )
}

export default PrimaryCTA