'use client';

import { useEffect, useState } from 'react';
import { Typography } from "@/components/ui/typography";
import { getQuizzesByTechnology } from '../utils/supabase/quizzRequest';
import { Construction, Hammer } from 'lucide-react';

export default function Quiz() {
    const [quizzes, setQuizzes] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuizzes = async () => {
            const technology = 'HTML'; 
            try {
                const quizData = await getQuizzesByTechnology(technology);
                setQuizzes(quizData);
            } catch (err) {
                setError('Error fetching quizzes.');
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    if (loading) {
        return (
            <section className="flex flex-col h-full justify-center items-center mt-20">
                <div className='flex items-center justify-center gap-5'>
                    <Typography variant="extra3LargeText" as="h1">
                        Loading Quizzes...
                    </Typography>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="flex flex-col h-full justify-center items-center mt-20">
                <Typography variant="extra3LargeText" as="h1" className="text-red-500">
                    {error}
                </Typography>
            </section>
        );
    }

    return (
        <section className="flex flex-col px-4 md:px-6 mt-20">
            <Typography variant="extra3LargeText" as="h1" className="text-center mb-6">
                Quizzes on JavaScript
            </Typography>

            {quizzes.length > 0 ? (
                quizzes.map((quiz) => (
                    <div key={quiz.id} className="bg-white p-6 rounded-lg shadow-md mb-8">
                        <Typography variant="extraLargeText" as="h2" className="font-bold mb-3">
                            {quiz.title}
                        </Typography>
                        <Typography className="text-gray-600 mb-4">
                            {quiz.description}
                        </Typography>

                        <div>
                            {quiz.quiz_questions.map((question: any, index: number) => (
                                <div key={index} className="mb-4">
                                    <Typography className="font-semibold">
                                        {question.question}
                                    </Typography>
                                    <ul className="ml-4 list-disc text-gray-700">
                                        {question.choices.map((choice: string, idx: number) => (
                                            <li key={idx} className="text-sm">{choice}</li>
                                        ))}
                                    </ul>
                                    <Typography className="text-sm text-gray-500 mt-2">
                                        Correct Answer: {question.correct_answer}
                                    </Typography>
                                </div>
                            ))}
                        </div>
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
