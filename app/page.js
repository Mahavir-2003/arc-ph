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

const images = [
  {
    id: 1,
    number: "001",
    url: "https://ucarecdn.com/8faf3259-8b03-4123-ba97-781b9656a644/DaytoDusk284Rivised.jpg",
    info: "Photography",
  },
  {
    id: 2,
    number: "002",
    url: "https://ucarecdn.com/d529e25d-16d7-49e9-a195-ff81a71b15f0/Livingroom.jpg",
    info: "Photography",
  },
  {
    id: 3,
    number: "003",
    url: "https://ucarecdn.com/28e8664e-e31a-4945-99b8-f1f796980061/bedroom.jpg",
    info: "Photography",
  },
  {
    id: 4,
    number: "004",
    url: "https://ucarecdn.com/f2f7aa3a-f318-4aaf-b533-736920adb4c5/Floorplansample.png",
    info: "Floor Plan",
  },
];

const sections = [
  {
    title: "Photography",
    description:
      "Capture the essence of your property with our professional photography services. From real estate to interior design, our expert photographers highlight your property's best features, ensuring it stands out. Let stunning images tell your story and make a lasting impression.",
  },
  {
    title: "Floor Plan 2D B/W",
    description:
      "Discover clarity in simplicity with our 2D black and white floor plans. These plans offer a clear overview of your property's structure, providing essential insights for renovations, marketing, or property management.",
  },
  {
    title: "Floor Plan 2D Color",
    description:
      "Visualize your space with precision and vibrancy through our 2D color floor plans. Each plan is meticulously crafted to showcase your property's layout, offering clarity and detail that empower your decision-making process.",
  },
  {
    title: "Floor Plan 3D",
    description:
      "Step into immersive visualization with our 3D floor plans, where spaces come to life in stunning detail. Experience your property from every angle, whether you're planning renovations, presenting designs, or captivating audiences with dynamic visuals.",
  },
];

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
    const tl = gsap.timeline({});

    tl.set(".main-text", { opacity: 0, y: -100 })
      .set(".image-grid", {
        opacity: 0,
        y: 100,
      })
      .set(".proj-images", {
        scale: 1.1,
      })
      .to(".main-text", { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" })
      .to(
        ".image-grid",
        { y: 0, opacity: 1, duration: 1.2, ease: "circ.out" },
        "-=0.5"
      )
      .to(
        ".proj-images",
        { scale: 1, duration: 1.2, ease: "circ.out" },
        "-=0.5"
      );

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl1 = gsap.timeline({});

    tl1.fromTo(
      ".services",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".services",
          start: "top bottom",
          end: "bottom center",
          scrub: 1,
        },
      }
    );
  }, []);

  // stagger animation via scroll trigger
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl2 = gsap.timeline({});

    tl2.fromTo(
      ".service-list",
      { y: 100, opacity: 0 },
      {
        y: 0,
        stagger: 0.7,
        opacity: 1,
        duration: 2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".service-list",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".image-container").forEach(function (container) {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          scrub: 0.5,
          pin: false,
        },
      });
      tl.from(container, {
        yPercent: -20, // reduce yPercent values
        ease: "power1.inOut",
      }).to(container, {
        yPercent: 20, // reduce yPercent values
        ease: "power1.inOut",
      });
    });
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
        <div className="flex h-1/2 p-5 main-text">
          <h1 className="text-3xl md:text-5xl lg:text-[6.45rem] font-semibold text-white pt-24 pb-16 tracking-wide scale-y-105">
            Photography & Planning — Adelaide
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 image-grid">
          {images.map((image) => (
            <div
              key={image.id}
              className="w-full h-[30vh] md:h-[50vh] relative overflow-hidden group"
            >
              <Image
                className="object-cover group-hover:scale-105 transition-all duration-500 ease-in-out proj-images"
                src={image.url}
                alt={image.info}
                layout="fill"
                objectFit="cover"
              />
              <div
                className="absolute -bottom-10 left-5 text-3xl font-light group-hover:bottom-5 transition-all ease-in-out duration-300"
                style={{
                  mixBlendMode: "revert",
                  textShadow: "0px 0px 1px #000",
                }}
              >
                {image.number}
              </div>
              <div
                className="absolute -bottom-10 right-5 text-3xl font-light group-hover:bottom-5 transition-all ease-in-out duration-300"
                style={{
                  mixBlendMode: "revert",
                  textShadow: "0px 0px 1px #000",
                }}
              >
                {image.info}
              </div>
            </div>
          ))}
        </div>
        <div className="text-white text-xl font-medium p-5 right-0 text-right">
          ...
        </div>
        <div className="p-5 flex flex-col lg:flex-row md:flex-row justify-between">
          <div className="w-[55%] services">
            <h1 className="text-4xl md:text-4xl lg:text-8xl font-bold text-white">
              Services &#8211;
            </h1>
          </div>
          {/* spacer */}
          <div className="h-10"></div>
          <div className="w-full lg:w-[60%]">
            {sections.map((section, index) => (
              <div key={index} className="">
                <div className="flex flex-col w-full service-list">
                  <h2 className="lg:text-4xl text-2xl font-semibold text-white">
                    {section.title}
                  </h2>
                  <div className="h-5"></div>
                  <p className="text-white text-wrap text-sm lg:text-xl font-light">
                    {section.description}
                  </p>
                </div>
                <div className="h-[1px] bg-white w-full mt-10"></div>
                <div className="h-10"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative h-[80vh] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              className="object-cover image-container h-[100vh]"
              src="https://images.unsplash.com/photo-1511300636408-a63a89df3482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Parallax Image"
              layout="fill"
              objectFit="cover"
              quality={100}
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
              <p className="text-white group">Email</p>
            </Link>
          </div>
        </footer>
        {/* spacer */}
        <div className="h-10"></div>
      </main>
    </>
  );
}
