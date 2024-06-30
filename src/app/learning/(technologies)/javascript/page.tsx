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
        <MainWrapper markdown={markdown}>
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
                        javascript is the standard markup language for creating Web pages.

                        What is javascript?
                        javascript stands for Hyper Text Markup Language
                        javascript is the standard markup language for creating Web pages
                        javascript describes the structure of a Web page
                        javascript consists of a series of elements
                        javascript elements tell the browser how to display the content
                        javascript elements label pieces of content such as "this is a heading", "this is a paragraph", "this is a link", etc.
                    </div>
                </>
            )
            }
            {loadingContent ? <SkeletonCard /> : <ContentOutput content={markdown ? markdown[0]?.content : ''} />}
        </MainWrapper >
    );
}