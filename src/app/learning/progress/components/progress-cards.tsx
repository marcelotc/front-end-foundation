import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import htmlLogo from "../../../../../public/html-logo.png";
import cssLogo from "../../../../../public/css-logo.png";
import javascriptLogo from "../../../../../public/javascript-logo.png";
import Image from "next/image";
import { Typography } from "@/components/ui/typography"
import { CornerRightDown, CornerLeftDown } from 'lucide-react'


export default function ProgressCards() {

    return (
        <div>
            <div className="flex items-center justify-center gap-3 px-4 md:px-6 mt-20 animate-fade-down">
                <CornerLeftDown />
                <Typography variant="h3" as="h1">
                    Choose what you wanna learn
                </Typography>
                <CornerRightDown />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 md:p-6 animate-fade-up">
                <Card>
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
                                <CardTitle>HTML</CardTitle>
                                <CardDescription>Fundamentals</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center gap-4">
                        <div className="relative w-32 h-32">
                            <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold">15%</div>
                        </div>
                        <Progress value={15} />
                        <Button className="w-full" variant="outline">
                            Continue Learning
                        </Button>
                    </CardContent>
                </Card>
                <Card>
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
                                <CardTitle>CSS</CardTitle>
                                <CardDescription>Intermediary</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center gap-4">
                        <div className="relative w-32 h-32">
                            <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold">50%</div>
                        </div>
                        <Progress value={50} />
                        <Button className="w-full" variant="outline">
                            Continue Learning
                        </Button>
                    </CardContent>
                </Card>
                <Card>
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
                                <CardTitle>JavaScript</CardTitle>
                                <CardDescription>Advanced</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center gap-4">
                        <div className="relative w-32 h-32">
                            <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold">85%</div>
                        </div>
                        <Progress value={85} />
                        <Button className="w-full" variant="outline">
                            Continue Learning
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
