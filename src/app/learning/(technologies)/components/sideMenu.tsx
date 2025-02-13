'use client'

import React, { useContext, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SideMenuContext, { MarkdownData } from '../context/sideMenuContext';
import { CollapsibleTrigger, CollapsibleContent, Collapsible } from "@/components/ui/collapsible";
import { Typography } from "@/components/ui/typography";
import { getMarkdownBySubjectTechnologyChapter } from '../../../utils/supabase/contentRequests';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Code2, Check } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useSaveToLocalStorage } from "@/app/hooks/useSaveToLocalStorage";
import { getMenu } from '../../../utils/supabase/contentRequests';
import clsx from 'clsx';

export default function SideMenu() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { menuOpen, toggleMenu, technology, setMarkdown, setLoadingContent, setMenuContent, menuContent, progressUpdate, openChapters, setOpenChapters } = useContext(SideMenuContext);
  const { getLearningProgress } = useSaveToLocalStorage();

  const [loadingMenu, setLoadingMenu] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [progress, setProgress] = useState<{ chapters: any[] }>({ chapters: [] });

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

  const subjectUrl = searchParams.get('subject');
  const chapterUrl = searchParams.get('chapter');
  const technologyUrl = searchParams.get('technology');

  useEffect(() => {
    if (subjectUrl && chapterUrl && technologyUrl) {
      setSelectedSubject(subjectUrl);
      handleFetchContent(subjectUrl, chapterUrl, technologyUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    const retrievedProgress = getLearningProgress(technology);
    setProgress(retrievedProgress);
  }, [technology, progressUpdate]);

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

  const toggleChapter = (chapter: string) => {
    const isOpen = openChapters.includes(chapter);
    if (isOpen) {
      setOpenChapters(openChapters.filter(item => item !== chapter));
    } else {
      setOpenChapters([...openChapters, chapter]);
    }
  };

  useEffect(() => {
    if (!menuOpen) {
      setOpenChapters([]);
    }
  }, [menuOpen]);

  const renderSubjects = (subjects: string[], chapter: string) => {
    return subjects.map((subject, index) => {
      const isActive = subject === selectedSubject;

      const chapterProgress = progress.chapters.find((progressChapter) => progressChapter.name === chapter);
      const isSubjectConcluded = chapterProgress?.subjectsConcluded.includes(subject);

      return (
        <Collapsible key={index} className="space-y-2">
          <CollapsibleTrigger asChild>
            <div
              className={clsx(
                "flex items-center justify-between px-4 cursor-pointer",
                isActive && "bg-gray-700 p-3 rounded-sm"
              )}
              onClick={() => handleSubjectClick(subject, chapter, technology)}
            >
              <Typography
                variant="smallText"
                as="p"
                className="text-white truncate flex-grow"
              >
                {subject}
              </Typography>

              {isSubjectConcluded && (
                <Check color="lightgreen" size={20} className="ml-2 flex-shrink-0" />
              )}
            </div>
          </CollapsibleTrigger>
        </Collapsible>
      );
    });
  };

  return (
    <nav
      className={`my-5 mr-4 rounded-tr-[10px] rounded-br-[10px] bg-[#1b1b1d] dark:bg-gray-800 md:block min-[800px]:fixed top-16 bottom-20 z-10 animate-fade-right transition-all duration-300 ${menuOpen ? "w-64 max-[800px]:w-[98%]" : "w-10"
        } flex flex-col overflow-hidden`}
    >
      {loadingMenu || !menuContent ? (
        <div className="flex flex-col gap-5 p-5">
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
            <div className="flex flex-col h-full">
              <div className="flex items-center space-x-2 p-3 flex-shrink-0">
                <Code2 color="white" size={20} />
                <Typography
                  variant="largeText"
                  as="p"
                  className="text-white cursor-pointer"
                  onClick={() => {
                    setMarkdown(null);
                    router.push(`/learning/${technology}`);
                  }}
                >
                  {technology.toUpperCase()}
                </Typography>
              </div>

              <div className="flex-grow overflow-y-auto px-2 pb-10">
                {menuContent.map((menuContent: any, index: number) => (
                  <Collapsible key={index} className="space-y-2 mb-4">
                    <CollapsibleTrigger asChild>
                      <div
                        className="flex items-center justify-between space-x-4 px-4 cursor-pointer"
                        onClick={() => toggleChapter(menuContent.chapter)}
                      >
                        <Typography
                          variant="smallText"
                          as="p"
                          className="text-white truncate flex-grow"
                        >
                          {menuContent.chapter}
                        </Typography>
                        <div>
                          {openChapters.includes(menuContent.chapter) ? (
                            <ChevronUp color="white" size={20} />
                          ) : (
                            <ChevronDown color="white" size={20} />
                          )}
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent
                      className={clsx(
                        "space-y-4 px-4 overflow-hidden transition-[max-height] duration-300",
                        openChapters.includes(menuContent.chapter) ? "max-h-[1000px]" : "max-h-0"
                      )}
                    >
                      {renderSubjects(menuContent.subjects, menuContent.chapter)}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </div>
          ) : null}
        </>
      )}

      <div
        className={clsx(
          "absolute bottom-0 p-1 rounded-b-[10px] bg-[#272729] w-full cursor-pointer transition-all duration-300 max-[800px]:hidden",
          !menuOpen && "h-full rounded-[10px]"
        )}
        onClick={toggleMenu}
      >
        <div className={clsx("flex items-center justify-center", !menuOpen && "h-full")}>
          {menuOpen ? <ChevronLeft color="white" size={30} /> : <ChevronRight color="white" size={30} />}
        </div>
      </div>
    </nav>


  );
}
