/*
 * database.js
 * Copyright (C) 2022 Ludovic Fernandez <http://github.com/SirWrexes>
 *
 * Distributed under terms of the MIT license.
 */
'use strict';

const mysql = require('mysql2');

const options = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
};

Object.freeze(options);

const _db = mysql.createConnection(options);

module.exports = {
  /** The unwrapped connection */
  _db,

  /** Options used for connecting to the DB */
  options,

  /** Use this instead of _db.connect() */
  connect: async () => {
    _db.connect((e) => {
      if (e) {
        console.trace(e);
      } else {
        console.log(
          `==> MySQL:  🔗 ${options.host}(${options.database}) as 👤 ${options.user}`
        );
      }
    });
  },
};
