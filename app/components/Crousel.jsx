import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const Crousel = () => {
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
      url: "https://ucarecdn.com/872dd2c6-a9ef-4dad-85e9-e45d307fa9f6/Kitchen.jpg",
      info: "Photography",
    },
    {
      id: 5,
      number: "005",
      url: "https://ucarecdn.com/72178346-b781-412d-bf5f-ac24c5aa9fa5/Dinning.jpg",
      info: "Photography",
    },
    {
      id: 6,
      number: "006",
      url: "https://res.cloudinary.com/dblp9jhyj/image/upload/v1728724911/21_1_rjgp6p.jpg",
      info: "Photography",
    },
    {
      id: 7,
      number: "007",
      url: "https://res.cloudinary.com/dblp9jhyj/image/upload/v1728724721/Floor_plan_lot_741-742-743_Rudra_pwm67r.jpg",
      info: "Floor Plan B/W",
    },
    {
      id: 8,
      number: "008",
      url: "https://res.cloudinary.com/dblp9jhyj/image/upload/v1728724721/Tapioca_Drive_R1_e6obun.jpg",
      info: "Floor Plan Color",
    },
  ];

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
        yPercent: -20, // reduce yPercent values
        ease: "power1.inOut",
      }).to(container, {
        yPercent: 20, // reduce yPercent values
        ease: "power1.inOut",
      });
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 image-grid">
      {images.map((image) => (
        <div
          key={image.id}
          className="w-full h-[30vh] md:h-[50vh] relative overflow-hidden group"
        >
          <Link
            href={image.url}
            target="_blank"
            rel="noopener noreferrer"
            title="View in full screen"
          >
            <Image
              className="object-cover group-hover:scale-105 transition-all duration-500 ease-in-out proj-images"
              src={image.url}
              alt={image.info}
              layout="fill"
              style={{ objectFit: "cover" }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-2xl">View Full Image</p>
            </div>
          </Link>
          <div className="absolute -bottom-10 right-5 text-3xl text-white font-light group-hover:bottom-5 transition-all ease-in-out duration-300">
            {image.info}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Crousel;
