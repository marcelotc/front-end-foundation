import Link from "next/link"
import { Github, Twitter, Linkedin } from 'lucide-react'

export default function MainFooter() {
    return (
        <footer className="bg-black text-white py-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">Front-End Foundation</h3>
                        <p className="text-gray-400">Building the next generation of web developers</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Learning</h4>
                        <ul className="space-y-2">
                            <li><Link href="/learning/html" className="text-gray-400 hover:text-white">HTML</Link></li>
                            <li><Link href="/learning/css" className="text-gray-400 hover:text-white">CSS</Link></li>
                            <li><Link href="/learning/javascript" className="text-gray-400 hover:text-white">JavaScript</Link></li>
                            <li><Link href="/learning/frameworks" className="text-gray-400 hover:text-white">Frameworks</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Resources</h4>
                        <ul className="space-y-2">
                            <li><Link href="/roadmap" className="text-gray-400 hover:text-white">Roadmap</Link></li>
                            <li><Link href="/quiz" className="text-gray-400 hover:text-white">Quiz</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-20 pt-8 border-t border-gray-800">
                    <p className="text-gray-400 text-center">© {new Date().getFullYear()} Front-End Foundation. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}