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
                    <Typography variant="extra3LargeText" as="h1" className='font-bold text-center'>
                        Practice time!
                    </Typography>
                    <CodeEditor />
                </>
            )}
        </main>
    );
}
