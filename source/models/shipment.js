import mongoose, { Schema } from 'mongoose';
import Packet from './packet';


const schema = new Schema({
  businessId: { type: Schema.Types.ObjectId, ref: 'Business' },
  deviceId: { type: Number, ref: 'Devices' },
  createdAt: { type: Date, required: true, default: Date.now },
  packets: [{ type: Schema.Types.ObjectId, ref: 'Packet' }],
});


async function remove(error, shipment) {
  try {
    await Promise.all(shipment.packets.map(id => Packet.findByIdRemove(id)));
  } catch (error) {
    throw error;
  }
}


schema.pre('remove', remove);


export default mongoose.model('Shipment', schema);
