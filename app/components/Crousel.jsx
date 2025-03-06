import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

const Crousel = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/carousel');
        if (!response.ok) throw new Error('Failed to fetch images');
        const data = await response.json();
        setImages(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch carousel images:', error);
        setError('Failed to load images');
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (!loading && images.length > 0) {
      const tl = gsap.timeline({});

      tl.set(".image-grid", { opacity: 0 })
        .to(".image-grid", { opacity: 1, duration: 0.8, ease: "power2.out" });

      return () => {
        tl.kill();
      };
    }
  }, [loading, images]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-red-600">
        {error}
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-gray-600">
        No images available
      </div>
    );
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
                className="transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-xl font-medium text-white bg-black/50 px-6 py-3 rounded-full">Click to view full size</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-lg font-medium text-white bg-black/50 px-4 py-2 rounded-full">{image.number}</p>
                  <p className="text-lg font-medium text-white bg-black/50 px-4 py-2 rounded-full">{image.info}</p>
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
