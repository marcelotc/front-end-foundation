import { Typography } from "@/components/ui/typography"
import { Construction, Hammer } from 'lucide-react'
import ProgressCards from './components/progress-cards'

export default function Progress() {

    return (
        <section className="flex flex-col min-h-[100dvh]">
                <div className='flex items-center justify-center gap-5'>
                <Construction color='#ffA500' size={100} />
                <Typography variant="extra3LargeText" as="h1">
                    Page under construction
                </Typography>
                <Hammer color='#ffA500' size={100} />
                </div>
            <ProgressCards />
        </section>
    );
}
