import { useState, useEffect } from 'react';
import { getAllMenu } from '@/app/utils/supabase/contentRequests';

interface Subject {
    name: string;
    checked: boolean;
}

interface Section {
    id: number;
    title: string;
    technology: string;
    subjects: Subject[];
}

interface MenuData {
    [key: string]: Section[];
}

export function useMenuData() {
    const [sectionsData, setSectionsData] = useState<MenuData>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const loadMenu = async () => {
            try {
                setLoading(true);
                const data = await getAllMenu();
                const organized = organizeByTechnology(data);
                setSectionsData(organized);
            } catch (error) {
                setError(error as Error);
                console.error('Error loading menu:', error);
            } finally {
                setLoading(false);
            }
        };

        loadMenu();
    }, []);

    const organizeByTechnology = (menuContent: any[]): MenuData => {
        return menuContent?.reduce((acc: MenuData, item: { technology: string; chapter: string; subjects: string[] }) => {
            const { technology, chapter, subjects } = item;

            if (!acc[technology]) {
                acc[technology] = [];
            }

            const section: Section = {
                id: acc[technology].length + 1,
                title: chapter,
                technology: technology,
                subjects: subjects.map(subject => ({
                    name: subject,
                    checked: false
                }))
            };

            acc[technology].push(section);

            return acc;
        }, {});
    };

    return { sectionsData, setSectionsData, loading, error };
}
