import About from "./components/About";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <main className="min-h-[100dvh] text-white w-full flex flex-col  bg-[#1c1c1c]">
      <Hero />
      <About />
    </main>
  );
}
