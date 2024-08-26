'use client'

import React, { useContext, useState, useEffect } from 'react';
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

import SideMenuContext, { MenuContentItem } from '../context/sideMenuContext';

interface MainWrapperProps {
    children: React.ReactNode;
    markdown?: Array<{ chapter: string, subject: string }>;
    loadingContent: boolean;
}

interface FlatSubject {
    chapterIndex: number;
    subjectIndex: number;
    subject: string;
    chapterTitle: string;
    technology: string;
}

export default function MainWrapper({
    children,
    markdown,
    loadingContent
}: MainWrapperProps) {
    const { menuOpen, menuContent } = useContext(SideMenuContext);
    const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
    const router = useRouter();

    const flatSubjects: FlatSubject[] = menuContent?.flatMap((chapter: MenuContentItem, chapterIndex: number) =>
        chapter.subjects.map((subject: string, subjectIndex: number) => ({
            chapterIndex,
            subjectIndex,
            subject,
            chapterTitle: chapter.chapter,
            technology: chapter.technology,
        }))
    ) || [];

    useEffect(() => {
        if (flatSubjects.length > 0 && flatSubjects[currentSubjectIndex]) {
            const currentSubject = flatSubjects[currentSubjectIndex];
            markdown = [{
                chapter: currentSubject.chapterTitle,
                subject: currentSubject.subject,
            }];
        }
    }, [currentSubjectIndex, flatSubjects, markdown]);

    function goToSubject(index: number) {
        if (index >= 0 && index < flatSubjects.length) {
            const { subject, chapterTitle, technology } = flatSubjects[index];
            const url = `${technology}?subject=${encodeURIComponent(subject)}&chapter=${encodeURIComponent(chapterTitle)}&technology=${encodeURIComponent(technology)}`;
            router.push(url);
            setCurrentSubjectIndex(index);
        }
    }

    function goToPreviousSubject() {
        if (currentSubjectIndex > 0) {
            goToSubject(currentSubjectIndex - 1);
        }
    }

    function goToNextSubject() {
        if (currentSubjectIndex < flatSubjects.length - 1) {
            goToSubject(currentSubjectIndex + 1);
        }
    }

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

            {!loadingContent ?
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
