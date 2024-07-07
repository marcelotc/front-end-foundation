'use client'

import './styles.css'

import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Image from '@tiptap/extension-image'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'

const extensions = [
    Color.configure(),
    TextStyle.configure(),
    StarterKit.configure(),
    Image.configure(),
]

export default function contentOutput({content}: any) {

    if(!content) {
        return;
    }

    const contentData = JSON.parse(content)

    const editor = useEditor({
        extensions,
        content: contentData.content,
        editable: false
    })

    return (
        <>
            <EditorContent editor={editor} />
        </>
    )
}