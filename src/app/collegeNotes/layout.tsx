export default function CollegeNotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {/* Gradient blurs fixed to viewport so they show behind the navbar */}
      <div className="fixed top-0 right-0 w-96 h-72 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-300 blur-3xl -z-10 opacity-30 -rotate-12 scale-150 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-72 h-56 bg-gradient-to-r from-orange-200 via-orange-300 to-yellow-200 blur-3xl -z-10 opacity-30 rotate-12 scale-150 pointer-events-none" />
      {children}
    </div>
  );
}
