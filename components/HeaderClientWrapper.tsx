"use client";

import { Logs } from "lucide-react";
import { useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import { usePathname } from "next/navigation";

interface HeaderClientWrapperProps {
    mobileMenuContent: React.ReactNode;
    logo: string;
    currentLocale: string;
}

const HeaderClientWrapper = ({ mobileMenuContent, logo, currentLocale }: HeaderClientWrapperProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        return () => {
            document.body.classList.remove('overflow-hidden');
        }

    }, [isMobileMenuOpen, pathname])

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);


    return (
        <>
            <div className="lg:hidden">
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-2"
                    aria-label="Open menu"
                >
                    <Logs color="#fff" />
                </button>
            </div>
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} logo={logo} currentLocale={currentLocale}>
                {mobileMenuContent}
            </MobileMenu>
        </>
    );
};

export default HeaderClientWrapper;