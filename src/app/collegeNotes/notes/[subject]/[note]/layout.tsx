import { getNotesTree } from "@/utils/notes";
import SidebarTree from "@/components/sidebar_tree";
import path from "path";

export default function SubjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tree = getNotesTree();

  return (
    <div className="flex min-h-screen">
      <SidebarTree tree={tree} />
      <main className="flex-1 min-w-0 overflow-y-auto">{children}</main>
    </div>
  );
}
