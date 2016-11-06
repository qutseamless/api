import mongoose, { Schema } from 'mongoose';


const schema = new Schema({
  id: { type: String, required: true, index: true },
  createdAt: { type: String, required: true },
  humidity: { type: String, required: true },
  course: { type: String, required: true },
  speed: { type: String, required: true },
  temp: { type: String, required: true },
  alt: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});


export default mongoose.model('Packet', schema);
