import { Typography } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, CornerRightUp } from 'lucide-react'
import htmlLogo from "/public/html-logo.png";
import cssLogo from "/public/css-logo.png";
import javascriptLogo from "/public/javascript-logo.png";
import designSystemsLogo from "/public/design-systems-logo.png";
import uxuiLogo from "/public/ux-ui-logo.png";
import questionImage from "/public/question-image.png";
import roadMapImage from "/public/road-map-image.png";
import reactIcon from "/public/react-icon.png";

export default function Home() {
    return (
        <main className="flex-1">
            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-8 max-w-3xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                            Leverage your front-end skills by developing your <span className="border-b-4 border-black">foundation</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Learn HTML, CSS, JavaScript, and modern frameworks through interactive lessons, 
                            real-world projects, and a supportive community.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/roadmap">
                                <Button size="lg" className="text-lg w-full sm:w-auto">
                                View Roadmap
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technology Selection Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Choose Your Learning Path</h2>
                        <p className="text-xl text-gray-600">Start with the fundamentals and progress at your own pace</p>
                    </div>
                    <div className="flex flex-col items-center gap-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-4xl mx-auto">
                            <div className="flex justify-center">
                                <Link href="/learning/html" className="w-full max-w-[180px] transform hover:scale-105 transition-transform">
                                    <Image
                                        src={htmlLogo}
                                        width={180}
                                        height={180}
                                        alt="HTML logo"
                                        className="w-full h-auto hover:opacity-90"
                                        priority
                                    />
                                </Link>
                            </div>
                            <div className="flex justify-center">
                                <Link href="/learning/css" className="w-full max-w-[180px] transform hover:scale-105 transition-transform">
                                    <Image
                                        src={cssLogo}
                                        width={180}
                                        height={180}
                                        alt="CSS logo"
                                        className="w-full h-auto hover:opacity-90"
                                        priority
                                    />
                                </Link>
                            </div>
                            <div className="flex justify-center sm:col-span-2 md:col-span-1">
                                <Link href="/learning/javascript" className="w-full max-w-[180px] transform hover:scale-105 transition-transform">
                                    <Image
                                        src={javascriptLogo}
                                        width={180}
                                        height={180}
                                        alt="JavaScript logo"
                                        className="w-full h-auto hover:opacity-90"
                                        priority
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Learning Resources Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Explore Learning Resources</h2>
                        <p className="text-xl text-gray-600">Everything you need to become a front-end developer</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Link href="/roadmap">
                            <div className="group bg-black text-white rounded-2xl p-8 hover:bg-black/90 transition-colors">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-semibold">Front-end Roadmap</h3>
                                    <Image src={roadMapImage} width={60} height={60} alt="Roadmap" />
                                </div>
                                <p className="text-gray-400 group-hover:text-gray-300">Follow our structured learning path from beginner to advanced</p>
                            </div>
                        </Link>
                        <Link href="/quiz">
                            <div className="group bg-black text-white rounded-2xl p-8 hover:bg-black/90 transition-colors">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-semibold">Test Your Knowledge</h3>
                                    <Image src={questionImage} width={50} height={50} alt="Quiz" />
                                </div>
                                <p className="text-gray-400 group-hover:text-gray-300">Take quizzes to reinforce your learning and track progress</p>
                            </div>
                        </Link>
                        <Link href="/learning/frameworks">
                            <div className="group bg-black text-white rounded-2xl p-8 hover:bg-black/90 transition-colors">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-semibold">Framework Learning</h3>
                                    <Image src={reactIcon} width={60} height={60} alt="Frameworks" />
                                </div>
                                <p className="text-gray-400 group-hover:text-gray-300">Master modern frameworks like React, Vue, and Angular</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Additional Resources */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link href="/learning/uxui">
                            <div className="group bg-black text-white rounded-2xl p-8 hover:bg-black/90 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">UX/UI Design</h3>
                                        <p className="text-gray-400 group-hover:text-gray-300">Learn the principles of user experience and interface design</p>
                                    </div>
                                    <Image src={uxuiLogo} width={80} height={80} alt="UX/UI" />
                                </div>
                            </div>
                        </Link>
                        <Link href="/learning/designsystems">
                            <div className="group bg-black text-white rounded-2xl p-8 hover:bg-black/90 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">Design Systems</h3>
                                        <p className="text-gray-400 group-hover:text-gray-300">Master the art of creating scalable design systems</p>
                                    </div>
                                    <Image src={designSystemsLogo} width={80} height={80} alt="Design Systems" />
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-black text-white rounded-3xl p-12 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Start Your Front-End Journey?
                        </h2>
                        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                            Join thousands of developers who have already transformed their careers 
                            through our comprehensive learning platform.
                        </p>
                        <Link href="/learning/html">
                            <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                                Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
