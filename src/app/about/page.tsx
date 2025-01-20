import { Typography } from "@/components/ui/typography";

export default function About() {
    return (
        <section className="flex flex-col h-full bg-gray-100 shadow-lg rounded-sm p-6 my-10 mx-10">
            <main className="flex-1 px-4 md:px-6 mt-5">
                <Typography variant="h2" className="mb-4">
                    <span className='bg-[#1b1b1d] text-white p-2 rounded-sm'>
                        About
                    </span>
                </Typography>

                <Typography className="mb-8">
                    Welcome to <b>Front-end Foundation</b>, dedicated to establishing strong foundations in front-end development through <b>HTML</b>, <b>CSS</b>, and <b>JavaScript</b>. The mission is to empower learners of all levels with structured resources and tools, helping them master these essential technologies effectively.
                </Typography>

                <Typography variant="h3" className="mb-4">
                    <span className='bg-[#1b1b1d] text-white p-2 rounded-sm'>
                        What's Offered
                    </span>
                </Typography>

                <ul className="list-disc list-inside mb-8">
                    <li>
                        <b>Quizzes:</b> Test knowledge and reinforce understanding with regularly updated quizzes covering key concepts in HTML, CSS, and JavaScript.
                    </li>
                    <li>
                        <b>Road Map of Technologies:</b> Navigate through a curated roadmap, guiding from beginner to advanced topics in front-end development.
                    </li>
                    <li>
                        <b>Frameworks Page:</b> Explore popular front-end frameworks like React, Angular, and Vue, with detailed guides and resources to help integrate them into your projects.
                    </li>
                    <li>
                        <b>UX/UI Design Page:</b> Learn the principles of user experience (UX) and user interface (UI) design, essential for creating intuitive and engaging applications.
                    </li>
                    <li>
                        <b>Design Systems Page:</b> Understand the importance of design systems and how to implement them to maintain consistency and scalability in your projects.
                    </li>
                </ul>

                <Typography>
                    Whether just starting or looking to deepen expertise, <b>Front-end Foundation</b> is here to support every step of the learning journey.
                </Typography>
            </main>
        </section>
    );
}
