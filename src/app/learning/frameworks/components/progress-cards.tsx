'use client';

import { useEffect, useState } from "react";
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getMenu } from '@/app/utils/supabase/contentRequests';
import reactIcon from "../../../../../public/react-icon.png";
import cssIcon from "../../../../../public/vue-icon.png";
import anglularIcon from "../../../../../public/angular-icon.png";
import Image from "next/image";

export default function ProgressCards() {
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

    return (
        <section className="mt-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* HTML Progress Card */}
                <Card className="bg-[#1b1b1d]">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-600 p-3 rounded-full">
                                <Image
                                    src={reactIcon}
                                    width={35}
                                    height={35}
                                    alt="HTML logo"
                                    className="hover:opacity-80 cursor-pointer"
                                />
                            </div>
                            <div>
                                <CardTitle className="text-white">REACT</CardTitle>
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                {/* CSS Progress Card */}
                <Card className="bg-[#1b1b1d]">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="bg-green-600 p-3 rounded-full">
                                <Image
                                    src={cssIcon}
                                    width={35}
                                    height={35}
                                    alt="CSS logo"
                                    className="hover:opacity-80 cursor-pointer"
                                />
                            </div>
                            <div>
                                <CardTitle className="text-white">VUE</CardTitle>
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                {/* JavaScript Progress Card */}
                <Card className="bg-[#1b1b1d]">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="bg-red-700 p-3 rounded-full">
                                <Image
                                    src={anglularIcon}
                                    width={35}
                                    height={35}
                                    alt="JavaScript logo"
                                    className="hover:opacity-80 cursor-pointer"
                                />
                            </div>
                            <div>
                                <CardTitle className="text-white">ANGULAR</CardTitle>
                                <CardDescription>Advanced</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
            </div>
        </section>
    );
}
