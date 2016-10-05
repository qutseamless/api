import server from 'supertest';
import mongoose from 'mongoose';
import test from 'ava';

import app from '../../app';


/**
 * @type {SuperTest} ctx of the tests. (a server wrapped with supertest)
 */
const ctx = server(app.listen());


test.before(async () => {
  mongoose.Promise = Promise;
  await mongoose.connect('mongodb://localhost/seamless-test');
});


test.beforeEach(async t => t.context = ctx)


test('no name: should return 400, error: "invalid name"', async t => {
  const res = await t.context
                    .post('/api/register');

  t.is(res.status, 400);
  t.is(res.body.error, 'invalid name');
});


test('name.length < 3: should return 400, error: "invalid name"', async t => {
  const body = { name: 'ab' };
  const res = await t.context
                    .post('/api/register')
                    .send(body);

  t.is(res.status, 400);
  t.is(res.body.error, 'invalid name');
});


test('typeof name !== "string": should return 400, error: "invalid name"', async t => {
  const body = { name: {} };
  const res = await t.context
                    .post('/api/register')
                    .send(body);

  t.is(res.status, 400);
  t.is(res.body.error, 'invalid name');
});


test('no email: should return 400, error: "invalid email"', async t => {
  const body = { name: 'bob' };
  const res = await t.context
                    .post('/api/register')
                    .send(body);

  t.is(res.status, 400);
  t.is(res.body.error, 'invalid email');
});


test.todo('invalid email expression: should return 400, error: "invalid email"');


test('typeof email !== "string": should return 400, error: "invalid email"', async t => {
  const body = { name: 'bob', email: {} };
  const res = await t.context
                    .post('/api/register')
                    .send(body);

  t.is(res.status, 400);
  t.is(res.body.error, 'invalid email');
});


test('no businessName: should return 400, error: "invalid businessName"', async t => {
  const body = { name: 'bob', email: 'user@register.test' };
  const res = await t.context
                    .post('/api/register')
                    .send(body);

  t.is(res.status, 400);
  t.is(res.body.error, 'invalid businessName');
});


test('businessName.length < 3: should return 400, error: "invalid businessName"', async t => {
  const body = { name: 'bob', email: 'user@register.test', businessName: 'ab' };
  const res = await t.context
                    .post('/api/register')
                    .send(body);

  t.is(res.status, 400);
  t.is(res.body.error, 'invalid businessName');
});


test('typeof businessName !== "string": should return 400, error: "invalid businessName"', async t => {
  const body = { name: 'bob', email: 'user@register.test', businessName: {} };
  const res = await t.context
                    .post('/api/register')
                    .send(body);

  t.is(res.status, 400);
  t.is(res.body.error, 'invalid businessName');
});


test('no address: should return 400, error: "invalid address"', async t => {
  const body = { name: 'bob', email: 'user@register.test', businessName: 'register inc' };
  const res = await t.context
                    .post('/api/register')
                    .send(body);

  t.is(res.status, 400);
  t.is(res.body.error, 'invalid address');
});


test('address.length < 3: should return 400, error: "invalid address"', async t => {
  const body = { name: 'bob', email: 'user@register.test', businessName: 'register inc', address: 'ab' };
  const res = await t.context
                    .post('/api/register')
                    .send(body);

  t.is(res.status, 400);
  t.is(res.body.error, 'invalid address');
});


test('typeof address !== "string": should return 400, error: "invalid address"', async t => {
  const body = { name: 'bob', email: 'user@register.test', businessName: 'register inc', address: {} };
  const res = await t.context
                    .post('/api/register')
                    .send(body);

  t.is(res.status, 400);
  t.is(res.body.error, 'invalid address');
});


test('no password: should return 400, error: "invalid password"', async t => {
  const body = { name: 'bob', email: 'user@register.test', businessName: 'register inc', address: '123 abc st' };
  const res = await t.context
                    .post('/api/register')
                    .send(body);

  t.is(res.status, 400);
  t.is(res.body.error, 'invalid password');
});


test.todo('invalid password expression: should return 400, error: "invalid password"');


test('typeof password !== "string": should return 400, error: "invalid password"', async t => {
  const body = {
    name: 'bob',
    email: 'user@register.test',
    businessName: 'register inc',
    address: '123 abc st',
    password: {},
  };
  const res = await t.context
                    .post('/api/register')
                    .send(body);

  t.is(res.status, 400);
  t.is(res.body.error, 'invalid password');
});

test('successful register: should return 200, with token', async t => {
  const user = {
    name: 'bob',
    email: 'user@register.test',
    businessName: 'register inc',
    address: '123 abc st',
    password: 'Password1',
  };
  const test = await t.context
                      .post('/api/register')
                      .send(user);

  const { status, body: { token, expiresIn } } = test;

  t.is(status, 201);
  t.is(typeof token, 'string');
  t.is(expiresIn, 86400);


  await t.context
        .del('/api/business')
        .send({ token });
});

test.after(async () => {
  await mongoose.connection.close();
});
