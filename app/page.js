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

const images = [
  {
    id: 1,
    number: "001",
    url: "https://images.unsplash.com/photo-1511300636408-a63a89df3482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    info: "Photography",
  },
  {
    id: 2,
    number: "002",
    url: "https://images.unsplash.com/photo-1511300636408-a63a89df3482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    info: "Photography",
  },
  {
    id: 3,
    number: "003",
    url: "https://images.unsplash.com/photo-1511300636408-a63a89df3482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    info: "Photography",
  },
  {
    id: 4,
    number: "004",
    url: "https://images.unsplash.com/photo-1511300636408-a63a89df3482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    info: "Photography",
  },
];

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", (e) => {
      console.log(e);
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <>
      <main className="inter bg-[#171717] min-h-screen">
        <nav className="flex justify-between p-5">
          <h1 className="text-lg font-semibold text-white">ARCHI</h1>
          <Link href="/form" className="text-white">
            <p className="group font-regular transition duration-300">
              Schedule a Call
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[1px] bg-white"></span>
            </p>
          </Link>
        </nav>
        <div className="flex h-1/2 p-5">
          <h1 className="text-3xl md:text-5xl lg:text-8xl font-semibold text-white pt-24 pb-16 tracking-wide scale-y-105">
            Photography & Planning — Adelaide
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {images.map((image) => (
            <div
              key={image.id}
              className="w-full h-[30vh] md:h-[50vh] relative overflow-hidden group"
            >
              <Image
                className="object-cover group-hover:scale-105 transition-all duration-500 ease-in-out"
                src={image.url}
                alt={image.info}
                layout="fill"
                objectFit="cover"
              />
              {/* show number & info*/}
              <div className="absolute -bottom-10 left-5 text-white text-3xl font-light group-hover:bottom-5 transition-all ease-in-out duration-300">
                {image.number}
              </div>
              <div className="absolute -bottom-10 right-5 text-white text-3xl font-light group-hover:bottom-5 transition-all ease-in-out duration-300">
                {image.info}
              </div>
            </div>
          ))}
        </div>
        <div className="text-white text-xl font-medium p-5 right-0 text-right">
          ...
        </div>
        <div className="p-5 flex flex-col lg:flex-row md:flex-row justify-between">
          <div className="w-[55%]">
            <h1 className="text-4xl md:text-4xl lg:text-8xl font-bold text-white">
              Services &#8211;
            </h1>
          </div>
          {/* spacer */}
          <div className="h-10"></div>
          <div className="w-full lg:w-[60%]">
            <div className="flex flex-col w-full">
              <h2 className="lg:text-4xl text-2xl font-semibold text-white">
                Photography
              </h2>
              <div className="h-5"></div>
              <p className="text-white text-wrap text-sm lg:text-xl font-light">
                Capture the essence of your property with our professional
                photography services. From real estate to interior design, our
                expert photographers highlight your property's best features,
                ensuring it stands out. Let stunning images tell your story and
                make a lasting impression.
              </p>
            </div>
            <div className="h-[1px] bg-white w-full mt-10"></div>
            <div className="h-10"></div>
            <div className="flex flex-col w-full">
              <h2 className="lg:text-4xl text-2xl font-semibold text-white">
                Floor Plan 2D B/W
              </h2>
              <div className="h-5"></div>
              <p className="text-white text-wrap text-sm lg:text-xl font-light">
                Discover clarity in simplicity with our 2D black and white floor
                plans. These plans offer a clear overview of your property's
                structure, providing essential insights for renovations,
                marketing, or property management.
              </p>
            </div>
            <div className="h-[1px] bg-white w-full mt-10"></div>
            <div className="h-10"></div>
            <div className="flex flex-col w-full">
              <h2 className="lg:text-4xl text-2xl font-semibold text-white">
                Floor Plan 2D Color
              </h2>
              <div className="h-5"></div>
              <p className="text-white text-wrap text-sm lg:text-xl font-light">
                Visualize your space with precision and vibrancy through our 2D
                color floor plans. Each plan is meticulously crafted to showcase
                your property's layout, offering clarity and detail that empower
                your decision-making process.
              </p>
            </div>
            <div className="h-[1px] bg-white w-full mt-10"></div>
            <div className="h-10"></div>
            <div className="flex flex-col w-full">
              <h2 className="lg:text-4xl text-2xl font-semibold text-white">
                Floor Plan 3D
              </h2>
              <div className="h-5"></div>
              <p className="text-white text-wrap text-sm lg:text-xl font-light">
                Step into immersive visualization with our 3D floor plans, where
                spaces come to life in stunning detail. Experience your property
                from every angle, whether you're planning renovations,
                presenting designs, or captivating audiences with dynamic
                visuals.
              </p>
            </div>
            <div className="h-[1px] bg-white w-full mt-10"></div>
            <div className="h-10"></div>
          </div>
        </div>
        <div className="relative h-[70vh] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              className="object-cover"
              src="https://images.unsplash.com/photo-1511300636408-a63a89df3482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Parallax Image"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        {/* company profile */}
        <div className="p-5 flex flex-col lg:flex-row justify-between py-20">
          <div>
            <h1 className="lg:text-3xl text-2xl font-bold text-white">ARCHI</h1>
          </div>
          {/* spacer */}
          <div className="h-3"></div>
          <div>
            <div className="flex flex-col w-full">
              <p className="text-white lg:text-2xl text-md font-normal w-full">
                Visualize. Captivate. Elevate. Your property, our expertise.
              </p>
            </div>
          </div>
        </div>
        {/* company profile ended */}
        {/* footer */}
        <footer className="p-5 text-white text-md font-light flex justify-between">
          <div>
            <p>&#169; ARCHI &#8211; 2024</p>
            <p>Photography & Planning &#8211; Adelaide</p>
          </div>
          <div className="flex flex-col text-right text-md">
            <Link href="tel:0404098419">
              <p className="text-white">Contact</p>
            </Link>
            <Link href="mailto:sales@archiphotography.com">
              <p className="text-white">Email</p>
            </Link>
          </div>
        </footer>
      </main>
    </>
  );
}
