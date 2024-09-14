'use client';

import React, { useContext, useEffect } from 'react';
import SideMenuContext, { } from '../context/sideMenuContext';
import { SkeletonCard } from "../components/contentSkeleton"
import Image from "next/image";
import javascriptLogo from "../../../../../public/javascript-logo.png";

import MainWrapper from '../components/mainWrapper';
import ContentOutput from '../components/contentOutput'

export default function Javascript() {
    const { setTechnology, technology, markdown, loadingContent } = useContext(SideMenuContext);

    useEffect(() => {
        setTechnology('javascript')
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
                            alt="javascript logo"
                        />
                    </div>
                    <div className='mt-10'>
                        <b>JavaScript</b> is a versatile programming language that brings interactivity to web pages. Unlike HTML and CSS, which focus on structure and style,
                        JavaScript allows developers to create dynamic content that can respond to user actions. It can modify HTML and CSS in real-time, enabling features
                        such as form validation, content updates, and animations. JavaScript is essential for creating modern, interactive web applications, making the browsing
                        experience more engaging and user-friendly.
                    </div>
                </>
            )
            }
            {loadingContent ? <SkeletonCard /> : <ContentOutput content={markdown ? markdown[0]?.content : ''} />}
        </MainWrapper>
    );
}