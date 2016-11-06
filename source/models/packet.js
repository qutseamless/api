import mongoose, { Schema } from 'mongoose';


const schema = new Schema({
  id: { type: String, required: true, index: true },
  createdAt: { type: String, required: false },
  humidity: { type: String, required: false },
  course: { type: String, required: false },
  speed: { type: String, required: false },
  temp: { type: String, required: false },
  alt: { type: String, required: false },
  lat: { type: Number, required: false },
  lng: { type: Number, required: false },
});


export default mongoose.model('Packet', schema);
