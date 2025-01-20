'use client'

import React, { createContext, useState, Dispatch, SetStateAction } from 'react';

export interface MarkdownData {
    id: string;
    content: string;
    chapter: string;
    subject: string;
    technology: string;
    created_at: string;
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
    openChapters: string[];
    setTechnology: (value: string) => void;
    setMarkdown: Dispatch<SetStateAction<MarkdownData[] | null>>;
    toggleMenu: () => void;
    setLoadingContent: (value: boolean) => void;
    setMenuContent: Dispatch<SetStateAction<MenuContentItem[] | null>>;
    setProgressUpdate: Dispatch<SetStateAction<boolean>>;
    setOpenChapters: Dispatch<SetStateAction<string[]>>;
}

const SideMenuContext = createContext<SideMenuContextType>({
    menuOpen: false,
    technology: '',
    markdown: null,
    loadingContent: false,
    menuContent: null,
    progressUpdate: false,
    openChapters: [''],
    setMarkdown: () => { },
    setTechnology: () => { },
    toggleMenu: () => { },
    setLoadingContent: () => { },
    setMenuContent: () => { },
    setProgressUpdate: () => { },
    setOpenChapters: () => { },
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
    const [openChapters, setOpenChapters] = useState<string[]>([]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <SideMenuContext.Provider value={{ menuOpen, toggleMenu, technology, setTechnology, openChapters, setOpenChapters, markdown, setMarkdown, setLoadingContent, loadingContent, menuContent, setMenuContent, progressUpdate, setProgressUpdate }}>
            {children}
        </SideMenuContext.Provider>
    );
};

export default SideMenuContext;
