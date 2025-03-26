'use client';

import React, { useContext, useEffect } from 'react';
import SideMenuContext from '@/app/learning/(technologies)/context/sideMenuContext';
import { SkeletonCard } from '@/app/learning/(technologies)/components/contentSkeleton';
import { Typography } from "@/components/ui/typography";
import Image from "next/image";
import vueLogo from "/public/vue-icon.png";

import MainWrapper from '@/app/learning/(technologies)/components/mainWrapper';
import ContentOutput from '@/app/learning/(technologies)/components/contentOutput';

export default function Vuejs() {
    const { setTechnology, setMarkdown, technology, markdown, loadingContent } = useContext(SideMenuContext);

    useEffect(() => {
        setTechnology('vuejs');
        setMarkdown(null);
    }, [technology]);

    return (
        <MainWrapper markdown={markdown ?? undefined}>
            {!markdown && !loadingContent && (
                <>
                    <div className='flex items-center justify-center'>
                        <Image
                            src={vueLogo}
                            width={200}
                            height={200}
                            alt="Vue logo"
                        />
                    </div>
                    <div className='mt-10'>
                        <Typography variant="h3" className="mb-4"><b>What is Vue.js?</b></Typography>
                        <Typography className="mb-4">
                            Vue.js is a progressive JavaScript framework for building user interfaces. It is designed to be incrementally adoptable, with a core library that focuses on the view layer only.
                        </Typography>
                        <Typography className="mb-4">
                            Vue.js is easy to integrate into projects that use other JavaScript libraries. It is also perfectly capable of powering sophisticated single-page applications when used in combination with modern tooling and supporting libraries.
                        </Typography>

                        <Typography variant="h3" className="mb-4"><b>Why Use Vue.js?</b></Typography>
                        <Typography className="mb-4">
                            1. <b>Reactive Data Binding:</b> Vue.js offers a simple and intuitive way to bind data and create dynamic, reactive user interfaces.
                        </Typography>
                        <Typography className="mb-4">
                            2. <b>Component-Based Architecture:</b> Vue.js uses a component-based architecture that makes it easy to reuse code and create modular applications.
                        </Typography>
                        <Typography className="mb-4">
                            3. <b>Easy Learning Curve:</b> Vue.js has a gentle learning curve compared to other frameworks like Angular and React, making it accessible to beginners.
                        </Typography>
                        <Typography className="mb-4">
                            4. <b>Flexible and Lightweight:</b> Vue.js is lightweight and flexible, making it suitable for both simple and complex projects.
                        </Typography>
                        <Typography className="mb-4">
                            5. <b>Strong Community Support:</b> Vue.js has a strong and growing community, with plenty of resources, plugins, and tools available to developers.
                        </Typography>

                        <Typography>
                            In summary, Vue.js is an excellent choice for developers looking to build modern, performant, and maintainable web applications with ease and flexibility.
                        </Typography>
                    </div>
                </>
            )}
            {loadingContent ? <SkeletonCard /> : <ContentOutput content={markdown ? markdown[0]?.content : ''} />}
        </MainWrapper>
    );
}
