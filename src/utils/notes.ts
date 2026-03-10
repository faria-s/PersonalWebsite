import fs from "fs";
import path from "path";

export type NoteNode = {
  name: string;
  path: string;
  type: "file" | "folder";
  children?: NoteNode[];
};

export function getNotesTree(baseDir: string, depth: number = 0): NoteNode[] {
  const entries = fs.readdirSync(baseDir, { withFileTypes: true });

  return entries
    .map((entry) => {
      const fullPath = path.join(baseDir, entry.name);
      if (entry.isDirectory()) {
        // Only include top-level subject folders (depth 0); skip Attachements, Aulas, etc.
        if (depth > 0) return null;
        return {
          name: entry.name,
          path: fullPath,
          type: "folder" as const,
          children: getNotesTree(fullPath, depth + 1),
        };
      } else if (entry.name.endsWith(".md")) {
        return {
          name: entry.name.replace(".md", ""),
          path: fullPath,
          type: "file" as const,
        };
      }
      return null;
    })
    .filter(Boolean) as NoteNode[];
}

export function getSubjectFolders(notesDir: string): string[] {
  const entries = fs.readdirSync(notesDir, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
}

export function getNotesForSubject(
  notesDir: string,
  subject: string,
): string[] {
  const subjectPath = path.join(notesDir, subject);
  if (!fs.existsSync(subjectPath)) return [];

  const entries = fs.readdirSync(subjectPath, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && e.name.endsWith(".md"))
    .map((e) => e.name.replace(/\.md$/, ""))
    .sort();
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
    return `![${filename.trim()}](/api/attachments/${encodedSubject}/${encoded})`;
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
