import SideMenu from "./components/sideMenu"

export default function LearningLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-1 pt-16">
            <SideMenu />
            <div className="ml-72">
                {children}
            </div>
        </div>
    )
}
