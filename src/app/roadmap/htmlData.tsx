interface Subject {
    name: string;
    checked: boolean;
}

export interface Section {
    id: number;
    title: string;
    technology: string;
    subjects: Subject[];
}

export interface CollapsibleSectionProps {
    id: number;
    title: string;
    timelineData: Section[];
    learnPath: string;
    isOpen: boolean;
    onToggle: (id: number) => void;
}

export const htmlData: Section[] = [
    {
        id: 1,
        title: "Beginner",
        technology: "html",
        subjects: [
            { name: "Introduction to HTML", checked: false },
            { name: "Tags and Attributes", checked: false },
            { name: "Basic Elements", checked: false }
        ],
    },
    {
        id: 2,
        title: "Intermediate",
        technology: "html",
        subjects: [
            { name: "Forms", checked: false },
            { name: "Semantic HTML", checked: false },
            { name: "Multimedia Elements", checked: false },
            { name: "Responsive Design", checked: false }
        ],
    },
    {
        id: 3,
        title: "Advanced",
        technology: "html",
        subjects: [
            { name: "HTML APIs", checked: false },
            { name: "Custom Data Attributes", checked: false },
            { name: "Web Components", checked: false },
            { name: "Accessibility", checked: false }
        ],
    }
];

export const cssData: Section[] = [
    {
        id: 1,
        title: "Beginner",
        technology: "css",
        subjects: [
            { name: "Introduction to CSS", checked: false },
            { name: "Selectors and Properties", checked: false },
            { name: "Basic Styling", checked: false }
        ],
    },
    {
        id: 2,
        title: "Intermediate",
        technology: "css",
        subjects: [
            { name: "Flexbox", checked: false },
            { name: "Grid Layout", checked: false },
            { name: "Responsive Design", checked: false }
        ],
    },
    {
        id: 3,
        title: "Advanced",
        technology: "css",
        subjects: [
            { name: "Animations", checked: false },
            { name: "Transitions", checked: false },
            { name: "Custom Properties", checked: false }
        ],
    }
];

export const jsData: Section[] = [
    {
        id: 1,
        title: "Beginner",
        technology: "javascript",
        subjects: [
            { name: "Introduction to JavaScript", checked: false },
            { name: "Variables and Data Types", checked: false },
            { name: "Basic Operations", checked: false }
        ],
    },
    {
        id: 2,
        title: "Intermediate",
        technology: "javascript",
        subjects: [
            { name: "Functions", checked: false },
            { name: "Objects and Arrays", checked: false },
            { name: "DOM Manipulation", checked: false }
        ],
    },
    {
        id: 3,
        title: "Advanced",
        technology: "javascript",
        subjects: [
            { name: "Asynchronous JavaScript", checked: false },
            { name: "Promises", checked: false },
            { name: "ES6+ Features", checked: false }
        ],
    }
];