"use client";

import Editor from "@/components/editor";
import { useState } from "react";

export default function JournalPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState({ html: "", text: "", json: {} });

  return (
    <div className="min-h-screen bg-[#020617] text-white flex">
      <aside className="w-64 border-r border-zinc-800 p-6 hidden md:block shrink-0">
        <h2 className="text-xl font-semibold mb-6">Dear Diary</h2>
        <p className="text-zinc-500 text-sm">Your thoughts, your space.</p>
      </aside>

      <main className="flex-1 px-6 py-14 overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-4">
          <input
            placeholder="Untitled"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-4xl font-bold bg-transparent outline-none text-zinc-100 placeholder:text-zinc-700 tracking-tight"
          />
          <p className="text-sm text-zinc-600">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <Editor onChange={setContent} />
        </div>
      </main>
    </div>
  );
}
