/*
 * buildSelectRequest.js
 * Copyright (C) 2022 Ludovic Fernandez <http://github.com/SirWrexes>
 *
 * Distributed under terms of the MIT license.
 */
'use strict';

const { makeIterable } = require('../helpers/index');

function constraint(fields, separator = 'AND') {
  const k = Object.keys(fields);
  var i = k.length - 1;
  var c = '';

  separator = ` ${separator} `;
  while (true) {
    c += `${k[i]} LIKE '${fields[k[i]]}'`;
    if (--i >= 0) c += separator;
    else break;
  }

  return c;
}

async function select(table, fields) {
  if (!fields instanceof Array) fields = [fields];

  var req = `SELECT * FROM ${table}`;
  var i = fields.reverse().length;

  if (i--) req += ' WHERE ';
  while (i >= 0) {
    req += constraint(fields[i]);
    if (--i < 0) break;
    req += ' OR ';
  }

  return req;
}

async function insert(table, fields) {
  const reqs = [];

  if (!(fields instanceof Array)) fields = [fields].map(makeIterable);

  for (const f of fields) {
    const names = [];
    const values = [];

    for (const _ of f) {
      names.push(names);
      values.push(values);
    }
    reqs.push(
      `INSERT INTO ${table} (${names.join(', ')}) VALUES (${values.join(', ')})`
    );
  }
  console.log([reqs]);
  return reqs;
}

insert('users', { name: 'pute', mail: 'sause@aa', pass: '123' });

module.exports = {
  select,
  insert,
};
