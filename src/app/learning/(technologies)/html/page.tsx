'use client';

import React, { useContext, useEffect } from 'react';
import SideMenuContext, { } from '../context/sideMenuContext';
import { SkeletonCard } from "../components/contentSkeleton"
import Image from "next/image";
import htmlLogo from "../../../../../public/html-logo.png";

import MainWrapper from '../components/mainWrapper';
import ContentOutput from '../components/contentOutput'

export default function Html() {
    const { setTechnology, technology, markdown, loadingContent } = useContext(SideMenuContext);

    useEffect(() => {
        setTechnology('html')
    }, [technology]);

    return (
        <MainWrapper markdown={markdown}>
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
                        HTML is the standard markup language for creating Web pages.

                        What is HTML?
                        HTML stands for Hyper Text Markup Language
                        HTML is the standard markup language for creating Web pages
                        HTML describes the structure of a Web page
                        HTML consists of a series of elements
                        HTML elements tell the browser how to display the content
                        HTML elements label pieces of content such as "this is a heading", "this is a paragraph", "this is a link", etc.
                    </div>
                </>
            )
            }
            {loadingContent ? <SkeletonCard /> : <ContentOutput content={markdown ? markdown[0]?.content : ''} />}
        </MainWrapper >
    );
}