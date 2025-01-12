import { Typography } from "@/components/ui/typography"
import ProgressCards from './components/progress-cards'

export default function Frameworks() {

    return (
        <section className="flex flex-col min-h-[100dvh] p-4 md:p-6">
            <Typography variant={"h1"}>Frameworks</Typography>
            <ProgressCards />
        </section>
    );
}
