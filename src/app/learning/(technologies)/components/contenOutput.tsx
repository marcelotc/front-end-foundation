'use client'

import './styles.css'

import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'

const extensions = [
    Color.configure(),
    TextStyle.configure(),
    StarterKit.configure(),
]

export default function MyEditor({content}: any) {

    if(!content) {
        return;
    }

    const editor = useEditor({
        extensions,
        content: JSON.parse(content),
        editable: false
    })

    return (
        <>
            <EditorContent editor={editor} />
        </>
    )
}