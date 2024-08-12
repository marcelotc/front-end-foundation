"use client";

import { useRouter, useSearchParams } from 'next/navigation'; 
import { Typography } from "@/components/ui/typography";

interface ParsedDate {
    month: number;
    day: number;
}

interface CalendarData {
    [key: string]: string[];
}

export default function Schedule() {
    const searchParams = useSearchParams(); 

    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');
    const subjectsParam = searchParams.get('subjects');
    const monthsParam = searchParams.get('months');

    const parsedStartDate: ParsedDate | null = startDateParam ? JSON.parse(startDateParam) : null;
    const parsedEndDate: ParsedDate | null = endDateParam ? JSON.parse(endDateParam) : null;
    const parsedSubjects: string[] = subjectsParam ? JSON.parse(subjectsParam) : [];
    const parsedMonths: number[] = monthsParam ? JSON.parse(monthsParam) : [];

    const monthNames: string[] = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const generateCalendarData = (): CalendarData => {
        if (!parsedStartDate || !parsedEndDate || !parsedMonths.length) return {};

        const start = new Date(new Date().getFullYear(), parsedStartDate.month, parsedStartDate.day);
        const end = new Date(new Date().getFullYear(), parsedEndDate.month, parsedEndDate.day);
        const calendarData: CalendarData = {};

        let current = start;
        while (current <= end) {
            const dateKey = `${current.getFullYear()}-${current.getMonth()}-${current.getDate()}`;
            if (!calendarData[dateKey]) {
                calendarData[dateKey] = [...parsedSubjects];
            }
            current.setDate(current.getDate() + 1);
        }

        return calendarData;
    };

    const calendarData = generateCalendarData();

    const renderMonth = (month: number) => {
        const start = new Date(new Date().getFullYear(), month, 1);
        const end = new Date(new Date().getFullYear(), month + 1, 0);
        const daysInMonth = end.getDate();
        const startDay = start.getDay(); 

        const calendarDays: JSX.Element[] = [];
        for (let i = 0; i < startDay; i++) {
            calendarDays.push(<div key={`empty-${i}`} className="w-16 h-16"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateKey = `${start.getFullYear()}-${month}-${day}`;
            const date = new Date(start.getFullYear(), month, day);
            const isInRange = parsedStartDate && parsedEndDate && date >= new Date(new Date().getFullYear(), parsedStartDate.month, parsedStartDate.day) && date <= new Date(new Date().getFullYear(), parsedEndDate.month, parsedEndDate.day);
            
            calendarDays.push(
                <div
                    key={day}
                    className={`w-36 h-36 border border-gray-300 p-2 relative bg-white rounded-lg shadow-md ${isInRange ? '' : 'opacity-30'}`}
                >
                    <Typography variant="smallText" className="absolute top-2 left-2 font-semibold text-gray-800">
                        {day}
                    </Typography>
                    <div className="absolute top-8 left-2 right-2 bottom-2 overflow-y-auto p-2 max-h-30">
                        {calendarData[dateKey]?.map((subject, index) => (
                            <div key={index} className="bg-gray-200 px-2 py-1 mb-1 rounded-lg text-xs text-gray-600">
                                <Typography variant="smallText">{subject}</Typography>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        return (
            <div key={month} className="mb-8">
                <Typography variant="largeText" as="h3" className="text-center font-bold text-xl mb-4">
                    {monthNames[month]}
                </Typography>
                <div className="grid grid-cols-12 gap-2">
                    {calendarDays}
                </div>
            </div>
        );
    };

    const containerClass = `p-6 ${parsedMonths.length === 1 ? 'h-full' : ''}`;

    return (
        <div className={containerClass}>
            <Typography variant="extraLargeText" as="h2" className="mb-6 text-center font-bold text-2xl">
                Learning Path Schedule
            </Typography>
            <div>
                {parsedMonths.map((month: number) => renderMonth(month))}
            </div>
        </div>
    );
}
