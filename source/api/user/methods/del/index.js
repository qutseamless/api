import { Business, User } from '../../../../models';


export async function del(ctx) {
  const { _id, businessId } = ctx.state.user;
  
  try {
    await User.findByIdAndRemove(_id);
  } catch (error) {
    ctx.error = 500;
    ctx.body = error;
    return;
  }

  try {
    const business = await Business.findById(businessId);
    business.employees.pull(_id);
    await business.save();
    ctx.status = 200;
    ctx.body = {};
    return;
  } catch (error) {
    ctx.error = 500;
    ctx.body = error;
    return;
  }
}


export default del;
