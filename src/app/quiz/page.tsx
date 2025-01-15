'use client';

import { useRouter } from 'next/navigation';

import { Typography } from "@/components/ui/typography";

const technologies = ['html', 'css', 'javascript'];

export default function QuizMainPage() {
  const router = useRouter();

  const handleTechnologySelect = (tech: string) => {
    router.push(`/quiz/${tech.toLowerCase()}`);
  };

  return (
    <section className="flex flex-col h-full items-center mt-20">
    <Typography variant="extra3LargeText" className="mb-4">
        Select a Technology to Start
    </Typography>
    <div className="flex justify-center gap-6">
        {technologies.map((tech, index) => (
            <div
                key={index}
                onClick={() => handleTechnologySelect(tech)}
                className="flex bg-[#1b1b1d] items-center justify-center w-full sm:w-[300px] md:w-[250px] h-[150px] rounded-xl hover:opacity-95 cursor-pointer">
                <Typography variant="largeText" className="text-white">
                    {tech}
                </Typography>
            </div>
        ))}
    </div>
</section>
  );
}
