'use client';

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, CheckCircle2, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Progress } from "@/components/ui/progress";
import { useMenuData } from '@/app/hooks/useMenuData';
import { useSaveToLocalStorage } from "@/app/hooks/useSaveToLocalStorage";

interface Subject {
    name: string;
    checked: boolean;
}

export interface Section {
    id: number;
    title: string;
    technology: string;
    subjects: Subject[];
}

interface CollapsibleSectionProps {
    id: number;
    title: string;
    timelineData: Section[];
    learnPath: string;
    isOpen: boolean;
    onToggle: (id: number) => void;
    progressValue: number;
}

function CollapsibleSection({
    id,
    title,
    timelineData,
    learnPath,
    isOpen,
    onToggle,
    progressValue,
}: CollapsibleSectionProps) {
    const router = useRouter();

    return (
        <div className="bg-[#1b1b1d] p-8 mb-10 rounded-lg cursor-pointer" onClick={() => onToggle(id)}>
            <div
                className="flex justify-between items-center"
            >
                <h1 className={`text-xl font-semibold text-white dark:text-white`}>
                    {title}
                </h1>
                {isOpen ? <ChevronUp size={24} color="#fff" /> : <ChevronDown size={24} color="#fff" />}
            </div>
            <div className="flex items-center my-3">
                <Progress value={progressValue} className="flex-grow" />
                <span className="ml-3 text-white">{Math.round(progressValue)}%</span>
            </div>
            {isOpen && (
                <ol className="relative border-l border-gray-200 dark:border-gray-700 mt-4">
                    {timelineData.map((section) => (
                        <li key={section.id} className="mb-10 ml-6">
                            <h2 className="flex items-center mb-1 text-lg font-semibold text-white dark:text-white">
                                {section.title}
                            </h2>
                            <ul className="list-disc list-inside">
                                {section.subjects.map((subject, subjectIndex) => (
                                    <li
                                        key={subjectIndex}
                                        className="group flex items-center w-1/4 mb-1 text-white dark:text-gray-400 p-3 rounded-md transition-colors duration-100 cursor-pointer hover:bg-[#ffa500] hover:text-black relative"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                    >
                                        {subject.checked ? <CheckCircle2 size={20} color="#00ff00" /> : <Circle size={20} color="#ffffff" />}
                                        <span className="ml-2">{subject.name}</span>
                                        <Button
                                            size={"sm"}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const url = `${learnPath}subject=${encodeURIComponent(subject.name)}&chapter=${encodeURIComponent(section.title)}&technology=${section.technology}`;
                                                router.push(url);
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

export default function Roadmap() {
    const [openSections, setOpenSections] = useState<Record<number, boolean>>({});
    const { sectionsData } = useMenuData();
    const [progressValues, setProgressValues] = useState({
        html: 0,
        css: 0,
        javascript: 0,
    });
    const { handleSaveToRoadMap } = useSaveToLocalStorage();

    useEffect(() => {
        const { progressValues, sectionsData: updatedData } = handleSaveToRoadMap(sectionsData);
        setProgressValues(progressValues);
    }, [sectionsData]);

    const handleToggle = (id: number) => {
        setOpenSections((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const isAnySectionOpen = Object.values(openSections).includes(true);

    return (
        <section className={`flex flex-col ${!isAnySectionOpen ? 'h-full' : ''}`}>
            <main className="flex-1 px-4 md:px-6 mt-10">
                <CollapsibleSection
                    id={1}
                    title="HTML"
                    timelineData={sectionsData?.html || []}
                    learnPath="/learning/html?"
                    isOpen={openSections[1] || false}
                    onToggle={handleToggle}
                    progressValue={progressValues.html}
                />
                <CollapsibleSection
                    id={2}
                    title="CSS"
                    timelineData={sectionsData?.css || []}
                    learnPath="/learning/css?"
                    isOpen={openSections[2] || false}
                    onToggle={handleToggle}
                    progressValue={progressValues.css}
                />
                <CollapsibleSection
                    id={3}
                    title="JavaScript"
                    timelineData={sectionsData?.javascript || []}
                    learnPath="/learning/javascript?"
                    isOpen={openSections[3] || false}
                    onToggle={handleToggle}
                    progressValue={progressValues.javascript}
                />
            </main>
        </section>
    );
}