import Image from "next/image";

const Stack = () => {
  const skills = [
    { name: "C", path: "/skills/C.svg" },
    { name: "Java", path: "/skills/Java-Light.svg" },
    { name: "Next.js", path: "/skills/NextJS-Light.svg" },
    { name: "Tailwind", path: "/skills/TailwindCSS-Light.svg" },
    { name: "Python", path: "/skills/Python-Light.svg" },
    { name: "Haskell", path: "/skills/Haskell-Light.svg" },
    { name: "MySQL", path: "/skills/MySQL-Light.svg" },
    { name: "Linux", path: "/skills/Linux-Light.svg" },
  ];

  const tools = [
    { name: "Vim", path: "/skills/VIM-Light.svg" },
    { name: "Zed", path: "/skills/zed.png" },
    { name: "Github", path: "/skills/Github-Light.svg" },
    { name: "Obsidian", path: "/skills/Obsidian-Light.svg" },
    { name: "Arch", path: "/skills/Arch-Light.svg" },
  ];

  return (
    <div className="flex flex-col gap-y-10 sm:gap-y-15 text-white">
      <div className="flex flex-col gap-y-10 items-center">
        <h1 className="text-4xl py-3 sm:py-5"> Skills </h1>
        <div className="grid grid-cols-3 sm:grid-cols-5 w-xs sm:w-5xl justify-evenly gap-y-4">
          {skills.map((skill) => {
            return (
              <div
                key={skill.path}
                className="flex flex-col gap-y-2 text-md sm:text-lg text-center"
              >
                <Image
                  width={48}
                  height={48}
                  alt={skill.name}
                  src={skill.path}
                  className="place-self-center w-15 h-15 sm:w-20 sm:h-20"
                />
                {skill.name}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-y-10 items-center">
        <h1 className="text-4xl py-3 sm:py-5"> Tools </h1>
        <div className="grid grid-cols-3 sm:grid-cols-5 w-xs sm:w-5xl justify-evenly gap-y-4">
          {tools.map((tool) => {
            return (
              <div
                key={tool.path}
                className="flex flex-col gap-y-2 text-md sm:text-lg text-center"
              >
                <Image
                  width={48}
                  height={48}
                  alt={tool.name}
                  src={tool.path}
                  className="place-self-center w-15 h-15 sm:w-20 sm:h-20"
                />
                {tool.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Stack;
