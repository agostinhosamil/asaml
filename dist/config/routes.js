"use strict";

var _Router = require("../utils/Router");

_Router.Router.get('/', 'auth:root@pages');

_Router.Router.get('/about', '@pages/about');

_Router.Router.get('/users', 'auth:jwt@users');

_Router.Router.post('/users', '@users/store');

_Router.Router.get('/users/:id', '@users/show');

_Router.Router.post('/login', '@pages/login');

_Router.Router.get('/home', 'auth:jwt@pages/home');