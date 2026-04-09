"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

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
      Placeholder.configure({
        placeholder: "Start writing your thoughts...",
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none focus:outline-none text-lg leading-relaxed",
      },
    },
    onUpdate({ editor }) {
      const html = editor.getHTML();
      const text = editor.getText();
      const json = editor.getJSON();

      onChange?.({ html, text, json });
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor) {
      editor.commands.focus("end");
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="bg-transparent">
      <EditorContent editor={editor} />
    </div>
  );
}
