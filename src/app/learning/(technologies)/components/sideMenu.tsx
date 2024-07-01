'use client'

import React, { useContext, useEffect, useState } from 'react';
import SideMenuContext, { MarkdownData } from '../context/sideMenuContext';
import { CollapsibleTrigger, CollapsibleContent, Collapsible } from "@/components/ui/collapsible";
import { Typography } from "@/components/ui/typography";
import { getMarkdownBySubjectTechnologyChapter } from '../../../utils/supabase/requests';
import { ChevronDown, ChevronLeft, ChevronRight, Code2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton"
import { getMenu } from '../../../utils/supabase/requests';
import clsx from 'clsx';

export default function SideMenu() {
  const { menuOpen, toggleMenu, technology, setMarkdown, setLoadingContent } = useContext(SideMenuContext);

  const [menuContent, setMenuContent] = useState<any>(null);
  const [loadingMenu, setLoadingMenu] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  useEffect(() => {
    const loadMenu = async () => {
      if (technology) {
        try {
          setLoadingMenu(true);
          const data = await getMenu(technology);
          setMenuContent(data as any);
        } catch (error) {
          console.error('Error loading markdown:', error);
        } finally {
          setLoadingMenu(false);
        }
      }
    };

    loadMenu();
  }, [technology]);

  const handleFetchContent = async (subject: string, chapter: string) => {
    try {
      setLoadingContent(true);
      const data = await getMarkdownBySubjectTechnologyChapter(subject, technology, chapter);
      setMarkdown(data as MarkdownData[]);
    } catch (error) {
      console.error('Error loading markdown:', error);
    } finally {
      setLoadingContent(false);
    }
  }

  const renderSubjects = (subjects: string[], chapter: string) => {
    return subjects.map((subject, index) => {
      const isActive = subject === selectedSubject;

      return (
        <Collapsible key={index} className="space-y-2">
          <CollapsibleTrigger asChild>
            <div
              className={clsx(
                "flex items-center justify-between space-x-4 px-4 cursor-pointer",
                isActive && "bg-gray-700 p-3 rounded-sm"
              )}
              onClick={() => {
                handleFetchContent(subject, chapter);
                setSelectedSubject(subject);
              }}
            >
              <Typography variant="smallText" as="p" className="text-white">
                {subject}
              </Typography>
            </div>
          </CollapsibleTrigger>
        </Collapsible>
      );
    });
  };

  return (
    <nav className={`my-5 mr-4 rounded-tr-[10px] rounded-br-[10px] bg-[#1b1b1d] dark:bg-gray-800 md:block fixed top-16 bottom-20 z-10 animate-fade-right transition-all duration-300 ${menuOpen ? 'w-64' : 'w-10'}`}>
      {loadingMenu || !menuContent ? (
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
                <Typography variant="largeText" as="p" className="text-white cursor-pointer" onClick={() => setMarkdown(null)}>
                  {technology.toUpperCase()}
                </Typography>
              </div>
              {menuContent && menuContent.map((menuContent: any, index: number) => (
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
                    {renderSubjects(menuContent.subjects, menuContent.chapter)}
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