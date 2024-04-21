'use client'

import { usePathname } from 'next/navigation';

export default function MainFooter() {
    const pathname = usePathname();
    const isLearningPage = pathname.startsWith('/learning/html') || pathname.startsWith('/learning/css') || pathname.startsWith('/learning/javascript');

    return (
        <footer className={`${isLearningPage ? 'fixed' : ''} bottom-0 h-16 w-full shrink-0 items-center justify-between p-10 md:px-6 bg-[#171717]`}>
            <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 Front-end Foundation</p>
        </footer>
    );
}