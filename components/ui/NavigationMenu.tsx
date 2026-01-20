import React from 'react'
import Link from 'next/link'
import { getMenuByLocationWithHierarchy } from '@/lib/wordpress/api'
import { convertWpUrlToLocalizedPath } from '@/lib/utils/get-localized-path'
import type { MenuItem } from '@/types/menu'
import type { Locale } from '@/types/locale'
import { MenuLink } from "../generic/MenuLink"

interface NavigationMenuProps {
    locale: Locale
    menuLocation?: string // Default: 'primary'
    navClassName?: string;
    ulClassName?: string;
    liClassName?: string;
    linkClassName?: string;
}

// Recursive component to render menu items with children


const NavigationMenu = async ({ locale, navClassName = "", ulClassName = "", liClassName = "", linkClassName, menuLocation = 'primary' }: NavigationMenuProps) => {
    const menuItems = await getMenuByLocationWithHierarchy(menuLocation, locale)

    if (!menuItems || menuItems.length === 0) {
        return null
    }

    return (
        <nav className={`navigation-menu ${navClassName}`} aria-label="Main navigation">
            <ul className={`${ulClassName}`}>
                {menuItems.map((item) => (
                    <MenuLink key={item.id} item={item} locale={locale} linkClassName={linkClassName} liClassName={liClassName} />
                ))}
            </ul>
        </nav>
    )
}

export default NavigationMenu