"use client";

import { useRouter, useSearchParams } from 'next/navigation'; 
import { Typography } from "@/components/ui/typography";

export default function Schedule() {
    const router = useRouter();
    const searchParams = useSearchParams(); 

    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');
    const subjectsParam = searchParams.get('subjects');

    const parsedStartDate = startDateParam ? JSON.parse(startDateParam) : null;
    const parsedEndDate = endDateParam ? JSON.parse(endDateParam) : null;
    const parsedSubjects = subjectsParam ? JSON.parse(subjectsParam) : [];

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const generateSchedule = () => {
        if (!parsedStartDate || !parsedEndDate) return [];

        const start = new Date(new Date().getFullYear(), parsedStartDate.month, parsedStartDate.day);
        const end = new Date(new Date().getFullYear(), parsedEndDate.month, parsedEndDate.day);
        const schedule = [];
        let current = start;

        while (current <= end) {
            schedule.push({
                date: current,
                subjects: parsedSubjects,
            });
            current.setDate(current.getDate() + 1);
        }

        return schedule;
    };

    const schedule = generateSchedule();

    return (
        <div className='p-4'>
            <Typography variant="extraLargeText" as="h2" className="mb-4 text-center font-bold">
                Learning Path Schedule
            </Typography>
            <div>
                {schedule.map((entry, index) => (
                    <div key={index} className="mb-4">
                        <Typography variant="p" as="p" className='font-bold'>
                            Date: {entry.date.getDate()} {monthNames[entry.date.getMonth()]}
                        </Typography>
                        <Typography variant="p" as="p">
                            Subjects: {entry.subjects.join(', ')}
                        </Typography>
                    </div>
                ))}
            </div>
        </div>
    );
}
