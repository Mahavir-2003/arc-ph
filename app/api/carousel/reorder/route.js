import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { handleError } from "@/lib/errorHandler";
import Carousel from "@/models/Carousel";

export async function PUT(request) {
  try {
    await dbConnect();
    const { images } = await request.json();

    // Update each image's order in the database
    await Promise.all(
      images.map(async (image) => {
        await Carousel.findByIdAndUpdate(image._id, { order: image.order });
      })
    );

    return NextResponse.json({ message: "Order updated successfully" });
  } catch (error) {
    return handleError(error);
  }
} 