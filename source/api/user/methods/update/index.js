import { User } from '../../../../models';


export async function update(ctx) {
  const { _id } = ctx.state.user;
  const { body } = ctx.request;
  try {
    const updatedUser = await User.findByIdAndUpdate(_id, body, { new: true });
    ctx.status = 200;
    ctx.body = updatedUser;
    return;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "invalid update" };
    return;
  }
}


export default update;
