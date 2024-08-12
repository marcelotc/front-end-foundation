"use client";

import { useState } from 'react';
import { Typography } from "@/components/ui/typography";
import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox";
import { InfoIcon, CircleX, Plus, Minus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Skeleton } from "@/components/ui/skeleton";
import { useMenuData } from '@/app/hooks/useMenuData';

export default function MinimalisticCalendar() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [startDate, setStartDate] = useState<{ day: number; month: number } | null>(null);
    const [endDate, setEndDate] = useState<{ day: number; month: number } | null>(null);
    const [hoveredDay, setHoveredDay] = useState<number | null>(null);
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
    const [isTutorialVisible, setIsTutorialVisible] = useState(true);
    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
    const { sectionsData, loading } = useMenuData();
    const router = useRouter();

    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const getDaysInMonth = (month: number) => {
        if (month === 1) {
            const year = today.getFullYear();
            return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28;
        }
        return monthDays[month];
    };

    const daysInMonth = getDaysInMonth(selectedMonth);

    const handleDayClick = (day: number) => {
        if (startDate === null || (startDate !== null && endDate !== null)) {
            setStartDate({ day, month: selectedMonth });
            setEndDate(null);
        } else if (startDate !== null && endDate === null) {
            const isSameMonth = selectedMonth === startDate.month;
            const isLaterDate = isSameMonth ? day > startDate.day : selectedMonth > startDate.month;

            if (isLaterDate) {
                setEndDate({ day, month: selectedMonth });
            } else {
                setStartDate({ day, month: selectedMonth });
            }
        }
    };

    const handleMouseEnter = (day: number) => {
        setHoveredDay(day);
    };

    const handleMouseLeave = () => {
        setHoveredDay(null);
    };

    const isSelected = (day: number, month: number) => {
        if (startDate && endDate) {
            const start = new Date(today.getFullYear(), startDate.month, startDate.day);
            const end = new Date(today.getFullYear(), endDate.month, endDate.day);
            const current = new Date(today.getFullYear(), month, day);
            return current >= start && current <= end;
        }
        return startDate && startDate.day === day && startDate.month === month;
    };

    const isHovered = (day: number) => {
        if (!startDate || hoveredDay === null) return false;
        if (startDate && !endDate) {
            return day >= startDate.day && day <= hoveredDay;
        }
        return false;
    };

    const toggleSubjectSelection = (subject: string) => {
        setSelectedSubjects(prevSubjects =>
            prevSubjects.includes(subject)
                ? prevSubjects.filter(sub => sub !== subject)
                : [...prevSubjects, subject]
        );
    };

    const toggleExpand = (technology: string) => {
        setExpandedSections(prevState => ({
            ...prevState,
            [technology]: !prevState[technology]
        }));
    };

    const handleConfirm = () => {
        const queryParams = new URLSearchParams({
            startDate: JSON.stringify(startDate),
            endDate: JSON.stringify(endDate),
            subjects: JSON.stringify(selectedSubjects)
        }).toString();

        router.push(`/learning/path/schedule?${queryParams}`);
    };

    return (
        <div className='h-full'>
            {/* Tutorial Section */}
            {isTutorialVisible ? (
                <section className="border rounded-lg border-black p-4 bg-gray-100 text-black m-4 relative">
                    <div className="absolute top-4 right-4 cursor-pointer">
                        <CircleX
                            size={24}
                            onClick={() => setIsTutorialVisible(false)}
                        />
                    </div>
                    <Typography>
                        <strong>1. Pick Dates:</strong> Select a start and end date on the calendar.
                    </Typography>
                    <Typography>
                        <strong>2. Pick things to learn:</strong> Select subjects to learn between the selected dates.
                    </Typography>
                </section>
            ) : (
                <div className='p-4 cursor-pointer w-fit'>
                    <InfoIcon size={24} onClick={() => setIsTutorialVisible(true)} />
                </div>
            )}

            <div className="flex flex-col md:flex-row md:space-x-8 p-4">
                {/* Calendar Section */}
                <section className="flex-1 mb-8 md:mb-0 border rounded-lg border-black p-4">
                    <Typography variant="extraLargeText" as="h2" className="mb-4 text-center font-bold">
                        1. Calendar
                    </Typography>
                    <div className="flex flex-col items-start">
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                            className="mb-4 p-2 border border-black rounded"
                        >
                            {monthNames.slice(currentMonth).map((month, index) => (
                                <option key={index} value={currentMonth + index}>
                                    {month}
                                </option>
                            ))}
                        </select>

                        <div className="grid grid-cols-12 gap-2">
                            {[...Array(daysInMonth)].map((_, day) => (
                                <div
                                    key={day}
                                    onClick={() => handleDayClick(day + 1)}
                                    onMouseEnter={() => handleMouseEnter(day + 1)}
                                    onMouseLeave={handleMouseLeave}
                                    className={`w-10 h-10 flex items-center justify-center cursor-pointer border border-black transition-colors duration-200
                                        ${isSelected(day + 1, selectedMonth) || isHovered(day + 1) ? 'bg-black text-white' : ''}
                                        ${selectedMonth === currentMonth && day + 1 === currentDay ? 'bg-gray-300' : ''}
                                    `}
                                >
                                    {day + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Context List Section */}
                <section
                    className={`flex-1 border rounded-lg border-black p-4 ${startDate === null || endDate === null ? 'opacity-35 pointer-events-none' : ''}`}
                >
                    <Typography variant="extraLargeText" as="h2" className="mb-4 text-center font-bold">
                        2. Select things to Learn
                    </Typography>
                    <div className="overflow-y-auto max-h-64">
                        {loading ? (
                            <div className='flex flex-col gap-5 p-5'>
                                <Skeleton className="h-[20px] w-full rounded-xl" />
                                <Skeleton className="h-[20px] w-full rounded-xl" />
                                <Skeleton className="h-[20px] w-full rounded-xl" />
                                <Skeleton className="h-[20px] w-full rounded-xl" />
                                <Skeleton className="h-[20px] w-full rounded-xl" />
                            </div>
                        ) : (
                            Object.keys(sectionsData).map((technology) => (
                                <div key={technology}>
                                    <div
                                        className="cursor-pointer flex items-center mt-4 mb-2"
                                        onClick={() => toggleExpand(technology)}
                                    >
                                        <Typography variant="largeText" as="h3" className="font-semibold">
                                            {technology}
                                        </Typography>
                                        <div className="ml-4">
                                            {expandedSections[technology] ? <Minus size={15} /> : <Plus size={15} />}
                                        </div>
                                    </div>
                                    {expandedSections[technology] && (
                                        <div className="ml-4">
                                            {sectionsData[technology].map((section: any) => (
                                                <div key={section.id}>
                                                    <Typography variant="h4" as="h4" className="mt-2">
                                                        {section.title}
                                                    </Typography>
                                                    <div className="ml-4">
                                                        {section.subjects.map((subject: any, index: number) => (
                                                            <label key={index} className="flex items-center cursor-pointer my-2">
                                                                <Checkbox
                                                                    checked={selectedSubjects.includes(subject.name)}
                                                                    onCheckedChange={() => toggleSubjectSelection(subject.name)}
                                                                    className="mr-2"
                                                                />
                                                                <Typography variant="smallText">
                                                                    {subject.name}
                                                                </Typography>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </div>

            {/* Confirm Selection Button */}
            <div className="p-4">
                <Button onClick={handleConfirm} disabled={startDate === null || endDate === null || selectedSubjects.length === 0}>
                    Confirm Selection
                </Button>
            </div>
        </div>
    );
}
