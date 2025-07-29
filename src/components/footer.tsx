import Image from "next/image";

const Footer = () => {
  const socials = [
    {
      name: "faria-s",
      href: "https://github.com/faria-s",
      icon: "socials/github_icon.svg",
    },
    {
      name: "salomé-faria",
      href: "https://www.linkedin.com/in/salomé-faria/",
      icon: "socials/linkedin_icon.svg",
    },
    {
      name: "salome_p_f",
      href: "https://www.instagram.com/salome_p_f/",
      icon: "socials/instagram_icon.svg",
    },
    {
      name: "salomef@ik.me",
      icon: "socials/email_icon.svg",
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:px-20  py-10  sm:justify-between">
      <div className="grid grid-cols-2 gap-y-2 sm:flex sm:justify-evenly px-8 sm:w-3xl ">
        {socials.map((social) => {
          return (
            <div key={social.name} className="flex items-center gap-x-2 ">
              <Image
                width={20}
                height={20}
                alt={social.name}
                src={social.icon}
                className="invert"
              />
              <a
                href={social.href}
                className={"hover:text-highlight text-white"}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.name}
              </a>
            </div>
          );
        })}
      </div>
      <div className="flex gap-x-2 place-self-center">
        <a
          href="https://github.com/faria-s/PersonalWebsite"
          className="text-white py-8  hover:text-highlight"
          target="_blank"
          rel="noopener noreferrer"
        >
          Developed by me
        </a>
        <Image
          width={15}
          height={15}
          alt="website repository"
          src="socials/link_external_icon.svg"
          className="invert"
        />
      </div>
    </div>
  );
};

export default Footer;
