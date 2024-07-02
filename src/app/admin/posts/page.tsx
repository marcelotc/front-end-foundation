'use client';

import React, { useState, useEffect } from 'react';
import { Trash2Icon } from "lucide-react";
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Typography } from "@/components/ui/typography"
import { getMarkdownBySubjectTechnologyChapter, putMarkdown, getMenuChapters, getMenuChaptersSubjects, deleteSubjectFromMenu } from '../../utils/supabase/requests';
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
    const [chapters, setChapters] = useState<string[]>([]);
    const [subjects, setSubjects] = useState<string[]>([]);
    const [selectedChapter, setSelectedChapter] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const { userId, getToken } = useAuth();

    const handleLoadPosts = async () => {
        try {
            const data = await getMarkdownBySubjectTechnologyChapter(selectedSubject, technologyPost, selectedChapter);
            setMarkdown(data as MarkdownData[]);
        } catch (error) {
            console.error('Error loading markdown:', error);
        } finally {
        }
    };

    const handlePublish = async ({ content }: any) => {
        try {
            setSubmitting(true);
            const token = await getToken({ template: 'supabase' });

            if (markdown && markdown[0]) {
                const result = await putMarkdown({
                    userId,
                    token,
                    content,
                    selectedChapter,
                    selectedSubject,
                    technologyPost,
                    contentId: markdown[0].id
                });

                if (result) {
                    alert('Content updated successfully.');
                } else {
                    alert('Failed to update content. Please check the console for errors.');
                }
            } else {
                alert('No markdown content found to update.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        const fetchChapters = async () => {
            const fetchedChapters = await getMenuChapters(technologyPost);
            const chapterArray = fetchedChapters.map(ch => ch.chapter);
            setChapters(chapterArray);
        };

        fetchChapters();
    }, [technologyPost]);

    useEffect(() => {
        const fetchSubjects = async () => {
            const fetchedSubjects = await getMenuChaptersSubjects(technologyPost, selectedChapter);
            const subjectArray = fetchedSubjects.map(item => item.subjects).flat();
            setSubjects(subjectArray);
        };

        fetchSubjects();
    }, [technologyPost, selectedChapter]);

    const handleDelete = async () => {
        try {
            const token = await getToken({ template: 'supabase' });

            const result = await deleteSubjectFromMenu({
                userId,
                token,
                chapter: selectedChapter,
                technology: technologyPost,
                subject: selectedSubject,
                contentId: markdown && markdown[0].id
            });

            if (result) {
                alert('Subject and corresponding markdown content deleted successfully.');
            } else {
                alert('Failed to delete subject or markdown content. Please check the console for errors.');
            }
        } catch (error) {
            console.error('Error in handleDelete:', error);
            alert('An error occurred. Please try again.');
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
            <div className='flex gap-6'>
                <div>
                    <label>
                        Technology:
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
                    <label>
                        Chapters:
                        <select
                            value={selectedChapter}
                            className="border border-gray-300 rounded m-3"
                            onChange={(e) => {
                                setSelectedChapter(e.target.value)
                                setSelectedSubject('')
                            }}
                        >
                            <option value="" disabled>Select a chapter</option>
                            {chapters.map((ch, index) => (
                                <option key={index} value={ch}>
                                    {ch}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Subjects:
                        <select
                            value={selectedSubject}
                            className="border border-gray-300 rounded m-3"
                            onChange={(e) => setSelectedSubject(e.target.value)}
                        >
                            <option value="" disabled>Select a subject</option>
                            {subjects.map((sub, index) => (
                                <option key={index} value={sub}>
                                    {sub}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <Button size={"lg"} onClick={handleLoadPosts} className='mb-5' disabled={!selectedChapter || !selectedSubject || !technologyPost}>
                    Load posts
                </Button>
                <Button size={"lg"} onClick={() => handleDelete()} disabled={!selectedChapter || !selectedSubject || !technologyPost}>
                    Delete post &#8287;&#8287; <Trash2Icon color="red" size={20} />
                </Button>
            </div>
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