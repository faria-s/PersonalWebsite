import Navbar from "@/components/navbar";
import "./globals.css";
import { Nunito_Sans, Roboto_Mono } from "next/font/google";

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  variable: "--font-roboto-mono",
});

const nunito_sans = Nunito_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  variable: "--font-nunito-sans",
});

export const metadata = {
  title: "Salomé Faria",
  description: "salomefaria.pt",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${roboto_mono.variable} ${nunito_sans.variable}`}
    >
      <body>
        <div className="overflow-hidden">
          <Navbar />
          <div className="min-h-screen w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
