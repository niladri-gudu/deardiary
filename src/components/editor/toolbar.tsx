/* eslint-disable jsx-a11y/alt-text */
"use client";

import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline,
  Heading2,
  List,
  Quote,
  Image,
  Undo,
  Redo,
  CheckSquare,
  Link as LinkIcon,
  Eraser,
} from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

interface ToolbarProps {
  editor: Editor;
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      disabled={disabled}
      title={title}
      className={`
        p-2 rounded-md transition-all
        ${active
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"}
        ${disabled ? "opacity-30" : ""}
      `}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-5 bg-border mx-1" />;
}

export function Toolbar({ editor }: ToolbarProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);

  // 🔗 LINK
  const addLink = () => {
    const url = prompt("Enter URL");
    if (!url) return;
    editor.chain().focus().setLink({ href: url }).run();
  };

  // 🖼 IMAGE (FULL WORKING FLOW)
  const addImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    const tempId = `upload-${Date.now()}`;

    // show temp image
    editor
      .chain()
      .focus()
      .setImage({ src: "/uploading.png", alt: tempId })
      .run();

    try {
      // 1. get presigned URL
      const res = await fetch("/api/journal/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
          size: file.size,
        }),
      });

      const { presignedUrl, publicUrl } = await res.json();

      // 2. upload to S3
      await fetch(presignedUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      // 3. replace temp image
      const { state } = editor;
      state.doc.descendants((node, pos) => {
        if (node.type.name === "image" && node.attrs.alt === tempId) {
          editor
            .chain()
            .focus()
            .deleteRange({ from: pos, to: pos + node.nodeSize })
            .setImage({ src: publicUrl })
            .run();
        }
      });
    } catch (err) {
      toast.error("Image upload failed");

      // remove temp
      const { state } = editor;
      state.doc.descendants((node, pos) => {
        if (node.type.name === "image" && node.attrs.alt === tempId) {
          editor.chain().deleteRange({ from: pos, to: pos + node.nodeSize }).run();
        }
      });
    }
  };

  return (
    <div className="flex items-center gap-1 px-3 py-2 border-b border-border bg-background/80 backdrop-blur sticky top-0 z-10">
      
      {/* Undo / Redo */}
      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="Undo"
      >
        <Undo className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="Redo"
      >
        <Redo className="h-4 w-4" />
      </ToolbarButton>

      <Divider />

      {/* Heading */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive("heading", { level: 2 })}
        title="Heading"
      >
        <Heading2 className="h-4 w-4" />
      </ToolbarButton>

      <Divider />

      {/* Text */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("bold")}
      >
        <Bold className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive("italic")}
      >
        <Italic className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        active={editor.isActive("underline")}
      >
        <Underline className="h-4 w-4" />
      </ToolbarButton>

      <Divider />

      {/* Lists */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive("bulletList")}
      >
        <List className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        active={editor.isActive("taskList")}
      >
        <CheckSquare className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive("blockquote")}
      >
        <Quote className="h-4 w-4" />
      </ToolbarButton>

      <Divider />

      {/* Extras */}
      <ToolbarButton onClick={addLink}>
        <LinkIcon className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() =>
          editor.chain().focus().unsetAllMarks().clearNodes().run()
        }
      >
        <Eraser className="h-4 w-4" />
      </ToolbarButton>

      <Divider />

      {/* Image */}
      <ToolbarButton onClick={() => imageInputRef.current?.click()}>
        <Image className="h-4 w-4" />
      </ToolbarButton>

      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={addImage}
      />
    </div>
  );
}