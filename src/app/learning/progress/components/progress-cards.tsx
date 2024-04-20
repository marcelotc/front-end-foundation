import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { JSX, SVGProps } from "react"


function ChromeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" />
            <line x1="21.17" x2="12" y1="8" y2="8" />
            <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
            <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
        </svg>
    )
}


function CodepenIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
            <line x1="12" x2="12" y1="22" y2="15.5" />
            <polyline points="22 8.5 12 15.5 2 8.5" />
            <polyline points="2 15.5 12 8.5 22 15.5" />
            <line x1="12" x2="12" y1="2" y2="8.5" />
        </svg>
    )
}


function TextIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M17 6.1H3" />
            <path d="M21 12.1H3" />
            <path d="M15.1 18H3" />
        </svg>
    )
}

export default function ProgressCards() {

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 md:p-6 mt-20 animate-fade">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="bg-[#F16524] p-3 rounded-full">
                            <TextIcon className="w-6 h-6 text-white" />
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
                            <ChromeIcon className="w-6 h-6 text-white" />
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
                            <CodepenIcon className="w-6 h-6 text-[#323330]" />
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
    );
}
