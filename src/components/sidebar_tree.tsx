"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NoteNode } from "@/utils/notes";

export default function SidebarTree({ tree }: { tree: NoteNode[] }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const segments = pathname.split("/").filter(Boolean);
  const activeSubject = segments[2] ? decodeURIComponent(segments[2]) : "";
  const activeNote = segments[3] ? decodeURIComponent(segments[3]) : "";

  const subjectNode = tree.find(
    (n) => n.type === "folder" && n.name === activeSubject,
  );

  const files = subjectNode?.children?.filter((n) => n.type === "file") ?? [];

  const navLinks = (
    <nav className="flex flex-col gap-0.5">
      {files.map((node) => {
        const isActive = node.name === activeNote;
        return (
          <Link
            key={node.path}
            href={`/collegeNotes/notes/${encodeURIComponent(activeSubject)}/${encodeURIComponent(node.name)}`}
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-2 py-1.5 px-2 rounded text-sm transition-colors ${
              isActive
                ? "text-highlight bg-foreground"
                : "text-gray-400 hover:text-highlight hover:bg-foreground"
            }`}
          >
            <span className="shrink-0 text-xs">📄</span>
            <span className="truncate leading-snug">{node.name}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(true)}
        className="sm:hidden fixed bottom-5 right-5 z-40 bg-highlight text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg text-xl"
        aria-label="Open notes list"
      >
        ☰
      </button>

      {/* Mobile drawer backdrop */}
      {isOpen && (
        <div
          className="sm:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`sm:hidden fixed top-0 left-0 z-50 h-full w-72 bg-background border-r border-gray-700 p-4 flex flex-col gap-3 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
            {activeSubject || "Notes"}
          </p>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white text-xl leading-none"
            aria-label="Close notes list"
          >
            ✕
          </button>
        </div>
        {navLinks}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden sm:flex flex-col w-56 shrink-0 border-r border-gray-700 overflow-y-auto h-screen sticky top-0 p-3 gap-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 px-2">
          {activeSubject || "Notes"}
        </p>
        {navLinks}
      </aside>
    </>
  );
}
