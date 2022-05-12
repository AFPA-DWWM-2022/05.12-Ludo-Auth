/*
 * users.js
 * Copyright (C) 2022 Ludovic Fernandez <http://github.com/SirWrexes>
 *
 * Distributed under terms of the MIT license.
 */
'use strict';

const { _db } = require('./connection');
const select = require('./requestFactories');

async function createUsers(fields) {
  if (!fields instanceof Array) fields = [fields];

};

async function getUsers(fields) {
  if (!fields instanceof Array) fields = [fields];
  const req = select('users', fields);
  const [rows, _] = await _db.promise().execute(req);
  return rows;
};

module.exports = {
  createUsers,
  getUsers,
  hasUsers: async (fields) => !!(await getUsers(fields).length),
};
