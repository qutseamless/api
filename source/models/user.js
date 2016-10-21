import mongoose, { Schema } from 'mongoose';
import { hash, compare } from 'bcrypt';
import Business from './business';

/**
 * the account model schema
 */
const schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, index: true, unique: true },
  businessId: { type: Schema.Types.ObjectId, ref: 'Business' },
  password: { type: String, required: true, select: false },
  role: {
    owner: { type: Boolean, required: true, default: false },
    admin: { type: Boolean, required: true, default: false },
    partner: { type: Boolean, required: true, default: true },
  },
});


/**
 * authenticate before modify or reading.
 * @param {String} password the password to authenticate
 */
function authenticate(password) {
  return new Promise(
    resolve => compare(password, this.password, (error, response) => {
      if (error) throw error;

      if (response === true) {
        resolve(true);
      }
      resolve(false);
    })
  );
}


/**
 * hash password if it has changed
 * @param {Function} next signals end of the middleware.
 */
function save(next) {
  if (!this.isModified('password'))  return next();

  return hash(this.password, 10, (error, hashed) => { // 10 === saltFactor
    if (error) return next(error);

    this.password = hashed;
    return next();
  });
}


schema.methods.authenticate = authenticate;
schema.pre('save', save);


export default mongoose.model('User', schema);
