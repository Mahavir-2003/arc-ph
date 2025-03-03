import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const Crousel = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/carousel');
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Failed to fetch carousel images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({});

    tl.set(".main-text", { opacity: 0, y: -100 })
      .set(".image-grid", { opacity: 0, y: 100 })
      .set(".proj-images", { scale: 1.1, delay: 0.5 })
      .to(".main-text", { y: 0, opacity: 1, duration: 1.2, ease: "power2.out" })
      .to(
        ".image-grid",
        { y: 0, opacity: 1, duration: 1.2, ease: "power2.out" },
        "-=0.5"
      )
      .to(".proj-images", { scale: 1, duration: 1, ease: "bounce.in" });

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

  if (loading) {
    return <div className="flex justify-center items-center min-h-[50vh]">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 image-grid">
      {images.map((image) => (
        <div
          key={image._id}
          className="w-full h-[30vh] md:h-[50vh] relative overflow-hidden group"
        >
          <Link
            href={image.url}
            target="_blank"
            rel="noopener noreferrer"
            title="View in full screen"
          >
            <div className="relative w-full h-full">
              <Image
                src={image.url}
                alt={image.info}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm">{image.number}</p>
                  <p className="text-lg font-semibold">{image.info}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Crousel;
