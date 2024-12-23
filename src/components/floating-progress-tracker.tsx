'use client'

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress";
import { CodeXml, CircleX } from 'lucide-react';
import Image from "next/image";
import htmlLogo from "../../public/html-logo.png";
import cssLogo from "../../public/css-logo.png";
import javascriptLogo from "../../public/javascript-logo.png";

export default function FloatingProgressTracker() {
    const [expanded, setExpanded] = useState(false);
    const [showTracker, setShowTracker] = useState(false); 

    const toggleTrackerVisibility = () => {
        setShowTracker(!showTracker);
    };

    const handleMouseEnter = () => {
        setExpanded(true);
    };

    const handleMouseLeave = () => {
        setExpanded(false);
    };

    return (
        <>
            {showTracker && (
                <div
                    className={`fixed bottom-4 right-4 bg-white dark:bg-gray-800 shadow-2xl 
                    rounded-lg p-4 flex items-start gap-4 animate-fade-right transition-all duration-1000 ${expanded ? 'w-[450px] h-[300px]' : 'w-[350px]'}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className='flex flex-col gap-10'>
                        <div className='flex items-center gap-3'>
                            <CodeXml />
                            <div>
                                <h3 className="text-lg font-semibold">Learning objective tracker</h3>
                                <p className="text-gray-500 dark:text-gray-400">You're making great progress!</p>
                                <div className="flex items-center gap-4">
                                    <Progress className="mt-2" value={75} />
                                    <div className="ml-[16px] font-bold mt-2 text-gray-500 dark:text-gray-400 text-sm">55%</div>
                                </div>
                            </div>
                        </div>
                        {expanded && (
                            <div className='flex gap-5'>
                                <div>
                                    <div className="flex items-center gap-4">
                                        <div className="bg-[#F16524] p-3 rounded-full">
                                            <Image
                                                src={htmlLogo}
                                                width={35}
                                                height={35}
                                                alt="javascript logo"
                                                className="hover:opacity-80 cursor-pointer"
                                            />
                                        </div>
                                        <div>
                                            html
                                        </div>
                                    </div>
                                    <div className="ml-[16px] font-bold mt-2 text-gray-500 dark:text-gray-400 text-sm">22%</div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-4">
                                        <div className="bg-[#2965F1] p-3 rounded-full">
                                            <Image
                                                src={cssLogo}
                                                width={35}
                                                height={35}
                                                alt="css logo"
                                                className="hover:opacity-80 cursor-pointer"
                                            />
                                        </div>
                                        <div>
                                            css
                                        </div>
                                    </div>
                                    <div className="ml-[16px] font-bold mt-2 text-gray-500 dark:text-gray-400 text-sm">11%</div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-4">
                                        <div className="bg-[#F0DB4F] p-3 rounded-full">
                                            <Image
                                                src={javascriptLogo}
                                                width={35}
                                                height={35}
                                                alt="javascript logo"
                                                className="hover:opacity-80 cursor-pointer"
                                            />
                                        </div>
                                        <div>
                                            javascript
                                        </div>
                                    </div>
                                    <div className="ml-[16px] font-bold mt-2 text-gray-500 dark:text-gray-400 text-sm">75%</div>
                                </div>
                            </div>
                        )}
                    </div>
                    <CircleX className='cursor-pointer' onClick={toggleTrackerVisibility} />
                </div>
            )}
            {/*{!showTracker && (
                <div className="fixed bottom-4 right-4">
                    <Button  onClick={toggleTrackerVisibility}>
                        Show learning objective tracker
                    </Button>
                </div>
            )}*/}
        </>
    );
}