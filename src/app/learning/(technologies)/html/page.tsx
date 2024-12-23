'use client';

import React, { useContext, useEffect } from 'react';
import SideMenuContext from '../context/sideMenuContext';
import { SkeletonCard } from "../components/contentSkeleton";
import Image from "next/image";
import htmlLogo from "../../../../../public/html-logo.png";

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
                        <b>HTML</b>, which stands for Hyper Text Markup Language, is the foundational language used for creating web pages.
                        It provides the basic structure of a webpage, allowing developers to organize and label content. HTML consists of a series of elements,
                        each serving a specific purpose, such as defining headings, paragraphs, and links. These elements guide the browser on how to display the content,
                        making it possible to construct complex and structured web pages.
                    </div>
                </>
            )}
            {loadingContent ? <SkeletonCard /> : <ContentOutput content={markdown ? markdown[0]?.content : ''} />}
        </MainWrapper>
    );
}
