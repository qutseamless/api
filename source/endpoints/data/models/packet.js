import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  id: { type: String, required: true, index: true },
  timestamp: { type: String, required: true },
});

export const Packet = mongoose.model('packets', schema)
export default Packet;
