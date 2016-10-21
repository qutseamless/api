import server from 'supertest';
import mongoose from 'mongoose';
import test from 'ava';

import app from '../../../../app';


test.before(async () => {
  mongoose.Promise = Promise;
  await mongoose.connect('mongodb://localhost/seamless-test');
});


test.beforeEach(async t => t.context = server(app.listen()));


test('successful delete: should return 200, with {}', async t => {
  const user = {
    name: 'bob',
    email: 'user@delete.test',
    businessName: 'user delete inc,',
    address: '123 abc st',
    password: 'Password1',
  };
  const setup = await t.context
                      .post('/api/register')
                      .send(user);


  const { token } = setup.body;
  const headers = { 'x-access-token': token };
  const test = await t.context
                    .del('/api/user')
                    .set(headers);


  t.is(test.status, 200);
  t.true(test.body instanceof Object);


  await t.context
      .del('/api/business')
      .set(headers);
});


test.after(async () => {
  await mongoose.connection.close();
});
