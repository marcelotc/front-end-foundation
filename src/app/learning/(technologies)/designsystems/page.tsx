'use client';

import React, { useContext, useEffect } from 'react';
import SideMenuContext from '@/app/learning/(technologies)/context/sideMenuContext';
import { SkeletonCard } from '@/app/learning/(technologies)/components/contentSkeleton';
import { Typography } from "@/components/ui/typography"
import Image from "next/image";
import designSystemsLogo from "../../../../../public/design-systems-logo.png";

import MainWrapper from '@/app/learning/(technologies)/components/mainWrapper';
import ContentOutput from '@/app/learning/(technologies)/components/contentOutput';

export default function Designsystems() {
    const { setTechnology, setMarkdown, technology, markdown, loadingContent } = useContext(SideMenuContext);

    useEffect(() => {
        setTechnology('designsystems');
        setMarkdown(null);
    }, [technology]);

    return (
        <MainWrapper markdown={markdown ?? undefined}>
            {!markdown && !loadingContent && (
                <>
                    <div className='flex items-center justify-center'>
                        <Image
                            src={designSystemsLogo}
                            width={200}
                            height={200}
                            alt="designSystems logo"
                        />
                    </div>
                    <div className='mt-10'>
                        <Typography variant="h3" className="mb-4"><b>What are Design Systems?</b></Typography>
                        <Typography className="mb-4">
                            A design system is a comprehensive set of guidelines, components, and tools that streamline the design and development of user interfaces (UI). It acts as a shared library that includes styles, UI elements, typography, color palettes, and patterns, ensuring consistency and cohesiveness across a product or platform.
                        </Typography>
                        <Typography className="mb-4">
                            In front-end development, design systems help developers create interfaces that align with the established design language of an organization. By using reusable components and patterns, a design system speeds up development, reduces redundancy, and fosters a more efficient workflow. It also makes collaboration between design and development teams easier, as both parties have a common set of standards and assets.
                        </Typography>

                        <Typography variant="h3" className="mb-4"><b>Why Are Design Systems Important?</b></Typography>
                        <Typography className="mb-4">
                            1. <b>Consistency:</b> A design system ensures that all elements within an application, website, or platform look and function similarly, creating a cohesive user experience.
                        </Typography>
                        <Typography className="mb-4">
                            2. <b>Efficiency:</b> With predefined components and style guidelines, developers can quickly implement designs without reinventing the wheel.
                        </Typography>
                        <Typography className="mb-4">
                            3. <b>Scalability:</b> Design systems enable teams to scale their applications by reusing elements, making future updates and expansions easier and more manageable.
                        </Typography>
                        <Typography className="mb-4">
                            4. <b>Collaboration:</b> A shared design system facilitates better communication and collaboration between design and development teams, ensuring that designs are implemented accurately.
                        </Typography>
                        <Typography className="mb-4">
                            5. <b>Maintainability:</b> Design systems provide a single source of truth for the entire design and development process, making it easier to maintain and update.
                        </Typography>

                        <Typography>
                            In short, design systems are essential for creating user interfaces that are not only visually consistent but also functional, accessible, and scalable.
                        </Typography>
                    </div>
                </>
            )}
            {loadingContent ? <SkeletonCard /> : <ContentOutput content={markdown ? markdown[0]?.content : ''} />}
        </MainWrapper>
    );
}
