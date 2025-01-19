import { toast } from 'sonner';

export function useSaveToLocalStorage() {

    const handleSaveToLearningPath = () => { };

    const handleSaveToRoadMap = (sectionsData: any) => {
        const savedProgress = localStorage.getItem('learningProgress');

        const learningProgress = savedProgress
            ? JSON.parse(savedProgress)
            : {
                html: { chapters: [] },
                css: { chapters: [] },
                javascript: { chapters: [] }
            };

        const updateProgressForTechnology = (technology: string) => {
            const technologyData = sectionsData[technology];

            if (technologyData) {
                technologyData.forEach((section: any) => {
                    const chapterProgress = learningProgress[technology]?.chapters.find(
                        (ch: { name: string }) => ch.name === section.title
                    );

                    if (chapterProgress) {
                        section.subjects.forEach((subject: any) => {
                            if (chapterProgress.subjectsConcluded.includes(subject.name)) {
                                subject.checked = true;
                            }
                        });
                    }
                });

                const totalSubjects = technologyData.reduce(
                    (sum: number, section: any) => sum + section.subjects.length,
                    0
                );
                const completedSubjects = technologyData.reduce(
                    (sum: number, section: any) =>
                        sum + section.subjects.filter((subject: any) => subject.checked).length,
                    0
                );

                return totalSubjects > 0 ? (completedSubjects / totalSubjects) * 100 : 0;
            }

            return 0;
        };

        const progressValues = {
            html: updateProgressForTechnology('html'),
            css: updateProgressForTechnology('css'),
            javascript: updateProgressForTechnology('javascript')
        };

        localStorage.setItem('learningProgress', JSON.stringify(learningProgress));
        return { progressValues, sectionsData };
    };

    const handleSaveToQuizz = () => { };

    const handleSaveToLearningProgress = (technology: string, chapter: string, subject: string) => {
        const savedProgress = localStorage.getItem('learningProgress');

        const learningProgress = savedProgress
            ? JSON.parse(savedProgress)
            : {
                html: { chapters: [] },
                css: { chapters: [] },
                javascript: { chapters: [] }
            };

        if (!learningProgress[technology]) {
            learningProgress[technology] = { chapters: [] };
        }

        let chapterObj = learningProgress[technology].chapters.find((ch: { name: string }) => ch.name === chapter);

        if (!chapterObj) {
            chapterObj = { name: chapter, subjectsConcluded: [] };
            learningProgress[technology].chapters.push(chapterObj);
        }

        if (!chapterObj.subjectsConcluded.includes(subject)) {
            chapterObj.subjectsConcluded.push(subject);
        }

        localStorage.setItem('learningProgress', JSON.stringify(learningProgress));

        toast.success('Subject completed!');
    };

    const getLearningProgress = (technology: string) => {
        const savedProgress = localStorage.getItem('learningProgress');

        const learningProgress = savedProgress
            ? JSON.parse(savedProgress)
            : {
                html: { chapters: [] },
                css: { chapters: [] },
                javascript: { chapters: [] }
            };

        return learningProgress[technology] || { chapters: [] };
    };

    return {
        handleSaveToLearningPath,
        handleSaveToRoadMap,
        handleSaveToQuizz,
        handleSaveToLearningProgress,
        getLearningProgress
    };
}
