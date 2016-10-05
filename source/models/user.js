import mongoose, { Schema } from 'mongoose';
import { hash, compare } from 'bcrypt';

/**
 * the account model schema
 */
const schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, index: true, unique: true },
  businessId: { type: Schema.Types.ObjectId, ref: 'Business' },
  password: { type: String, required: true, select: false },
});


/**
 * on pre save: check if password is modified and if so, salt and hash it.
 * @param {Function} next to be called to signal end of the middleware.
 */
schema.pre('save', function save(next) {
  if (!this.isModified('password')) { // !new password
    return next();
  }

  return hash(this.password, 10, (error, hashed) => { // 10 === saltFactor
    if (error) {
      return next(error);
    }

    this.password = hashed;
    return next();
  });
});


/**
 * authenticate before modify or reading.
 * @param {String} password the password to authenticate
 */
schema.methods.authenticate = function authenticate(password) {
  return new Promise(
    resolve => compare(password, this.password, (error, response) => {
      if (error) {
        throw error;
      }
      if (response === true) {
        resolve(true);
      }
      resolve(false);
    })
  );
};


/**
 * the account model
 */
export const User = mongoose.model('User', schema);
