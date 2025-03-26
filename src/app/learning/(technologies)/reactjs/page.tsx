'use client';

import React, { useContext, useEffect } from 'react';
import SideMenuContext from '@/app/learning/(technologies)/context/sideMenuContext';
import { SkeletonCard } from '@/app/learning/(technologies)/components/contentSkeleton';
import { Typography } from "@/components/ui/typography";
import Image from "next/image";
import reactLogo from "/public/react-icon.png";

import MainWrapper from '@/app/learning/(technologies)/components/mainWrapper';
import ContentOutput from '@/app/learning/(technologies)/components/contentOutput';

export default function Reactjs() {
    const { setTechnology, setMarkdown, technology, markdown, loadingContent } = useContext(SideMenuContext);

    useEffect(() => {
        setTechnology('reactjs');
        setMarkdown(null);
    }, [technology]);

    return (
        <MainWrapper markdown={markdown ?? undefined}>
            {!markdown && !loadingContent && (
                <>
                    <div className='flex items-center justify-center'>
                        <Image
                            src={reactLogo}
                            width={200}
                            height={200}
                            alt="React logo"
                        />
                    </div>
                    <div className='mt-10'>
                        <Typography variant="h3" className="mb-4"><b>What is React?</b></Typography>
                        <Typography className="mb-4">
                            React is a popular JavaScript library for building user interfaces, particularly for single-page applications. It allows developers to create reusable UI components that manage their state.
                        </Typography>
                        <Typography className="mb-4">
                            - <b>Component-Based Architecture:</b> React divides the UI into independent, reusable components, each managing its own state. This approach makes it easier to build and maintain complex interfaces.
                        </Typography>
                        <Typography className="mb-4">
                            - <b>Virtual DOM:</b> React uses a virtual DOM to optimize rendering by diffing between the virtual and real DOM, updating only the necessary parts of the UI.
                        </Typography>

                        <Typography variant="h3" className="mb-4"><b>Why Use React?</b></Typography>
                        <Typography className="mb-4">
                            1. <b>Declarative:</b> React makes it easy to create interactive UIs. Designers can build views for each state of an application, and React will efficiently update and render the right components when the data changes.
                        </Typography>
                        <Typography className="mb-4">
                            2. <b>Component-Based:</b> Components in React are like JavaScript functions. They accept inputs (called "props") and return React elements describing what should appear on the screen.
                        </Typography>
                        <Typography className="mb-4">
                            3. <b>Learn Once, Write Anywhere:</b> React can be used to build web applications, mobile applications with React Native, and even desktop applications.
                        </Typography>
                        <Typography className="mb-4">
                            4. <b>Rich Ecosystem:</b> React has a vast ecosystem, including libraries for routing, state management, and server-side rendering, providing developers with a comprehensive toolset.
                        </Typography>
                        <Typography className="mb-4">
                            5. <b>Strong Community Support:</b> React has a large and active community, which means ample resources, tutorials, and third-party tools to assist developers.
                        </Typography>

                        <Typography>
                            In summary, React's component-based architecture, performance optimizations, and strong ecosystem make it a powerful tool for building modern user interfaces. It simplifies the development process and enhances the scalability of applications.
                        </Typography>
                    </div>
                </>
            )}
            {loadingContent ? <SkeletonCard /> : <ContentOutput content={markdown ? markdown[0]?.content : ''} />}
        </MainWrapper>
    );
}
