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

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="newsreader min-h-screen text-black w-full flex flex-col bg-[#1c1c1c]">
      <div className="w-full h-screen relative">
        <Image
          className="object-cover"
          src="https://images.unsplash.com/photo-1511300636408-a63a89df3482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="About us image"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center flex flex-col items-center space-y-4">
          <p className="text-white text-xs sm:text-sm md:text-lg lg:text-2xl xl:text-7xl font-medium">
            New Site is in Development
          </p>
          <Link
            href="/form"
            className="text-white text-2xl px-6 py-2 rounded-full border border-white transition duration-500 ease-in-out transform hover:bg-white hover:text-black shadow-lg hover:shadow-xl"
          >
            <p className="text-xs sm:text-base md:text-base lg:text-xl xl:text-4xl font-medium">
              Schedule a call
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
