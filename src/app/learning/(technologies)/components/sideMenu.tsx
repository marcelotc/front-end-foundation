import { CollapsibleTrigger, CollapsibleContent, Collapsible } from "@/components/ui/collapsible"
import { JSX, SVGProps } from "react"

export default function SideMenu() {
  return (
    <nav className=" flex w-16 flex-col gap-4 p-24 text-gray-400">
      <div className="hidden w-64 bg-[#171717] dark:bg-gray-800 md:block fixed left-0 top-16 bottom-16 z-10">
        <div className="space-y-6 p-6">
          <div className="flex items-center space-x-2">
            <PackageIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            <h2 className="text-lg font-semibold">Menu</h2>
          </div>
          <Collapsible className="space-y-2">
            <CollapsibleTrigger asChild>
              <div className="flex items-center justify-between space-x-4 px-4 cursor-pointer">
                <h4 className="text-sm font-semibold">Menu</h4>
                <div>
                  <ChevronDownIcon className="h-4 w-4 transition-transform duration-300 [&[data-state=open]]:rotate-180" />
                  <span className="sr-only">Toggle</span>
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 px-4 overflow-hidden transition-[max-height] duration-300 [data-state=open]:max-h-[1000px] [data-state=closed]:max-h-0">
              <Collapsible className="space-y-2">
                <CollapsibleTrigger asChild>
                  <div className="flex items-center justify-between space-x-4 px-4 cursor-pointer">
                    <h4 className="text-sm font-semibold">Menu Item 1</h4>
                    <div>
                      <ChevronDownIcon className="h-4 w-4 transition-transform duration-300 [&[data-state=open]]:rotate-180" />
                      <span className="sr-only">Toggle</span>
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 px-4 overflow-hidden transition-[max-height] duration-300 [data-state=open]:max-h-[1000px] [data-state=closed]:max-h-0">
                  <h3 className="text-lg font-semibold">Heading 1</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut risus in pede commodo porttitor.
                    Donec laoreet tempus quam.
                  </p>
                  <h3 className="text-lg font-semibold">Heading 2</h3>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                    totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
                    dicta sunt explicabo.
                  </p>
                </CollapsibleContent>
              </Collapsible>
              <Collapsible className="space-y-2">
                <CollapsibleTrigger asChild>
                  <div className="flex items-center justify-between space-x-4 px-4 cursor-pointer">
                    <h4 className="text-sm font-semibold">Menu Item 2</h4>
                    <div>
                      <ChevronDownIcon className="h-4 w-4 transition-transform duration-300 [&[data-state=open]]:rotate-180" />
                      <span className="sr-only">Toggle</span>
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 px-4 overflow-hidden transition-[max-height] duration-300 [data-state=open]:max-h-[1000px] [data-state=closed]:max-h-0">
                  <h3 className="text-lg font-semibold">Heading 1</h3>
                  <p>
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
                    magni dolores eos qui ratione voluptatem sequi nesciunt.
                  </p>
                  <h3 className="text-lg font-semibold">Heading 2</h3>
                  <p>
                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
                    quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                  </p>
                </CollapsibleContent>
              </Collapsible>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </nav>
  )
}

function ChevronDownIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}


function PackageIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  )

}