'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { getTodos } from '../utils/supabase/requests';

const Feed = () => {
    const { userId, getToken } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!userId) {
            // User is not authenticated, do nothing
            return;
        }

        const loadTodos = async () => {
            try {
                setLoading(true); // Set loading state to true
                const token = await getToken({ template: 'supabase' });
                const data = await getTodos({ userId, token });
                setPosts(data as any);
            } catch (error) {
                console.error('Error loading todos:', error);
            } finally {
                setLoading(false); // Set loading state to false, regardless of success or failure
            }
        };

        loadTodos();
    }, [userId, getToken]);

    if (!userId) {
        // User is not authenticated, return null or show a message
        return null;
    }

    return (
        <section>
            {loading ? (
                <div>Loading...</div>
            ) : (
                posts.map((post: any) => (
                    <div className='border-2 p-2 gap-3 m-10' key={post._id}>
                        {post.todo} <br/>
                        {post.tag}
                    </div>
                ))
            )}
        </section>
    );
};

export default Feed;