"use client";

import { useEffect, useState } from 'react'
import { CircleArrowLeft } from 'lucide-react'
import { useAuth } from '@clerk/nextjs';
import { useSession } from '@clerk/clerk-react'
import { Button } from '@/components/ui/button'
import { Typography } from "@/components/ui/typography"
import { useRouter } from 'next/navigation';
import TextEditor from '../learning/(technologies)/components/TextEditor'
import { postMarkdown } from '../utils/supabase/contentRequests';
import { postQuiz } from '../utils/supabase/quizzRequest';
import { checkUserRole } from '../../utils/userUtils';

export default function Admin() {
    const [submitting, setSubmitting] = useState(false);
    const [publishSwitch, setPublishSwitch] = useState('');
    const [quizTitle, setQuizTitle] = useState('');
    const [questions, setQuestions] = useState([
        { question: '', options: ['', '', '', ''], correctAnswerIndex: 0 },
    ]);

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

    const publishContent = () => {
        return (
            <div className='m-[60px] border-solid border-2 border-black p-10'>
                <CircleArrowLeft size={30} onClick={() => setPublishSwitch('')} className='cursor-pointer' />
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

    const publishQuizz = () => {

        const handleQuestionChange = (index: number, value: string) => {
            const updatedQuestions = [...questions];
            updatedQuestions[index].question = value;
            setQuestions(updatedQuestions);
        };
    
        const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
            const updatedQuestions = [...questions];
            updatedQuestions[questionIndex].options[optionIndex] = value;
            setQuestions(updatedQuestions);
        };
    
        const handleCorrectAnswerChange = (questionIndex: number, value: number) => {
            const updatedQuestions = [...questions];
            updatedQuestions[questionIndex].correctAnswerIndex = value;
            setQuestions(updatedQuestions);
        };
    
        const addQuestion = () => {
            setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswerIndex: 0 }]);
        };
    
        const removeQuestion = (index: number) => {
            setQuestions(questions.filter((_, i) => i !== index));
        };
    
        const handleSubmitQuiz = async () => {
            if (!quizTitle || questions.some(q => !q.question || q.options.some(o => !o))) {
                alert('Please complete all fields.');
                return;
            }
    
            try {
                setSubmitting(true);
                const token = await getToken({ template: 'supabase' });
    
                // Using the postQuiz function here
                const result = await postQuiz({
                    userId,
                    token,
                    technology: 'HTML', // You can adjust this as needed
                    title: quizTitle,
                    description: 'Test your knowledge of HTML basics', // You can adjust this description as needed
                    questions: questions.map(q => ({
                        text: q.question,
                        correctAnswer: q.options[q.correctAnswerIndex],
                        choices: q.options,
                    })),
                });
    
                if (result) {
                    alert('Quiz created successfully.');
                    setQuizTitle('');
                    setQuestions([{ question: '', options: ['', '', '', ''], correctAnswerIndex: 0 }]);
                } else {
                    alert('Failed to create quiz. Please try again.');
                }
            } catch (error) {
                console.error('Error creating quiz:', error);
                alert('An error occurred. Please try again.');
            } finally {
                setSubmitting(false);
            }
        };
    
        return (
            <div className='m-[60px] border-solid border-2 border-black p-10'>
                <CircleArrowLeft size={30} onClick={() => setPublishSwitch('')} className='cursor-pointer' />
                <div className='flex flex-col gap-6'>
                    <Typography variant="extra3LargeText" as="h1">Create New Quiz</Typography>
                    <input
                        type="text"
                        placeholder="Quiz Title"
                        value={quizTitle}
                        onChange={(e) => setQuizTitle(e.target.value)}
                        className="border p-2 rounded-md"
                    />
                    {questions.map((q, questionIndex) => (
                        <div key={questionIndex} className="border p-4 rounded-md">
                            <input
                                type="text"
                                placeholder={`Question ${questionIndex + 1}`}
                                value={q.question}
                                onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                                className="border p-2 rounded-md w-full mb-2"
                            />
                            {q.options.map((option, optionIndex) => (
                                <div key={optionIndex} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder={`Option ${optionIndex + 1}`}
                                        value={option}
                                        onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                                        className="border p-2 rounded-md w-full"
                                    />
                                    <input
                                        type="radio"
                                        name={`correctAnswer-${questionIndex}`}
                                        checked={q.correctAnswerIndex === optionIndex}
                                        onChange={() => handleCorrectAnswerChange(questionIndex, optionIndex)}
                                    />
                                </div>
                            ))}
                            <button onClick={() => removeQuestion(questionIndex)} className="mt-2 text-red-500">Remove Question</button>
                        </div>
                    ))}
                    <button onClick={addQuestion} className="text-blue-500">Add Question</button>
                    <Button onClick={handleSubmitQuiz} disabled={submitting} size="lg">
                        {submitting ? 'Creating...' : 'Create Quiz'}
                    </Button>
                </div>
            </div>
        );
    };

    const renderPublish = () => {
        if (publishSwitch === 'content') {
            return publishContent();
        }

        if (publishSwitch === 'quizz') {
            return publishQuizz();
        }

        return (
            <div className='m-[60px] border-solid border-2 border-black p-10'>
                <div className='flex justify-evenly mb-14'>
                    <div className='bg-black hover:opacity-90 text-white p-20 rounded-md cursor-pointer h:b' onClick={() => setPublishSwitch('content')}>Publish Content</div>
                    <div className='bg-black hover:opacity-90 text-white p-20 rounded-md cursor-pointer' onClick={() => setPublishSwitch('quizz')}>Publish Quizz</div>
                </div>
            </div>
        )

    }

    return (
        renderPublish()
    )
}
