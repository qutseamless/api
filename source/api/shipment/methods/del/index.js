import { Business, Shipment, Packet } from '../../../../models';

/**
 * deletes a shipment for the business of the user
 * @param {Object} ctx the current serving context.
 */
export async function del(ctx){
    const { businessId } = ctx.state.user;
    const { _id } = ctx.query;

  try {
    const shipment = await Shipment.findById(_id);
    await Promise.all(
      shipment.packets.map(packetId => Packet.findByIdAndRemove(packetId))
    );
    await shipment.remove();
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
    return;
  }

  try {
    const business = await Business.findById(businessId);
    business.shipments.pull(_id);
    await business.save();
    ctx.body = {};
    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'invalid business' };
    return;
  }
}
