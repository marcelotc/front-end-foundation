"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";
import { CircleUserRound, Menu, User, LogOut, Home } from "lucide-react";
import Link from "next/link";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu";
//import ModeToggle from "@/components/mode-toggle"

export default function MainHeader() {
    const { isSignedIn, user } = useUser();

    return (
        <header className="flex h-16 w-full py-6 items-center justify-between pr-4 lg:pr-6 bg-[#1b1b1d] z-10">
            <Link href={'/'}>
                <div className="pl-[46px] pr-[50px] h-full cursor-pointer hover:opacity-60 ">
                    <Typography variant="mutedText" as="h1" className="text-white font-semibold">
                        FRONT-END
                    </Typography>
                    <Typography variant="mutedText" as="h1" className="text-white font-semibold">
                        FOUNDATION
                    </Typography>
                </div>
            </Link>
            <div className="flex items-center gap-4 lg:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="link">
                            <Menu color="white" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="w-[280px]" side="right">
                        <div className="flex flex-col gap-4 p-6">
                            <Link
                                className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                                href="/"
                            >
                                Home
                            </Link>
                            <Link
                                className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                                href="/about"
                            >
                                About
                            </Link>
                            <Link
                                className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                                href="/roadmap"
                            >
                                Roadmap
                            </Link>
                            <Link
                                className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                                href="/learning/html"
                            >
                                HTML
                            </Link>
                            <Link
                                className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                                href="/learning/css"
                            >
                                CSS
                            </Link>
                            <Link
                                className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                                href="/learning/javascript"
                            >
                                JAVASCRIPT
                            </Link>
                        </div>
                    </SheetContent>
                </Sheet>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="rounded-full" size="icon" variant="link">
                            <CircleUserRound color="white" />
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <nav className="hidden items-center lg:flex">
                <Link
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                    href="/"
                >
                    <Home color="white" />
                </Link>
                <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
                <Link
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                    href="/about"
                >
                    <Typography variant="smallText" as="h1" className="text-white text-xs">
                        ABOUT
                    </Typography>
                </Link>
                <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
                <Link
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                    href="/learning/html"
                >
                    <Typography variant="smallText" as="h1" className="text-white text-xs">
                        HTML
                    </Typography>
                </Link>
                <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
                <Link
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                    href="/learning/css"
                >
                    <Typography variant="smallText" as="h1" className="text-white text-xs">
                        CSS
                    </Typography>
                </Link>
                <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
                <Link
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                    href="/learning/javascript"
                >
                    <Typography variant="smallText" as="h1" className="text-white text-xs">
                        JAVASCRIPT
                    </Typography>
                </Link>
                <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
                <Link
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                    href="/roadmap"
                >
                    <Typography variant="smallText" as="h1" className="text-white text-xs">
                        ROADMAP
                    </Typography>
                </Link>
                <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
                <Link
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                    href="/learning/progress"
                >
                    <Typography variant="smallText" as="h1" className="text-white text-xs">
                        LEARNING PROGRESS
                    </Typography>
                </Link>
                <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
                <Link
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                    href="/quiz"
                >
                    <Typography variant="smallText" as="h1" className="text-white text-xs">
                        QUIZZES
                    </Typography>
                </Link>
                <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
                <Link
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                    href="/codesandbox"
                >
                    <Typography variant="smallText" as="h1" className="text-white text-xs">
                        CODE SANDBOX
                    </Typography>
                </Link>
                <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
                {/*<Link
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                    href="/learning/path"
                >
                    <Typography variant="smallText" as="h1" className="text-white text-xs">
                        LEARNING PATH CALENDAR
                    </Typography>
                </Link>
                <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />*/}
                {/*<ModeToggle />*/}
                {isSignedIn ? (
                    <div className="flex justify-center items-center gap-4 ml-3">
                        <Typography variant="p" as="h1" className="text-white">
                            Hello {user.firstName}!
                        </Typography>
                        <SignOutButton>
                            <div className="flex justify-center items-center gap-4 cursor-pointer">
                                <LogOut color="white" className="cursor-pointer" />
                                <Typography variant="smallText" as="p" className="text-white block !m-0">
                                    Sign out
                                </Typography>
                            </div>
                        </SignOutButton>
                    </div>
                ) : (
                    <Link href="/sign-in" className="flex justify-center items-center gap-4 ml-3">
                        <User color="white" />
                        <Typography variant="smallText" as="p" className="text-white block !m-0">
                            Sign in
                        </Typography>
                    </Link>
                )}
            </nav>
        </header>
    );
}
