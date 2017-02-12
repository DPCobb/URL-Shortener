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
const db = require('../src/models/db.js');

class testApp {

  setData(data) {
    this.app = {
      url: data.url,
      id: data.id,
      tynyUrl: data.tynyUrl,
      shortUrl: data.shortUrl,
      key: data.key,
    };
    this.testGets(this.app);
    this.redirect(this.app);
  }

  getAllUrls() {
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
          log.msg('Unit Test Complete for /urls', '__app.js');
          this.setData(data[0]);
          expect(data.length).to.be.above(0);
        })
        .expect(200, done);
      });
    });
  }

  testGets(app) {
    this.app = app;
    this.routes = ['/urls/' + this.app.id, '/urls/user/' + this.app.key];
    this.routes.forEach((url) => {
      describe('App Routes', () => {
        const server = require('../src/server.js');
        it('GET api/v1' + url, (done) => {
          request(server)
          .get('/api/v1/' + url)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect((res) => {
            const data = res.body;
            log.debug({
              type: 'success',
              msg: 'TEST: ' + url,
              location: '__app.js',
              data: { data },
            });
            log.msg('Unit Test Complete for ' + url, '__app.js');
          })
        .expect(200, done);
        });
      });
    });
  }

  createURL() {
    describe('App Routes', () => {
      const server = require('../src/server.js');
      it('POST api/v1/urls creates new url', (done) => {
        request(server)
        .post('/api/v1/urls')
        .send({ url: 'https://www.example.com',
          key: 'xxx' })
        .expect('Content-Type', /json/)
        .expect((res) => {
          const data = res.body;
          log.debug({
            type: 'success',
            msg: 'TEST: Create New URL',
            location: '__app.js',
            data: { data },
          });
          this.id = res.body.id;
          log.msg('Unit Test Complete for creating new URL', '__app.js');
          this.updateURL(this.id);
        })
        .expect(200, done);
      });
    });
  }

  updateURL(id) {
    describe('App Routes', () => {
      const server = require('../src/server.js');
      it('POST api/v1/urls/id updates a url', (done) => {
        request(server)
        .post('/api/v1/urls/' + id)
        .send({ url: 'www.example.com',
          key: 'xxx' })
        .expect('Content-Type', /json/)
        .expect((res) => {
          const data = res.body;
          log.debug({
            type: 'success',
            msg: 'TEST: Create New URL',
            location: '__app.js',
            data: { data },
          });
          this.id = res.body.id;
          log.msg('Unit Test Complete for updated a URL', '__app.js');
          this.deleteURL(this.id);
        })
        .expect(200, done);
      });
    });
  }

  deleteURL(id) {
    describe('App Routes', () => {
      const server = require('../src/server.js');
      it('DELETE api/v1/urls/id deletes new url', (done) => {
        request(server)
        .delete('/api/v1/urls/' + id)
        .expect((res) => {
          const data = res.body;
          log.debug({
            type: 'success',
            msg: 'TEST: Delete URL',
            location: '__app.js',
            data: { data },
          });
          this.id = res.body.id;
          log.msg('Unit Test Complete for deleting URL', '__app.js');
        })
        .expect(200, done);
      });
    });
  }

  redirect(app) {
    this.app = app;
    this.routes = ['/go/' + this.app.id, '/' + this.app.shortUrl, '/go/' + this.app.tynyUrl];
    this.routes.forEach((url) => {
      describe('App Routes', () => {
        const server = require('../src/server.js');
        it('GET ' + url, (done) => {
          request(server)
          .get(url)
          .expect((res) => {
            const data = res.body;
            log.debug({
              type: 'success',
              msg: 'TEST: ' + url,
              location: '__app.js',
              data: { data },
            });
            log.msg('Unit Test Complete for ' + url, '__app.js');
          })
        .expect(302, done);
        });
      });
    });
  }

  createUser() {
    describe('App Routes', () => {
      const server = require('../src/server.js');
      it('POST api/v1/create creates new user', (done) => {
        request(server)
        .post('/api/v1/create')
        .send({ email: 'test@example.com',
          pass: 'xxx' })
        .expect('Content-Type', /json/)
        .expect((res) => {
          const data = res.body;
          log.debug({
            type: 'success',
            msg: 'TEST: Create New user',
            location: '__app.js',
            data: { data },
          });
          this.id = res.body.id;
          log.msg('Unit Test Complete for creating new user', '__app.js');
          this.deleteUser();
        })
        .expect(200, done);
      });
    });
  }

  deleteUser() {
    db.user.destroy({
      where: {
        email: 'test@example.com',
      },
      include: [{
        all: true,
        nested: true,
      }],
    });
    log.debug({
      type: 'success',
      msg: 'TEST: Test user deleted.',
      location: '__app.js',
    });
    this.response = 1;
  }

  launchTest() {
    this.getAllUrls();
    this.createURL();
    this.createUser();
  }

}

// run the tests
const run = new testApp();
run.launchTest();
