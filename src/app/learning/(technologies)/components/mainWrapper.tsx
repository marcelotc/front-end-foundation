'use client'

import React, { useContext } from 'react';
import clsx from 'clsx';

import SideMenuContext from '../context/sideMenuContext';

export default function MainWrapper({
    children,
}: {
    children: React.ReactNode
}) {
    const { menuOpen } = useContext(SideMenuContext);

    return (
        <main className={clsx("flex-1 overflow-y-auto ml-72 bg-gray-100 p-6 dark:bg-gray-900 transition-all duration-300",
            menuOpen && "ml-72",
            !menuOpen && "ml-20",
        )}>
            {children}
        </main>
    );
}
