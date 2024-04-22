'use client'

import React, { useContext } from 'react';
import SideMenuContext from '../context/sideMenuContext'; 
import { CollapsibleTrigger, CollapsibleContent, Collapsible } from "@/components/ui/collapsible";
import { Typography } from "@/components/ui/typography";
import { ChevronDown, ChevronLeft, ChevronRight, Brain } from "lucide-react";
import clsx from 'clsx';

export default function SideMenu() {
  const { menuOpen, toggleMenu } = useContext(SideMenuContext);

  return (
    <nav className={`my-5 mr-4 rounded-tr-[10px] rounded-br-[10px] bg-[#1b1b1d] dark:bg-gray-800 md:block fixed top-16 bottom-20 z-10 animate-fade-right transition-all duration-300 ${menuOpen ? 'w-64' : 'w-10'}`}>
      {menuOpen ? (
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
      ) : null}
      <div className={clsx(
        "absolute bottom-0 p-1 rounded-b-[10px] bg-[#272729] w-full cursor-pointer transition-all duration-300",
        !menuOpen && "h-full rounded-[10px]"
      )} onClick={toggleMenu}>
        <div className={clsx(
          "flex items-center justify-center",
          !menuOpen && "h-full"
        )}>
          {menuOpen ? <ChevronLeft color="white" size={30} /> : <ChevronRight color="white" size={30} />}
        </div>
      </div>
    </nav>
  )
}