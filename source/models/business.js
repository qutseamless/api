import mongoose, { Schema } from 'mongoose';
import Shipment from './shipment';
import User from './user';


/**
 * the account model schema
 */
const schema = new Schema({
  name: { type: String, required: true, unique: true },
  owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  shipments: [{ type: Schema.Types.ObjectId, ref: 'Shipment' }],
  employees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  industry: { type: String, required: false },
  address: { type: String, required: true },
});


/**
 * cascade deletion
 */
async function remove(next) {
  const shipments = Promise.all(
    this.shipments
        .toObject()
        .map(
          id => Shipment.findByIdAndRemove(id)
                        .then(s => s.remove(f => f))
        )
  );

  const users = Promise.all(
    this.employees
        .toObject()
        .map(
          id => User.findByIdAndRemove(id)
                    .then(u => u.remove(f => f))
        )
  );

  try {
    await Promise.all([shipments, users]);
    return next();
  } catch (err) {
    throw err;
  }
}


schema.pre('remove', remove);


export default mongoose.model('Business', schema);
