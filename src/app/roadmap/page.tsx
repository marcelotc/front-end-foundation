import { Typography } from "@/components/ui/typography"
import { Construction, Hammer } from 'lucide-react'

export default function Roadmap() {
    return (
        <section className="flex flex-col h-full">
            <main className="flex-1 px-4 md:px-6 mt-20">
                <div className='flex items-center justify-center gap-5 mb-10'>
                    <Construction color='#ffA500' size={100} />
                    <Typography variant="extra3LargeText" as="h1">
                        Page under construction
                    </Typography>
                    <Hammer color='#ffA500' size={100} />
                </div>
                <Timeline />
            </main>
        </section>
    );
}

const timelineData = [
    {
        id: 1,
        title: "Basics",
        description: "Introduction to HTML, Tags, Attributes, and Elements.",
        icon: (
            <svg className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
        ),
    },
    {
        id: 2,
        title: "Intermediate",
        description: "Forms, Semantic HTML, Multimedia Elements, and Responsive Design.",
        icon: (
            <svg className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
        ),
    },
    {
        id: 3,
        title: "Advanced",
        description: "HTML APIs, Custom Data Attributes, Web Components, and Accessibility.",
        icon: (
            <svg className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
        ),
    },
];

function Timeline() {
    return (
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
            {timelineData.map(item => (
                <li key={item.id} className="mb-10 ml-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                        {item.icon}
                    </span>
                    <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                        {item.title}
                    </h3>
                    <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                        {item.description}
                    </p>
                </li>
            ))}
        </ol>
    );
}
