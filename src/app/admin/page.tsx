"use client";

import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs';
import { useSession } from '@clerk/clerk-react'
import { useRouter } from 'next/navigation';
import TextEditor from '../learning/(technologies)/components/TextEditor'
import { postMarkdown } from '../utils/supabase/requests';
import { checkUserRole } from '../../utils/userUtils';

export default function MainHeader() {
    const [submitting, setSubmitting] = useState(false);
    const [textEditorContent, setTextEditorContent] = useState();

    const { userId, getToken } = useAuth();
    const { session } = useSession();
    const router = useRouter();

    const userRole = checkUserRole(session);

    useEffect(() => {
        if (userRole !== 'org:admin' && userRole !== null) {
            router.push('/');
        }
    }, [userRole]);

    async function handlePublish(content: any) {
        try {
            setSubmitting(true);
            const token = await getToken({ template: 'supabase' });
            const posts = await postMarkdown({ userId, token, content });
            console.log('posts log', posts);

        } catch (error) {
            console.error('An error occurred:', error);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className='m-[60px] border-solid border-2 border-black p-10'>
            <TextEditor handlePublish={handlePublish} />
        </div>
    )
}
