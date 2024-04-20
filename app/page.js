import About from "./components/About";
import Hero from "./components/Hero";
import Projects from "./components/Projects";

export default function Home() {
  return (
    <main className="min-h-[100dvh] text-black w-full flex flex-col  bg-[#1c1c1c]">
      <Hero />
      <About />
      <Projects />
    </main>
  );
}
