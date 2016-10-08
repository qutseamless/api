import mongoose, { Schema } from 'mongoose';
import Shipment from './shipment';
import User from './user';
/**
 * the account model schema
 */
const schema = new Schema({
  name: { type: String, required: true, unique: true },
  owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  employees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  shipments: [{ type: Schema.Types.ObjectId, ref: 'Shipment' }],
  address: { type: String, required: true },
  industry: { type: String, required: false },
});


async function remove(error, business) {
  try {
    await Promise.all(
      Promise.all(business.shipments.map(id => Shipment.findByIdAndRemove(id))),
      Promise.all(business.employees.map(id => User.findByIdRemove(id))),
    );
  } catch (error) {
    throw error;
  }
}


schema.pre('remove', remove);


export default mongoose.model('Business', schema);
