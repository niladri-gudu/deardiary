"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import UnderlineExt from "@tiptap/extension-underline";
import ImageExt from "@tiptap/extension-image";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Link from "@tiptap/extension-link";
import { Toolbar } from "./toolbar";

export default function Editor({
  content = "",
  onChange,
}: {
  content?: string;
  onChange?: (data: { html: string; text: string; json: any }) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      UnderlineExt,
      ImageExt.configure({ inline: false, allowBase64: true }),

      TaskList,
      TaskItem.configure({
        nested: true,
      }),

      Link.configure({
        openOnClick: false,
      }),

      Placeholder.configure({
        placeholder: "Start writing your thoughts...",
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          // "prose max-w-none focus:outline-none text-lg leading-snug text-foreground prose-headings:text-foreground prose-strong:text-foreground prose-blockquote:border-border prose-blockquote:text-muted-foreground prose-code:text-foreground prose-hr:border-border prose-a:text-primary",
          // "prose prose-lg dark:prose-invert max-w-[65ch] mx-auto focus:outline-none  selection:bg-primary/20 selection:text-primary prose-p:leading-relaxed prose-p:text-foreground/90 prose-headings:font-semibold prose-headings:tracking-tight",
          "tiptap max-w-none focus:outline-none text-lg leading-snug text-foreground",
      },
    },
    onUpdate({ editor }) {
      onChange?.({
        html: editor.getHTML(),
        text: editor.getText(),
        json: editor.getJSON(),
      });
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor) editor.commands.focus("end");
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="bg-background">
      <Toolbar editor={editor} />
      <div className="px-8 py-8">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
