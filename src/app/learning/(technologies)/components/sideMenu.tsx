'use client'

import React, { useContext, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import SideMenuContext, { MarkdownData } from '../context/sideMenuContext';
import { CollapsibleTrigger, CollapsibleContent, Collapsible } from "@/components/ui/collapsible";
import { Typography } from "@/components/ui/typography";
import { getMarkdownBySubjectTechnologyChapter } from '../../../utils/supabase/requests';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Code2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton"
import { getMenu } from '../../../utils/supabase/requests';
import clsx from 'clsx';

export default function SideMenu() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { menuOpen, toggleMenu, technology, setMarkdown, setLoadingContent } = useContext(SideMenuContext);

  const [menuContent, setMenuContent] = useState<any>(null);
  const [loadingMenu, setLoadingMenu] = useState(false);
  const [openChapters, setOpenChapters] = useState<number[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  useEffect(() => {
    const loadMenu = async () => {
      if (technology) {
        try {
          setLoadingMenu(true);
          const data = await getMenu(technology);
          setMenuContent(data as any);
        } catch (error) {
          console.error('Error loading menu:', error);
        } finally {
          setLoadingMenu(false);
        }
      }
    };

    loadMenu();
  }, [technology]);

  useEffect(() => {
    const subject = searchParams.get('subject');
    const chapter = searchParams.get('chapter');
    const technologyUrl = searchParams.get('technology');

    if (subject && chapter && technologyUrl) {
      setSelectedSubject(subject);
      handleFetchContent(subject, chapter, technologyUrl);
    }
  }, [searchParams]);

  const handleFetchContent = async (subject: string, chapter: string, technologyUrl: string) => {
    try {
      setLoadingContent(true);
      const data = await getMarkdownBySubjectTechnologyChapter(subject, technologyUrl || technology, chapter);
      setMarkdown(data as MarkdownData[]);
    } catch (error) {
      console.error('Error loading markdown:', error);
    } finally {
      setLoadingContent(false);
    }
  };

  const handleSubjectClick = (subject: string, chapter: string, technology: string) => {
    router.push(`?subject=${subject}&chapter=${chapter}&technology=${technology}`);
  };

  const toggleChapter = (index: number) => {
    const isOpen = openChapters.includes(index);
    if (isOpen) {
      setOpenChapters(openChapters.filter(item => item !== index));
    } else {
      setOpenChapters([...openChapters, index]);
    }
  };

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
              onClick={() => handleSubjectClick(subject, chapter, technology)}
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
            <div className='fade-edge-bottom'>
              <div className="flex items-center space-x-2 p-3">
                <Code2 color="white" size={20} />
                <Typography variant="largeText" as="p" className="text-white cursor-pointer" onClick={() => setMarkdown(null)}>
                  {technology.toUpperCase()}
                </Typography>
              </div>
              <div className='space-y-6 px-2 pb-10 m-2 overflow-y-scroll overflow-x-hidden h-[600px]'>
                {menuContent && menuContent.map((menuContent: any, index: number) => (
                  <Collapsible key={index} className="space-y-2">
                    <CollapsibleTrigger asChild>
                      <div
                        className="flex items-center justify-between space-x-4 px-4 cursor-pointer"
                        onClick={() => toggleChapter(index)}
                      >
                        <Typography variant="smallText" as="p" className="text-white">
                          {menuContent.chapter}
                        </Typography>
                        <div>
                          {openChapters.includes(index) ? <ChevronUp color="white" size={20} /> : <ChevronDown color="white" size={20} />}
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className={clsx(
                      "space-y-4 px-4 overflow-hidden transition-[max-height] duration-300",
                      openChapters.includes(index) ? "max-h-[1000px]" : "max-h-0"
                    )}>
                      {renderSubjects(menuContent.subjects, menuContent.chapter)}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
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
  );
}
