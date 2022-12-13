"use strict";

require("dotenv/config");

var _path = require("path");

var _dotenv = require("dotenv");

(0, _dotenv.config)({
  path: (0, _path.join)(__dirname, '..', '..', '.env.' + (process.env.NODE_ENV || 'development'))
});