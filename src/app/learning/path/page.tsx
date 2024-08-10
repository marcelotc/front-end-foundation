"use client";

import { useState } from 'react';
import { Typography } from "@/components/ui/typography";
import { Button } from '@/components/ui/button';
import { InfoIcon, CircleX } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MinimalisticCalendar() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [startDate, setStartDate] = useState<{ day: number; month: number } | null>(null);
    const [endDate, setEndDate] = useState<{ day: number; month: number } | null>(null);
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
    const [isTutorialVisible, setIsTutorialVisible] = useState(true);
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

    const isSelected = (day: number, month: number) => {
        if (startDate && endDate) {
            const start = new Date(today.getFullYear(), startDate.month, startDate.day);
            const end = new Date(today.getFullYear(), endDate.month, endDate.day);
            const current = new Date(today.getFullYear(), month, day);
            return current >= start && current <= end;
        }
        return startDate && startDate.day === day && startDate.month === month;
    };

    const toggleSubjectSelection = (subject: string) => {
        setSelectedSubjects(prevSubjects =>
            prevSubjects.includes(subject)
                ? prevSubjects.filter(sub => sub !== subject)
                : [...prevSubjects, subject]
        );
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
                    <Typography>
                        <strong>3. Confirm path calendar:</strong> Review and confirm the selected subjects and dates.
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

                        <div className="grid grid-cols-7 gap-2">
                            {[...Array(daysInMonth)].map((_, day) => (
                                <div
                                    key={day}
                                    onClick={() => handleDayClick(day + 1)}
                                    className={`w-10 h-10 flex items-center justify-center cursor-pointer border border-black hover:bg-black hover:text-white transition-colors duration-200 ${isSelected(day + 1, selectedMonth) ? 'bg-black text-white' : ''
                                        } ${selectedMonth === currentMonth && day + 1 === currentDay ? 'bg-gray-300' : ''
                                        }`}
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
                        2. Things to Learn
                    </Typography>
                    <ul className="list-disc list-inside">
                        <li
                            onClick={() => startDate !== null && endDate !== null && toggleSubjectSelection("Learn React")}
                            className={`cursor-pointer ${selectedSubjects.includes("Learn React") ? 'font-bold' : ''}`}
                        >
                            Learn React
                        </li>
                        <li
                            onClick={() => startDate !== null && endDate !== null && toggleSubjectSelection("Understand TypeScript")}
                            className={`cursor-pointer ${selectedSubjects.includes("Understand TypeScript") ? 'font-bold' : ''}`}
                        >
                            Understand TypeScript
                        </li>
                        <li
                            onClick={() => startDate !== null && endDate !== null && toggleSubjectSelection("Explore Tailwind CSS")}
                            className={`cursor-pointer ${selectedSubjects.includes("Explore Tailwind CSS") ? 'font-bold' : ''}`}
                        >
                            Explore Tailwind CSS
                        </li>
                        <li
                            onClick={() => startDate !== null && endDate !== null && toggleSubjectSelection("Study JavaScript ES6+")}
                            className={`cursor-pointer ${selectedSubjects.includes("Study JavaScript ES6+") ? 'font-bold' : ''}`}
                        >
                            Study JavaScript ES6+
                        </li>
                        <li
                            onClick={() => startDate !== null && endDate !== null && toggleSubjectSelection("Practice Responsive Design")}
                            className={`cursor-pointer ${selectedSubjects.includes("Practice Responsive Design") ? 'font-bold' : ''}`}
                        >
                            Practice Responsive Design
                        </li>
                    </ul>
                </section>

                {/* Details Section */}
                <section
                    className={`flex-1 border rounded-lg border-black p-4 mt-8 md:mt-0 ${selectedSubjects.length === 0 ? 'opacity-35' : ''}`}
                >
                    <Typography variant="extraLargeText" as="h2" className="mb-4 text-center font-bold">
                        3. Learning Path Calendar
                    </Typography>
                    <div className="flex mb-4 gap-4">
                        {startDate && (
                            <div className='flex gap-1'>
                                <div>
                                    <Typography variant="p" as="p" className='font-bold'>
                                        Start Date:
                                    </Typography>
                                </div>
                                <div>
                                    <Typography variant="p" as="p">
                                        {startDate.day} {monthNames[startDate.month]}
                                    </Typography>
                                </div>
                            </div>
                        )}
                        {endDate && (
                            <div className='flex gap-1'>
                                <div>
                                    <Typography variant="p" as="p" className='font-bold'>
                                        End Date:
                                    </Typography>
                                </div>
                                <div>
                                    <Typography variant="p" as="p">
                                        {endDate.day} {monthNames[endDate.month]}
                                    </Typography>
                                </div>
                            </div>
                        )}
                    </div>
                    <Typography variant="p" as="p" className="mb-2 font-bold">
                        Selected Subjects:
                    </Typography>
                    <ul className="list-disc list-inside">
                        {selectedSubjects.map((subject, index) => (
                            <li key={index}>{subject}</li>
                        ))}
                    </ul>
                    <Button
                        onClick={handleConfirm}
                        disabled={startDate === null || endDate === null || selectedSubjects.length === 0}
                        className={'mt-4 w-full bottom-0'}
                    >
                        Confirm
                    </Button>
                </section>
            </div>
        </div>
    );
}
