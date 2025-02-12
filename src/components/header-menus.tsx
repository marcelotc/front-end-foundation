"use client";

import * as React from "react";
import Link from "next/link";
import { Home } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const learnBasics = [
    { title: "HTML", href: "/learning/html", description: "The standard markup language for creating web pages and applications." },
    { title: "CSS", href: "/learning/css", description: "A stylesheet language used to describe the presentation of a document written in HTML." },
    { title: "JavaScript", href: "/learning/javascript", description: "A programming language that enables interactive web pages and dynamic content." },
];

const advancedSpecialization = [
    { title: "Frameworks", href: "/learning/frameworks", description: "Tools like React, Vue, or Angular for building web applications." },
    { title: "UX/UI", href: "/learning/uxui", description: "User experience and interface design principles and best practices." },
    { title: "Design Systems", href: "/learning/designsystems", description: "Guidelines for creating consistent UI design across applications." },
];

const resourcesExtras = [
    { title: "About", href: "/about", description: "General information about the platform or project." },
    { title: "Roadmap", href: "/roadmap", description: "Learning paths and career progression guides." },
    { title: "Quizzes", href: "/quiz", description: "Interactive tests for learning validation." },
];

export function HeaderMenus() {
    return (
        <NavigationMenu>
            <Link
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                href="/"
            >
                <Home color="white" />
            </Link>
            <NavigationMenuList className="flex gap-2">
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Learn & Basics</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {learnBasics.map((item) => (
                                <ListItem key={item.title} title={item.title} href={item.href}>
                                    {item.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Advanced & Specialization</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {advancedSpecialization.map((item) => (
                                <ListItem key={item.title} title={item.title} href={item.href}>
                                    {item.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Resources & Extras</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {resourcesExtras.map((item) => (
                                <ListItem key={item.title} title={item.title} href={item.href}>
                                    {item.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href = "/" }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    href={href}
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}>
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";
