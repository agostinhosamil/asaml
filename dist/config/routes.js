"use strict";

var _Router = require("../utils/Router");

_Router.Router.get('/', 'auth:root@pages');

_Router.Router.get('/about', '@pages/about');

_Router.Router.get('/users', '@users');

_Router.Router.post('/users', '@users/store');

_Router.Router.get('/users/:id', '@users/show');