"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mysql = exports.mongo = exports.default = void 0;
const mongo = {
  url: process.env.ATLAS_URI
};
exports.mongo = mongo;
const mysql = {
  url: process.env.MYSQL_DATABASE_URL
};
exports.mysql = mysql;
var _default = {
  adapter: 'mongo',
  // adapters
  mongo,
  mysql
};
exports.default = _default;