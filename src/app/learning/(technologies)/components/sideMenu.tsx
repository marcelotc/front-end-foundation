import { CollapsibleTrigger, CollapsibleContent, Collapsible } from "@/components/ui/collapsible"
import { Typography } from "@/components/ui/typography"
import { ChevronDown, ChevronUp, Brain } from "lucide-react"

export default function SideMenu() {
  return (
    <nav className="hidden my-5 mx-4 rounded-[10px] w-64 bg-[#1b1b1d] dark:bg-gray-800 md:block fixed left-0 top-16 bottom-20 z-10">
      <div className="space-y-6 p-2">
        <div className="flex items-center space-x-2 p-3">
          <Brain color="white" size={20} />
          <Typography variant="largeText" as="p" className="text-white">
            HTML
          </Typography>
        </div>
        <Collapsible className="space-y-2">
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between space-x-4 px-4 cursor-pointer">
              <Typography variant="smallText" as="p" className="text-white">
                Fundamentals
              </Typography>
              <div>
                <ChevronDown color="white" size={20} />
                <span className="sr-only">Toggle</span>
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 px-4 overflow-hidden transition-[max-height] duration-300 [data-state=open]:max-h-[1000px] [data-state=closed]:max-h-0">
            <Collapsible className="space-y-2">
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between space-x-4 px-4 cursor-pointer">
                  <Typography variant="smallText" as="p" className="text-white">
                    Menu Item 1
                  </Typography>
                  <div>
                    <ChevronDown color="white" size={20} />
                    <span className="sr-only">Toggle</span>
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 px-4 overflow-hidden transition-[max-height] duration-300 [data-state=open]:max-h-[1000px] [data-state=closed]:max-h-0">
                <Typography variant="smallText" as="p" className="text-white">
                  item
                </Typography>
              </CollapsibleContent>
            </Collapsible>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible className="space-y-2">
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between space-x-4 px-4 cursor-pointer">
              <Typography variant="smallText" as="p" className="text-white">
                Intermidiate
              </Typography>
              <div>
                <ChevronDown color="white" size={20} />
                <span className="sr-only">Toggle</span>
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 px-4 overflow-hidden transition-[max-height] duration-300 [data-state=open]:max-h-[1000px] [data-state=closed]:max-h-0">
            <Collapsible className="space-y-2">
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between space-x-4 px-4 cursor-pointer">
                  <Typography variant="smallText" as="p" className="text-white">
                    Menu Item 1
                  </Typography>
                  <div>
                    <ChevronDown color="white" size={20} />
                    <span className="sr-only">Toggle</span>
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 px-4 overflow-hidden transition-[max-height] duration-300 [data-state=open]:max-h-[1000px] [data-state=closed]:max-h-0">
                <Typography variant="smallText" as="p" className="text-white">
                  item
                </Typography>
              </CollapsibleContent>
            </Collapsible>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible className="space-y-2">
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between space-x-4 px-4 cursor-pointer">
              <Typography variant="smallText" as="p" className="text-white">
                Advanced
              </Typography>
              <div>
                <ChevronDown color="white" size={20} />
                <span className="sr-only">Toggle</span>
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 px-4 overflow-hidden transition-[max-height] duration-300 [data-state=open]:max-h-[1000px] [data-state=closed]:max-h-0">
            <Collapsible className="space-y-2">
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between space-x-4 px-4 cursor-pointer">
                  <Typography variant="smallText" as="p" className="text-white">
                    Menu Item 1
                  </Typography>
                  <div>
                    <ChevronDown color="white" size={20} />
                    <span className="sr-only">Toggle</span>
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 px-4 overflow-hidden transition-[max-height] duration-300 [data-state=open]:max-h-[1000px] [data-state=closed]:max-h-0">
                <Typography variant="smallText" as="p" className="text-white">
                  item
                </Typography>
              </CollapsibleContent>
            </Collapsible>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </nav>
  )
}