import Link from "next/link"
import { Typography } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import ModeToggle from "@/components/mode-toggle"
import { CircleUserRound, Menu } from "lucide-react"

export default function MainHeader() {
    return (
        <header className="flex h-16 w-full fixed items-center justify-between pr-4 md:pr-6 bg-[#1b1b1d] z-10">
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
            <div className="flex items-center gap-4 md:hidden">
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
                                href="/About"
                            >
                                About
                            </Link>
                            <Link
                                className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                                href="/Contact"
                            >
                                Contact
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
            <nav className="hidden items-center gap-4 md:flex">
                <Link
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                    href="/"
                >
                    <Typography variant="p" as="h1" className="text-white">
                        HOME
                    </Typography>
                </Link>
                <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
                <Link
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                    href="/about"
                >
                    <Typography variant="p" as="h1" className="text-white">
                        ABOUT
                    </Typography>
                </Link>
                <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
                <Link
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                    href="/contact"
                >
                    <Typography variant="p" as="h1" className="text-white">
                        CONTACT
                    </Typography>
                </Link>
                <ModeToggle />
            </nav>
        </header>
    );
}
