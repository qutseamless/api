import mongoose, { Schema } from 'mongoose';

/**
 * the account model schema
 */
const schema = new Schema({
  name: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  employees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  shipments: [{ type: Schema.Types.ObjectId, ref: 'Shipment' }],
  industry: { type: String, required: false },
});


/**
 * the account model
 */
export const Business = mongoose.model('Business', schema);
