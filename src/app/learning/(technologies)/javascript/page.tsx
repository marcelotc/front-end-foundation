'use client';

import React, { useContext, useEffect } from 'react';
import SideMenuContext from '../context/sideMenuContext';
import { SkeletonCard } from "@/app/learning/(technologies)/components/contentSkeleton";
import { Typography } from "@/components/ui/typography";
import Image from "next/image";
import javascriptLogo from "/public/javascript-logo.png";

import MainWrapper from '../components/mainWrapper';
import ContentOutput from '../components/contentOutput';

export default function Javascript() {
    const { setTechnology, setMarkdown, technology, markdown, loadingContent } = useContext(SideMenuContext);

    useEffect(() => {
        setTechnology('javascript');
        setMarkdown(null);
    }, [technology]);

    return (
        <MainWrapper markdown={markdown ?? undefined}>
            {!markdown && !loadingContent && (
                <>
                    <div className='flex items-center justify-center'>
                        <Image
                            src={javascriptLogo}
                            width={200}
                            height={200}
                            alt="JavaScript logo"
                        />
                    </div>
                    <div className='mt-10'>
                        <Typography variant="h3" className="mb-4">What is?</Typography>
                        <Typography className="mb-4">
                            <b>JavaScript</b> is a versatile programming language that brings interactivity to web pages. Unlike HTML and CSS, which focus on structure and style,
                            JavaScript allows developers to create dynamic content that can respond to user actions. It can modify HTML and CSS in real-time, enabling features
                            such as form validation, content updates, and animations. JavaScript is essential for creating modern, interactive web applications, making the browsing
                            experience more engaging and user-friendly.
                        </Typography>

                        <Typography variant="h3" className="mb-4">Role of JavaScript in Web Development</Typography>
                        <Typography className="mb-4">
                            JavaScript plays a vital role in modern web development. Here's why:
                        </Typography>
                        <ul className="list-disc list-inside mb-8">
                            <li><b>Dynamic Content:</b> JavaScript allows web pages to change dynamically in response to user actions, such as clicking a button or submitting a form.</li>
                            <li><b>Interactivity:</b> JavaScript powers features like navigation menus, modals, pop-ups, and interactive maps that respond to user input.</li>
                            <li><b>Web Applications:</b> Most modern web applications are built using JavaScript frameworks (like React, Angular, and Vue) that provide structured and efficient ways to create complex interactive applications.</li>
                            <li><b>Mobile and Desktop Development:</b> With tools like React Native, JavaScript can be used to build mobile apps, and Electron allows for desktop app development, making JavaScript a cross-platform solution.</li>
                            <li><b>Real-Time Applications:</b> JavaScript is crucial for building real-time applications, such as chat apps or live updates, by enabling WebSockets or similar technologies for continuous communication with the server.</li>
                        </ul>

                        <Typography>
                            In conclusion, JavaScript is the backbone of interactive, dynamic web pages and web applications. Whether you're adding simple effects or building complex, user-driven applications, JavaScript makes the web experience more engaging, responsive, and enjoyable.
                        </Typography>
                    </div>
                </>
            )}
            {loadingContent ? <SkeletonCard /> : <ContentOutput content={markdown ? markdown[0]?.content : ''} />}
        </MainWrapper>
    );
}
