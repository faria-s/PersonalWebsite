import fs from "fs";
import path from "path";

export type NoteNode = {
  name: string;
  path: string;
  type: "file" | "folder";
  children?: NoteNode[];
};

export function getNotesTree(): NoteNode[] {
  return Object.keys(MANIFEST)
    .sort()
    .map((subject) => ({
      name: subject,
      path: `/notes/${subject}`,
      type: "folder" as const,
      children: MANIFEST[subject].map((note) => ({
        name: note,
        path: `/notes/${subject}/${note}`,
        type: "file" as const,
      })),
    }));
}

export async function fetchNoteContent(
  subject: string,
  note: string,
  baseUrl: string,
): Promise<string | null> {
  const url = `${baseUrl}/notes/${encodeURIComponent(subject)}/${encodeURIComponent(note)}.md`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const raw = await res.text();
    return preprocessObsidianImages(raw, subject);
  } catch {
    return null;
  }
}

export function getSubjectFolders(notesDir: string): string[] {
  const entries = fs.readdirSync(notesDir, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
}

const MANIFEST: Record<string, string[]> = {
  BD: ["Ciclo de Vida de um SBD", "Normalização", "SQL", "Álgebra Relacional"],
  CC: ["1. Transport Layer", "2. DNS", "3.  HTTP", "4. Encaminhamento"],
  POO: [
    "1. Composição, Agregação, Classes",
    "2. Coleções em Java",
    "3. Classes UML",
  ],
  RC: [
    "1.2 Access Networks",
    "1.3 Packet Switching",
    "1.4 Overview of Delay in Packet-Switched Networks",
    "1.5 Layered Architecture",
    "4.1 Overview of Network Layer",
    "4.2 What's Inside a Router",
    "4.3 The Internet Protocol (IP)- IPv4, Addressing,IPv6, and more",
    "4.4 Generalized Forward and SDN",
    "6.1 Introduction to the Link Layer",
    "6.2 Error-Detection and -Correction Techniques",
    "6.3 Multiple Access Protocols",
    "6.4 LANs",
    "7. Wireless",
    "Aula 7",
    "Aula 8",
    "Aula 9 - Switching",
  ],
  SD: ["1 - Introduction", "2 - Mutual Exclusion", "3 - Concurrent Objects"],
  SO: [
    "1 - OS Intro",
    "4 - CPU Scheduling",
    "4. The Abstraction - The Process",
    "5- Memory Virtualization Abstractions and Mechanisms",
    "5. Interlude - Process API",
    "6 - Paging and Virtual Memory",
    "6. Mechanism - Limited Direct Execution",
    "7 - IO Devices",
    "8 - File System Interface and Design",
  ],
};

export function getNotesForSubject(subject: string): string[] {
  return MANIFEST[subject] ?? [];
}

export function readNoteContent(
  notesDir: string,
  subject: string,
  note: string,
): string | null {
  const filePath = path.join(notesDir, subject, `${note}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  return preprocessObsidianImages(raw, subject);
}

/**
 * Replaces Obsidian-style image embeds  ![[filename.png]]
 * with standard markdown images that point to our API route:
 *   ![filename.png](/api/attachments/<subject>/<filename>)
 */
function preprocessObsidianImages(content: string, subject: string): string {
  return content.replace(/!\[\[([^\]]+)\]\]/g, (_match, filename: string) => {
    const encoded = encodeURIComponent(filename.trim());
    const encodedSubject = encodeURIComponent(subject);
    return `![${filename.trim()}](/notes/${encodedSubject}/Attachements/${encoded})`;
  });
}

export function getAttachmentPath(
  notesDir: string,
  subject: string,
  filename: string,
): string | null {
  const attachmentsDir = path.join(notesDir, subject, "Attachements");
  const filePath = path.join(attachmentsDir, filename);

  // Prevent path traversal
  const resolved = path.resolve(filePath);
  const base = path.resolve(attachmentsDir);
  if (!resolved.startsWith(base)) return null;

  if (!fs.existsSync(resolved)) return null;
  return resolved;
}
