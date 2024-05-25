import { Inter } from "next/font/google";
import { Newsreader } from "next/font/google";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--inter",
  weight: "variable",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--newsreader",
  weight: "variable",
});

const nunitosans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--nunitosans",
  weight: "variable",
});

export const metadata = {
  title: "Archi",
  description: "A modern floor planning, interior design & photography studio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${newsreader.variable} ${nunitosans.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
