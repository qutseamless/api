import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  businessId: { type: Schema.Types.ObjectId, ref: 'Business' },
  createdAt: { type: Date, required: true, default: Date.now },
  packets: [{ type: Schema.Types.ObjectId, ref: 'Packet' }],
});

export const Shipment = mongoose.model('Shipment', schema);

export default Shipment;
