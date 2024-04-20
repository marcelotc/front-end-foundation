import MainHeader from "@/components/main-header"
import MainFooter from "@/components/main-footer"

export default function Home() {

    return (
        <section className="flex flex-col min-h-[100dvh]">
            <MainHeader />
            <main className="flex-1" />
            <MainFooter />
        </section>
    );
}
