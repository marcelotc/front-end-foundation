import { useContext } from 'react';
import { BookCheck } from 'lucide-react';
import SideMenuContext from '@/app/learning/(technologies)/context/sideMenuContext';
import { Typography } from "@/components/ui/typography";
import { useSaveToLocalStorage } from "@/app/hooks/useSaveToLocalStorage";
import { Toaster } from 'sonner'
import clsx from 'clsx';

import useSubjectNavigation from '@/app/hooks/useSubjectNavigation';
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
    const { menuOpen, loadingContent } = useContext(SideMenuContext);
    const { handleSaveToLearningProgress } = useSaveToLocalStorage();

    return (
        <main className={clsx("flex-1 mr-8 transition-all duration-300",
            menuOpen && "ml-72",
            !menuOpen && "ml-20",
        )}>
            <Typography variant="extra3LargeText" as="h1" className='font-bold'>
                {markdown && markdown.length > 0 && (
                    `${markdown[0]?.chapter} - ${markdown[0]?.subject}`
                )}
            </Typography>
            <div className={clsx("overflow-y-auto bg-gray-100 p-6 mt-5 dark:bg-gray-900 shadow-md")}>
                {children}
            </div>

            <div className='flex justify-center mt-5'>
                {markdown && markdown.length > 0 && (
                    <Button size={"sm"} onClick={() => handleSaveToLearningProgress(markdown[0]?.technology, markdown[0]?.chapter, markdown[0]?.subject)} className='mb-5 bg-green-800'>
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
            <Toaster richColors closeButton />
        </main>
    );
}