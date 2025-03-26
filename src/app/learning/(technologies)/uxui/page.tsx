'use client';

import React, { useContext, useEffect } from 'react';
import SideMenuContext from '@/app/learning/(technologies)/context/sideMenuContext';
import { SkeletonCard } from '@/app/learning/(technologies)/components/contentSkeleton';
import { Typography } from "@/components/ui/typography"
import Image from "next/image";
import uxuiLogo from "/public/ux-ui-logo.png";

import MainWrapper from '@/app/learning/(technologies)/components/mainWrapper';
import ContentOutput from '@/app/learning/(technologies)/components/contentOutput';

export default function Uxui() {
    const { setTechnology, setMarkdown, technology, markdown, loadingContent } = useContext(SideMenuContext);

    useEffect(() => {
        setTechnology('uxui');
        setMarkdown(null);
    }, [technology]);

    return (
        <MainWrapper markdown={markdown ?? undefined}>
            {!markdown && !loadingContent && (
                <>
                    <div className='flex items-center justify-center'>
                        <Image
                            src={uxuiLogo}
                            width={200}
                            height={200}
                            alt="UX/UI logo"
                        />
                    </div>
                    <div className='mt-10'>
                        <Typography variant="h3" className="mb-4"><b>What is UX/UI Design?</b></Typography>
                        <Typography className="mb-4">
                            UX/UI design refers to the process of designing the user experience (UX) and user interface (UI) of websites, applications, and other digital products. While the two terms are often used together, they represent distinct aspects of design:
                        </Typography>
                        <Typography className="mb-4">
                            - <b>UX (User Experience) Design</b>: Focuses on the overall experience a user has when interacting with a product. It involves research, wireframing, prototyping, and testing to ensure that the product is user-friendly, accessible, and efficient in achieving its purpose.
                        </Typography>
                        <Typography className="mb-4">
                            - <b>UI (User Interface) Design</b>: Focuses on the visual and interactive elements of a product. UI design includes the layout, color scheme, typography, buttons, icons, and other elements that the user interacts with directly.
                        </Typography>

                        <Typography variant="h3" className="mb-4"><b>Why Are UX/UI Design Important?</b></Typography>
                        <Typography className="mb-4">
                            1. <b>User-Centric Approach:</b> UX/UI design prioritizes the user's needs and goals, ensuring that products are intuitive, easy to use, and accessible for all users.
                        </Typography>
                        <Typography className="mb-4">
                            2. <b>Improved Usability:</b> Good UX/UI design enhances the overall usability of a product, making it easier for users to navigate and interact with the interface, reducing frustration and increasing satisfaction.
                        </Typography>
                        <Typography className="mb-4">
                            3. <b>Increased Engagement:</b> Effective UI design creates visually appealing and engaging interfaces that attract users and encourage them to spend more time interacting with the product.
                        </Typography>
                        <Typography className="mb-4">
                            4. <b>Brand Consistency:</b> UX/UI design helps maintain a consistent brand identity across all digital touchpoints, from websites to mobile apps, ensuring a unified experience that strengthens brand recognition.
                        </Typography>
                        <Typography className="mb-4">
                            5. <b>Business Success:</b> A well-designed user experience can lead to higher conversion rates, better user retention, and ultimately greater business success. Satisfied users are more likely to recommend the product, increasing brand loyalty and growth.
                        </Typography>

                        <Typography>
                            In short, UX/UI design is essential for creating digital products that are not only functional and efficient but also enjoyable and visually appealing to users. A strong UX/UI design can differentiate a product in a crowded market, making it more attractive and competitive.
                        </Typography>
                    </div>
                </>
            )}
            {loadingContent ? <SkeletonCard /> : <ContentOutput content={markdown ? markdown[0]?.content : ''} />}
        </MainWrapper>
    );
}
