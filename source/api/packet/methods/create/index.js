import { Packet, Shipment } from '../../../../models';

/**
 * validates the incoming shipment packet, and saves it.
 *
 * @param {Object} ctx the current serving context.
 */
export const create = async ctx => {
  const { deviceId, createdAt, location } = ctx.request.body;

  if (!deviceId || isNaN(deviceId)) {
    ctx.status = 400;
    ctx.body = { error: 'invalid deviceId' };
    return;
  }

  if (!createdAt || createdAt < 0 || createdAt > Date.now()) {
    ctx.status = 400;
    ctx.body = { error: 'invalid createdAt' };
    return;
  }

  const packet = new Packet({ deviceId, createdAt, location });

  let shipment;
  try {
    shipment = await Shipment.findOne({ deviceId });
    shipment.packets.push(packet._id)
    await shipment.save();
  } catch (error) {
    console.log(error)
    ctx.status = 400;
    ctx.body = { error: 'invalid shipment' };
    return;
  }

  packet.shipmentId = shipment._id;
  try {
    await packet.save();
    ctx.status = 200;
    ctx.body = 'Success: packet was recorded';
    return;
  } catch (error) {
    ctx.status = 500;
    ctx.body = 'Server Error: Database did not save the packet';
    throw error;
  }
};

export default create;
