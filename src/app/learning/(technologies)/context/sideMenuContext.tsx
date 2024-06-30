'use client'

import React, { createContext, useState } from 'react';

const SideMenuContext = createContext({
    menuOpen: false,
    technology: '',
    menuSubject: '',
    setTechnology: (value: string) => {},
    toggleMenu: () => { },
    setMenuSubject: (value: string) => {},
});

export const SideMenuProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [menuOpen, setMenuOpen] = useState(true);
    const [technology, setTechnology] = useState('');
    const [menuSubject, setMenuSubject] = useState('');

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <SideMenuContext.Provider value={{ menuOpen, toggleMenu, technology, setTechnology, menuSubject, setMenuSubject }}>
            {children}
        </SideMenuContext.Provider>
    );
};

export default SideMenuContext;