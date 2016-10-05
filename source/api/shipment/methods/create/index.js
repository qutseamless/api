import { Business, Shipment } from '../../../../models';

/**
 * creates a shipment for the business of the user
 * @param {Object} ctx the current serving context.
 */
export async function create(ctx) {
  const { businessId } = ctx.state.user;

  const shipment = new Shipment({ businessId });

  try {
    const business = await Business.findById(businessId);
    business.shipments.push(shipment._id);
    await business.save();
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'invalid business' };
    return;
  }


  try {
    await shipment.save();
    ctx.status = 201;
    ctx.body = shipment;
    return;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'invalid shipment' };
    return;
  }
}

export default create;
