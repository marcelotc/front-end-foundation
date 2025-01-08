"use client";

import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { uploadImage } from '@/app/utils/supabase/contentRequests';
import { CircleArrowLeft } from 'lucide-react'
import { useAuth } from '@clerk/nextjs';
import { useSession } from '@clerk/clerk-react'
import { Button } from '@/components/ui/button'
import { Typography } from "@/components/ui/typography"
import { useRouter } from 'next/navigation';
import TextEditor from '../learning/(technologies)/components/TextEditor'
import { postMarkdown } from '../utils/supabase/contentRequests';
import { postCodePractice } from '../utils/supabase/codePracticeRequests';
import { postQuiz, getAllQuizzes, deleteQuiz } from '../utils/supabase/quizzRequest';
import { getChaptersAndSubjects } from '../utils/supabase/contentRequests';
import { deleteCodePracticeByMarkdownId } from '../utils/supabase/codePracticeRequests';
import { checkUserRole } from '../../utils/userUtils';
import CodeEditor from "@/app/learning/(technologies)/components/CodeEditor";

export default function Admin() {
    const [submitting, setSubmitting] = useState(false);
    const [publishSwitch, setPublishSwitch] = useState('');
    const [quizTitle, setQuizTitle] = useState('');
    const [questions, setQuestions] = useState([
        { question: '', options: [''], correctAnswerIndex: 0 },
    ]);
    const [technology, setTechnology] = useState('');
    const [description, setDescription] = useState('');
    const [quizzes, setQuizzes] = useState<any[]>([]);
    const [htmlCode, setHtmlCode] = useState("<h1>Hello World!</h1>");
    const [cssCode, setCssCode] = useState("h1 { color: blue; }");
    const [jsCode, setJsCode] = useState("console.log('hello world!');");
    const [markdownContent, setMarkdownContent] = useState<any[]>([]);
    const [markdownContentId, setMarkdownContentId] = useState();
    const [selectedtechnology, setSelectedtechnology] = useState("html");
    const [selectedmarkdownContentRow, setSelectedmarkdownContentRow] = useState(null);

    const { userId, getToken } = useAuth();
    const { session } = useSession();
    const router = useRouter();

    const userRole = checkUserRole(session);

    useEffect(() => {
        if (userRole !== 'org:admin' && session !== undefined) {
            router.push('/');
        }
    }, [userRole, session]);

    useEffect(() => {
        const fetchChapters = async () => {
            const fetchedChapters = await getChaptersAndSubjects(selectedtechnology);
            if (fetchedChapters) {
                setMarkdownContent(fetchedChapters);
            }
        };

        fetchChapters();
    }, [selectedtechnology]);

    async function handlePublish({ chapter, chapterId, content, menu, subject, technology, difficulty }: any) {
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
                technology,
                difficulty
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
        );
    };


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

    const addOption = (questionIndex: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options.push('');
        setQuestions(updatedQuestions);
    };

    const removeOption = (questionIndex: number, optionIndex: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options = updatedQuestions[questionIndex].options.filter(
            (_, i) => i !== optionIndex
        );
        setQuestions(updatedQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { question: '', options: [''], correctAnswerIndex: 0 }]);
    };

    const removeQuestion = (index: number) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    const handleSubmitQuiz = async () => {
        if (!quizTitle || !technology || !description || questions.some(q => !q.question || q.options.some(o => !o))) {
            alert('Please complete all fields.');
            return;
        }

        try {
            setSubmitting(true);
            const token = await getToken({ template: 'supabase' });

            const result = await postQuiz({
                userId,
                token,
                technology,
                title: quizTitle,
                description,
                questions: questions.map(q => ({
                    text: q.question,
                    correctAnswer: q.options[q.correctAnswerIndex],
                    choices: q.options,
                })),
            });

            if (result) {
                alert('Quiz created successfully.');
                setQuizTitle('');
                setTechnology('');
                setDescription('');
                setQuestions([{ question: '', options: [''], correctAnswerIndex: 0 }]);
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

    const handleAddImageToOption = async (questionIndex: number, optionIndex: number) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.onchange = async (e: any) => {
            const file = e.target.files[0];
            const newUuid = uuidv4();

            if (file) {
                try {
                    const token = await getToken({ template: 'supabase' });
                    await uploadImage({ image: file, token, imageId: newUuid });

                    const url = `https://bsafsspqwxcudibbkjps.supabase.co/storage/v1/object/public/images/${newUuid}`;

                    const updatedQuestions = [...questions];
                    updatedQuestions[questionIndex].options[optionIndex] = url;
                    setQuestions(updatedQuestions);
                } catch (error) {
                    console.error('Error uploading image:', error);
                    alert('Failed to upload image. Please try again.');
                }
            }
        };

        input.click();
    };

    const listQuizzes = async () => {
        const token: any = await getToken({ template: 'supabase' });
        const fetchedQuizzes = await getAllQuizzes(token);

        if (fetchedQuizzes.length === 0) {
            console.log('No quizzes found.');
        } else {
            setQuizzes(fetchedQuizzes);
        }
    };

    const handleDeleteQuiz = async (quizId: string) => {
        const token: any = await getToken({ template: 'supabase' });
        const success = await deleteQuiz({ quizId, token });
        if (success) {
            setQuizzes(prevQuizzes => prevQuizzes.filter(quiz => quiz.id !== quizId));
        }
    };

    const handlePostCodePractice = async ({ content }: any) => {

        try {
            const userToken: any = await getToken({ template: 'supabase' });

            await postCodePractice({
                token: userToken,
                markdownContentId: markdownContentId,
                userId: userId,
                question: content,
                correctHtmlCode: htmlCode,
                correctCssCode: cssCode,
                correctJsCode: jsCode,
            });

            alert('Code practice saved successfully!');
        } catch (error) {
            console.error('Error saving code practice:', error);
            alert('An error occurred while saving the code practice. Please try again.');
        }
    };

    const handleSelectMarkdownId = (id: any) => {
        setMarkdownContentId(id);
        setSelectedmarkdownContentRow(id);

    };
    const handleDeleteCodePracticeByMarkdownId = async (markdownContentId: any) => {
        try {
            await deleteCodePracticeByMarkdownId(markdownContentId);
            alert("Code practice deleted successfully!");
        } catch (error) {
            alert("Error while deleting Code practice");
        }
    };

    const publishQuizz = () => {
        return (
            <div className="m-[60px] border-solid border-2 border-black p-10">
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
                    <select
                        value={technology}
                        onChange={(e) => setTechnology(e.target.value)}
                        className="border p-2 rounded-md"
                    >
                        <option value="">Select Technology</option>
                        <option value="HTML">HTML</option>
                        <option value="CSS">CSS</option>
                        <option value="JavaScript">JavaScript</option>
                    </select>
                    <textarea
                        placeholder="Quiz Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                                        onChange={(e) =>
                                            handleOptionChange(questionIndex, optionIndex, e.target.value)
                                        }
                                        className="border p-2 rounded-md w-full"
                                    />
                                    <button
                                        onClick={() => handleAddImageToOption(questionIndex, optionIndex)}
                                        className="text-blue-500"
                                    >
                                        Add Image
                                    </button>
                                    <input
                                        type="radio"
                                        name={`correctAnswer-${questionIndex}`}
                                        checked={q.correctAnswerIndex === optionIndex}
                                        onChange={() => handleCorrectAnswerChange(questionIndex, optionIndex)}
                                    />
                                    <button
                                        onClick={() => removeOption(questionIndex, optionIndex)}
                                        className="text-red-500"
                                    >
                                        Remove Option
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => addOption(questionIndex)}
                                className="mt-2 text-blue-500"
                            >
                                Add Option
                            </button>
                            <button onClick={addQuestion} className="text-blue-500">Add Question</button>
                            <button
                                onClick={() => removeQuestion(questionIndex)}
                                className="mt-2 text-red-500"
                            >
                                Remove Question
                            </button>
                        </div>
                    ))}
                    <Button onClick={handleSubmitQuiz} disabled={submitting} size="lg">
                        {submitting ? 'Creating...' : 'Create Quiz'}
                    </Button>
                    <button onClick={() => listQuizzes()} className="text-blue-500">List Quizzes</button>

                    <div className="mt-6">
                        <Typography variant="extra3LargeText" as="h2">Quizzes</Typography>
                        <ul>
                            {quizzes.map((quiz) => (
                                <li key={quiz.id} className="flex items-center gap-6 mt-6">
                                    <button
                                        onClick={() => handleDeleteQuiz(quiz.id)}
                                        className="ml-4 text-red-500 hover:text-red-700"
                                    >
                                        Delete
                                    </button>
                                    <Typography variant={'h6'}>{quiz.title} - {quiz.description}</Typography>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    };

    const renderPublish = () => {
        if (publishSwitch === 'content') {
            return (
                <div>
                    {publishContent()}
                    <div className="m-[60px] border-solid border-2 border-black p-10">
                        <div className="mt-6">
                            <label htmlFor="codeType" className="mb-2 block">
                                Select technology:
                            </label>
                            <select
                                id="codeType"
                                value={selectedtechnology}
                                onChange={(e) => setSelectedtechnology(e.target.value)}
                                className="p-2 border rounded"
                            >
                                <option value="html">HTML</option>
                                <option value="css">CSS</option>
                                <option value="js">JS</option>
                            </select>

                            <div className="mt-10">
                                <h3 className="font-bold text-lg mb-4">Chapters and Subjects:</h3>
                                <ul className="list-none pl-0">
                                    {markdownContent.map((item) => (
                                        <li
                                            key={item.id}
                                            className={`mb-2 flex items-center space-x-4 p-4 rounded-md ${selectedmarkdownContentRow === item.id ? 'bg-gray-300' : ''}`}
                                        >
                                            <span><strong>Chapter:</strong> {item.chapter}</span>
                                            <span><strong>Subject:</strong> {item.subject}</span>

                                            <button
                                                className="bg-black text-white px-4 py-2 rounded"
                                                onClick={() => handleSelectMarkdownId(item.id)}
                                            >
                                                Select
                                            </button>

                                            <button
                                                className="bg-red-600 text-white px-4 py-2 rounded"
                                                onClick={() => handleDeleteCodePracticeByMarkdownId(item.id)}
                                            >
                                                Delete
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <CodeEditor
                            htmlCode={htmlCode}
                            cssCode={cssCode}
                            jsCode={jsCode}
                            setHtmlCode={setHtmlCode}
                            setCssCode={setCssCode}
                            setJsCode={setJsCode}
                        />

                        <label className='mb-6 block'>
                            Code practice question:
                        </label>

                        <TextEditor
                            handlePublish={handlePostCodePractice}
                            submitting={submitting}
                            isCodePractice={true}
                        />
                    </div>
                </div>
            );

        }

        if (publishSwitch === 'quizz') {
            return publishQuizz();
        }

        return (
            <div className='m-[60px] border-solid border-2 border-black p-10'>
                <div className='flex justify-evenly mb-14'>
                    <div className='bg-black hover:opacity-90 text-white p-20 rounded-md cursor-pointer' onClick={() => setPublishSwitch('content')}>Publish Content</div>
                    <div className='bg-black hover:opacity-90 text-white p-20 rounded-md cursor-pointer' onClick={() => setPublishSwitch('quizz')}>Publish Quizz</div>
                </div>
            </div>
        );
    };

    return (
        renderPublish()
    );
}
