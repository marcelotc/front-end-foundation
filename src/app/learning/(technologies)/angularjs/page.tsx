'use client';

import React, { useContext, useEffect } from 'react';
import SideMenuContext from '@/app/learning/(technologies)/context/sideMenuContext';
import { SkeletonCard } from '@/app/learning/(technologies)/components/contentSkeleton';
import { Typography } from "@/components/ui/typography"
import Image from "next/image";
import angularLogo from "../../../../../public/angular-icon.png";

import MainWrapper from '@/app/learning/(technologies)/components/mainWrapper';
import ContentOutput from '@/app/learning/(technologies)/components/contentOutput';

export default function Angular() {
    const { setTechnology, setMarkdown, technology, markdown, loadingContent } = useContext(SideMenuContext);

    useEffect(() => {
        setTechnology('angularjs');
        setMarkdown(null);
    }, [technology]);

    return (
        <MainWrapper markdown={markdown ?? undefined}>
            {!markdown && !loadingContent && (
                <>
                    <div className='flex items-center justify-center'>
                        <Image
                            src={angularLogo}
                            width={200}
                            height={200}
                            alt="Angular logo"
                        />
                    </div>
                    <div className='mt-10'>
                        <Typography variant="h3" className="mb-4"><b>What is Angular?</b></Typography>
                        <Typography className="mb-4">
                            Angular is a popular framework for building web applications using TypeScript and JavaScript. It provides a robust structure for developing scalable and maintainable web applications.
                        </Typography>
                        <Typography className="mb-4">
                            - <b>Components:</b> Angular applications are built using components, which are the basic building blocks of the UI.
                        </Typography>
                        <Typography className="mb-4">
                            - <b>Dependency Injection:</b> Angular has a powerful dependency injection system that makes it easy to manage services and dependencies.
                        </Typography>
                        <Typography className="mb-4">
                            - <b>Directives:</b> Angular uses directives to extend HTML capabilities and add dynamic behavior to the elements.
                        </Typography>

                        <Typography variant="h3" className="mb-4"><b>Why Use Angular?</b></Typography>
                        <Typography className="mb-4">
                            1. <b>Modular Architecture:</b> Angular promotes modular development, making it easier to manage and scale large applications.
                        </Typography>
                        <Typography className="mb-4">
                            2. <b>TypeScript Support:</b> Angular uses TypeScript, which provides enhanced tooling, type-checking, and code readability.
                        </Typography>
                        <Typography className="mb-4">
                            3. <b>Two-Way Data Binding:</b> Angular supports two-way data binding, simplifying the synchronization between the model and the view.
                        </Typography>
                        <Typography className="mb-4">
                            4. <b>Community and Ecosystem:</b> Angular has a large community and a rich ecosystem of tools, libraries, and third-party integrations.
                        </Typography>
                        <Typography className="mb-4">
                            5. <b>Performance Optimizations:</b> Angular includes various built-in performance optimizations, such as Ahead-of-Time (AOT) compilation and tree-shaking.
                        </Typography>

                        <Typography>
                            Angular is a comprehensive solution for developing modern web applications, offering a structured approach and a set of powerful features that help developers create efficient, maintainable, and scalable applications.
                        </Typography>
                    </div>
                </>
            )}
            {loadingContent ? <SkeletonCard /> : <ContentOutput content={markdown ? markdown[0]?.content : ''} />}
        </MainWrapper>
    );
}
