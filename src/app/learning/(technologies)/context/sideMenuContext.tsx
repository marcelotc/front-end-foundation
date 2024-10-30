'use client'

import React, { createContext, useState, Dispatch, SetStateAction } from 'react';

export interface MarkdownData {
    id: string;
    content: string;
    chapter: string;
    subject: string; 
    technology: string; 
}

export interface MenuContentItem {
    chapter: string;
    subjects: string[];
    technology: string;
}

interface SideMenuContextType {
    menuOpen: boolean;
    technology: string;
    loadingContent: boolean;
    markdown: MarkdownData[] | null;
    menuContent: MenuContentItem[] | null;
    progressUpdate: boolean;
    setTechnology: (value: string) => void;
    setMarkdown: Dispatch<SetStateAction<MarkdownData[] | null>>;
    toggleMenu: () => void;
    setLoadingContent: (value: boolean) => void;
    setMenuContent: Dispatch<SetStateAction<MenuContentItem[] | null>>;
    setProgressUpdate: Dispatch<SetStateAction<boolean>>;
}

const SideMenuContext = createContext<SideMenuContextType>({
    menuOpen: false,
    technology: '',
    markdown: null,
    loadingContent: false,
    menuContent: null,
    progressUpdate: false,
    setMarkdown: () => {},
    setTechnology: () => {},
    toggleMenu: () => {},
    setLoadingContent: () => {},
    setMenuContent: () => {},
    setProgressUpdate: () => {},
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
    const [menuContent, setMenuContent] = useState<MenuContentItem[] | null>(null);
    const [progressUpdate, setProgressUpdate] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <SideMenuContext.Provider value={{ menuOpen, toggleMenu, technology, setTechnology, markdown, setMarkdown, setLoadingContent, loadingContent, menuContent, setMenuContent, progressUpdate, setProgressUpdate }}>
            {children}
        </SideMenuContext.Provider>
    );
};

export default SideMenuContext;
