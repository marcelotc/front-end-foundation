'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';

import MainWrapper from '../components/mainWrapper';
import ContenOutput from '../components/contenOutput'
import { getMarkdown } from '../../../utils/supabase/requests';

export default function Html() {
    const { userId, getToken } = useAuth();
    const [markdown, setMakdown] = useState();
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
                setMakdown(data as any);
            } catch (error) {
                console.error('Error loading todos:', error);
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
            <ContenOutput content={markdown && markdown[0].content} />
        </MainWrapper>
    );
}
