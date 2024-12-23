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
                                Your progress is saved in your browser, allowing you to resume anytime. No account is needed, but clearing your browser’s storage will remove it.                            </AlertDialogDescription>
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
