// import About from "./components/About";
// import Hero from "./components/Hero";
// import Highlights from "./components/Highlights";
// import Projects from "./components/Projects";

// export default function Home() {
//   return (
//     <main className="min-h-[100dvh] text-black w-full flex flex-col  bg-[#1c1c1c]">
//       <Hero />
//       <About />
//       <Projects />
//       <Highlights />
//     </main>
//   );
// }
"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Navbar from "./components/Navbar";
import Crousel from "./components/Crousel";
import Services from "./components/Services";
import Footer from "./components/Footer";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", (e) => {
      console.log(e);
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl3 = gsap.timeline({});

    tl3.fromTo(
      ".timings-list",
      { y: 200, opacity: 0 },
      {
        y: 0,
        stagger: 0.7,
        opacity: 1,
        duration: 2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".timings-list",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );
  }, []);

  const timings = [
    {
      title: "Monday - Friday",
      description: "8:00 AM - 5:00 PM",
    },
    {
      title: "Saturday - Sunday",
      description: "8:00 AM - 5:30 PM",
    },
  ];

  return (
    <>
      <main className="inter bg-[#efebe0] min-h-screen">
        <Navbar />
        <div className="flex h-1/2 p-5 main-text">
          <div className="flex flex-col text-left py-5 sm:py-8 md:py-10 lg:py-12 xl:py-16">
            <h1 className="text-3xl md:text-5xl lg:text-[6rem] font-semibold text-black tracking-wide scale-y-105 leading-tight">
              ARCHI &#8211;
            </h1>
            <h2 className="text-3xl md:text-5xl lg:text-[6rem] font-semibold text-black tracking-wide scale-y-105 leading-tight">
              Photography & Drafting
            </h2>
          </div>
        </div>
        <Crousel />
        <div
          className="text-black text-xl font-medium p-5 right-0 text-right"
          id="services"
        >
          ...
        </div>
        <Services />
        <div
          className="text-black text-xl font-medium p-5 right-0 text-right "
          id="timings"
        >
          ...
        </div>
        <div className="h-10"></div>
        {/* add a timings section */}
        <div className="p-5 flex flex-col lg:flex-row md:flex-row justify-between ">
          <div className="w-[55%] services">
            <h1 className="text-4xl md:text-4xl lg:text-8xl font-bold text-black">
              Timings &#8211;
            </h1>
          </div>
          {/* spacer */}
          <div className="h-10"></div>
          <div className="w-full lg:w-[60%]">
            {timings.map((timings, index) => (
              <div key={index} className="">
                <div className="flex flex-col w-full service-list">
                  <h2 className="lg:text-4xl text-2xl font-semibold text-black">
                    {timings.title}
                  </h2>
                  <div className="h-5"></div>
                  <p className="text-black text-wrap text-sm lg:text-xl font-light">
                    {timings.description}
                  </p>
                </div>
                <div className="h-[1px] bg-black w-full mt-10"></div>
                <div className="h-10"></div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
        {/* spacer */}
        <div className="h-10"></div>
      </main>
    </>
  );
}
