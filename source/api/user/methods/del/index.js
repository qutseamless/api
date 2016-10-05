import { Business, User } from '../../../../models';


export async function del(ctx) {
  const { _id, businessId } = ctx.state.user;

  try {
    const business = await Business.findById(businessId);
    business.employees.pull(_id);
    if (business.employees.length > 0) {
      await business.save();
    } else {
      await business.remove();
    }
  } catch (error) {
    ctx.error = 500;
    ctx.body = error;
    return;
  }
  
  try {
    await User.findByIdAndRemove(_id);
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
