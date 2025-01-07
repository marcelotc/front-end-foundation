'use client'

import { useContext, useEffect, useState } from 'react';
import { BookCheck } from 'lucide-react';
import SideMenuContext from '@/app/learning/(technologies)/context/sideMenuContext';
import { Typography } from "@/components/ui/typography";
import CodeEditor from "@/app/learning/(technologies)/components/CodeEditor";
import { useSaveToLocalStorage } from "@/app/hooks/useSaveToLocalStorage";
import { Toaster } from 'sonner';
import clsx from 'clsx';

import { Button } from '@/components/ui/button';

interface MainWrapperProps {
    children: React.ReactNode;
    markdown?: Array<{ chapter: string, subject: string, technology: string }>;
}

export default function MainWrapper({
    children,
    markdown,
}: MainWrapperProps) {
    /*const {
    goToPreviousSubject,
    goToNextSubject,
    technologyUrl
} = useSubjectNavigation();*/
    const { menuOpen, progressUpdate, setProgressUpdate, loadingContent, setOpenChapters } = useContext(SideMenuContext);
    const { handleSaveToLearningProgress } = useSaveToLocalStorage();
    const [showButton, setShowButton] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);

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

            <div className='flex justify-center my-5'>
                {isMarkdownEmpty && showButton && (
                    <Button size={"sm"} onClick={handleUpdateAndSaveProgress} className='mb-5 bg-green-800'>
                        Complete subject
                        &nbsp;
                        <BookCheck />
                    </Button>
                )}
            </div>

            {/*{technologyUrl !== null && !loadingContent ?
                (
                    <div className='flex justify-between mt-5'>
                        <Button size={"sm"} onClick={goToPreviousSubject} className='mb-5'>
                            Previous
                        </Button>
                        <Button size={"sm"} onClick={goToNextSubject} className='mb-5'>
                            Next
                        </Button>
                    </div>
                ) : null}*/}


            {isMarkdownEmpty && (
                <>
                    <Typography variant="extra3LargeText" as="h1" className="font-bold text-center">
                        Practice time!
                    </Typography>

                    <div className="bg-black text-white text-center rounded-sm p-4 my-4">
                        <p className="text-lg">
                            Implement a basic HTML structure in the code editor below that includes:
                            <ul className="text-left mt-2">
                                <li>A <code>&lt;header&gt;</code> element with a website title and a navigation menu containing links to "Home", "About", and "Services".</li>
                                <li>A <code>&lt;main&gt;</code> section with a paragraph and a section titled "About Us" describing your company.</li>
                                <li>A <code>&lt;footer&gt;</code> with a copyright notice.</li>
                            </ul>
                            Use semantic tags like <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, and <code>&lt;footer&gt;</code>.
                        </p>
                    </div>

                    <CodeEditor />

                    <div className="text-center mt-4">
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
                            <Typography variant="h4" as="h4" className="font-bold">
                                Answer:
                            </Typography>
                            <pre className='p-3'>
                                {`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
</head>
<body>
    <header>
        <h1>My Website</h1>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="about">
            <h2>About Us</h2>
            <p>Learn more about our company and what we do.</p>
        </section>
    </main>

    <footer>
        <p>&copy; 2025 My Website</p>
    </footer>
</body>
</html>`}
                            </pre>
                        </div>
                    )}
                </>
            )}
        </main>
    );
}
