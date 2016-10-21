import server from 'supertest';
import mongoose from 'mongoose';
import test from 'ava';

import app from '../../../../app';


test.before(async () => {
  mongoose.Promise = Promise;
  await mongoose.connect('mongodb://localhost/seamless-test');
});


test.beforeEach(async t => t.context = server(app.listen()));


test('successful read one: should return 200, with shipment', async t => {
  const user = {
    name: 'bob',
    email: 'shipment@read.test',
    businessName: 'shipment read inc,',
    address: '123 abc st',
    password: 'Password1',
  };
  const setup = await t.context
                      .post('/api/register')
                      .send(user);

  const { token } = setup.body;

  
  const shipment = { deviceId: 123456 };
  const headers = { 'x-access-token': token };
  const setupTwo = await t.context
                          .post('/api/shipment')
                          .set(headers)
                          .send(shipment);


  const { _id } = setupTwo.body;
  const queries = { _id };
  const test = await t.context
                     .get('/api/shipment')
                     .set(headers)
                     .query(queries);

  t.is(test.status, 200);
  t.true(test.body instanceof Object);


  await t.context
        .del('/api/business')
        .set(headers);
});


test('successful read all: should return 200, with shipments', async t => {
  const user = {
    name: 'bob',
    email: 'shipments@read.test',
    businessName: 'shipments read inc,',
    address: '123 abc st',
    password: 'Password1',
  };
  const setup = await t.context
                      .post('/api/register')
                      .send(user);

  const { token } = setup.body;
  const headers = { 'x-access-token': token };
  const shipment = { deviceId: 123456 };
  await t.context
         .post('/api/shipment')
         .set(headers)
         .send(shipment);


  const test = await t.context
                     .get('/api/shipment')
                     .set(headers);

  t.is(test.status, 200);
  t.true(test.body instanceof Array);


  await t.context
        .del('/api/business')
        .set(headers);
});


test.after(async () => {
  await mongoose.connection.close();
});
