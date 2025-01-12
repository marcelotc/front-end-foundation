'use client'

import { useEffect, useState } from "react";
import { LockIcon } from "lucide-react";
import { getMenu } from '@/app/utils/supabase/contentRequests';
import { Typography } from "@/components/ui/typography";
import ProgressCards from './components/progress-cards';
import { Progress } from "@/components/ui/progress";

export default function Frameworks() {
    const [dataHtml, setDataHtml] = useState<any>(null);
    const [dataCss, setDataCss] = useState<any>(null);
    const [dataJs, setDataJs] = useState<any>(null);
    const [learningProgress, setLearningProgress] = useState<any>(null);

    useEffect(() => {
        const loadMenu = async () => {
            try {
                const fetchedHtml = await getMenu('html');
                const fetchedCss = await getMenu('css');
                const fetchedJs = await getMenu('javascript');

                setDataHtml(fetchedHtml);
                setDataCss(fetchedCss);
                setDataJs(fetchedJs);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        loadMenu();

        const storedProgress = localStorage.getItem('learningProgress');
        if (storedProgress) {
            setLearningProgress(JSON.parse(storedProgress));
        }
    }, []);

    const countSubjectsByTechnology = (data: any) => {
        return data?.reduce((acc: number, chapter: any) => acc + chapter.subjects.length, 0);
    };

    const countSubjectsCompletedByTechnology = (tech: string) => {
        const progress = learningProgress?.[tech]?.chapters;
        return progress?.reduce((acc: number, chapter: any) => acc + chapter.subjectsConcluded.length, 0) || 0;
    };

    const calculateProgress = (data: any, tech: string) => {
        const totalSubjects = countSubjectsByTechnology(data);
        const completedSubjects = countSubjectsCompletedByTechnology(tech);

        return totalSubjects > 0 ? (completedSubjects / totalSubjects) * 100 : 0;
    };

    const htmlProgress = dataHtml && learningProgress ? calculateProgress(dataHtml, 'html') : 0;
    const cssProgress = dataCss && learningProgress ? calculateProgress(dataCss, 'css') : 0;
    const javascriptProgress = dataJs && learningProgress ? calculateProgress(dataJs, 'javascript') : 0;

    const isNotPrepared = htmlProgress < 80 || cssProgress < 80 || javascriptProgress < 80;

    return (
        <section className="flex flex-col p-4 md:p-6">
            <Typography variant="h1">Frameworks</Typography>
            <Typography variant="extraLargeText" className="mt-4">
                Before proceeding, make sure you have <span className="font-semibold">completed 80%</span> of the <span className="font-semibold">fundamentals in HTML, CSS, and JavaScript</span>.
                Understanding these core technologies will ensure you are <span className="font-semibold">well-prepared</span> to tackle any front-end framework with <span className="font-semibold">confidence</span>.
            </Typography>

            {isNotPrepared && (
                <div className="mt-6 flex items-center space-x-2">
                    <LockIcon className="h-6 w-6 text-gray-500" />
                    <Typography variant="smallText" className="text-gray-500">
                        You are not prepared to learn frameworks yet. Complete 80% of HTML, CSS, and JavaScript fundamentals first.
                    </Typography>
                </div>
            )}

            <div className="mt-6 bg-black text-white p-6 rounded-lg space-y-6">
                <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
                    <div className="w-full md:w-1/3">
                        <Typography variant="h2" className="text-white">HTML Progress</Typography>
                        <div className="flex items-center space-x-4">
                            <Progress value={htmlProgress} className="flex-1 mr-6" />
                            <Typography className="text-white !m-0">{htmlProgress.toFixed(0)}%</Typography>
                        </div>
                    </div>

                    <div className="w-full md:w-1/3">
                        <Typography variant="h2" className="text-white">CSS Progress</Typography>
                        <div className="flex items-center space-x-4">
                            <Progress value={cssProgress} className="flex-1 mr-6" />
                            <Typography className="text-white !m-0">{cssProgress.toFixed(0)}%</Typography>
                        </div>
                    </div>

                    <div className="w-full md:w-1/3">
                        <Typography variant="h2" className="text-white">JavaScript Progress</Typography>
                        <div className="flex items-center space-x-4">
                            <Progress value={javascriptProgress} className="flex-1 mr-6" />
                            <Typography className="text-white !m-0">{javascriptProgress.toFixed(0)}%</Typography>
                        </div>
                    </div>
                </div>
            </div>

            <ProgressCards
                htmlProgress={htmlProgress}
                cssProgress={cssProgress}
                javascriptProgress={javascriptProgress}
            />

            <div className="mt-8 bg-[#1b1b1d] text-white p-6 rounded-lg">
                <Typography variant="h3" className="text-white mb-4">The Importance of Front-End Frameworks</Typography>
                <Typography variant="p" className="text-white">
                    Front-end frameworks are essential in modern web development. They provide a structure and set of tools that help developers build responsive, dynamic, and maintainable user interfaces. Here are some reasons why frameworks are so important:
                </Typography>
                <ul className="mt-4 list-disc pl-6 text-white">
                    <li><strong>Increased Productivity:</strong> Frameworks offer built-in functionalities, reducing the need for writing repetitive code. This allows developers to focus more on business logic and user experience.</li>
                    <li><strong>Consistency:</strong> Frameworks help maintain consistent design patterns and code structures, making the codebase easier to manage, especially when working in teams.</li>
                    <li><strong>Cross-Browser Compatibility:</strong> Many frameworks are designed to work across different browsers, ensuring that your application works well for all users.</li>
                    <li><strong>Community Support:</strong> Frameworks like React, Angular, and Vue have large communities, offering tutorials, plugins, and troubleshooting help to ease development.</li>
                    <li><strong>Optimized Performance:</strong> Frameworks often include performance optimizations out-of-the-box, such as virtual DOM, lazy loading, and code splitting, ensuring that applications are fast and efficient.</li>
                </ul>
                <Typography variant="p" className="mt-4 text-white">
                    Whether you're building a small project or a large-scale enterprise application, using a front-end framework ensures that you are equipped with the best practices and tools to deliver high-quality results.
                </Typography>
            </div>
        </section>
    );
}
