'use client';

import { CircleHelp } from 'lucide-react';

export default function FloatingInfo() {
    return (
        <div className="fixed bottom-4 left-4">
            <div className="bg-white rounded-full shadow-lg">
                <CircleHelp className="cursor-pointer" color="#000" size={40} onClick={() => alert('info')} />
            </div>
        </div>
    );
}
