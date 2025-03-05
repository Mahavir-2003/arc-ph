import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { handleError } from "@/lib/errorHandler";
import CarouselImage from "@/models/CarouselImage";

export async function PUT(request) {
  try {
    await dbConnect();
    const { images } = await request.json();

    // Update each image's order
    const updatePromises = images.map((image) =>
      CarouselImage.findByIdAndUpdate(image._id, { order: image.order })
    );

    await Promise.all(updatePromises);

    return NextResponse.json({ message: "Images reordered successfully" });
  } catch (error) {
    return handleError(error);
  }
} 