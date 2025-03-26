"use client";

import { useUser } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";


export default function MainHeader() {
    const { isSignedIn, user } = useUser();

    return (
        <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
            <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center gap-8">
                    <Link href="/" className="text-xl font-bold">
                        Front-End Foundation
                    </Link>
                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/learning/html" className="text-gray-600 hover:text-black">HTML</Link>
                        <Link href="/learning/css" className="text-gray-600 hover:text-black">CSS</Link>
                        <Link href="/learning/javascript" className="text-gray-600 hover:text-black">JavaScript</Link>
                        <Link href="/roadmap" className="text-gray-600 hover:text-black">Roadmap</Link>
                        <Link href="/quiz" className="text-gray-600 hover:text-black">Quiz</Link>
                        <Link href="/about" className="text-gray-600 hover:text-black">About</Link>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/sign-in">
                        <Button className="hidden md:flex">
                            Sign In
                        </Button>
                    </Link>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>
            </nav>
        </header>
    );
}
