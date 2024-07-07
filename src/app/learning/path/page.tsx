import { Typography } from "@/components/ui/typography"
import { Construction, Hammer } from 'lucide-react'

export default function Path() {

    return (
        <section className="flex flex-col h-full">
            <main className="flex-1 px-4 md:px-6 mt-20">
                <div className='flex items-center justify-center gap-5'>
                <Construction color='#ffA500' size={100} />
                <Typography variant="extra3LargeText" as="h1">
                    Page under construction
                </Typography>
                <Hammer color='#ffA500' size={100} />
                </div>
            </main>
        </section>
    );
}
