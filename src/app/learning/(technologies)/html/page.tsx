'use client';

import React, { useContext, useEffect, useState } from 'react';
import SideMenuContext from '../context/sideMenuContext';
import { SkeletonCard } from "../components/contentSkeleton"

import MainWrapper from '../components/mainWrapper';
import ContentOutput from '../components/contentOutput'
import { getMarkdown } from '../../../utils/supabase/requests';

interface MarkdownData {
    id: string;
    content: string;
    chapter: string;
}

export default function Html() {
    const [markdown, setMarkdown] = useState<MarkdownData[] | null>(null);
    const [loading, setLoading] = useState(false);
    const { setTechnology } = useContext(SideMenuContext);

    useEffect(() => {
        const loadMarkdown = async () => {
            try {
                setLoading(true);
                const data = await getMarkdown('html');
                setMarkdown(data as MarkdownData[]);
            } catch (error) {
                console.error('Error loading markdown:', error);
            } finally {
                setLoading(false);
            }
        };
        setTechnology('html')
        loadMarkdown();
    }, []);

    return (
        <MainWrapper markdown={markdown}>
            {loading || !markdown ? <SkeletonCard /> : <ContentOutput content={markdown ? markdown[0]?.content : ''} />}
        </MainWrapper>
    );
}