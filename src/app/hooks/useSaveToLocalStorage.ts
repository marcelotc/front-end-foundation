import { useState, useEffect } from 'react';

export function useSaveToLocalStorage() {

    const handleSaveToLearningPath = () => { }

    const handleSaveToRoadMap = () => { }

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
    }

    return { handleSaveToLearningPath, handleSaveToRoadMap, handleSaveToQuizz, handleSaveToLearningProgress };
}
