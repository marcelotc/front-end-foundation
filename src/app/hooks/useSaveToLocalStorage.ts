import { toast } from 'sonner'

export function useSaveToLocalStorage() {

    const handleSaveToLearningPath = () => { }

    const handleSaveToRoadMap = () => { 
        // TO DO
    }

    const handleSaveToQuizz = () => { }

    const handleSaveToLearningProgress = (technology: string, chapter: string, subject: string) => {
        const savedProgress = localStorage.getItem('learningProgress');

        const learningProgress = savedProgress ? JSON.parse(savedProgress) : {
            html: { chapters: [] },
            css: { chapters: [] },
            javascript: { chapters: [] }
        };

        if (!learningProgress[technology]) {
            learningProgress[technology] = { chapters: [] };
        }

        let chapterObj = learningProgress[technology].chapters.find((ch: { name: string; }) => ch.name === chapter);

        if (!chapterObj) {
            chapterObj = { name: chapter, subjectsConcluded: [] };
            learningProgress[technology].chapters.push(chapterObj);
        }

        if (!chapterObj.subjectsConcluded.includes(subject)) {
            chapterObj.subjectsConcluded.push(subject);
        }

        localStorage.setItem('learningProgress', JSON.stringify(learningProgress));

        toast.success('Subject completed!')
    }

    const getLearningProgress = (technology: string) => {
        const savedProgress = localStorage.getItem('learningProgress');
    
        const learningProgress = savedProgress ? JSON.parse(savedProgress) : {
            html: { chapters: [] },
            css: { chapters: [] },
            javascript: { chapters: [] }
        };
    
        return learningProgress[technology] || { chapters: [] };
    };

    return { handleSaveToLearningPath, handleSaveToRoadMap, handleSaveToQuizz, handleSaveToLearningProgress, getLearningProgress };
}
