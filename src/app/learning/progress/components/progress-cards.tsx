import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import htmlLogo from "../../../../../public/html-logo.png";
import cssLogo from "../../../../../public/css-logo.png";
import javascriptLogo from "../../../../../public/javascript-logo.png";
import Image from "next/image";

export default function ProgressCards() {

    return (
        <section className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-[#1b1b1d]">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="bg-[#F16524] p-3 rounded-full">
                                <Image
                                    src={htmlLogo}
                                    width={35}
                                    height={35}
                                    alt="HTML logo"
                                    className="hover:opacity-80 cursor-pointer"
                                />
                            </div>
                            <div>
                                <CardTitle className="text-white">HTML</CardTitle>
                                <CardDescription>Fundamentals</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center gap-4">
                        <div className="relative w-32 h-32">
                            <div className="absolute inset-0 flex items-center justify-center text-4xl text-white font-bold">15%</div>
                        </div>
                        <Progress value={15} />
                        <Link href={'/learning/html'} className="w-full">
                            <Button className="w-full" variant="outline">
                                Continue Learning
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
                <Card className="bg-[#1b1b1d]">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="bg-[#2965F1] p-3 rounded-full">
                                <Image
                                    src={cssLogo}
                                    width={35}
                                    height={35}
                                    alt="HTML logo"
                                    className="hover:opacity-80 cursor-pointer"
                                />
                            </div>
                            <div>
                                <CardTitle className="text-white">CSS</CardTitle>
                                <CardDescription>Intermediary</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center gap-4">
                        <div className="relative w-32 h-32">
                            <div className="absolute inset-0 flex items-center justify-center text-4xl text-white font-bold">50%</div>
                        </div>
                        <Progress value={50} />
                        <Link href={'/learning/css'} className="w-full">
                            <Button className="w-full" variant="outline">
                                Continue Learning
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
                <Card className="bg-[#1b1b1d]">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="bg-[#F0DB4F] p-3 rounded-full">
                                <Image
                                    src={javascriptLogo}
                                    width={35}
                                    height={35}
                                    alt="HTML logo"
                                    className="hover:opacity-80 cursor-pointer"
                                />
                            </div>
                            <div>
                                <CardTitle className="text-white">Javascript</CardTitle>
                                <CardDescription>Advanced</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center gap-4">
                        <div className="relative w-32 h-32">
                            <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold">85%</div>
                        </div>
                        <Progress value={85} />
                        <Link href={'/learning/javascript'} className="w-full">
                            <Button className="w-full" variant="outline">
                                Continue Learning
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
