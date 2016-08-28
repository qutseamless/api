/* eslint-disable import/no-extraneous-dependencies */
import { agent } from 'supertest-as-promised';
import mongoose from 'mongoose';

import { app } from '../../../../app';

describe('app:endpoints: data#create', () => {
  let server; let api;

  before(() => {
    server = app.listen(4000);
    api = agent(server);
    return mongoose.connect('mongodb://127.0.0.1/test');
  });

  it('should send 400 and message on no id', () =>
    api
      .post('/data')
      .expect(400, 'Bad Request: id was not provided')
  );

  it('should send 400 and message on malformed id', () =>
    api
      .post('/data')
      .send({ id: 'abc' })
      .expect(400, 'Bad Request: id was invalid')
  );

  it('should send 400 and message on no timestamp', () =>
    api
      .post('/data')
      .send({ id: '123' })
      .expect(400, 'Bad Request: timestamp was not provided')
  );

  it('should send 400 and message on timestamp isNaN', () =>
    api
      .post('/data')
      .send({ id: '123', timestamp: 'abc' })
      .expect(400, 'Bad Request: timestamp was invalid')
  );

  it('should send 400 and message on timestamp is negative', () =>
    api
      .post('/data')
      .send({ id: '123', timestamp: -1000 })
      .expect(400, 'Bad Request: timestamp was invalid')
  );

  it('should send 400 and message on timestamp is future', () =>
    api
      .post('/data')
      .send({ id: '123', timestamp: Date.now() + 1000 })
      .expect(400, 'Bad Request: timestamp was invalid')
  );

  it('should send 200 and message on packet recorder', () =>
    api
      .post('/data')
      .send({ id: '123', timestamp: Date.now() })
      .expect(200, 'Success: packet was recorded')
  );

  after(() => {
    server.close();
    return mongoose.connection.close();
  });
});

/* eslint
  no-unused-expressions: 0
  no-undef: 0
*/
