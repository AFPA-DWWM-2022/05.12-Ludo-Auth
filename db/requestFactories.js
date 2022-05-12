/*
 * buildSelectRequest.js
 * Copyright (C) 2022 Ludovic Fernandez <http://github.com/SirWrexes>
 *
 * Distributed under terms of the MIT license.
 */
'use strict';

const { makeIterable, asArray } = require('../helpers');

function constraint(fields, separator = 'AND') {
  const k = Object.keys(fields.reverse());
  var i = k.length - 1;
  var c = '';

  while (true) {
    c += `${k[i]} LIKE '${fields[k[i]]}'`;
    if (--i >= 0) c += ` ${separator} `;
    else break;
  }

  return c;
}

async function select(table, fields) {
  fields = asArray(fields).reverse();

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

  for (const f of asArray(fields)) {
    const names = [];
    const values = [];

    for (const [n, v] of makeIterable(f)) {
      names.push(n);
      values.push(v);
    }
    reqs.push(
      `INSERT INTO ${table} (${names.join(', ')})\n` +
        `VALUES (${values.map((v) => `'${v}'`).join(', ')})`
    );
  }

  return reqs;
}

module.exports = {
  select,
  insert,
};
