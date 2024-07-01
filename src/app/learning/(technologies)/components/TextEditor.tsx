'use client';

import './styles.css';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { v4 as uuidv4 } from 'uuid';
import { getMenuChapters } from '../../../utils/supabase/requests';

const extensions = [
    Color.configure(),
    TextStyle.configure(),
    StarterKit.configure(),
];

export default function MyEditor({ editorMarkdown, handlePublish, submitting }: any) {
    const [chapter, setChapter] = useState('');
    const [subject, setSubject] = useState('');
    const [technology, setTechnology] = useState('html');
    const [chapters, setChapters] = useState<string[]>([]);
    const [newPostType, setNewPostType] = useState('');
    const [editorContent, setEditorContent] = useState(editorMarkdown);

    const editor = useEditor({
        extensions,
        content: editorContent,
    });

    useEffect(() => {
        if (editor) {
            editor.commands.setContent(editorMarkdown?.content || editorContent);
        }
    }, [editor, editorMarkdown]);

    useEffect(() => {
        const fetchChapters = async () => {
            const fetchedChapters = await getMenuChapters(technology);
            const chapterArray = fetchedChapters.map(ch => ch.chapter);
            setChapters(chapterArray);
        };

        fetchChapters();
    }, [technology, newPostType]);

    const handlePublishClick = () => {
        console.log('chapter', chapter)
        if (editor) {
            const json = editor.getJSON();
            handlePublish({ chapterId: uuidv4(), content: json, chapter, subject, technology });
        } else {
            console.log('Editor not initialized');
        }
    };

    const MenuBar = () => {
        if (!editor) {
            return null;
        }

        return (
            <div className='mb-10'>
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'is-active' : ''}
                >
                    bold
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'is-active' : ''}
                >
                    italic
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editor.can().chain().focus().toggleStrike().run()}
                    className={editor.isActive('strike') ? 'is-active' : ''}
                >
                    strike
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={!editor.can().chain().focus().toggleCode().run()}
                    className={editor.isActive('code') ? 'is-active' : ''}
                >
                    code
                </button>
                <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
                    clear marks
                </button>
                <button onClick={() => editor.chain().focus().clearNodes().run()}>
                    clear nodes
                </button>
                <button
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={editor.isActive('paragraph') ? 'is-active' : ''}
                >
                    paragraph
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                >
                    h1
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                >
                    h2
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                >
                    h3
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                    className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
                >
                    h4
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                    className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
                >
                    h5
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                    className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
                >
                    h6
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                >
                    bullet list
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'is-active' : ''}
                >
                    ordered list
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={editor.isActive('codeBlock') ? 'is-active' : ''}
                >
                    code block
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive('blockquote') ? 'is-active' : ''}
                >
                    blockquote
                </button>
                <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                    horizontal rule
                </button>
                <button onClick={() => editor.chain().focus().setHardBreak().run()}>
                    hard break
                </button>
                <button
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().chain().focus().undo().run()}
                >
                    undo
                </button>
                <button
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().chain().focus().redo().run()}
                >
                    redo
                </button>
                <button
                    onClick={() => editor.chain().focus().setColor('#958DF1').run()}
                    className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
                >
                    purple
                </button>
            </div>
        );
    };

    return (
        <>
            <MenuBar />
            <div className='flex flex-col'>
                <div className='mb-5'>
                    <Button size={"sm"} onClick={() => {
                        setNewPostType('newChapter')
                        setChapter('')
                    }}>
                        New chapter
                    </Button>
                    <Button size={"sm"} onClick={() => setNewPostType('chooseChapter')}>
                        Choose chapter
                    </Button>
                </div>
                <div>
                    {newPostType === 'chooseChapter' && (
                        <label>
                            Chapters:
                            <select
                                value={chapter}
                                className="border border-gray-300 rounded m-3"
                                onChange={(e) => setChapter(e.target.value)}
                            >
                                {chapters.map((ch, index) => (
                                    <option key={index} value={ch}>
                                        {ch}
                                    </option>
                                ))}
                            </select>
                        </label>
                    )}
                    {newPostType === 'newChapter' && (
                        <label>
                            Chapter:
                            <input
                                type="text"
                                value={chapter}
                                className="border border-gray-300 rounded m-3"
                                onChange={(e) => setChapter(e.target.value)}
                            />
                        </label>
                    )}
                    <label>
                        Subject:
                        <input
                            type="text"
                            value={subject}
                            className="border border-gray-300 rounded m-3"
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </label>
                    <label>
                        Technology:
                        <select
                            value={technology}
                            className="border border-gray-300 rounded m-3"
                            onChange={(e) => setTechnology(e.target.value)}
                        >
                            <option value="html">HTML</option>
                            <option value="css">CSS</option>
                            <option value="javascript">JavaScript</option>
                        </select>
                    </label>
                </div>
            </div>
            <div className='my-[10px] border-solid border-2 border-black p-5'>
                <EditorContent editor={editor} />
            </div>
            <Button size={"lg"} onClick={handlePublishClick}>
                {submitting ? 'Publishing...' : 'Publish'}
            </Button>
        </>
    );
}
