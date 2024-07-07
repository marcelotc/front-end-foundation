'use client'

import './styles.css'

import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ReactImage from "../../../../utils/textEditorConfig";
import React from 'react'

const extensions = [
    Color.configure(),
    TextStyle.configure(),
    StarterKit.configure(),
    ReactImage.configure(),
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