import { Business } from '../../../../models';


export async function del(ctx) {
  const { businessId } = ctx.state.user;

  try {
    await Business.findByIdAndRemove(businessId)
                  .then(b => b.remove());

    ctx.status = 200;
    ctx.body = {};
    return;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "no user" };
    return;
  }
}


export default del;
