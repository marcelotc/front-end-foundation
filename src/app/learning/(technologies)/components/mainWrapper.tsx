'use client'

import { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import { BookCheck, Copy, Lightbulb, EyeOff } from 'lucide-react';
import SideMenuContext from '@/app/learning/(technologies)/context/sideMenuContext';
import { Typography } from "@/components/ui/typography";
import CodeEditor from "@/app/learning/(technologies)/components/CodeEditor";
import { useSaveToLocalStorage } from "@/app/hooks/useSaveToLocalStorage";
import { getCodePracticeByMarkdownContent } from '@/app/utils/supabase/codePracticeRequests';
import ContentOutput from '../components/contentOutput';
import { toast } from 'sonner';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/formatDate';

interface MainWrapperProps {
    children: React.ReactNode;
    markdown?: Array<{ id: string, chapter: string, subject: string, technology: string, created_at: string, difficulty: string }>;
}

export default function MainWrapper({
    children,
    markdown,
}: MainWrapperProps) {
    const { menuOpen, progressUpdate, setProgressUpdate, loadingContent, setOpenChapters } = useContext(SideMenuContext);
    const { handleSaveToLearningProgress } = useSaveToLocalStorage();
    const [showAnswer, setShowAnswer] = useState(false);
    const [dontshowDialog, setdontShowDialog] = useState(false);
    const [dontShowAgain, setDontShowAgain] = useState(false);
    const [codePractice, setCodePractice] = useState<any[] | null>(null);
    const [htmlCode, setHtmlCode] = useState("<h1>Code your answer!</h1>");
    const [cssCode, setCssCode] = useState("h1 { color: blue; }");
    const [jsCode, setJsCode] = useState("console.log('hello world!');");

    const isMarkdownEmpty = markdown && markdown.length > 0;
    
    const handleUpdateAndSaveProgress = () => {
        if (isMarkdownEmpty) {
            handleSaveToLearningProgress(markdown[0]?.technology, markdown[0]?.chapter, markdown[0]?.subject);
            setProgressUpdate(!progressUpdate);
        }
    };

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
            try {
                const result: any = await getCodePracticeByMarkdownContent(markdown && markdown[0]?.id);
                if (result) {
                    setCodePractice(result);
                } else {
                    console.error('No data found');
                }
            } catch (error) {
                console.error('Error fetching code practice:', error);
            }
        };
        fetchCodePractice();
    }, [markdown]);

    useEffect(() => {
        const dontShow: any = localStorage.getItem('dontShowRevealAnswerDialog');
        setdontShowDialog(!!dontShow);
    }, [showAnswer]);

    const questionData = codePractice && codePractice[0]?.question;
    const parsedQuestionData = typeof questionData === "string" ? JSON.parse(questionData) : questionData;
    const content = JSON.stringify({ content: parsedQuestionData });

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code)
            .then(() => {
                toast.info('Copied to clipboard!');
            })
    };

    const handleDontShowAgainChange = () => {
        setDontShowAgain(!dontShowAgain);
    };

    const handleRevealAnswer = () => {
        if (dontShowAgain) {
            localStorage.setItem('dontShowRevealAnswerDialog', 'true');
        }
        setShowAnswer(true);
    };

    const toggleAnswer = () => {
        setShowAnswer(!showAnswer);
    };

    return (
        <main className={clsx("flex-1 mr-8 transition-all duration-300",
            menuOpen && "ml-72",
            !menuOpen && "ml-20",
        )}>
            {isMarkdownEmpty && (
                <>
                    <Typography variant="extra3LargeText" as="h1" className='font-bold mb-5'>
                        <span className='bg-[#1b1b1d] text-white p-2 rounded-sm'>{markdown[0]?.chapter}</span> - <span className='bg-[#1b1b1d] text-white p-2 rounded-sm'>{markdown[0]?.subject}</span>
                    </Typography>
                    <div className='flex justify-between mt-9 mb-6'>
                    <Typography variant="smallText" as="p">
                        <span className='bg-[#1b1b1d] text-white p-2 rounded-sm'>Difficulty: {markdown[0]?.difficulty}</span>
                    </Typography>
                    <Typography variant="smallText" as="p">
                        <span className='bg-[#1b1b1d] text-white p-2 rounded-sm'>Post date: {formatDate(markdown[0]?.created_at)}</span>
                    </Typography>
                    </div>
                </>
            )}
            <div className={clsx("overflow-y-auto bg-gray-100 p-6 dark:bg-gray-900 shadow-md mb-5")}>
                {children}
            </div>
            {isMarkdownEmpty && codePractice?.length !== 0 && (
                <div className='bg-gray-100 shadow-md rounded-sm p-6 my-5'>
                    <Typography variant="extra3LargeText" as="h1" className="font-bold text-center">
                        <span className='bg-[#1b1b1d] text-white p-2 rounded-sm'>Practice time!</span>
                    </Typography>

                    <div className="bg-gray-100 border-2 border-black rounded-sm p-4 my-6">
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
                        {!dontshowDialog && (
                            <>
                                {!showAnswer && (
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                size="lg"
                                                className="w-full bg-blue-500"
                                            >
                                                Reveal Answer
                                                &nbsp;
                                                <Lightbulb />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure to reveal the answer?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Before you reveal the answer, it is highly recommended that you try yourself first!
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <div className="flex items-center">
                                                <Checkbox
                                                    checked={dontShowAgain}
                                                    onCheckedChange={handleDontShowAgainChange}
                                                    className="mr-2"
                                                />
                                                <label>Don't show this message again</label>
                                            </div>
                                            <AlertDialogFooter>
                                                <AlertDialogAction>Ok I will try first!</AlertDialogAction>
                                                <AlertDialogAction onClick={handleRevealAnswer}>Reveal Answer</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                )}

                                {showAnswer && (
                                    <Button
                                        size="lg"
                                        onClick={toggleAnswer}
                                        className="w-full bg-blue-500"
                                    >
                                        Hide Answer
                                        &nbsp;
                                        <EyeOff />
                                    </Button>
                                )}
                            </>
                        )}
                        {dontshowDialog && (
                            <Button
                                size="lg"
                                onClick={toggleAnswer}
                                className={"w-full bg-blue-500"}
                            >
                                {showAnswer ? (<>

                                    Hide Answer
                                    &nbsp;
                                    <EyeOff />
                                </>
                                ) :
                                    (<>

                                        Reveal Answer
                                        &nbsp;
                                        <Lightbulb />
                                    </>
                                    )}

                            </Button>
                        )}
                        <div className='flex justify-center mt-5'>
                            {isMarkdownEmpty && (
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button size={"lg"} className='w-full mt-5 bg-green-800'>
                                            Complete subject
                                            &nbsp;
                                            <BookCheck />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Subject completion</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                By confirming, I acknowledge completing the subject and practice coding challenge. I am ready to mark this subject as completed and move to the next topic                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogAction>Close</AlertDialogAction>
                                            <AlertDialogAction onClick={handleUpdateAndSaveProgress}>Complete subject!</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            )}
                        </div>
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
                                        <Button size="sm" onClick={() => handleCopy(codePractice[0].correct_css_code)} className="mb-3">
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
                                        <Button size="sm" onClick={() => handleCopy(codePractice[0].correct_js_code)} className="mb-3">
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
                </div>
            )}
        </main>
    );
}
