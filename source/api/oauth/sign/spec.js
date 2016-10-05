import server from 'supertest';
import mongoose from 'mongoose';
import test from 'ava';

import app from '../../../app';


test.before(async () => {
  mongoose.Promise = Promise;
  await mongoose.connect('mongodb://localhost/seamless-test');
});


test.beforeEach(async t => t.context = server(app.listen()))


test('no email: should return 400, error: "invalid email"', async t => {
  const body = {};
  const res = await t.context
                    .post('/api/oauth')
                    .send(body);

  t.is(res.status, 400);
  t.is(res.body.error, 'invalid email');
});


test.todo('invalid email expression: should return 400, error: "invalid email"');


test('typeof email !== "string": should return 400, error: "invalid email"', async t => {
  const body = { email: {} };
  const res = await t.context
                    .post('/api/oauth')
                    .send(body);

  t.is(res.status, 400);
  t.is(res.body.error, 'invalid email');
});


test('no password: should return 400, error: "invalid password"', async t => {
  const body = { email: 'user@sign.test' };
  const res = await t.context
                    .post('/api/oauth')
                    .send(body);

  t.is(res.status, 400);
  t.is(res.body.error, 'invalid password');
});


test.todo('invalid password expression: should return 400, error: "invalid password"');


test('typeof password !== "string": should return 400, error: "invalid password"', async t => {
  const body = { email: 'user@sign.test', password: {} };
  const res = await t.context
                    .post('/api/oauth')
                    .send(body);

  t.is(res.status, 400);
  t.is(res.body.error, 'invalid password');
});


test('successful sign: should return 200, with token response', async t => {
  const user = {
    name: 'bob',
    email: 'user@sign.test',
    business: 'oauth sign inc,',
    address: '123 abc st',
    password: 'Password1',
  };
  const setup = await t.context
                      .post('/api/register')
                      .send(user);

  // TODO get token from oauth

  const { token } = setup;

  await t.context
        .del('/api/user')
        .send({ token });

  await t.context
        .del('/api/business')
        .send({ token });
});


test.after(async () => {
  await mongoose.connection.close();
});
