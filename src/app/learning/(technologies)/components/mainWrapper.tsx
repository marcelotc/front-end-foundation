import { useContext, useState, useEffect } from 'react';
import SideMenuContext from '@/app/learning/(technologies)/context/sideMenuContext';
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import clsx from 'clsx';

import useSubjectNavigation from '@/app/hooks/useSubjectNavigation';

interface MainWrapperProps {
    children: React.ReactNode;
    markdown?: Array<{ chapter: string, subject: string }>;
}

export default function MainWrapper({
    children,
    markdown,
}: MainWrapperProps) {
    const {
        goToPreviousSubject,
        goToNextSubject,
        technologyUrl
    } = useSubjectNavigation();
    const { menuOpen } = useContext(SideMenuContext);

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

            {technologyUrl !== null ?
                (
                    <div className='flex justify-between mt-5'>
                        <Button size={"sm"} onClick={goToPreviousSubject} className='mb-5'>
                            Previous
                        </Button>
                        <Button size={"sm"} onClick={goToNextSubject} className='mb-5'>
                            Next
                        </Button>
                    </div>
                ) : null}
        </main>
    );
}