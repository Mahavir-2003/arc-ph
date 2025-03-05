"use client";

import { useState, useEffect } from "react";
import { Card, CardBody } from "@heroui/react";
import { Spinner } from "@heroui/react";
import CarouselManager from "../components/CarouselManager";
import CarouselForm from "../components/CarouselForm";
import { useToast } from "../hooks/useToast";

export default function CarouselPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const showToast = useToast();

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/carousel");
      if (!response.ok) throw new Error("Failed to fetch images");
      const data = await response.json();
      const sortedData = (Array.isArray(data) ? data : []).sort(
        (a, b) => a.order - b.order
      );
      setImages(sortedData);
    } catch (error) {
      console.error("Failed to fetch carousel images:", error);
      showToast("Failed to fetch images", "error");
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <Card>
            <CardBody>
              <CarouselForm onImageAdded={fetchImages} />
            </CardBody>
          </Card>
        </div>
        <div className="space-y-8">
          <Card>
            <CardBody>
              <CarouselManager
                images={images}
                onImagesUpdated={fetchImages}
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
} 