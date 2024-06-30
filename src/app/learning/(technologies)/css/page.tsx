'use client';

import React, { useContext, useEffect } from 'react';
import SideMenuContext, { } from '../context/sideMenuContext';
import { SkeletonCard } from "../components/contentSkeleton"
import Image from "next/image";
import cssLogo from "../../../../../public/css-logo.png";

import MainWrapper from '../components/mainWrapper';
import ContentOutput from '../components/contentOutput'

export default function Css() {
    const { setTechnology, technology, markdown, loadingContent } = useContext(SideMenuContext);

    useEffect(() => {
        setTechnology('css')
    }, [technology]);

    return (
        <MainWrapper markdown={markdown}>
            {!markdown && !loadingContent && (
                <>
                    <div className='flex items-center justify-center'>
                        <Image
                            src={cssLogo}
                            width={200}
                            height={200}
                            alt="css logo"
                        />
                    </div>
                    <div className='mt-10'>
                        css is the standard markup language for creating Web pages.

                        What is css?
                        css stands for Hyper Text Markup Language
                        css is the standard markup language for creating Web pages
                        css describes the structure of a Web page
                        css consists of a series of elements
                        css elements tell the browser how to display the content
                        css elements label pieces of content such as "this is a heading", "this is a paragraph", "this is a link", etc.
                    </div>
                </>
            )
            }
            {loadingContent ? <SkeletonCard /> : <ContentOutput content={markdown ? markdown[0]?.content : ''} />}
        </MainWrapper >
    );
}