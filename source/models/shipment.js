import mongoose, { Schema } from 'mongoose';
import Packet from './packet';


const schema = new Schema({
  businessId: { type: Schema.Types.ObjectId, ref: 'Business' },
  deviceId: { type: Number, ref: 'Device' },
  createdAt: { type: Date, required: true, default: Date.now },
  packets: [{ type: Schema.Types.ObjectId, ref: 'Packet' }],
});


/**
 * cascade deletion
 */
async function remove(next) {
  const packets = Promise.all(
    this.packets
        .toObject()
        .map(
          id => Packet.findByIdAndRemove(id)
                      .then(p => p.remove())
        )
  )

  try {
    await packets;
    return next();
  } catch (err) {
    throw err;
  }
}


schema.pre('remove', remove);


export default mongoose.model('Shipment', schema);
