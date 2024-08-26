import { useContext, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SideMenuContext, { MenuContentItem } from '@/app/learning/(technologies)/context/sideMenuContext';

interface FlatSubject {
    chapterIndex: number;
    subjectIndex: number;
    subject: string;
    chapterTitle: string;
    technology: string;
}

export default function useSubjectNavigation() {
    const { menuContent } = useContext(SideMenuContext);
    const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
    const router = useRouter();
    const searchParams = useSearchParams();
    const technologyUrl = searchParams.get('technology');

    const flatSubjects: FlatSubject[] = menuContent?.flatMap((chapter: MenuContentItem, chapterIndex: number) =>
        chapter.subjects.map((subject: string, subjectIndex: number) => ({
            chapterIndex,
            subjectIndex,
            subject,
            chapterTitle: chapter.chapter,
            technology: chapter.technology,
        }))
    ) || [];

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

    return {
        currentSubjectIndex,
        goToSubject,
        goToPreviousSubject,
        goToNextSubject,
        technologyUrl,
        flatSubjects
    };
}