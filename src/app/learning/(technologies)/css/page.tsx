'use client';

import React, { useContext, useEffect } from 'react';
import SideMenuContext from '../context/sideMenuContext';
import { SkeletonCard } from "@/app/learning/(technologies)/components/contentSkeleton";
import { Typography } from "@/components/ui/typography";
import Image from "next/image";
import cssLogo from "/public/css-logo.png";

import MainWrapper from '../components/mainWrapper';
import ContentOutput from '../components/contentOutput';

export default function Css() {
    const { setTechnology, setMarkdown, technology, markdown, loadingContent } = useContext(SideMenuContext);

    useEffect(() => {
        setTechnology('css');
        setMarkdown(null);
    }, [technology]);

    return (
        <MainWrapper markdown={markdown ?? undefined}>
            {!markdown && !loadingContent && (
                <>
                    <div className='flex items-center justify-center'>
                        <Image
                            src={cssLogo}
                            width={200}
                            height={200}
                            alt="CSS logo"
                        />
                    </div>
                    <div className='mt-10'>
                        <Typography variant="h3" className="mb-4">What is?</Typography>
                        <Typography className="mb-4">
                            <b>CSS</b> stands for <b>Cascading Style Sheets</b>. It is a stylesheet language used to describe the presentation of a document written in HTML or XML. While HTML is used to define the structure of a webpage, CSS is used to control its layout, colors, fonts, and overall visual appearance.
                        </Typography>
                        <Typography className="mb-4">
                            CSS allows web developers to separate the content of a webpage from its design. This separation makes it easier to maintain the website and ensures that updates to the design can be made independently of the content.
                        </Typography>

                        <Typography variant="h3" className="mb-4">Role of CSS in Web Development</Typography>
                        <Typography className="mb-4">
                            CSS plays a key role in web development by providing the tools to create aesthetically pleasing and responsive websites. Here's how CSS contributes to web design:
                        </Typography>
                        <ul className="list-disc list-inside mb-8">
                            <li><b>Styling Layouts:</b> CSS allows developers to create various layouts, using techniques such as Flexbox and Grid, ensuring websites look good on all screen sizes.</li>
                            <li><b>Typography:</b> CSS gives you control over fonts, text sizes, colors, line spacing, and more, helping you design readable and visually appealing text.</li>
                            <li><b>Colors and Backgrounds:</b> With CSS, you can apply colors to elements, add background images, and even create gradients, enhancing the visual impact of a webpage.</li>
                            <li><b>Spacing and Alignment:</b> CSS controls margins, padding, and element positioning, ensuring proper alignment and spacing for a neat, structured page.</li>
                            <li><b>Responsive Design:</b> With CSS media queries, you can create adaptive designs that adjust to different devices, ensuring a seamless experience across desktop, tablet, and mobile screens.</li>
                            <li><b>Animations and Transitions:</b> CSS enables you to create animations and transitions, adding dynamic effects and improving user interaction with your website.</li>
                        </ul>

                        <Typography>
                            In short, CSS is essential for web development. It takes the raw structure provided by HTML and turns it into an engaging, functional, and visually appealing web experience.
                        </Typography>
                    </div>
                </>
            )}
            {loadingContent ? <SkeletonCard /> : <ContentOutput content={markdown ? markdown[0]?.content : ''} />}
        </MainWrapper>
    );
}
