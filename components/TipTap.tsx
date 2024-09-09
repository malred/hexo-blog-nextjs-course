'use client';

import './styled.scss'

import {EditorContent, ReactNodeViewRenderer, useEditor} from "@tiptap/react";
import {StarterKit} from "@tiptap/starter-kit";
import Heading from '@tiptap/extension-heading'
import BubbleToolbar from "@/components/BubbleToolbar";
import {CharacterCount} from "@tiptap/extension-character-count";

import {Color} from '@tiptap/extension-color'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'

import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import {useEffect, useState} from "react";
import FloatingToolbar from "@/components/FloatingToolbar";

// @tiptap-pro/extension-file-handler is not in the npm registry, or you have no permission to fetch it.
// import FileHandler from '@tiptap-pro/extension-file-handler'

import Focus from '@tiptap/extension-focus'
import {FontFamily} from "@tiptap/extension-font-family";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import Code from "@tiptap/extension-code";

import ListKeymap from '@tiptap/extension-list-keymap'

import Blockquote from '@tiptap/extension-blockquote'
import HardBreak from '@tiptap/extension-hard-break'
import HorizontalRule from '@tiptap/extension-horizontal-rule'

import Highlight from '@tiptap/extension-highlight'
import {common, createLowlight} from 'lowlight'

const lowlight = createLowlight(common)

lowlight.highlight('html', '"use strict";')
lowlight.highlight('css', '"use strict";')
lowlight.highlight('js', '"use strict";')
lowlight.highlight('ts', '"use strict";')

import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'

import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'

import Link from '@tiptap/extension-link'

// import Highlight from '@tiptap/extension-highlight'

import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'

import TextAlign from '@tiptap/extension-text-align'

export default function TipTap({
                                   description,
                                   onChange
                               }: {
    description: string
    onChange: (richText: string) => void
}) {
    // 编辑器设置, 比如使用哪些插件, 支持哪些功能
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                // Disable an included extension
                history: false,
                // codeBlock: false,
                // code: false
                gapcursor: true
            }),
            Heading,
            Document,
            Paragraph,
            Dropcursor,
            Text,
            TextStyle,
            Color,
            CharacterCount.configure({
                mode: 'nodeSize',
            }),
            Focus.configure({
                className: 'has-focus',
                mode: 'all',
            }),
            Code,
            BulletList,
            ListItem,
            FontFamily,
            ListKeymap,
            // CodeBlock,
            Blockquote,
            HardBreak,
            HorizontalRule,
            Highlight,
            Image.configure({
                allowBase64: true,
                inline: true,
            }),
            Table.configure({
                // resizable: true,
                // allowTableNodeSelection: true
            }),
            TableRow,
            TableHeader,
            TableCell,
            Text,
            TaskList,
            TaskItem.configure({
                // nested: true,
                HTMLAttributes: {
                    class: 'list-none',
                },
            }),
            Link.configure({
                HTMLAttributes: {
                    class: 'underline cursor-pointer text-blue-400',
                },
                openOnClick: true,
                // linkOnPaste: true,
                autolink: true,
                defaultProtocol: 'https',
            }),
            Highlight.configure({multicolor: true}),
            Subscript,
            Superscript,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        autofocus: true,
        content: description,
        editorProps: {
            attributes: {
                class:
                    'p-2 rounded-md border min-h-[150px] border-input bg-back  disabled:cursor-not-allowed disabled:opacity-50'
            }
        },
        onUpdate({editor}) {
            onChange(editor.getHTML())
            console.log(editor.getHTML())
        }
    })

    // 防止编辑器未加载时操作出错
    const [isEditable, setIsEditable] = useState(true)

    useEffect(() => {
        if (editor) {
            editor.setEditable(isEditable)
        }
    }, [isEditable, editor])

    return (
        <div className={' flex flex-col justify-stretch min-h-[250px] min-w-[250px]'}>
            {/* bubble menu, 就是长按拖动鼠标选中内容后会弹出的悬浮工具条 */}
            <BubbleToolbar editor={editor}/>
            {/* 回车到新行时会自动出现的浮动工具条 */}
            <FloatingToolbar editor={editor}/>
            {/* 编辑器顶部的工具条, 本来我是不想搞的, 这里主要是为了使用table组件 */}
            <div className="control-group flex flex-row flex-wrap gap-2 mb-2">
                <button
                    className={'p-1 bg-blue-200 rounded-md'}
                    onClick={() => editor.chain().focus().insertTable({rows: 3, cols: 3, withHeaderRow: true}).run()
                    }
                >
                    Insert table
                </button>
                <button
                    className={'p-1 bg-blue-200 rounded-md'}
                    onClick={() => editor.chain().focus().addColumnBefore().run()}>
                    Add column before
                </button>
                <button
                    className={'p-1 bg-blue-200 rounded-md'}
                    onClick={() => editor.chain().focus().addColumnAfter().run()}>Add column after
                </button>
                <button
                    className={'p-1 bg-blue-200 rounded-md'}
                    onClick={() => editor.chain().focus().deleteColumn().run()}>Delete column
                </button>
                <button
                    className={'p-1 bg-blue-200 rounded-md'}
                    onClick={() => editor.chain().focus().addRowBefore().run()}>Add row before
                </button>
                <button
                    className={'p-1 bg-blue-200 rounded-md'}
                    onClick={() => editor.chain().focus().addRowAfter().run()}>Add row after
                </button>
                <button
                    className={'p-1 bg-blue-200 rounded-md'}
                    onClick={() => editor.chain().focus().deleteRow().run()}>Delete row
                </button>
                <button
                    className={'p-1 bg-blue-200 rounded-md'}
                    onClick={() => editor.chain().focus().deleteTable().run()}>Delete table
                </button>
                <button
                    className={'p-1 bg-blue-200 rounded-md'}
                    onClick={() => editor.chain().focus().mergeCells().run()}>Merge cells
                </button>
                <button
                    className={'p-1 bg-blue-200 rounded-md'}
                    onClick={() => editor.chain().focus().splitCell().run()}>Split cell
                </button>
                <button
                    className={'p-1 bg-blue-200 rounded-md'}
                    onClick={() => editor.chain().focus().toggleHeaderColumn().run()}>
                    Toggle header column
                </button>
                <button
                    className={'p-1 bg-blue-200 rounded-md'}
                    onClick={() => editor.chain().focus().toggleHeaderRow().run()}>
                    Toggle header row
                </button>
                <button
                    className={'p-1 bg-blue-200 rounded-md'}
                    onClick={() => editor.chain().focus().toggleHeaderCell().run()}>
                    Toggle header cell
                </button>
                <button
                    className={'p-1 bg-blue-200 rounded-md'}
                    onClick={() => editor.chain().focus().mergeOrSplit().run()}>Merge or split
                </button>
                <button
                    className={'p-1 bg-blue-200 rounded-md'}
                    onClick={() => editor.chain().focus().setCellAttribute('colspan', 2).run()}>
                    Set cell attribute
                </button>
                <button
                    className={'p-1 bg-blue-200 rounded-md'}
                    onClick={() => editor.chain().focus().fixTables().run()}>Fix tables
                </button>
                <button
                    className={'p-1 bg-blue-200 rounded-md'}
                    onClick={() => editor.chain().focus().goToNextCell().run()}>Go to next cell
                </button>
                <button
                    className={'p-1 bg-blue-200 rounded-md'}
                    onClick={() => editor.chain().focus().goToPreviousCell().run()}>
                    Go to previous cell
                </button>
            </div>

            {/* 编辑器内容 */}
            <EditorContent editor={editor}/>

            {/* 底部字数统计 */}
            <div
                className={`character-count `}>
                <br/>
                {editor?.storage.characterCount.characters()} characters
                {' '}
                {editor?.storage.characterCount.words()} words
            </div>
        </div>
    )
}