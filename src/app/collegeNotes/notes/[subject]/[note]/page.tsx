import { readNoteContent } from "@/utils/notes";
import MarkdownRenderer from "@/components/markdown_renderer";
import Link from "next/link";
import path from "path";
import { notFound } from "next/navigation";

interface NotePageProps {
  params: Promise<{ subject: string; note: string }>;
}

export default async function NotePage({ params }: NotePageProps) {
  const { subject, note } = await params;
  const decodedSubject = decodeURIComponent(subject);
  const decodedNote = decodeURIComponent(note);

  const notesDir = path.join(process.cwd(), "src/app/collegeNotes/notes");
  const content = readNoteContent(notesDir, decodedSubject, decodedNote);

  if (content === null) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-8 pb-24 sm:pb-8 w-full min-w-0">
      <div className="flex items-center gap-2 flex-wrap">
        <Link
          href={`/collegeNotes/notes/${encodeURIComponent(decodedSubject)}`}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-highlight transition-colors border border-gray-700 rounded-md px-3 py-1.5 whitespace-nowrap"
        >
          ← Back to {decodedSubject}
        </Link>
        <span className="text-gray-600">/</span>
        <span className="text-gray-400 text-sm truncate max-w-[200px] sm:max-w-none">
          {decodedNote}
        </span>
      </div>

      <article className="w-full min-w-0">
        <MarkdownRenderer content={content} />
      </article>
    </div>
  );
}
