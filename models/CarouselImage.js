import mongoose from 'mongoose';

const carouselImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.CarouselImage || mongoose.model('CarouselImage', carouselImageSchema); 