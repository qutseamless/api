import jwt from 'jsonwebtoken';
import {
  Business,
  User,
} from '../../models';


/**
 * creates a user.
 * @param {Object} ctx the current serving context.
 */
export async function register (ctx) {
  const {
    name, email, businessName, address, industry, password,
  } = ctx.request.body;


  if (!name || name.length < 3 || typeof name !== 'string') {
    ctx.status = 400;
    ctx.body = { error: 'invalid name' };
    return;
  }
  if (!email || typeof email !== 'string') { // TODO: test with email expression
    ctx.status = 400;
    ctx.body = { error: 'invalid email' };
    return;
  }
  if (!businessName || businessName.length < 3 || typeof businessName !== 'string') {
    ctx.status = 400;
    ctx.body = { error: 'invalid businessName' };
    return;
  }
  if (!address || address.length < 3 || typeof address !== 'string') {
    ctx.status = 400;
    ctx.body = { error: 'invalid address' };
    return;
  }
  if (!password || typeof password !== 'string') { // TODO: test with password expression
    ctx.status = 400;
    ctx.body = { error: 'invalid password' };
    return;
  }


  const user = new User({
    name, email, password,
  });
  const business = new Business({
    name: businessName, address,
  });
  if (industry) {
    business.industry = industry;
  }
  user.businessId = business._id;
  business.employees.push(user._id);


  try {
    await user.save();
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = { error: 'invalid user' };
    return;
  }
  try {
    await business.save();
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'invalid business' };
    return;
  }


  const expiresIn = 86400;
  const token = await jwt.sign(user, 'shhhhh', { expiresIn });
  ctx.status = 201;
  ctx.body = { token, expiresIn };
}


export default register;
