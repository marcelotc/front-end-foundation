'use client';

import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface Subject {
    name: string;
    checked: boolean;
}

interface Section {
    id: number;
    title: string;
    subjects: Subject[];
}

interface CollapsibleSectionProps {
    id: number;
    title: string;
    timelineData: Section[];
    learnPath: string;
    isOpen: boolean;
    onToggle: (id: number) => void;
}

export default function Roadmap() {
    const [openSections, setOpenSections] = useState<Record<number, boolean>>({});

    const htmlData: Section[] = [
        {
            id: 1,
            title: "HTML - Introduction and Basics",
            subjects: [
                { name: "Introduction to HTML", checked: false },
                { name: "Tags and Attributes", checked: false },
                { name: "Basic Elements", checked: false }
            ],
        },
        {
            id: 2,
            title: "Intermediate",
            subjects: [
                { name: "Forms", checked: false },
                { name: "Semantic HTML", checked: false },
                { name: "Multimedia Elements", checked: false },
                { name: "Responsive Design", checked: false }
            ],
        },
        {
            id: 3,
            title: "Advanced",
            subjects: [
                { name: "HTML APIs", checked: false },
                { name: "Custom Data Attributes", checked: false },
                { name: "Web Components", checked: false },
                { name: "Accessibility", checked: false }
            ],
        }
    ];

    const cssData: Section[] = [
        {
            id: 1,
            title: "CSS - Basics",
            subjects: [
                { name: "Introduction to CSS", checked: false },
                { name: "Selectors and Properties", checked: false },
                { name: "Basic Styling", checked: false }
            ],
        },
        {
            id: 2,
            title: "Intermediate",
            subjects: [
                { name: "Flexbox", checked: false },
                { name: "Grid Layout", checked: false },
                { name: "Responsive Design", checked: false }
            ],
        },
        {
            id: 3,
            title: "Advanced",
            subjects: [
                { name: "Animations", checked: false },
                { name: "Transitions", checked: false },
                { name: "Custom Properties", checked: false }
            ],
        }
    ];

    const jsData: Section[] = [
        {
            id: 1,
            title: "JavaScript - Basics",
            subjects: [
                { name: "Introduction to JavaScript", checked: false },
                { name: "Variables and Data Types", checked: false },
                { name: "Basic Operations", checked: false }
            ],
        },
        {
            id: 2,
            title: "Intermediate",
            subjects: [
                { name: "Functions", checked: false },
                { name: "Objects and Arrays", checked: false },
                { name: "DOM Manipulation", checked: false }
            ],
        },
        {
            id: 3,
            title: "Advanced",
            subjects: [
                { name: "Asynchronous JavaScript", checked: false },
                { name: "Promises", checked: false },
                { name: "ES6+ Features", checked: false }
            ],
        }
    ];

    function CollapsibleSection({ id, title, timelineData, learnPath, isOpen, onToggle }: CollapsibleSectionProps) {
        const [subjects, setSubjects] = useState<Section[]>(timelineData);
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
