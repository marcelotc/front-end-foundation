'use client'

import React, { useContext, useEffect, useState } from 'react';
import SideMenuContext from '../context/sideMenuContext';
import { CollapsibleTrigger, CollapsibleContent, Collapsible } from "@/components/ui/collapsible";
import { Typography } from "@/components/ui/typography";
import { ChevronDown, ChevronLeft, ChevronRight, Code2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton"
import { getMenu } from '../../../utils/supabase/requests';
import clsx from 'clsx';

interface Subject {
  subjectName: string;
  content: string;
  subjects: Subject[];
}

interface Chapter {
  chapterNumber: number;
  chapter: string;
  subjects: Subject[];
}

interface SideMenuContent {
  chapters: Chapter[];
}

export default function SideMenu() {
  const { menuOpen, toggleMenu, technology, setMenuSubject } = useContext(SideMenuContext);

  const [menuContent, setMenuContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadMenu = async () => {
      if (technology) {
        try {
          setLoading(true);
          const data = await getMenu(technology);
          setMenuContent(data as any);
        } catch (error) {
          console.error('Error loading markdown:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadMenu();
  }, [technology]);

  const renderSubjects = (subject: any) => {
    return (
      <Collapsible className="space-y-2">
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between space-x-4 px-4 cursor-pointer">
            <Typography variant="smallText" as="p" className="text-white" onClick={() => setMenuSubject(subject)}>
              {subject}
            </Typography>
          </div>
        </CollapsibleTrigger>
      </Collapsible>
    )
  };

  return (
    <nav className={`my-5 mr-4 rounded-tr-[10px] rounded-br-[10px] bg-[#1b1b1d] dark:bg-gray-800 md:block fixed top-16 bottom-20 z-10 animate-fade-right transition-all duration-300 ${menuOpen ? 'w-64' : 'w-10'}`}>
      {loading || !menuContent ? (
        <div className='flex flex-col gap-5 p-5'>
          <Skeleton className="h-[20px] w-full rounded-xl" />
          <Skeleton className="h-[20px] w-full rounded-xl" />
          <Skeleton className="h-[20px] w-full rounded-xl" />
          <Skeleton className="h-[20px] w-full rounded-xl" />
          <Skeleton className="h-[20px] w-full rounded-xl" />
          <Skeleton className="h-[20px] w-full rounded-xl" />
          <Skeleton className="h-[20px] w-full rounded-xl" />
        </div>
      ) : (
        <>
          {menuOpen ? (
            <div className="space-y-6 p-2">
              <div className="flex items-center space-x-2 p-3">
                <Code2 color="white" size={20} />
                <Typography variant="largeText" as="p" className="text-white">
                  {technology.toUpperCase()}
                </Typography>
              </div>
              {menuContent && menuContent.map((menuContent: any, index: any) => (
                <Collapsible key={index} className="space-y-2">
                  <CollapsibleTrigger asChild>
                    <div className="flex items-center justify-between space-x-4 px-4 cursor-pointer">
                      <Typography variant="smallText" as="p" className="text-white">
                        {menuContent.chapter}
                      </Typography>
                      <div>
                        <ChevronDown color="white" size={20} />
                        <span className="sr-only">Toggle</span>
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 px-4 overflow-hidden transition-[max-height] duration-300 [data-state=open]:max-h-[1000px] [data-state=closed]:max-h-0">
                    {renderSubjects(menuContent.subject)}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          ) : null}
        </>
      )}
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