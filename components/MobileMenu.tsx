"use client";

import { CircleX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from 'react'
import LanguageSwitcher from "./LanguageSwitcher";

interface MobileMenuProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    logo: string;
    currentLocale: string;
}

const MobileMenu = ({ children, isOpen, onClose, logo, currentLocale }: MobileMenuProps) => {
    return (
        <div className={`fixed flex flex-col top-0 left-0 w-full bg-foreground z-20 h-full transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className="container mx-auto flex justify-between items-center py-2 md:py-10 border-b border-b-white/10 mb-10">
                <div className="flex-1 max-w-[200px] flex">
                    <Link href={'/'}>
                        <Image src={logo} width={141} height={45} alt={'MediaMind Logo'} className="w-[141px] h-[45px]" />
                    </Link>
                </div>
                <div className="flex-1 max-w-[200px] flex justify-end gap-5 items-center">
                    <LanguageSwitcher currentLocale={currentLocale as "en" | "el"} key={currentLocale} />
                    <span className="text-white inline-flex cursor-pointer w-10 h-10 p-2" onClick={onClose}>
                        <CircleX />
                    </span>
                </div>
            </div>
            <div className="flex flex-col flex-1">
                {children}
            </div>
        </div>
    )
}

export default MobileMenu