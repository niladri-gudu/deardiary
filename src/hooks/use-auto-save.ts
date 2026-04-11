import { useEffect, useRef, useState } from "react";

type SaveStatus = "idle" | "saving" | "saved" | "error";

interface EntryData {
  date: string;
  title: string;
  contentHtml: string;
  contentText: string;
  contentJson: any;
}

export function useAutoSave(data: EntryData, debounceMs = 1500) {
  const [status, setStatus] = useState<SaveStatus>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestData = useRef(data);
  const hasEverHadContent = useRef(!!(data.contentText || data.title));

  useEffect(() => {
    latestData.current = data;
  }, [data]);

  useEffect(() => {
    if (data.contentText || data.title) {
      hasEverHadContent.current = true;
    }
  }, [data.contentText, data.title]);

  useEffect(() => {
    if (!hasEverHadContent.current) return;
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(async () => {
      setStatus("saving");
      try {
        const res = await fetch("/api/journal", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(latestData.current),
        });

        if (!res.ok) throw new Error("Save failed");
        setStatus("saved");

        setTimeout(() => setStatus("idle"), 2000);
      } catch {
        setStatus("error");
      }
    }, debounceMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [
    data.title,
    data.contentText,
    JSON.stringify(data.contentJson),
    debounceMs,
  ]);

  return status;
}
