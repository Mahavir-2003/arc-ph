import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import CarouselImage from '@/models/CarouselImage';

export async function GET() {
  try {
    await connectToDatabase();
    const images = await CarouselImage.find().sort({ order: 1 });
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const data = await request.json();
    const image = await CarouselImage.create(data);
    return NextResponse.json(image);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connectToDatabase();
    const data = await request.json();
    const { _id, ...updateData } = data;
    const image = await CarouselImage.findByIdAndUpdate(_id, updateData, { new: true });
    return NextResponse.json(image);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await CarouselImage.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Image deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 