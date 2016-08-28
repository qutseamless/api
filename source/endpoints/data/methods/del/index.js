import { Packet } from '../../models';

export const del = async ctx => {
  const { id } = ctx.query;

  if (!id) {
    ctx.status = 400;
    ctx.body = 'Bad Request: id was not provided';
    return;
  }

  if (isNaN(id)) {
    ctx.status = 400;
    ctx.body = 'Bad Request: id was invalid';
    return;
  }


  try {
    await Packet.remove({ id });
    ctx.status = 200;
    ctx.body = 'Success: packet was deleted';
    return;
  } catch (error) {
    ctx.status = 500;
    ctx.body = 'Server Error: Database did not save the packet';
    throw error;
  }
};

export default del;
