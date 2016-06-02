# @starefossen/express-cors

[![Build status](https://app.wercker.com/status/82a3fcc4a07532a3dff7f71c17996d1a/s "wercker status")](https://app.wercker.com/project/bykey/82a3fcc4a07532a3dff7f71c17996d1a)
[![Codacy grade](https://img.shields.io/codacy/grade/2a40f5c2df884985872e4d0a0c9ce60b.svg "Codacy")](https://www.codacy.com/app/starefossen/node-express-cors)
[![Codacy coverage](https://img.shields.io/codacy/coverage/2a40f5c2df884985872e4d0a0c9ce60b.svg "Codacy")](https://www.codacy.com/app/starefossen/node-express-cors)
[![NPM downloads](https://img.shields.io/npm/dm/@starefossen/express-cors.svg "NPM downloads")](https://www.npmjs.com/package/@starefossen/express-cors)
[![NPM version](https://img.shields.io/npm/v/@starefossen/express-cors.svg "NPM version")](https://www.npmjs.com/package/@starefossen/express-cors)
[![Node version](https://img.shields.io/node/v/@starefossen/express-cors.svg "Node version")](https://www.npmjs.com/package/@starefossen/express-cors)
[![Dependency status](https://img.shields.io/david/Starefossen/node-@starefossen/express-cors.svg "Dependency status")](https://david-dm.org/Starefossen/node-@starefossen/express-cors)

Smart CORS headers middleware for your Express.js applications.

## Install

```
$ npm install @starefossen/express-cors --save
```

## Usage

```js
const cors = require('@starefossen/express-cors');
```

### Simple

The simple configuration is controlled by environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `CORS_ALLOW_CREDENTIALS` | allow-credentials (boolean) | `undefined` |
| `CORS_ALLOW_HEADERS` | allow-headers header (comma separated string) | `Content-Type` |
| `CORS_ALLOW_METHODS` | allow-methods header (comma separated string) | `GET, OPTIONS` |
| `CORS_ALLOW_ORIGINS` | orins whitelist (comma seperated string) | `""` |
| `CORS_DENY_ORIGINS` | origins blacklist (comma seperated string) | `""` |
| `CORS_EXPOSE_HEADERS` | expose-headers header (comma seperated string) | `""` |
| `CORS_MAX_AGE` | max-age header (integer) | `0` |
| `CORS_REQUIRE_ORIGIN` | require origin header from client (boolean) | `false` |

```
const cors = require('@starefossen/express-cors');

app.use(cors.middleware);
```

### Advanced

The advanced configuration takes in a configuration object. All values defaults
to their environment conunterpart as statated in the simple configuration.

```
const cors = require('@starefossen/express-cors');

app.use(cors({
  allowCredentials: false,
  allowHeaders: 'Content-Type',
  allowMethods: 'GET, OPTIONS',
  allowOrigins: 'foo.com,bar.com',
  denyOrigins: 'example.com',
  exposeHeaders: 'x-request-time',
  maxAge: 133734,
  requireOrigin: true,
});
```

## [MIT Licensed](https://github.com/Starefossen/node-express-cors/blob/master/LICENSE)
