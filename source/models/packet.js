import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  id: { type: String, required: true, index: true },
  location: {
    lat: {type: Number, required: true},
    lng: {type: Number, required: true},
  },
  altitude: { type: Number, required: true },
  speed: { type: Number, required: true },
  course: { type: Number, required: true },
  date: { type: Number, required: true },
  time: { type: Number, required: true },
  humidity: { type: Number, required: true },
  temperature: { type: Number, required: true }
});

export default mongoose.model('Packet', schema);
