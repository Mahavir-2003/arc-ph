import React from "react";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const Services = () => {
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

  return (
    <div className="p-5 flex flex-col lg:flex-row md:flex-row justify-between">
      <div className="w-[55%]">
        <h1 className="text-4xl md:text-4xl lg:text-8xl font-bold text-black">
          Services &#8211;
        </h1>
      </div>
      {/* spacer */}
      <div className="h-10"></div>
      <div className="w-full lg:w-[60%]">
        {sections.map((section, index) => (
          <div key={index} className="">
            <div className="flex flex-col w-full timings-list">
              <h2 className="lg:text-4xl text-2xl font-semibold text-black">
                {section.title}
              </h2>
              <div className="h-5"></div>
              <p className="text-black text-wrap text-sm lg:text-xl font-light">
                {section.description}
              </p>
            </div>
            <div className="h-[1px] bg-black w-full mt-10"></div>
            <div className="h-10"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
