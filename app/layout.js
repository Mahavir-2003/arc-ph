import { Inter } from "next/font/google";
import { Newsreader } from "next/font/google";
import { Nunito_Sans } from "next/font/google";
import { Arimo } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";
import "./globals.css";
import Head from "next/head";

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

const arimo = Arimo({
  subsets: ["latin"],
  variable: "--arimo",
  weight: "variable",
});

export const metadata = {
  title: "Archi",
  description: "A modern floor planning, interior design & photography studio",
  openGraph: {
    title: "Archi",
    description:
      "A modern floor planning, interior design & photography studio",
    type: "website",
    url: "https://archiphotography.com",
    countryName: "Australia",
    locale: "en_AU",
    site_name: "Archi",
    determiner: "auto",
    emails: ["sales@archiphotography.com"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta
          property="og:description"
          content={metadata.openGraph.description}
        />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:site_name" content={metadata.openGraph.site_name} />
        <meta property="og:locale" content={metadata.openGraph.locale} />
        <meta
          property="og:determiner"
          content={metadata.openGraph.determiner}
        />
        <meta name="country-name" content={metadata.openGraph.countryName} />
        <meta name="email" content={metadata.openGraph.emails} />
      </Head>
      <body
        className={`${inter.variable} ${newsreader.variable} ${nunitosans.variable} ${arimo.variable}`}
      >
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
