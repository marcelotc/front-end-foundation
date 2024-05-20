'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';

import MainWrapper from '../components/mainWrapper';
import ContentOutput from '../components/contentOutput'
import { getMarkdown } from '../../../utils/supabase/requests';

interface MarkdownData {
    id: string; 
    content: string;
}

export default function Html() {
    const { userId, getToken } = useAuth();
    const [markdown, setMarkdown] = useState<MarkdownData[] | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!userId) {
            return;
        }

        const loadMarkdown = async () => {
            try {
                setLoading(true); 
                const token = await getToken({ template: 'supabase' });
                const data = await getMarkdown({ userId, token });
                setMarkdown(data as MarkdownData[]);
            } catch (error) {
                console.error('Error loading markdown:', error);
            } finally {
                setLoading(false); 
            }
        };

        loadMarkdown();
    }, [userId, getToken]);

    if (!userId) {
        return null;
    }

    return (
        <MainWrapper>
            <ContentOutput content={markdown ? markdown[0]?.content : ''} />
        </MainWrapper>
    );
}