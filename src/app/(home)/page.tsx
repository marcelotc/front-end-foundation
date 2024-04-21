import { Typography } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import Image from "next/image";
import Link from "next/link";
import { CornerRightUp } from 'lucide-react'
import htmlLogo from "../../../public/html-logo.png";
import cssLogo from "../../../public/css-logo.png";
import javascriptLogo from "../../../public/javascript-logo.png";
import pathImage from "../../../public/path-image.png";
import flagImage from "../../../public/flag-image.png";
import questionImage from "../../../public/question-image.png";
import roadMapImage from "../../../public/road-map-image.png";

export default function Home() {

    return (
        <section className="flex flex-col">
            <main className="flex-1 px-4 md:px-6 mt-32">
                <div className="flex justify-between">
                    <div className="space-y-4 animate-fade-down">
                        <div>
                            <Typography variant="extra3LargeText" as="h1">
                                Leverage your front-end skills
                            </Typography>
                            <Typography variant="extra3LargeText" as="h1">
                                by developing your <b><u>foundation</u></b>
                            </Typography>
                        </div>
                        <Link href={'/learning/path'} className="block">
                            <Button size={"lg"}>
                                Start your learning parth
                            </Button>
                        </Link>
                    </div>
                    <div className="flex flex-col items-center gap-3 animate-fade-down border-2 border-[#1b1b1d] p-3 rounded-xl">
                        <div className="flex">
                            <Link href={'/learning/html'}>
                                <Image
                                    src={htmlLogo}
                                    width={200}
                                    height={200}
                                    alt="HTML logo"
                                    className="hover:opacity-80 cursor-pointer"
                                />
                            </Link>
                            <Link href={'/learning/css'}>
                                <Image
                                    src={cssLogo}
                                    width={200}
                                    height={200}
                                    alt="CSS logo"
                                    className="hover:opacity-80 cursor-pointer"
                                />
                            </Link>
                            <Link href={'/learning/javascript'}>
                                <Image
                                    src={javascriptLogo}
                                    width={200}
                                    height={200}
                                    alt="JAVASCRIPT logo"
                                    className="hover:opacity-80 cursor-pointer"
                                />
                            </Link>
                        </div>
                        <div className="flex items-center gap-3">
                            <Typography variant="blockquote" as="p">
                                Choose what you want to learn by clicking in the technologies above
                            </Typography>
                            <CornerRightUp />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center gap-4 mt-10 py-10 animate-fade-up">
                    <div className="flex gap-4">
                        <Link href={'/learning/path'}>
                            <div className="flex bg-[#1b1b1d] w-[400px] h-[200px] rounded-xl hover:opacity-95 cursor-pointer">
                                <div className="flex items-center justify-between w-full p-10">
                                    <Typography variant="largeText" as="h1" className="text-white">
                                        Define your
                                        learning path calendar
                                    </Typography>
                                    <Image
                                        src={pathImage}
                                        width={100}
                                        height={100}
                                        alt="path image"
                                    />
                                </div>
                            </div>
                        </Link>
                        <Link href={'/quiz'}>
                            <div className="flex bg-[#1b1b1d] w-[400px] h-[200px] rounded-xl hover:opacity-95 cursor-pointer">
                                <div className="flex items-center justify-between w-full p-10">
                                    <Typography variant="largeText" as="h1" className="text-white">
                                        Take quizes
                                    </Typography>
                                    <Image
                                        src={questionImage}
                                        width={60}
                                        height={60}
                                        alt="question mark image"
                                    />
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="flex gap-4">
                        <Link href={'/roadmap'}>
                            <div className="flex bg-[#1b1b1d] w-[400px] h-[200px] rounded-xl hover:opacity-95 cursor-pointer">
                                <div className="flex items-center justify-between w-full p-10">
                                    <Typography variant="largeText" as="h1" className="text-white">
                                        Check the
                                        front-end roadmap
                                    </Typography>
                                    <Image
                                        src={roadMapImage}
                                        width={100}
                                        height={100}
                                        alt="road map image"
                                    />
                                </div>
                            </div>
                        </Link>
                        <Link href={'/learning/progress'}>
                            <div className="flex bg-[#1b1b1d] w-[400px] h-[200px] rounded-xl hover:opacity-95 cursor-pointer">
                                <div className="flex items-center justify-between w-full p-10">
                                    <Typography variant="largeText" as="h1" className="text-white">
                                        Track your
                                        learning progress
                                    </Typography>
                                    <Image
                                        src={flagImage}
                                        width={100}
                                        height={100}
                                        alt="flag image"
                                    />
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </main>
        </section>
    );
}
