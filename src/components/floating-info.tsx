'use client';

import { CircleHelp } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function FloatingInfo() {
    return (
        <div className="fixed bottom-4 left-4">
            <div className="bg-white rounded-full shadow-lg">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <CircleHelp className="cursor-pointer" color="#000" size={40} />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>How Your Progress is Saved</AlertDialogTitle>
                            <AlertDialogDescription>
                                Your progress is stored in your browser's local storage. This means all your learning milestones, completed chapters, and finished subjects are saved directly on your device. No account is required, and your data remains private to you.
                                This approach ensures you can pick up right where you left off, even if you refresh or close the site. However, please note that clearing your browser's storage will erase your progress.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogAction>Ok</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}
