'use client'

import React, { createContext, useState } from 'react';

const SideMenuContext = createContext({
    menuOpen: false,
    toggleMenu: () => { }
});

export const SideMenuProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [menuOpen, setMenuOpen] = useState(true);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <SideMenuContext.Provider value={{ menuOpen, toggleMenu }}>
            {children}
        </SideMenuContext.Provider>
    );
};

export default SideMenuContext;