import GradientSpot from "@/components/gradient_spot";
import ProfilePicture from "@/components/profile_picture";
import Scrolable_Highlight from "@/components/scrolable_higlight";
import Footer from "@/components/footer";
import Stack from "@/components/stack";

export default function Home() {
  return (
    <div>
      <main className="px-4 text-white">
        <div className="sm:grid sm:justify-evenly sm:grid-cols-2 mx-auto mt-20">
          <div className="grid sm:w-lg place-self-center">
            <GradientSpot
              scale="sm:scale-150"
              height="h-60"
              width="w-60 sm:w-140"
              gradient={2}
              tilt="rotate-15"
            >
              <h1 className="mb-6 relative">
                Hello There,<br></br> I'm Salomé Faria
              </h1>
            </GradientSpot>
            <div className="font-family:var(--font-nunito-sans)">
              <p>
                Welcome to my personal website! <br></br>
                Here, you can learn a few things about me and explore some of my
                college notes.
              </p>
              <p className="mt-2">
                I'm a second-year Software Engineering student at the University
                of Minho, Braga. I enjoy learning new skills and challenging
                myself.
              </p>
              <p className="mt-2">
                Growing up I explored a few hobbies, from basketball to hip-hop,
                but the one that stuck with me the longest was theater. I've
                performed in many amateur plays and community events.
              </p>
            </div>
            <a
              href="https://github.com/faria-s"
              className="rounded-sm flex items-center justify-center gap-x-2 w-35 mt-5 py-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="30" height="30" fill="white" viewBox="0 0 24 24">
                <path d="M12 1C5.9225 1 1 5.9225 1 12C1 16.8675 4.14875 20.9787 8.52125 22.4362C9.07125 22.5325 9.2775 22.2025 9.2775 21.9137C9.2775 21.6525 9.26375 20.7862 9.26375 19.865C6.5 20.3737 5.785 19.1912 5.565 18.5725C5.44125 18.2562 4.905 17.28 4.4375 17.0187C4.0525 16.8125 3.5025 16.3037 4.42375 16.29C5.29 16.2762 5.90875 17.0875 6.115 17.4175C7.105 19.0812 8.68625 18.6137 9.31875 18.325C9.415 17.61 9.70375 17.1287 10.02 16.8537C7.5725 16.5787 5.015 15.63 5.015 11.4225C5.015 10.2262 5.44125 9.23625 6.1425 8.46625C6.0325 8.19125 5.6475 7.06375 6.2525 5.55125C6.2525 5.55125 7.17375 5.2625 9.2775 6.67875C10.1575 6.43125 11.0925 6.3075 12.0275 6.3075C12.9625 6.3075 13.8975 6.43125 14.7775 6.67875C16.8813 5.24875 17.8025 5.55125 17.8025 5.55125C18.4075 7.06375 18.0225 8.19125 17.9125 8.46625C18.6138 9.23625 19.04 10.2125 19.04 11.4225C19.04 15.6437 16.4688 16.5787 14.0213 16.8537C14.42 17.1975 14.7638 17.8575 14.7638 18.8887C14.7638 20.36 14.75 21.5425 14.75 21.9137C14.75 22.2025 14.9563 22.5462 15.5063 22.4362C19.8513 20.9787 23 16.8537 23 12C23 5.9225 18.0775 1 12 1Z" />
              </svg>
              <div>faria-s</div>
            </a>
          </div>
          <div className="py-20 sm:py-0 sm:w-lg sm:place-self-center">
            <GradientSpot
              scale="scale-150"
              inset="left-10 sm:left-15 sm:top-30"
              height="h-50"
              width="w-40 sm:w-120"
              gradient={1}
              tilt="-rotate-15"
            >
              <ProfilePicture />
            </GradientSpot>
          </div>
        </div>
        <div className="sm:py-20">
          <Stack />
        </div>
        <div className="w-full">
          <h1 className="text-center py-10 sm:py-20"> About Me</h1>
          <Scrolable_Highlight />
        </div>
      </main>
      <Footer />
    </div>
  );
}
