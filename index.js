'use strict';

const url = require('url');
const HttpError = require('@starefossen/http-error');

const ALLOW_CREDENTIALS = process.env.CORS_ALLOW_CREDENTIALS;
const ALLOW_HEADERS = process.env.CORS_ALLOW_HEADERS || 'Content-Type';
const ALLOW_METHODS = process.env.CORS_ALLOW_METHODS || 'GET, OPTIONS';
const ALLOW_ORIGINS = new Set(
    (process.env.CORS_ALLOW_ORIGINS || '')
      .split(',')
      .filter(s => s !== '')
      .map(s => (s === 'null' ? null : s))
);
const DENY_ORIGINS = new Set(
    (process.env.CORS_DENY_ORIGINS || '')
      .split(',')
      .filter(s => s !== '')
      .map(s => (s === 'null' ? null : s))
);
const EXPOSE_HEADERS = process.env.CORS_EXPOSE_HEADERS || '';
const MAX_AGE = parseInt(process.env.CORS_MAX_AGE, 10) || 0;
const REQUIRE_ORIGIN = process.env.CORS_REQUIRE_ORIGIN || false;

module.exports = (opts => {
  const allowCredentials = opts.allowCredentials || ALLOW_CREDENTIALS;
  const allowHeaders = opts.allowHeaders || ALLOW_HEADERS;
  const allowMethods = opts.allowMethods || ALLOW_METHODS;
  const allowOrigins = opts.allowOrigins || ALLOW_ORIGINS;
  const denyOrigins = opts.denyOrigins || DENY_ORIGINS;
  const exposeHeaders = opts.exposeHeaders || EXPOSE_HEADERS;
  const maxAge = opts.maxAge || MAX_AGE;
  const requireOrigin = opts.requireOrigin || REQUIRE_ORIGIN;

  return function coorsMiddleware(req, res, next) {
    const originRaw = req.get('Origin');

    if (originRaw || requireOrigin) {
      const origin = url.parse(originRaw || '');

      if ((allowOrigins.size && !allowOrigins.has(origin.hostname))
      || (denyOrigins.size && denyOrigins.has(origin.hostname))) {
        return next(new HttpError(`Bad Origin "${originRaw}"`, 403));
      }

      res.set('Access-Control-Allow-Headers', allowHeaders);
      res.set('Access-Control-Allow-Max-Age', maxAge);
      res.set('Access-Control-Allow-Methods', allowMethods);
      res.set('Access-Control-Allow-Origin', originRaw || '*');
      res.set('Access-Control-Expose-Headers', exposeHeaders);

      if (typeof allowCredentials !== 'undefined') {
        res.set('Access-Control-Allow-Credentials', allowCredentials);
      }
    }

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    return next();
  };
});

module.exports.middleware = module.exports({});
