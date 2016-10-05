import server from 'supertest';
import mongoose from 'mongoose';
import test from 'ava';

import app from '../../../../app';


test.before(async () => {
  mongoose.Promise = Promise;
  await mongoose.connect('mongodb://localhost/seamless-test');
});


test.beforeEach(async t => t.context = server(app.listen()));


test('successful create: should return 200, with shipment', async t => {
  const user = {
    name: 'bob',
    email: 'shipment@create.test',
    businessName: 'shipment create inc,',
    address: '123 abc st',
    password: 'Password1',
  };
  const setup = await t.context
                      .post('/api/register')
                      .send(user);


  const { token } = setup.body;
  const headers = { 'x-access-token': token };
  const test = await t.context
                    .post('/api/shipment')
                    .set(headers);

  t.is(test.status, 201);


  await t.context
        .del('/api/business')
        .send({ token })
        .set(headers);
});


test.after(async () => {
  await mongoose.connection.close();
});
