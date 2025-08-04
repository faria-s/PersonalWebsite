"use client";
import Image from "next/image";
import GradientSpot from "@/components/gradient_spot";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Scrolable_Highlight = () => {
  const cesium_photos = [
    { name: "sei25", path: "/highlights/sei25_1.JPG" },
    { name: "board_games", path: "/highlights/board_games.JPG" },
    { name: "bugsbyte25", path: "/highlights/xadrez.JPG" },
    { name: "bugsbyte24", path: "/highlights/bugs24_1.JPG" },
    { name: "bugsbyte24", path: "/highlights/bugs24_2.JPG" },
    { name: "sei25", path: "/highlights/sei25_2.JPG" },
    { name: "cesium_team25", path: "/highlights/Equipa25.JPG" },
    { name: "sei24_team", path: "/highlights/sei24.JPG" },
  ];

  const theater_photos = [
    { name: "contra_ventos", path: "/highlights/contra_ventos.JPG" },
    {
      name: "fabrica_matar_baleia",
      path: "/highlights/fabrica_matar_baleia.jpeg",
    },
    { name: "ilha", path: "/highlights/ilha.jpeg" },
  ];

  return (
    <div className="grid sm:grid-rows-2 gap-y-10 sm:gap-y-20">
      <div className="flex px-3 flex-col gap-y-5 sm:flex-row sm:justify-evenly items-center">
        <div className="order-2 sm:order-1 ">
          <GradientSpot
            scale="scale-120 sm:scale-250"
            height="h-70 sm:h-40"
            width="w-60 sm:w-100"
            gradient={1}
            tilt="rotate-20"
          >
            <Carousel
              autoPlay
              interval={3000}
              infiniteLoop
              showThumbs={false}
              showStatus={false}
              showIndicators={false}
              showArrows={true}
              className=" hidden sm:block sm:max-w-xl sm:rounded-3xl sm:border-1 sm:border-white sm:overflow-hidden"
            >
              {cesium_photos.map((photo) => {
                return (
                  <div key={photo.path} className="aspect-video w-full h-full">
                    <Image
                      fill
                      alt={photo.name}
                      src={photo.path}
                      className="place-self-center"
                    />
                    {photo.name}
                  </div>
                );
              })}
            </Carousel>
          </GradientSpot>
        </div>
        <div className="flex order-1 sm:order-2 flex-col items-center sm:items-start">
          <h2> CeSIUM </h2>
          <div className="w-full text-justify sm:w-xl py-5">
            <p className="mb-2">
              I'm part of {""}
              <a
                href="https://cesium.di.uminho.pt/en"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold hover:text-highlight"
              >
                CeSIUM
              </a>
              , the software engineering student associassion at the University
              of Minho.
            </p>
            <p className="mb-2">
              I've started my journey as a collaborator at both CAOS (Department
              of Open Source and Tech) and DMC (Department of Marketing and
              Communication), being now a co-director of DREM (Department of
              External Relations and Partnerships). Besides my current position,
              I've also been part of the organization of many CeSIUM events such
              as Program Team in {""}
              <a
                href="https://2024.seium.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold hover:text-highlight"
              >
                SEI 24'
              </a>
              , {""}
              Sponsors Team in {""}
              <a
                href="https://2025.seium.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold hover:text-highlight"
              >
                SEI 25'
              </a>{" "}
              and Staff at {""}
              <a
                href="https://bugsbyte.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold hover:text-highlight"
              >
                Hackathon Bugsbyte 25'
              </a>
              .
            </p>
            <p>
              I'm also a mentor at {""}
              <a
                href="https://coderdojobraga.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold hover:text-highlight"
              >
                CoderDojo Braga
              </a>
              ,{""} where once a month we teach programming to childreen.
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex px-3 flex-col gap-y-5 sm:gap-y-0 items-center sm:flex-row sm:justify-evenly">
          <div className="flex flex-col items-center sm:items-start">
            <h2> Theater </h2>
            <div className="text-justify sm:w-xl py-5">
              <p className="mb-2">
                I started acting when I was 12 years old, and joined my school
                theather club.
              </p>
              <p className="mb-2">
                As my interst grew I later joined{" "}
                <a
                  href="https://www.quintopalco.pt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold hover:text-highlight"
                >
                  Quinto Palco
                </a>{" "}
                a local theather assotiation, where I'm currently the audit
                committee Secretary. There I had the pleasure of participating
                in many cultural plays and in{" "}
                <a
                  href="https://www.tndm.pt/pt/odisseia-nacional/pecas/festival-panos/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold hover:text-highlight"
                >
                  PANOS
                </a>
                , a national contest organized by the National Theather D. Maria
                II where the participants have to choose between 3 original
                contemporary plays.
              </p>
              Nowadays I rarely act, but I still have a deep feeling for
              theather and enjoy watching it.
              <p></p>
            </div>
          </div>
          <GradientSpot
            scale="scale-150"
            height="h-50"
            width="w-60 sm:w-160"
            gradient={2}
            tilt="-rotate-15"
          >
            <div className="grid items-start mx-auto justify-center m-0 p-0 w-full">
              <Carousel
                autoPlay
                interval={3000}
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                showIndicators={false}
                showArrows={true}
                className="hidden sm:block sm:w-xl sm:rounded-3xl sm:border-1 sm:border-white sm:overflow-hidden "
              >
                {theater_photos.map((photo) => {
                  return (
                    <div
                      key={photo.path}
                      className="relative aspect-video w-full "
                    >
                      <Image
                        fill
                        alt={photo.name}
                        src={photo.path}
                        className="place-self-center"
                      />
                      {photo.name}
                    </div>
                  );
                })}
              </Carousel>
            </div>
          </GradientSpot>
        </div>
      </div>
    </div>
  );
};

export default Scrolable_Highlight;
