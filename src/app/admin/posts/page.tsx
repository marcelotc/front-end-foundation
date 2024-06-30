'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Typography } from "@/components/ui/typography"
import { getMarkdown, postMarkdown, putMarkdown } from '../../utils/supabase/requests';
import TextEditor from '../../learning/(technologies)/components/TextEditor';

interface MarkdownData {
    id: string;
    content: string;
    chapter: string;
}

export default function Posts() {
    const router = useRouter();
    const [markdown, setMarkdown] = useState<MarkdownData[] | null>(null);
    const [technologyPost, setTechnologyPost] = useState('html');
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const { userId, getToken } = useAuth();

    const handleLoadPosts = async () => {
        try {
            setLoading(true);
            const data = await getMarkdown(technologyPost);
            setMarkdown(data as MarkdownData[]);
        } catch (error) {
            console.error('Error loading markdown:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePublish = async ({ chapter, chapterId, content, menu, subject, technology }: any) => {
        try {
            setSubmitting(true);
            const token = await getToken({ template: 'supabase' });
            if (markdown && markdown[0]) {
                await putMarkdown({ userId, token, content, chapter, subject, technology, contentId: markdown[0].id });
            } else {
                await postMarkdown({ userId, token, content, chapterId, chapter, menu, subject, technology });
            }
        } catch (error) {
            console.error('An error occurred:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className='m-[60px] border-solid border-2 border-black p-10'>
            <div className='flex justify-between mb-14'>
                <Typography variant="extra3LargeText" as="h1">
                    Edit post
                </Typography>
                <Button size={"lg"} onClick={() => router.push('/admin')} className='mb-5'>
                    New post
                </Button>
            </div>
            <label>
                Choose Technology posts:
                <select
                    value={technologyPost}
                    className="border border-gray-300 rounded m-3"
                    onChange={(e) => setTechnologyPost(e.target.value)}
                >
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="javascript">JavaScript</option>
                </select>
            </label>
            <Button size={"lg"} onClick={handleLoadPosts} className='mb-5'>
                Load posts
            </Button>
            {markdown && markdown[0] && (
                <TextEditor
                    editorMarkdown={JSON.parse(markdown[0].content)}
                    handlePublish={handlePublish}
                    submitting={submitting}
                />
            )}
        </div>
    );
}