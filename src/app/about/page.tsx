import { Typography } from "@/components/ui/typography";

export default function About() {
    return (
        <section className="flex flex-col h-full">
            <main className="flex-1 px-4 md:px-6 mt-5">
                <Typography variant="h2" className="mb-4">About</Typography>

                <Typography className="mb-8">
                    Welcome to <b>Front-end Foundation</b>, dedicated to establishing strong foundations in front-end development through <b>HTML</b>, <b>CSS</b>, and <b>JavaScript</b>. The mission is to empower learners of all levels with structured resources and tools, helping them master these essential technologies effectively.
                </Typography>

                <Typography variant="h3" className="mb-4">What's Offered</Typography>

                <ul className="list-disc list-inside mb-8">
                    {/*<li>
                        <b>Define Your Learning Path Calendar:</b> Tailor your learning journey with an interactive calendar, designed to help set achievable goals and track progress.
                    </li>*/}
                    <li>
                        <b>Quizzes:</b> Test knowledge and reinforce understanding with regularly updated quizzes covering key concepts in HTML, CSS, and JavaScript.
                    </li>
                    <li>
                        <b>Road Map of Technologies:</b> Navigate through a curated roadmap, guiding from beginner to advanced topics in front-end development.
                    </li>
                    <li>
                        <b>Progress Tracking:</b>  Stay motivated and monitor growth with built-in progress tracking tool, allowing to see how far you've come and where headed.
                    </li>
                </ul>

                <Typography>
                    Whether just starting or looking to deepen expertise, <b>Front-end Foundation</b> is here to support every step of the learning journey.
                </Typography>
            </main>
        </section>
    );
}