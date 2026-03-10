export default function SubjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <main className="flex-1 min-w-0 overflow-y-auto">{children}</main>
    </div>
  );
}
