import { Packet, Shipment } from '../../../../models';

/**
 * validates the incoming shipment packet, and saves it.
 * @param {Object} ctx the current serving context.
 */
export const create = async ctx => {
  const { Body } = ctx.request.body;
  const [
    deviceId, lat, lng,,,, humidity, temp,
  ] = Body.split(',');

  console.log({ deviceId, lat, lng, humidity, temp });

  if (!deviceId || isNaN(deviceId)) {
    ctx.status = 400;
    ctx.body = { error: 'invalid deviceId' };
    return;
  }
  // if (!date || !time) {
  //   ctx.status = 400;
  //   ctx.body = { error: 'invalid date or time' };
  //   return;
  // }
// 
  // let createdAt;
  // if (date && time) {
  //   createdAt = parseDate(date, time);
  // }
  
  const packet = new Packet({
    deviceId, lat: parseFloat(lat), lng: parseFloat(lng), humidity, temp
  });


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
    ctx.body = '<?xml version="1.0" encoding="UTF-8" ?><Response></Response>';
    return;
  } catch (error) {
    ctx.status = 500;
    ctx.body = 'Server Error: Database did not save the packet';
    throw error;
  }
};


/**
 * returns the current time as a date time string
 */
function parseDate(date, time) {
  const [d1, d2, mo1, mo2, y1, y2] = date;
  const [h1, h2, mi1, mi2, s1, s2] = time;

  const day = d1 + d2;
  const month = mo1 + mo2;
  const year = y1 + y2;

  const hours = h1 + h2;
  const minutes = mi1 + mi2;
  const seconds = s1 + s2;

  return new Date(year, month, day, hours, minutes, seconds);
}


export default create;
