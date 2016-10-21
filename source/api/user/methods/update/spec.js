import server from 'supertest';
import mongoose from 'mongoose';
import test from 'ava';

import app from '../../../../app';


test.before(async () => {
  mongoose.Promise = Promise;
  await mongoose.connect('mongodb://localhost/seamless-test');
});


test.beforeEach(async t => t.context = server(app.listen()));


test('successful update: should return 200, with updatedUser', async t => {
  const user = {
    name: 'bob',
    email: 'user@update.test',
    businessName: 'user update inc,',
    address: '123 abc st',
    password: 'Password1',
  };
  const setup = await t.context
                      .post('/api/register')
                      .send(user);

  const { token } = setup.body;
  const headers = { 'x-access-token': token };
  const body = { name: 'bobby' };
  const test = await t.context
                    .put('/api/user')
                    .set(headers)
                    .send(body);

  t.is(test.status, 200);
  t.is(test.body.name, body.name);
  t.is(test.body.email, user.email);


  await t.context
        .del('/api/business')
        .set(headers);
});


test.after(async () => {
  await mongoose.connection.close();
});
