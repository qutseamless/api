import { Business } from '../../../../models';

export function me(ctx) {
  const { user } = ctx.state;
  ctx.status = 200;
  ctx.body = user;
  return;
}

export async function read(ctx) {
  const { businessId } = ctx.state.user;

  try {
    const { employees } = await Business
                           .findById(businessId , 'employees')
                           .populate('employees')
                           .exec();
    ctx.body = employees;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 500;
  }
}
