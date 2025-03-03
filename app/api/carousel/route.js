import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CarouselImage from '@/models/CarouselImage';

export async function GET() {
  try {
    await dbConnect();
    const images = await CarouselImage.find().sort({ order: 1 });
    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching carousel images:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    const image = await CarouselImage.create(data);
    return NextResponse.json(image);
  } catch (error) {
    console.error('Error creating carousel image:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const data = await request.json();
    const { _id, ...updateData } = data;
    const image = await CarouselImage.findByIdAndUpdate(_id, updateData, { new: true });
    if (!image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }
    return NextResponse.json(image);
  } catch (error) {
    console.error('Error updating carousel image:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const image = await CarouselImage.findByIdAndDelete(id);
    if (!image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting carousel image:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 