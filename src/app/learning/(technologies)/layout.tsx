import SideMenu from "./components/sideMenu"
import { SideMenuProvider } from "./context/sideMenuContext"


export default function LearningLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-1 pt-16">
            <SideMenuProvider>
                <SideMenu />
                {children}
            </SideMenuProvider>
        </div>
    )
}
