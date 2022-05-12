/*
 * server.js
 * Copyright (C) 2022 Ludovic Fernandez <http://github.com/SirWrexes>
 *
 * Distributed under terms of the MIT license.
 */
'use strict';

const { join } = require('path');
const express = require('express');

const server = express();

server.set('view engine', 'hbs');
server.set('views', join(__dirname, 'views'));

server.use(express.static(join(__dirname, 'public')));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

server.use('/', require('./router/pages'));
server.use('/auth', require('./router/auth'));

const port = process.env.PORT || 8008;

module.exports = server;

/**
 * Use this instead of `server.listen` for convenience.
 */
module.exports.start = () =>
  server.listen(port, () => {
    console.log(`==> EXPRESS: 👂http://localhost:${port}/`);
  });
