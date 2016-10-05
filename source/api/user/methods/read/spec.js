import server from 'supertest';
import mongoose from 'mongoose';
import test from 'ava';

import app from '../../../../app';


test.before(async () => {
  mongoose.Promise = Promise;
  await mongoose.connect('mongodb://localhost/seamless-test');
});


test.beforeEach(async t => t.context = server(app.listen()));


test('successful me: should return 200, with user', async t => {
  const user = {
    name: 'bob',
    email: 'user@me.test',
    businessName: 'user me inc,',
    address: '123 abc st',
    password: 'Password1',
  };
  const setup = await t.context
                      .post('/api/register')
                      .send(user);


  const { token } = setup.body;
  const headers = { 'x-access-token': token };
  const test = await t.context
                     .get('/api/user/me')
                     .set(headers);

  t.is(test.status, 200);
  t.is(test.body.name, user.name);
  t.is(test.body.email, user.email);


  await t.context
        .del('/api/business')
        .send({ token })
        .set(headers);
});


test('successful read: should return 200, with users', async t => {
  const user = {
    name: 'bob',
    email: 'user@read.test',
    businessName: 'user read inc,',
    address: '123 abc st',
    password: 'Password1',
  };
  const setup = await t.context
                      .post('/api/register')
                      .send(user);

  const { token } = setup.body;
  const headers = { 'x-access-token': token };

  const user2 = { name: 'bobby', email: 'user2@read.test', password: 'Password2' };
  await t.context
        .post('/api/user')
        .set(headers)
        .send(user2);


  const test = await t.context
                     .get('/api/user')
                     .set(headers);

  t.is(test.status, 200);
  t.true(test.body instanceof Array);
  t.is(test.body.length, 2);


  await t.context
        .del('/api/business')
        .send({ token })
        .set(headers);
});


test.after(async () => {
  await mongoose.connection.close();
});
