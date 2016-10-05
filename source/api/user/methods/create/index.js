import { Business, User } from '../../../../models';

/**
 * creates a user.
 * @param {Object} ctx the current serving context.
 */
export async function create (ctx) {
  const { businessId } = ctx.state.user;
  const {
    name, email, password,
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

  if (!password || typeof password !== 'string') { // TODO: test with password expression
    ctx.status = 400;
    ctx.body = { error: 'invalid password' };
    return;
  }

  const user = new User({ name, email, businessId, password });

  try {
    const business = await Business.findById(businessId);
    business.employees.push(user._id);
    await business.save();
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'invalid business' };
    return;
  }


  try {
    await user.save();
    ctx.status = 200;
    ctx.body = user;
    return;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'invalid user' };
    return;
  }
}

export default create;
