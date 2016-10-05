import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  shipmentId: { type: Schema.Types.ObjectId, required: true },
  timestamp: { type: String, required: true },
});

export const Packet = mongoose.model('Packet', schema);

export default Packet;
