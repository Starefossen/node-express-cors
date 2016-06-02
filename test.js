'use strict';

process.env.CORS_ALLOW_ORIGINS = 'foo.com,bar.com';

const assert = require('assert');
const request = require('supertest');
const simpleApp = request(require('./examples/simple'));

describe('examples', () => {
  describe('simple', () => {
    it('returns no cors headers for request without origin', done => {
      simpleApp.get('/')
        .expect(200)
        .expect('Hello World')
        .expect(res => {
          assert.equal(res.headers['Access-Control-Allow-Headers'], undefined);
        })
        .end(done);
    });

    it('denies request for invalid cors origin', done => {
      simpleApp.get('/')
        .set('Origin', 'https://example.com')
        .expect(403)
        .expect('403: Bad Origin "https://example.com"', done);
    });

    it('returns cors headers for valid cors origin', done => {
      simpleApp.get('/')
        .set('Origin', 'https://foo.com')
        .expect(200)
        .expect('Hello World')
        .expect('Access-Control-Allow-Headers', 'Content-Type')
        .expect('Access-Control-Allow-Max-Age', '0')
        .expect('Access-Control-Allow-Methods', 'GET, OPTIONS')
        .expect('Access-Control-Allow-Origin', 'https://foo.com')
        .expect('Access-Control-Expose-Headers', '', done);
    });
  });
});
