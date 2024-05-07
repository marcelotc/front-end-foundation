'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { postTodo } from '../utils/supabase/requests';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';

const CreateToDo = () => {
  const router = useRouter();
  const { userId, getToken } = useAuth();

  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ todo: '', tag: '' });

  const createTodo = async (e: any) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const token = await getToken({ template: 'supabase' });
      const posts = await postTodo({ e, userId, token });
      setFormData(posts as any);
      if (posts) {
        router.push('/todos/feed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className='flex justify-center items-center w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{`Post`} Todos</span>
      </h1>
      <form
        onSubmit={createTodo}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <textarea
            value={formData?.todo}
            onChange={(e) => setFormData({ ...formData, todo: e.target.value })}
            placeholder='Write your Todos here'
            required
            className='form_textarea border-2'
          />
        </label>

        <label>
          <input
            value={formData?.tag}
            onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
            type='text'
            placeholder='#Tag'
            required
            className='border-2'
          />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-balck'
          >
            {submitting ? `${`Post`}ing...` : `Post`}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateToDo;