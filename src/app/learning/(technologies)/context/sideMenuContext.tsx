'use client'

import React, { createContext, useState, Dispatch, SetStateAction } from 'react';

export interface MarkdownData {
    id: string;
    content: string;
    chapter: string;
}

interface SideMenuContextType {
    menuOpen: boolean;
    technology: string;
    loadingContent: boolean;
    markdown: MarkdownData[] | null;
    setTechnology: (value: string) => void;
    setMarkdown: Dispatch<SetStateAction<MarkdownData[] | null>>
    toggleMenu: () => void;
    setLoadingContent: (value: boolean) => void;
}

const SideMenuContext = createContext<SideMenuContextType>({
    menuOpen: false,
    technology: '',
    markdown: null,
    loadingContent: false,
    setMarkdown: () => {},
    setTechnology: () => {},
    toggleMenu: () => {},
    setLoadingContent: () => {},
});

export const SideMenuProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [menuOpen, setMenuOpen] = useState(true);
    const [technology, setTechnology] = useState('');
    const [markdown, setMarkdown] = useState<MarkdownData[] | null>(null);
    const [loadingContent, setLoadingContent] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    return (
        <SideMenuContext.Provider value={{ menuOpen, toggleMenu, technology, setTechnology, markdown, setMarkdown, setLoadingContent, loadingContent }}>
            {children}
        </SideMenuContext.Provider>
    );
};

export default SideMenuContext;