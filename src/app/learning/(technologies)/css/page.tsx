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
        <MainWrapper markdown={markdown ?? undefined} loadingContent={loadingContent}>
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
                        <b>CSS</b>, or Cascading Style Sheets, is the language used to style HTML documents. It describes how HTML elements should be displayed,
                        offering control over the presentation of web pages. With CSS, developers can set the layout, colors, fonts, and overall design, ensuring a
                        consistent and appealing appearance across different devices and screen sizes. CSS enhances the user experience by enabling visually engaging and
                        responsive web designs.
                    </div>
                </>
            )
            }
            {loadingContent ? <SkeletonCard /> : <ContentOutput content={markdown ? markdown[0]?.content : ''} />}
        </MainWrapper >
    );
}