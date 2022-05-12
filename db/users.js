/*
 * users.js
 * Copyright (C) 2022 Ludovic Fernandez <http://github.com/SirWrexes>
 *
 * Distributed under terms of the MIT license.
 */
'use strict';

const { _db } = require('./connection');
const R = require('../factories/genRequest');
const { asArray } = require('../helpers');

async function createUsers(fields) {
  for (const req of R.insert('users', asArray(fields)))
    _db.execute(req, (e) => {
      if (e) console.trace(`==> User creation failure\n${e}`);
    });
}

async function getUsers(fields) {
  const req = R.select('users', asArray(fields));
  const [rows, _] = await _db.promise().execute(req);
  return rows;
}

async function deleteUsers(fields) {
  const req = R.delet('users', asArray(fields));
  _db.execute(req, (e) => {
    if (e) console.trace(`==> User deletion failure\n${e}`);
  });
}

module.exports = {
  deleteUsers,
  createUsers,
  getUsers,
  hasUsers: async (fields) => !!(await getUsers(fields).length),
}
