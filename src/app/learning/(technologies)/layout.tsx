import SideMenu from "./components/sideMenu"
import { SideMenuProvider } from "./context/sideMenuContext"

export default function LearningLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen pt-16">
            <SideMenuProvider>
                <div className="flex flex-1">
                    <SideMenu />
                    <main className="flex-1">
                        {children}
                    </main>
                </div>
            </SideMenuProvider>
        </div>
    )
}
