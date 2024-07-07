"use client";

import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs';
import { useSession } from '@clerk/clerk-react'
import { Button } from '@/components/ui/button'
import { Typography } from "@/components/ui/typography"
import { useRouter } from 'next/navigation';
import TextEditor from '../learning/(technologies)/components/TextEditor'
import { postMarkdown } from '../utils/supabase/requests';
import { checkUserRole } from '../../utils/userUtils';

export default function Admin() {
    const [submitting, setSubmitting] = useState(false);

    const { userId, getToken } = useAuth();
    const { session } = useSession();
    const router = useRouter();

    const userRole = checkUserRole(session);

    useEffect(() => {
        if (userRole !== 'org:admin' && session !== undefined) {
            router.push('/');
        }
    }, [userRole, session]);

    async function handlePublish({ chapter, chapterId, content, menu, subject, technology }: any) {
        try {
            setSubmitting(true);
            const token = await getToken({ template: 'supabase' });

            const result = await postMarkdown({
                userId,
                token,
                content,
                chapterId,
                chapter,
                menu,
                subject,
                technology
            });

            setSubmitting(false);

            if (result) {
                alert('Content published successfully.');
            } else {
                alert('Failed to publish content. Please check the console for errors.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            alert('An error occurred. Please try again.');
            setSubmitting(false);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className='m-[60px] border-solid border-2 border-black p-10'>
            <div className='flex justify-between mb-14'>
                <Typography variant="extra3LargeText" as="h1">
                    Create new post
                </Typography>
                <Button size={"lg"} onClick={() => router.push('/admin/posts')} className='mb-5'>
                    Edit post
                </Button>
            </div>
            <TextEditor handlePublish={handlePublish} submitting={submitting} />
        </div>
    )
}
