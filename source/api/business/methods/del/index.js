import { Business, User, Shipment, Packet } from '../../../../models';


export async function del(ctx) {
  const { businessId } = ctx.state.user;
  try {
    const business = await Business.findById(businessId);

    await Promise.all( // delete packets
      business.shipments.map(async shipmentId => {
        const shipment = await Shipment.findById(shipmentId);
        return Promise.all(
          shipment.packets.map(packetId => Packet.findByIdAndRemove(packetId))
        );
      })
    );

    await Promise.all( // delete shipments
      business.shipments.map(shipmentId => Shipment.findByIdAndRemove(shipmentId))
    )

    await Promise.all( // delete users
      business.employees.map(userId => User.findByIdAndRemove(userId))
    );

    await business.remove();

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
