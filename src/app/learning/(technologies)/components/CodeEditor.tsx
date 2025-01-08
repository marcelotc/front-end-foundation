'use client'

import React, { useState, useCallback, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";

const CodeEditor = ({ htmlCode, cssCode, jsCode, setHtmlCode, setCssCode, setJsCode, correctHtmlCode, correctCssCode, correctJsCode }: any) => {
    const [htmlWidth, setHtmlWidth] = useState(33);
    const [cssWidth, setCssWidth] = useState(33);
    const [jsWidth, setJsWidth] = useState(33);
    const [resized, setResized] = useState(false);

    const onHtmlChange = useCallback((value: string) => {
        setHtmlCode(value);
    }, []);

    const onCssChange = useCallback((value: string) => {
        setCssCode(value);
    }, []);

    const onJsChange = useCallback((value: string) => {
        setJsCode(value);
    }, []);

    useEffect(() => {
        setResized(htmlWidth !== 33 || cssWidth !== 33 || jsWidth !== 33);
    }, [htmlWidth, cssWidth, jsWidth]);

    const livePreview = `
    <html>
      <head>
        <style>${cssCode}</style>
      </head>
      <body>
        ${htmlCode}
        <script>${jsCode}</script>
      </body>
    </html>
  `;

    const handleMouseDown = (e: React.MouseEvent, editorType: string) => {
        const startX = e.clientX;
        const startHtmlWidth = htmlWidth;
        const startCssWidth = cssWidth;
        const startJsWidth = jsWidth;

        const onMouseMove = (moveEvent: MouseEvent) => {
            const diff = moveEvent.clientX - startX;

            if (editorType === "html") {
                const newWidth = Math.min(Math.max(startHtmlWidth + (diff / window.innerWidth) * 100, 10), 80);
                setHtmlWidth(newWidth);
            } else if (editorType === "css") {
                const newWidth = Math.min(Math.max(startCssWidth + (diff / window.innerWidth) * 100, 10), 80);
                setCssWidth(newWidth);
            } else if (editorType === "js") {
                const newWidth = Math.min(Math.max(startJsWidth + (diff / window.innerWidth) * 100, 10), 80);
                setJsWidth(newWidth);
            }
        };

        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    };

    const resetWidths = () => {
        setHtmlWidth(33);
        setCssWidth(33);
        setJsWidth(33);
    };

    const visiblePanels = [correctHtmlCode, correctCssCode, correctJsCode].filter(Boolean).length;

    const availableWidth = correctHtmlCode === undefined || correctCssCode || correctCssCode === undefined || correctJsCode || correctJsCode === undefined ?
        100 / visiblePanels : 100;

    return (
        <div className="flex flex-col gap-5">
            <div className="flex w-full gap-2 p-3">
                {(correctHtmlCode || correctHtmlCode === undefined) && (
                    <div className="relative flex flex-col" style={{ width: `${availableWidth}%` }}>
                        <h2>HTML code editor</h2>
                        <CodeMirror value={htmlCode} height="200px" extensions={[html()]} onChange={(value) => onHtmlChange(value)} />
                        <div
                            onMouseDown={(e) => handleMouseDown(e, "html")}
                            className="absolute right-0 top-0 bottom-0 cursor-ew-resize bg-gray-300 w-2"
                        />
                    </div>
                )}
                {(correctCssCode || correctCssCode === undefined) && (
                    <div className="relative flex flex-col" style={{ width: `${availableWidth}%` }}>
                        <h2>CSS code editor</h2>
                        <CodeMirror value={cssCode} height="200px" extensions={[css()]} onChange={(value) => onCssChange(value)} />
                        <div
                            onMouseDown={(e) => handleMouseDown(e, "css")}
                            className="absolute right-0 top-0 bottom-0 cursor-ew-resize bg-gray-300 w-2"
                        />
                    </div>
                )}
                {(correctJsCode || correctJsCode === undefined) && (
                    <div className="relative flex flex-col" style={{ width: `${availableWidth}%` }}>
                        <h2>JavaScript code editor</h2>
                        <CodeMirror value={jsCode} height="200px" extensions={[javascript({ jsx: true })]} onChange={(value) => onJsChange(value)} />
                        <div
                            onMouseDown={(e) => handleMouseDown(e, "js")}
                            className="absolute right-0 top-0 bottom-0 cursor-ew-resize bg-gray-300 w-2"
                        />
                    </div>
                )}
            </div>

            {resized && (
                <div className="flex justify-center">
                    <button
                        onClick={resetWidths}
                        className="bg-black text-white px-3 py-1 text-sm rounded-sm"
                    >
                        Reset panels
                    </button>
                </div>
            )}

            <div>
                <h2>Live Preview</h2>

                <div className="border-2 border-black rounded-sm mt-3 mb-6">
                    <iframe
                        srcDoc={livePreview}
                        title="preview"
                        width="100%"
                        height="400px"
                        sandbox="allow-scripts allow-same-origin allow-modals"
                    />
                </div>
            </div>
        </div>
    );
};

export default CodeEditor;
