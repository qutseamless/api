import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  shipmentId: { type: Schema.Types.ObjectId, required: true },
  createdAt: { type: String, required: true },
  location: {
    lat: { type: Number, required: false },
    long: { type: Number, required: false },
  },
});


export default mongoose.model('Packet', schema);
