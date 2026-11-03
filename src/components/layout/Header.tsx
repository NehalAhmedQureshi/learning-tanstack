import { NAV_LINKS } from '@/constants/nav-links'
import Link from 'next/link'
import React from 'react'

export default function Header() {
    return (
        <div className="main flex justify-between min-w-full px-4 py-2">
            <div className="logo text-2xl font-bold">Learning Nextjs</div>
            <div className="nav-links flex gap-4 items-center">
                {NAV_LINKS.map((link) => (
                    <Link key={link.href} href={link.href}>
                        {link.label}
                    </Link>
                ))}
            </div>
        </div>
    )
}
