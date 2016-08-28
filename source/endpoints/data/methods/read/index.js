import { Packet } from '../../models';

export const read = async ctx => {
  try {
    ctx.status = 200;
    ctx.body = await Packet.find();
    return;
  } catch (error) {
    ctx.status = 500;
    ctx.body = 'Server Error: Database did not retrieve the packet/s';
    throw error;
  }
};

export default read;
