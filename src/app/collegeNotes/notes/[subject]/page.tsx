import { getNotesForSubject } from "@/utils/notes";
import Link from "next/link";
import path from "path";
import { notFound } from "next/navigation";

interface SubjectPageProps {
  params: Promise<{ subject: string }>;
}

export default async function SubjectPage({ params }: SubjectPageProps) {
  const { subject } = await params;

  const decodedSubject = decodeURIComponent(subject);
  const notes = getNotesForSubject(decodedSubject);

  if (notes.length === 0) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-8 w-full">
      <div className="flex items-center gap-3">
        <Link
          href="/collegeNotes"
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-highlight transition-colors border border-gray-700 rounded-md px-3 py-1.5 whitespace-nowrap"
        >
          ← Back
        </Link>
        <h2 className="text-white truncate">{decodedSubject}</h2>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        {notes.map((note) => (
          <li key={note}>
            <Link
              href={`/collegeNotes/notes/${encodeURIComponent(decodedSubject)}/${encodeURIComponent(note)}`}
              className="flex items-start gap-3 border border-gray-700 rounded-lg px-4 py-4 text-white hover:border-highlight hover:text-highlight transition-colors h-full"
            >
              <span className="text-gray-400 mt-0.5 shrink-0">📄</span>
              <span className="leading-snug text-sm sm:text-base">{note}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
