'use client';

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, CheckCircle2, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { cssData, htmlData, jsData, CollapsibleSectionProps, Section } from './htmlData';
import { Progress } from "@/components/ui/progress";

export default function Roadmap() {
    const [openSections, setOpenSections] = useState<Record<number, boolean>>({});

    function CollapsibleSection({ id, title, timelineData, learnPath, isOpen, onToggle }: CollapsibleSectionProps) {
        const [subjects, setSubjects] = useState<Section[]>(timelineData);
        const [progressValue, setProgressValue] = useState(0);
        const router = useRouter();

        const toggleCheck = (sectionId: number, subjectIndex: number) => {
            setSubjects(prevSubjects => prevSubjects.map(section => {
                if (section.id === sectionId) {
                    const updatedSubjects = section.subjects.map((subject, index) => {
                        if (index === subjectIndex) {
                            return { ...subject, checked: !subject.checked };
                        }
                        return subject;
                    });
                    return { ...section, subjects: updatedSubjects };
                }
                return section;
            }));
        };

        useEffect(() => {
            const totalSubjects = subjects.reduce((acc, section) => acc + section.subjects.length, 0);
            const checkedSubjects = subjects.reduce((acc, section) => {
                return acc + section.subjects.filter(subject => subject.checked).length;
            }, 0);
            const progress = (checkedSubjects / totalSubjects) * 100;
            setProgressValue(progress);
        }, [subjects]);

        return (
            <div className="bg-[#1b1b1d] p-8 mb-10 rounded-lg">
                <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => onToggle(id)}
                >
                    <h1 className={`text-xl font-semibold text-white dark:text-white ${!isOpen ? 'opacity-100' : 'opacity-0 h-0'}`}>
                        {title}
                    </h1>
                    {isOpen ? <ChevronUp size={24} color="#fff" /> : <ChevronDown size={24} color="#fff" />}
                </div>
                <Progress value={progressValue} className="my-3" /> 
                {isOpen && (
                    <ol className="relative border-l border-gray-200 dark:border-gray-700 mt-4">
                        {subjects.map((section, sectionIndex) => (
                            <li key={section.id} className="mb-10 ml-6">
                                <h2 className="flex items-center mb-1 text-lg font-semibold text-white dark:text-white">
                                    {section.title}
                                </h2>
                                <ul className="list-disc list-inside">
                                    {section.subjects.map((subject, subjectIndex) => (
                                        <li
                                            key={subjectIndex}
                                            className="group flex items-center w-1/4 mb-1 text-white dark:text-gray-400 p-3 rounded-md transition-colors duration-100 cursor-pointer hover:bg-[#ffa500] hover:text-black relative"
                                            onClick={() => toggleCheck(section.id, subjectIndex)}
                                        >
                                            {subject.checked ? <CheckCircle2 size={20} color="#00ff00" /> : <Circle size={20} color="#ffffff" />}
                                            <span className="ml-2">{subject.name}</span>
                                            <Button
                                                size={"sm"}
                                                onClick={(e) => {
                                                    e.stopPropagation(); 
                                                    router.push(learnPath);
                                                }}
                                                className='absolute right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200'
                                            >
                                                Learn
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ol>
                )}
            </div>
        );
    }

    const handleToggle = (id: number) => {
        setOpenSections(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const isAnySectionOpen = Object.values(openSections).includes(true);

    return (
        <section className={`flex flex-col ${!isAnySectionOpen ? 'h-full' : ''}`}>
            <main className="flex-1 px-4 md:px-6 mt-36">
                <CollapsibleSection
                    id={1}
                    title="HTML"
                    timelineData={htmlData}
                    learnPath="/learning/html"
                    isOpen={openSections[1] || false}
                    onToggle={handleToggle}
                />
                <CollapsibleSection
                    id={2}
                    title="CSS"
                    timelineData={cssData}
                    learnPath="/learning/css"
                    isOpen={openSections[2] || false}
                    onToggle={handleToggle}
                />
                <CollapsibleSection
                    id={3}
                    title="JavaScript"
                    timelineData={jsData}
                    learnPath="/learning/javascript"
                    isOpen={openSections[3] || false}
                    onToggle={handleToggle}
                />
            </main>
        </section>
    );
}
