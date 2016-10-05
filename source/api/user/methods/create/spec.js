import server from 'supertest';
import mongoose from 'mongoose';
import test from 'ava';

import app from '../../../../app';


test.before(async () => {
  mongoose.Promise = Promise;
  await mongoose.connect('mongodb://localhost/seamless-test');
});


test.beforeEach(async t => t.context = server(app.listen()));


test('successful create: should return 200, with user', async t => {
  const user = {
    name: 'bob',
    email: 'user@create.test',
    businessName: 'user create inc,',
    address: '123 abc st',
    password: 'Password1',
  };
  const setup = await t.context
                      .post('/api/register')
                      .send(user);


  const { token } = setup.body;
  const headers = { 'x-access-token': token };
  const user2 = { name: 'bob', email: 'user2@create.test', password: 'Password2' };
  const test = await t.context
                    .post('/api/user')
                    .set(headers)
                    .send(user2);

  t.is(test.status, 200);
  t.is(test.body.name, user2.name);
  t.is(test.body.email, user2.email);


  await t.context
        .del('/api/business')
        .send({ token })
        .set(headers);
});


test.after(async () => {
  await mongoose.connection.close();
});
