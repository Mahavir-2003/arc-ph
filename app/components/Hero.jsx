"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const ProjectTitles = [
  "Creative focused design led Environment",
  "Commercial design led Creativity",
  "Creative Freedom led Environment",
  "Commercial development & design led Environment",
];

const Hero = () => {
  const ANIMATION_DURATION = 6; // duration of the fade in/out animations
  const FADE_IN_OUT_DURATION = 0.5; // duration of the fade in/out animations
  const EASING = "expoScale(0.5,7,none)"; // easing function for the animations

  const [counter, setCounter] = useState(0);

  const animateImages = () => {
    const totalImages = 4; // Assuming there are 4 images

    const tl = gsap.timeline();
    tl.to(`#image-${counter}`, {
      duration: FADE_IN_OUT_DURATION,
      opacity: 1,
      ease: EASING,
    })
      .to(
        "#project-title,#project-button",
        {
          duration: FADE_IN_OUT_DURATION,
          opacity: 1,
          y: 0,
          ease: EASING,
        },
        `-=${FADE_IN_OUT_DURATION}`
      )
      .to(`#image-${counter}`, {
        duration: ANIMATION_DURATION,
        opacity: 1,
        scale: 1.1,
        ease: EASING,
      })
      .to(`#image-${counter}`, {
        duration: FADE_IN_OUT_DURATION,
        opacity: 0,
        ease: EASING,
      })
      .set(`#image-${counter}`, {
        scale: 1,
      })
      .to(
        `#progress-${counter}`,
        {
          x: 0,
          duration: ANIMATION_DURATION + FADE_IN_OUT_DURATION,
          ease: EASING,
        },
        `-=${ANIMATION_DURATION + FADE_IN_OUT_DURATION * 2}`
      )
      .to(
        `#progress-${counter}`,
        {
          x: "-100%",
          duration: FADE_IN_OUT_DURATION,
          ease: EASING,
          onComplete: () => {
            setCounter((counter + 1) % totalImages);
          },
        },
        `-=${FADE_IN_OUT_DURATION}`
      )
      .to(
        "#project-title,#project-button",
        {
          duration: FADE_IN_OUT_DURATION,
          opacity: 0,
          ease: EASING,
        },
        `-=${FADE_IN_OUT_DURATION}`
      ).set("#project-title", {
        y: 20,
        duration: 0,
      });
  };

  useEffect(() => {
    animateImages();
  }, [counter]);

  return (
    <div className="nunitosans w-full h-[100dvh] relative text-white ">
      <div className=" w-full h-full flex flex-col px-10  relative">
        <div className="absolute top-0 left-0 w-full h-full bg-black z-0 hero-images overflow-hidden flex justify-center items-center">
          <Image
            id="image-0"
            src="/images/image1.png"
            className="opacity-0"
            layout="fill"
            objectFit="cover"
          />
          <Image
            id="image-1"
            src="/images/image2.png"
            className="opacity-0"
            layout="fill"
            objectFit="cover"
          />
          <Image
            id="image-2"
            src="/images/image3.png"
            className="opacity-0"
            layout="fill"
            objectFit="cover"
          />
          <Image
            id="image-3"
            src="/images/image4.png"
            className="opacity-0"
            layout="fill"
            objectFit="cover"
          />
          <div className="mask bg-black/70 w-full h-full z-[1]"></div>
        </div>
        <div className=" flex-1 flex justify-center items-center ">
          <div className="relative flex justify-center items-center w-full">
            <div className="flex-1">
              <h1
                id="project-title"
                className="text-2xl sm:text-5xl lg:text-7xl font-light tracking-wide leading-tight max-w-[100%] md:max-w-[45%] "
              >
                {ProjectTitles[counter]}
              </h1>
              <div className="spacer h-[50px]"></div>
              <button id="project-button" className=" bg-blue-200  rounded-full min-w-[300px] py-4">
                View Projects
              </button>
            </div>
            <div className=" hidden md:flex  flex-col justify-center items-center h-full  gap-y-4">
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </div>
          </div>
        </div>
        <div className=" w-full pb-10 flex justify-center items-center ">
          <div className=" w-full flex justify-between items-center gap-x-4 md:gap-x-12 text-xs md:text-lg progress-indicators">
            <div className=" flex-1 z-[2]">
              <h2 className={`tracking-wide mb-3 font-normal text-white ${counter == 0 ? "opacity-100" : "opacity-50"}`}>Our Company</h2>
              <div className="relative w-full overflow-hidden h-[1px] rounded-full">
                <div className=" bg-[#ffffff]/50 w-full h-full"></div>
                <div
                  id="progress-0"
                  className=" bg-[#fff] w-full h-full absolute top-0 left-0 -translate-x-[100%]"
                ></div>
              </div>
            </div>
            <div className=" flex-1 z-[2]">
              <h2 className={`tracking-wide mb-3 font-normal text-white ${counter == 1 ? "opacity-100" : "opacity-50"}`}>Our Company</h2>
              <div className="relative w-full overflow-hidden h-[1px] rounded-full">
                <div className=" bg-[#ffffff]/50 w-full h-full"></div>
                <div
                  id="progress-1"
                  className=" bg-[#fff] w-full h-full absolute top-0 left-0 -translate-x-[100%] progress"
                ></div>
              </div>
            </div>
            <div className=" flex-1 z-[2]">
              <h2 className={`tracking-wide mb-3 font-normal text-white ${counter == 2 ? "opacity-100" : "opacity-50"}`}>Our Company</h2>
              <div className="relative w-full overflow-hidden h-[1px] rounded-full">
                <div className=" bg-[#ffffff]/50 w-full h-full"></div>
                <div
                  id="progress-2"
                  className=" bg-[#fff] w-full h-full absolute top-0 left-0 -translate-x-[100%] progress"
                ></div>
              </div>
            </div>
            <div className=" flex-1 z-[2]">
              <h2 className={`tracking-wide mb-3 font-normal text-white ${counter == 3 ? "opacity-100" : "opacity-50"}`}>Our Company</h2>
              <div className="relative w-full overflow-hidden h-[1px] rounded-full">
                <div className=" bg-[#ffffff]/50 w-full h-full"></div>
                <div
                  id="progress-3"
                  className=" bg-[#fff] w-full h-full absolute top-0 left-0 -translate-x-[100%] progress"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
