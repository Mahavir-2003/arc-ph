"use client";
import gsap from "gsap";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Navbar from "../components/Navbar-port";
import Footer from "../components/Footer";

const projects = [
  {
    id: 1,
    title: "DXCv1",
    coverImage:
      "https://res.cloudinary.com/dblp9jhyj/image/upload/v1723620251/DSC00717_uq6u1z.jpg",
    collectionUrl:
      "https://collection.cloudinary.com/dblp9jhyj/28c05b42ceafd39ec865c3abece482b6",
  },
  {
    id: 2,
    title: "DXCv2",
    coverImage:
      "https://res.cloudinary.com/dblp9jhyj/image/upload/v1723622032/DSC00862_xkq05r.jpg",
    collectionUrl:
      "https://collection.cloudinary.com/dblp9jhyj/dc96ef8bc6c0cc65a5bd22419740d4be",
  },
];

const Portfolio = () => {
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
      .set(".info", {
        opacity: 0,
        y: 100,
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
      )
      .to(
        ".info",
        { y: 0, opacity: 1, duration: 1.2, ease: "circ.out" },
        "-=0.5"
      );

    return () => {
      tl.kill();
    };
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
    <div className="inter bg-[#efebe0] min-h-screen">
      <Navbar />
      <div className="flex h-1/2 p-5 main-text">
        <h1 className="text-3xl md:text-5xl lg:text-[6.45rem] font-semibold text-black pt-10 md:pt-24 pb-16 tracking-wide scale-y-105">
          Portfolio - Projects
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 image-grid">
        {projects.map((project) => (
          <div
            key={project.id}
            className="w-full h-[30vh] md:h-[50vh] relative overflow-hidden group"
          >
            <Link
              href={project.collectionUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="View in full screen"
            >
              <Image
                className="object-cover group-hover:scale-105 transition-all duration-500 ease-in-out proj-images"
                src={project.coverImage}
                alt={project.title}
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-2xl">Visit collection</p>
              </div>
            </Link>
            <div className="absolute -bottom-10 right-5 text-3xl text-white font-light group-hover:bottom-5 transition-all ease-in-out duration-300">
              {project.title}
            </div>
          </div>
        ))}
      </div>
      <div className="text-black text-xl font-medium p-5 right-0 text-right info">
        More works comming soon ...
      </div>
      {/* spacer */}
      <div className="h-10"></div>
      <Footer />
    </div>
  );
};

export default Portfolio;
