'use client';

import { useEffect, useState } from 'react';
import { Typography } from "@/components/ui/typography";
import { getQuizzesByTechnology } from '@/app/utils/supabase/quizzRequest';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface QuizPageProps {
    params: {
        technology: string;
    };
}

export default function QuizPage({ params }: QuizPageProps) {
    const { technology } = params;
    const normalizedTech =
        technology.toLowerCase() === 'javascript' ? 'JavaScript' :
            technology.toUpperCase();

    const [quizzes, setQuizzes] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedQuiz, setExpandedQuiz] = useState<number | null>(null);

    useEffect(() => {
        const fetchQuizzes = async () => {
            if (!technology) return;

            setLoading(true);
            try {
                const quizData = await getQuizzesByTechnology(normalizedTech);
                setQuizzes(quizData);
            } catch (err) {
                setError('Error fetching quizzes.');
            } finally {
                setLoading(false);
            }
        };

        if (technology) {
            fetchQuizzes();
        }
    }, [technology]);

    const isImageUrl = (url: string) => {
        return url.includes('supabase.co/storage');
    };

    const handleAnswerSelect = (isCorrect: boolean, event: React.MouseEvent) => {
        event.stopPropagation();
        const parentElement = event.currentTarget;
        if (isCorrect) {
            parentElement.classList.add('bg-green-700');
        } else {
            parentElement.classList.add('bg-red-700');
        }
        parentElement.classList.remove('hover:bg-gray-600');
    };

    const handleQuizToggle = (quizIndex: number) => {
        setExpandedQuiz(expandedQuiz === quizIndex ? null : quizIndex);
    };

    if (loading) {
        return (
            <section className="flex flex-col h-full justify-center items-center mt-20">
                <div className='flex items-center justify-center gap-5'>
                    <Typography variant="extra3LargeText">
                        Loading Quizzes...
                    </Typography>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="flex flex-col h-full justify-center items-center mt-20">
                <Typography variant="extra3LargeText" className="text-red-500">
                    {error}
                </Typography>
            </section>
        );
    }

    return (
        <section
            className={`flex flex-col font-bold px-4 md:px-6 mt-10 ${expandedQuiz === null ? 'h-full' : ''}`}
        >
            <Typography variant="extra3LargeText" className="text-center mb-6">
                Quizzes on {technology}
            </Typography>

            {quizzes.length > 0 ? (
                quizzes.map((quiz, index) => (
                    <div
                        key={index}
                        className="bg-[#1b1b1d] p-8 mb-10 rounded-lg cursor-pointer"
                        onClick={() => handleQuizToggle(index)}
                    >
                        <div className="flex justify-between items-center">
                            {expandedQuiz !== index ? (
                                <h1 className="text-xl font-semibold text-white dark:text-white">
                                    {quiz.title}
                                </h1>
                            ) : (<div></div>)}
                            {expandedQuiz === index ? (
                                <ChevronUp size={24} color="#fff" />
                            ) : (
                                <ChevronDown size={24} color="#fff" />
                            )}
                        </div>

                        {expandedQuiz === index && (
                            <div className='text-center mb-10'>
                                <Typography variant="h2" className="font-bold mb-1 text-white">
                                    {quiz.title}
                                </Typography>
                                <Typography className="text-gray-400 mb-4" variant="h6">
                                    {quiz.description}
                                </Typography>
                            </div>
                        )}

                        {expandedQuiz === index && (
                            <div>
                                {quiz.quiz_questions.map((question: any, idx: number) => (
                                    <div key={idx} className="mb-4">
                                        <Typography className="font-semibold text-white">
                                            {question.question}
                                        </Typography>
                                        <ul className="ml-4 list-disc text-gray-400">
                                            {question.choices.map((choice: string, idx: number) => (
                                                <div key={idx}>
                                                    <li
                                                        className="text-sm hover:bg-gray-600 cursor-pointer rounded-sm"
                                                        onClick={(e) => handleAnswerSelect(choice === question.correct_answer, e)}
                                                    >
                                                        {isImageUrl(choice) ? (
                                                            <img
                                                                src={choice}
                                                                alt={`Choice ${idx + 1}`}
                                                                className="max-w-2xl rounded-md"
                                                            />
                                                        ) : (
                                                            <div className='flex gap-3 rounded-sm p-2 mb-2'>
                                                                <div
                                                                    className='font-bold text-gray-300'
                                                                >
                                                                    Option {idx + 1}:
                                                                </div>
                                                                <div
                                                                    className='font-bold text-white'
                                                                >
                                                                    {choice}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </li>
                                                </div>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <Typography className="text-center text-gray-500">
                    No quizzes available for this technology.
                </Typography>
            )}
        </section>
    );
}
