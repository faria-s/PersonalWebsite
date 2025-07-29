import React from "react";
import Image from "next/image";

const ProfilePicture = () => {
  return (
    <div className="flex flex-col items-center w-full relative ">
      <div className="flex justify-between w-full h-1fr top-0">
        <Image
          width={60}
          height={60}
          alt="ICON"
          src="/icons/zigzag_icon_bg.svg"
        />
        <Image
          width={50}
          height={50}
          alt="ICON"
          src="/icons/circles_icon_bg.svg"
        />
      </div>
      <div className="flex items-center relative mt-10 w-80 h-80">
        <div className="absolute hidden sm:block left-35 top-30 -translate-x-1/2 -translate-y-1/2 w-65 h-65 sm:w-72 sm:h-72 rotate-20 rounded-3xl border-2 border-white bg-transparent scale-110 z-0" />
        <div className="self-center absolute w-65 h-65 sm:w-72 sm:h-72 rounded-3xl border-4 border-white overflow-hidden transform rotate-20 shadow-2xl bg-linear-to-r from-violet-400 to-blue-400 left-1/2 top-1/2 -translate-1/2">
          <div className="w-90 h-90 sm:w-105 sm:h-105 -right-16 -top-12 sm:bottom-15 absolute -rotate-20 justify-center p-8">
            <Image
              width={500}
              height={500}
              alt="Picture of Salome"
              src="/pfp_nobackground.png"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full h-1fr bottom-0">
        <Image
          width={60}
          height={60}
          alt="ICON"
          src="/icons/play_icon_bg.svg"
        />
        <Image width={50} height={50} alt="ICON" src="/icons/add_icon_bg.svg" />
      </div>
    </div>
  );
};

export default ProfilePicture;
