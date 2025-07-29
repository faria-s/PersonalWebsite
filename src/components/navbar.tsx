"use client";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import GradientSpot from "@/components/gradient_spot";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const isCurrent = (path: string) => {
    return pathname === path;
  };

  const routes = [
    { name: "Home", path: "/" },
    { name: "College Notes", path: "/collegeNotes" },
  ];

  return (
    <>
      <nav className="p-4 grid grid-cols-2 w-full h-10 sm:h-20 text-white ">
        <div className="hidden px-30 items-center font-title font-medium sm:flex justify-evenly">
          {routes.map((route) => {
            return (
              <Link
                key={route.path}
                href={route.path}
                className={"hover:text-highlight"}
              >
                {route.name}
              </Link>
            );
          })}
        </div>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden palce-self-start cursor-pointer"
          animate={{ rotate: isOpen ? 90 : 0 }}
        >
          <Image
            width={40}
            height={40}
            alt="menu"
            src="/icons/mobile_menu.svg"
            className="transform -scale-x-100"
          />
        </motion.button>
        <a
          href="https://www.linkedin.com/in/salomé-faria/"
          className="border mr-2 sm:mr-0 rounded-md py-1 hover:text-highlight sm:px-6 px-4 sm:place-self-center place-self-end"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact me
        </a>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="fixed sm:hidden left-0 right-0 top-0 z-40 flex h-dvh flex-col justify-between bg-background  shadow-lg md:hidden"
            exit={{ x: "100%", borderRadius: "50px" }}
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.15 }}
          >
            <GradientSpot
              scale="scale-150"
              inset="left-10 sm:left-15 sm:top-30"
              height="h-50"
              width="w-40 sm:w-120"
              gradient={2}
              tilt="-rotate-15"
            >
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="sm:hidden place-self-start cursor-pointer pb-16"
                animate={{ rotate: isOpen ? 90 : 0 }}
              >
                <Image
                  width={40}
                  height={40}
                  alt="close"
                  src="/icons/add_icon_bg.svg"
                  className=" transform rotate-45"
                />
              </motion.button>
              <ul className="flex flex-col px-7 space-y-3 text-white">
                {routes.map((route, i) => (
                  <motion.li
                    key={route.path}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={route.path}
                      className={`${
                        isCurrent(route.path) ? "text-highlight" : ""
                      } transition-colors hover:text-highlight`}
                      onClick={() => setIsOpen(false)}
                    >
                      <h2>{route.name}</h2>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </GradientSpot>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
