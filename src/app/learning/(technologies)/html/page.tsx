'use client';

import React, { useContext, useEffect } from 'react';
import SideMenuContext from '../context/sideMenuContext';
import { SkeletonCard } from "@/app/learning/(technologies)/components/contentSkeleton";
import { Typography } from "@/components/ui/typography"
import Image from "next/image";
import htmlLogo from "/public/html-logo.png";

import MainWrapper from '../components/mainWrapper';
import ContentOutput from '../components/contentOutput';

export default function Html() {
    const { setTechnology, setMarkdown, technology, markdown, loadingContent } = useContext(SideMenuContext);

    useEffect(() => {
        setTechnology('html');
        setMarkdown(null);
    }, [technology]);

    return (
        <MainWrapper markdown={markdown ?? undefined}>
            {!markdown && !loadingContent && (
                <>
                    <div className='flex items-center justify-center'>
                        <Image
                            src={htmlLogo}
                            width={200}
                            height={200}
                            alt="HTML logo"
                        />
                    </div>
                    <div className='mt-10'>
                        <Typography variant="h3" className="mb-4">What is?</Typography>
                        <Typography className="mb-4">
                            <b>HTML</b> stands for <b>HyperText Markup Language</b>. It is the standard language used to create and design webpages and web applications. HTML defines the structure and content of a web page through a series of elements, or "tags," that are interpreted by web browsers to display text, images, links, forms, and other types of content.
                        </Typography>
                        <Typography className="mb-4">
                            HTML is a markup language, meaning it is used to annotate text or data with additional information that describes how it should be structured or displayed. However, unlike programming languages such as JavaScript or Python, HTML does not have logic or control structures; it simply structures and marks up content.
                        </Typography>

                        <Typography variant="h3" className="mb-4">Role of HTML in Web Development</Typography>
                        <Typography className="mb-4">
                            HTML serves as the backbone of any website or web application. It plays several crucial roles in the web development process:
                        </Typography>
                        <ul className="list-disc list-inside mb-8">
                            <li><b>Creates the Structure:</b> HTML is used to create the basic layout of a webpage. It defines where things go on the page, like where the text, images, and videos will appear.</li>
                            <li><b>Adds Content:</b> HTML allows you to add content to a page, such as paragraphs, headings, lists, links, and images. Without HTML, there would be no content to show on a webpage.</li>
                            <li><b>Links Pages Together:</b> Using HTML, you can create links between different pages. This is how websites connect to each other, allowing users to click on links to move from one page to another.</li>
                            <li><b>Builds Forms:</b> HTML is also used to create forms on websites, where users can enter information (like signing up for an account or filling out a contact form).</li>
                            <li><b>Makes Pages Understandable:</b> HTML helps browsers understand what type of content is on the page, like a header, a paragraph, or a list. This makes the page easier to navigate for both users and search engines.</li>
                        </ul>

                        <Typography>
                            In short, HTML is the foundation of every webpage. It organizes and structures the content, allowing users to see and interact with it in a meaningful way. Without HTML, there would be no visible content on the web!
                        </Typography>
                    </div>
                </>
            )}
            {loadingContent ? <SkeletonCard /> : <ContentOutput content={markdown ? markdown[0]?.content : ''} />}
        </MainWrapper>
    );
}
