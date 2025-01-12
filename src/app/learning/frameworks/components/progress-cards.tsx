import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import Link from "next/link";
import { LockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import reactIcon from "../../../../../public/react-icon.png";
import vueIcon from "../../../../../public/vue-icon.png";
import angularIcon from "../../../../../public/angular-icon.png";
import Image from "next/image";

interface ProgressCardsInterface {
    htmlProgress: number;
    cssProgress: number;
    javascriptProgress: number;
}

export default function ProgressCards({ htmlProgress, cssProgress, javascriptProgress }: ProgressCardsInterface) {
    const isLocked = htmlProgress < 80 || cssProgress < 80 || javascriptProgress < 80;

    return (
        <section className="mt-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-[#1b1b1d]">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-600 p-3 rounded-full">
                                <Image
                                    src={reactIcon}
                                    width={35}
                                    height={35}
                                    alt="HTML logo"
                                    className="hover:opacity-80 cursor-pointer"
                                />
                            </div>
                            <div>
                                <CardTitle className="text-white">REACT</CardTitle>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center gap-4">
                        <Link href={htmlProgress < 80 ? '#' : '/learning/react'  } className="w-full">
                            <Button
                                className={`w-full ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                                variant="outline"
                                disabled={isLocked}
                            >
                                Learn
                                {isLocked && <LockIcon className="h-6 w-6 text-gray-500" /> }
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card className="bg-[#1b1b1d]">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="bg-green-600 p-3 rounded-full">
                                <Image
                                    src={vueIcon}
                                    width={35}
                                    height={35}
                                    alt="CSS logo"
                                    className="hover:opacity-80 cursor-pointer"
                                />
                            </div>
                            <div>
                                <CardTitle className="text-white">VUE</CardTitle>
                                <CardDescription>Intermediate</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center gap-4">
                        <Link href={cssProgress < 80 ? '#' : '/learning/vue'} className="w-full">
                            <Button
                                className={`w-full ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                                variant="outline"
                                disabled={isLocked}
                            >
                                Learn
                                {isLocked && <LockIcon className="h-6 w-6 text-gray-500" /> }
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card className="bg-[#1b1b1d]">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <div className="bg-red-700 p-3 rounded-full">
                                <Image
                                    src={angularIcon}
                                    width={35}
                                    height={35}
                                    alt="JavaScript logo"
                                    className="hover:opacity-80 cursor-pointer"
                                />
                            </div>
                            <div>
                                <CardTitle className="text-white">ANGULAR</CardTitle>
                                <CardDescription>Advanced</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center gap-4">
                        <Link href={javascriptProgress < 80 ? '#' : '/learning/angular'} className="w-full">
                            <Button
                                className={`w-full ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                                variant="outline"
                                disabled={isLocked}
                            >
                                Learn
                                {isLocked && <LockIcon className="h-6 w-6 text-gray-500" /> }
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
