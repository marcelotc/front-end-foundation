import { Typography } from "@/components/ui/typography"
import { Construction, Hammer } from 'lucide-react'
import ProgressCards from './components/progress-cards'

export default function Progress() {

    return (
        <section className="flex flex-col min-h-[100dvh]">
            <ProgressCards />
        </section>
    );
}
