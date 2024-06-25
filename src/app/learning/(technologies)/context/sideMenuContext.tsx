'use client'

import React, { createContext, useState } from 'react';

const SideMenuContext = createContext({
    menuOpen: false,
    technology: '',
    setTechnology: (value: string) => {},
    toggleMenu: () => { }
});

export const SideMenuProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [menuOpen, setMenuOpen] = useState(true);
    const [technology, setTechnology] = useState('');

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <SideMenuContext.Provider value={{ menuOpen, toggleMenu, technology, setTechnology }}>
            {children}
        </SideMenuContext.Provider>
    );
};

export default SideMenuContext;