import { Shipment } from '../../../../models';


export async function read(ctx) {
  const { businessId } = ctx.state.user;
  const { shipmentId } = ctx.query;

  try {
    const shipment = await Shipment.findById(shipmentId)
                                   .populate('packets')
                                   .exec();

    if (shipment.businessId != businessId) {
      return;
    }

    const { packets } = shipment;
    ctx.body = packets;
    ctx.status = 200;
  } catch (error) {
    console.log(error)
    ctx.body = error;
    ctx.status = 500;
  }
}
