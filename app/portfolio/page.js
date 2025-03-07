"use client";
import gsap from "gsap";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lenis from "lenis";
import Navbar from "../components/Navbar-port";
import Footer from "../components/Footer";
import dynamic from 'next/dynamic';
import LoadingSpinner from '../components/LoadingSpinner';
import { Spinner } from "@heroui/react";

const Crousel = dynamic(() => import('../components/Crousel'), {
  loading: () => <LoadingSpinner />,
  ssr: false
});

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [showMoreText, setShowMoreText] = useState(false);

  useEffect(() => {
    fetchProjects();

    const lenis = new Lenis();

    lenis.on("scroll", (e) => {
      console.log(e);
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (imagesLoaded === projects.length && projects.length > 0) {
      setShowMoreText(true);
      // Trigger the info animation after images are loaded
      const tl = gsap.timeline({});
      tl.to(".info", { y: 0, opacity: 1, duration: 1.2, ease: "circ.out" });
    }
  }, [imagesLoaded, projects.length]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/projects");
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        console.error("Failed to fetch projects");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

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
        yPercent: -20,
        ease: "power1.inOut",
      }).to(container, {
        yPercent: 20,
        ease: "power1.inOut",
      });
    });
  }, []);

  const handleImageLoad = () => {
    setImagesLoaded(prev => prev + 1);
  };

  return (
    <>
      <main className="inter bg-[#efebe0] min-h-screen">
        <Navbar />
        <div className="flex h-1/2 p-5 main-text">
          <h1 className="text-3xl md:text-5xl lg:text-[6.45rem] font-semibold text-black pt-10 md:pt-24 pb-16 tracking-wide scale-y-105">
            Portfolio - Projects
          </h1>
        </div>
        {loading ? (
          <div className="min-h-[50vh] flex items-center justify-center">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 image-grid">
            {projects.map((project, index) => (
              <div
                key={project._id}
                className={`relative overflow-hidden group ${
                  project.fullWidth || (index === projects.length - 1 && projects.length % 2 !== 0)
                    ? "md:col-span-2 h-[48vh] md:h-[64vh]"
                    : "h-[30vh] md:h-[50vh]"
                }`}
              >
                <Link
                  href={project.collectionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View in full screen"
                >
                  <div className="relative w-full h-full">
                    <Image
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      src={project.coverImage}
                      alt={project.projectName}
                      layout="fill"
                      style={{ objectFit: 'cover' }}
                      onLoadingComplete={handleImageLoad}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500">
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <p className="text-xl font-medium text-white bg-black/50 px-6 py-3 rounded-full">Click to view collection</p>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <p className="text-lg font-medium text-white bg-black/50 px-4 py-2 rounded-full">{project.order || "New"}</p>
                        <p className="text-lg font-medium text-white bg-black/50 px-4 py-2 rounded-full">{project.projectName}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
        {showMoreText && (
          <div className="text-black text-xl font-medium p-5 right-0 text-right info opacity-0">
            More works coming soon ...
          </div>
        )}
        <Footer />
      </main>
    </>
  );
};

export default Portfolio;
