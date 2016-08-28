/* eslint-disable import/no-extraneous-dependencies */
import { agent } from 'supertest-as-promised';
import mongoose from 'mongoose';

import { app } from '../../../../app';

describe('app:endpoints: data#del', () => {
  let server; let api;

  before(() => {
    server = app.listen(4000);
    api = agent(server);
    return mongoose.connect('mongodb://127.0.0.1/test');
  });

  it('should send 400 and message on no id', () =>
    api
      .delete('/data')
      .expect(400, 'Bad Request: id was not provided')
  );

  it('should send 400 and message on malformed id', () =>
    api
      .delete('/data?id=abcd')
      .expect(400, 'Bad Request: id was invalid')
  );

  it('should send 200 and message on packets deleted', () =>
    api
      .delete('/data?id=1234')
      .expect(200, 'Success: packet was deleted')
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
