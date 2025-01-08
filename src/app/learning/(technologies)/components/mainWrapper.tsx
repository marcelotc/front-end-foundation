'use client'

import { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import { BookCheck, Copy } from 'lucide-react';
import SideMenuContext from '@/app/learning/(technologies)/context/sideMenuContext';
import { Typography } from "@/components/ui/typography";
import CodeEditor from "@/app/learning/(technologies)/components/CodeEditor";
import { useSaveToLocalStorage } from "@/app/hooks/useSaveToLocalStorage";
import { getCodePracticeByMarkdownContent } from '@/app/utils/supabase/codePracticeRequests';
import ContentOutput from '../components/contentOutput';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

interface MainWrapperProps {
    children: React.ReactNode;
    markdown?: Array<{ id: string, chapter: string, subject: string, technology: string }>;
}

export default function MainWrapper({
    children,
    markdown,
}: MainWrapperProps) {
    const { menuOpen, progressUpdate, setProgressUpdate, loadingContent, setOpenChapters } = useContext(SideMenuContext);
    const { handleSaveToLearningProgress } = useSaveToLocalStorage();
    const [showButton, setShowButton] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [codePractice, setCodePractice] = useState<any[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [htmlCode, setHtmlCode] = useState("<h1>Code your answer!</h1>");
    const [cssCode, setCssCode] = useState("h1 { color: blue; }");
    const [jsCode, setJsCode] = useState("console.log('hello world!');");

    const toggleAnswer = () => {
        setShowAnswer(!showAnswer);
    };

    const isMarkdownEmpty = markdown && markdown.length > 0;

    const handleUpdateAndSaveProgress = () => {
        if (isMarkdownEmpty) {
            handleSaveToLearningProgress(markdown[0]?.technology, markdown[0]?.chapter, markdown[0]?.subject);
            setProgressUpdate(!progressUpdate);
        }
    };

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (!loadingContent) {
            timeout = setTimeout(() => {
                setShowButton(true);
            }, 800);
        } else {
            setShowButton(false);
        }

        return () => clearTimeout(timeout);
    }, [loadingContent]);

    useEffect(() => {
        setOpenChapters([]);
    }, []);

    useEffect(() => {
        setCodePractice(null);
        setHtmlCode("<h1>Code your answer!</h1>");
        setCssCode("h1 { color: blue; }");
        setJsCode("console.log('hello world!');");
        setShowAnswer(false);
        const fetchCodePractice = async () => {
            setLoading(true);
            try {
                const result: any = await getCodePracticeByMarkdownContent(markdown && markdown[0]?.id);
                if (result) {
                    setCodePractice(result);
                } else {
                    console.error('No data found');
                }
            } catch (error) {
                console.error('Error fetching code practice:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCodePractice();
    }, [markdown]);

    const questionData = codePractice && codePractice[0]?.question;
    const parsedQuestionData = typeof questionData === "string" ? JSON.parse(questionData) : questionData;
    const content = JSON.stringify({ content: parsedQuestionData });

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code)
            .then(() => {
                toast.success('Copied to clipboard!');
            })
    };

    return (
        <main className={clsx("flex-1 mr-8 transition-all duration-300",
            menuOpen && "ml-72",
            !menuOpen && "ml-20",
        )}>
            <Typography variant="extra3LargeText" as="h1" className='font-bold'>
                {isMarkdownEmpty && (
                    `${markdown[0]?.chapter} - ${markdown[0]?.subject}`
                )}
            </Typography>
            <div className={clsx("overflow-y-auto bg-gray-100 p-6 mt-5 dark:bg-gray-900 shadow-md")}>
                {children}
            </div>

            <div className='flex justify-center mt-5'>
                {isMarkdownEmpty && showButton && (
                    <Button size={"sm"} onClick={handleUpdateAndSaveProgress} className='mb-5 bg-green-800'>
                        Complete subject
                        &nbsp;
                        <BookCheck />
                    </Button>
                )}
            </div>

            {isMarkdownEmpty && codePractice?.length !== 0 && (
                <>
                    <Typography variant="extra3LargeText" as="h1" className="font-bold text-center">
                        Practice time!
                    </Typography>

                    <div className="bg-gray-100 border-2 border-black rounded-sm p-4 my-4">
                        <ContentOutput content={codePractice ? content : ''} />
                    </div>

                    <CodeEditor
                        htmlCode={htmlCode}
                        cssCode={cssCode}
                        jsCode={jsCode}
                        setHtmlCode={setHtmlCode}
                        setCssCode={setCssCode}
                        setJsCode={setJsCode}
                        correctHtmlCode={codePractice && codePractice[0].correct_html_code}
                        correctCssCode={codePractice && codePractice[0].correct_css_code}
                        correctJsCode={codePractice && codePractice[0].correct_js_code}
                    />

                    <div className="text-center">
                        <Button
                            size="sm"
                            onClick={toggleAnswer}
                            className="mb-5 bg-green-800"
                        >
                            {showAnswer ? 'Hide Answer' : 'Reveal Answer'}
                        </Button>
                    </div>

                    {showAnswer && (
                        <div className="bg-gray-100 p-4 mb-5 rounded-sm">
                            <Typography variant="h4" as="h4" className="font-bold mb-3">
                                Answer:
                            </Typography>
                            {codePractice && codePractice[0].correct_html_code && (
                                <div className="mb-3">
                                    <div className='flex justify-between'>
                                        <Typography variant="h5" as="h5" className="font-semibold">
                                            HTML:
                                        </Typography>
                                        <Button size="sm" onClick={() => handleCopy(codePractice[0].correct_html_code)} className="mb-3">
                                            Copy HTML
                                            &nbsp;
                                            <Copy />
                                        </Button>
                                    </div>
                                    <pre className="bg-white p-3 rounded-sm border border-gray-300 overflow-x-auto">
                                        {codePractice && codePractice[0].correct_html_code}
                                    </pre>
                                </div>
                            )}
                            {codePractice && codePractice[0].correct_css_code && (
                                <div className="mb-3">
                                    <div className='flex justify-between'>
                                        <Typography variant="h5" as="h5" className="font-semibold">
                                            CSS:
                                        </Typography>
                                        <Button size="sm" onClick={() => handleCopy(codePractice[0].correct_html_code)} className="mb-3">
                                            Copy CSS
                                            &nbsp;
                                            <Copy />
                                        </Button>
                                    </div>
                                    <pre className="bg-white p-3 rounded-sm border border-gray-300 overflow-x-auto">
                                        {codePractice && codePractice[0].correct_css_code}
                                    </pre>
                                </div>
                            )}
                            {codePractice && codePractice[0].correct_js_code && (
                                <div className="mb-3">
                                    <div className='flex justify-between'>
                                        <Typography variant="h5" as="h5" className="font-semibold">
                                            JavaScript:
                                        </Typography>
                                        <Button size="sm" onClick={() => handleCopy(codePractice[0].correct_html_code)} className="mb-3">
                                            Copy JavaScript
                                            &nbsp;
                                            <Copy />
                                        </Button>
                                    </div>
                                    <pre className="bg-white p-3 rounded-sm border border-gray-300 overflow-x-auto">
                                        {codePractice && codePractice[0].correct_js_code}
                                    </pre>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </main>
    );
}
