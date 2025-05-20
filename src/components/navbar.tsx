"use client";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <nav className="grid grid-cols-2 bg-var(--foreground) w-full h-20 text-white ">
        <div className="grid grid-cols-2 place-self-center">
          <Link href="/" className="hover:text-(--color-highlight)">
            Home
          </Link>
          <Link href="/studyGuides" className="hover:text-(--color-highlight)">
            Study Guides
          </Link>
        </div>
        <a
          href="https://www.linkedin.com/in/salomé-faria/"
          className="border rounded-md py-1 px-6 place-self-center hover:text-(--color-highlight) "
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact me
        </a>
      </nav>
    </>
  );
};

export default Navbar;
