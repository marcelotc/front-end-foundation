import { Typography } from "@/components/ui/typography"
import ProgressCards from './components/progress-cards'

export default function Progress() {

    return (
        <section className="flex flex-col min-h-[100dvh]">
            <Typography variant={"h1"}>Frameworks</Typography>
            <ProgressCards />
        </section>
    );
}
