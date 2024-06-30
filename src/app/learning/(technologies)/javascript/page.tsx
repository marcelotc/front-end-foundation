'use client';

import React, { useContext, useEffect, useState } from 'react';
import SideMenuContext from '../context/sideMenuContext';
import { SkeletonCard } from "../components/contentSkeleton"

import MainWrapper from '../components/mainWrapper';
import ContentOutput from '../components/contentOutput'
import { getMarkdownBySubject } from '../../../utils/supabase/requests';

interface MarkdownData {
    id: string;
    content: string;
    chapter: string;
}

export default function JavaScript() {
    const [markdown, setMarkdown] = useState<MarkdownData[] | null>(null);
    const [loading, setLoading] = useState(false);
    const { setTechnology, menuSubject } = useContext(SideMenuContext);

    useEffect(() => {
        const loadMarkdown = async () => {
            try {
                setLoading(true);
                const data = await getMarkdownBySubject(menuSubject);
                setMarkdown(data as MarkdownData[]);
            } catch (error) {
                console.error('Error loading markdown:', error);
            } finally {
                setLoading(false);
            }
        };
        setTechnology('javascript')
        loadMarkdown();
    }, [menuSubject]);

    return (
        <MainWrapper markdown={markdown}>
            {loading || !markdown ? <SkeletonCard /> : <ContentOutput content={markdown ? markdown[0]?.content : ''} />}
        </MainWrapper>
    );
}