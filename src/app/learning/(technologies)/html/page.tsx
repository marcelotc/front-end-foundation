'use client';

import { useEffect, useState } from 'react';
import { SkeletonCard } from "../components/contentSkeleton"

import MainWrapper from '../components/mainWrapper';
import ContentOutput from '../components/contentOutput'
import { getMarkdown } from '../../../utils/supabase/requests';

interface MarkdownData {
    id: string;
    content: string;
}

export default function Html() {
    const [markdown, setMarkdown] = useState<MarkdownData[] | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadMarkdown = async () => {
            try {
                setLoading(true);
                const data = await getMarkdown();
                setMarkdown(data as MarkdownData[]);
            } catch (error) {
                console.error('Error loading markdown:', error);
            } finally {
                setLoading(false);
            }
        };

        loadMarkdown();
    }, []);

    return (
        <MainWrapper>
            {loading || !markdown ? <SkeletonCard /> : <ContentOutput content={markdown ? markdown[0]?.content : ''} />}
        </MainWrapper>
    );
}