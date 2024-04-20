import Link from "next/link"
import { Typography } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import ModeToggle from "@/components/mode-toggle"
import { CircleUserRound, Menu } from "lucide-react"

export default function MainHeader() {
    return (
        <header className="flex h-16 w-full items-center justify-between pr-4 md:pr-6 bg-[#171717]">
            <div className="bg-white px-4 md:px-6 border-b-2 border-black-600 h-full">
                <Typography variant="extra2LargeText" as="h1" className="text-black font-bold">
                    FRONT-END
                </Typography>
                <Typography variant="extra2LargeText" as="h1" className="text-black font-bold">
                    FOUNDATION
                </Typography>
            </div>
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
                                href="#"
                            >
                                Home
                            </Link>
                            <Link
                                className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                                href="#"
                            >
                                About
                            </Link>
                            <Link
                                className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                                href="#"
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
                    href="#"
                >
                    <Typography variant="p" as="h1" className="text-white">
                        HOME
                    </Typography>
                </Link>
                <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
                <Link
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                    href="#"
                >
                    <Typography variant="p" as="h1" className="text-white">
                        ABOUT
                    </Typography>
                </Link>
                <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
                <Link
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                    href="#"
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
