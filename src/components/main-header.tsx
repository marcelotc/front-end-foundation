import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import ModeToggle from "@/components/mode-toggle"
import { CircleUserRound, Menu, FileJson } from "lucide-react"

export default function MainHeader() {
    return (
        <header className="flex h-16 w-full items-center justify-between px-4 md:px-6">
            <Link className="flex items-center gap-2" href="#">
                <FileJson />
                <span className="text-lg font-semibold">FRONT-END FOUNDATION</span>
            </Link>
            <div className="flex items-center gap-4 md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="ghost">
                            <Menu />
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
                        <Button className="rounded-full" size="icon" variant="ghost">
                            <CircleUserRound />
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
                    Home
                </Link>
                <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
                <Link
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                    href="#"
                >
                    About
                </Link>
                <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
                <Link
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                    href="#"
                >
                    Contact
                </Link>
                <ModeToggle />
            </nav>
        </header>
    );
}
