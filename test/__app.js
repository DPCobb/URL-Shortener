/**
 *
 * Daniel Cobb
 * 2-10-2017
 * Assignment 5: Unit Test
 *
 */
const expect = require('chai').expect;
const request = require('supertest');
const log = require('../src/modules/debug.js');

describe('App Routes', () => {
  const server = require('../src/server.js');
  it('GET api/v1/urls returns all shortened urls', (done) => {
    request(server)
    .get('/api/v1/urls')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect((res) => {
      const data = res.body;
      log.debug({
        type: 'success',
        msg: 'TEST: Get all urls',
        location: '__app.js line 14',
        data: { data },
      });
    })
    .expect(200, done);
  });
});
