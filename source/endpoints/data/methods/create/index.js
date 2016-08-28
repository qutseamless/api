import { Packet } from '../../models';

/**
 * validates the incoming shipment packet, and saves it.
 *
 * @param {Object} ctx the current serving context.
 */
export const create = async ctx => {
  const { id, timestamp } = ctx.request.body;

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

  if (!timestamp) {
    ctx.status = 400;
    ctx.body = 'Bad Request: timestamp was not provided';
    return;
  }

  if (isNaN(timestamp) || timestamp < 0 || timestamp > Date.now()) {
    ctx.status = 400;
    ctx.body = 'Bad Request: timestamp was invalid';
    return;
  }

  try {
    await new Packet({ id, timestamp }).save();
    ctx.status = 200;
    ctx.body = 'Success: packet was recorded';
    return;
  } catch(error) {
    ctx.status = 500;
    ctx.body = 'Server Error: Database did not save the packet';
    throw error;
  }
};

export default create;
