'use client'

import React, { useContext } from 'react';
import { Typography } from "@/components/ui/typography"
import clsx from 'clsx';

import SideMenuContext from '../context/sideMenuContext';

export default function MainWrapper({
    children,
    markdown,
}: {
    children: React.ReactNode,
    markdown?: any
}) {
    const { menuOpen } = useContext(SideMenuContext);

    return (
        <main className={clsx("flex-1 mr-8 transition-all duration-300",
            menuOpen && "ml-72",
            !menuOpen && "ml-20",
        )}>
            <Typography variant="extra3LargeText" as="h1" className='font-bold'>
                {markdown && markdown.length > 0 && (
                    `${markdown[0]?.chapter} - ${markdown[0]?.subject}`
                )}
            </Typography>
            <div className={clsx("overflow-y-auto bg-gray-100 p-6 mt-5 dark:bg-gray-900 shadow-md")}>
                {children}
            </div>
        </main>
    );
}
