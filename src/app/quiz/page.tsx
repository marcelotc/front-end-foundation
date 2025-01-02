'use client';

import { useEffect, useState } from 'react';
import { Typography } from "@/components/ui/typography";
import { getQuizzesByTechnology } from '../utils/supabase/quizzRequest';

export default function Quiz() {
    const [quizzes, setQuizzes] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedTechnology, setSelectedTechnology] = useState<string | null>(null);
    const [isTechnologySelected, setIsTechnologySelected] = useState<boolean>(false);

    const technologies = ['HTML', 'CSS', 'JavaScript'];

    useEffect(() => {
        const fetchQuizzes = async () => {
            if (!selectedTechnology) return;

            setLoading(true);
            try {
                const quizData = await getQuizzesByTechnology(selectedTechnology);
                setQuizzes(quizData);
            } catch (err) {
                setError('Error fetching quizzes.');
            } finally {
                setLoading(false);
            }
        };

        if (isTechnologySelected && selectedTechnology) {
            fetchQuizzes();
        }
    }, [selectedTechnology, isTechnologySelected]);

    const isImageUrl = (url: string) => {
        return url.includes('supabase.co/storage');
    };

    const handleTechnologySelect = (technology: string) => {
        setSelectedTechnology(technology);
        setIsTechnologySelected(true);
    };

    const handleAnswerSelect = (isCorrect: boolean, event: any) => {
        if (isCorrect) {
            event.target.classList.add('bg-green-500');
        } else {
            event.target.classList.add('bg-red-200');
        }
    };

    if (!isTechnologySelected) {
        return (
            <section className="flex flex-col h-full items-center mt-20">
                <Typography variant="extra3LargeText" as="h1" className="mb-4">
                    Select a Technology to Start
                </Typography>
                <div className="flex justify-center gap-6">
                    {technologies.map((tech, index) => (
                        <div
                            key={index}
                            onClick={() => handleTechnologySelect(tech)}
                            className="flex bg-[#1b1b1d] items-center justify-center w-full sm:w-[300px] md:w-[250px] h-[150px] rounded-xl hover:opacity-95 cursor-pointer">
                            <Typography variant="largeText" as="h1" className="text-white">
                                {tech}
                            </Typography>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

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
        <section className="flex flex-col px-4 md:px-6 mt-10">
            <Typography variant="extra3LargeText" as="h1" className="text-center mb-6">
                Quizzes on {selectedTechnology}
            </Typography>

            {quizzes.length > 0 ? (
                quizzes.map((quiz) => (
                    <div key={quiz.id} className="bg-slate-50 p-6 rounded-lg shadow-md mb-8">
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
                                            <div>
                                                <li
                                                    key={idx}
                                                    className="text-sm hover:bg-gray-200 cursor-pointer rounded-sm"
                                                    onClick={(e) => handleAnswerSelect(choice === question.correct_answer, e)}>
                                                    {isImageUrl(choice) ? (
                                                        <img
                                                            src={choice}
                                                            alt={`Choice ${idx + 1}`}
                                                            className="max-w-2xl rounded-md"
                                                        />
                                                    ) : (
                                                        <div className='flex gap-3 rounded-sm p-2 mb-2'>
                                                            <div className='font-bold'>Option {idx + 1}:</div>
                                                            <div>{choice}</div>
                                                        </div>
                                                    )}
                                                </li>
                                            </div>
                                        ))}
                                    </ul>
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
