import { Business, Shipment } from '../../../../models';


export async function read(ctx) {
  const { businessId } = ctx.state.user;
  const { _id } = ctx.query;

  try {
    let result;
    if (_id) {
      result = await Shipment.findById(_id);
    } else {
      const { shipments } = await Business.findById(businessId, 'shipments')
                                          .populate('shipments')
                                          .exec();
      result = shipments;
    }
    ctx.body = result;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 500;
  }
}
