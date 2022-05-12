/*
 * buildSelectRequest.js
 * Copyright (C) 2022 Ludovic Fernandez <http://github.com/SirWrexes>
 *
 * Distributed under terms of the MIT license.
 */
'use strict';

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

  if (!(fields instanceof Array)) fields = [fields];

  fields.map((f) => {
    Object.assign(f, {
      *[Symbol.iterator]() {
        const k = Object.keys(this).sort();
        let step = 0;
        return {
          next() {
            step += 1;
            if (step++ >= k.length) return { done: true, value: null };
            return {
              done: false,
              value: { name: k[step], value: this[k[step]] },
            };
          },
        };
      },
    });
  });

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
