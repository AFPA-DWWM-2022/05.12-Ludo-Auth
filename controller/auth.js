/*
 * auth.js
 * Copyright (C) 2022 Ludovic Fernandez <http://github.com/SirWrexes>
 *
 * Distributed under terms of the MIT license.
 */
'use strict';

const { ifError } = require('assert');
const bcrypt = require('bcrypt');

const { createUsers, hasUsers } = require('../db/index');

const _RE = {
  /** At least 8 characters, with at least one occurence of {alpha, num, special} */
  pass: /^(?=.*\w)(?=.*\d)(?=.*\W).{8,}$/,

  /** Only one @, at least one character on each side, and a . at the end*/
  mail: /^[^@]+@[^@]+\./,
};

module.exports = {
  signUp: async (req, res) => {
    var e = undefined;
    const { name, mail, pass, chck } = req.body;

    if (hasUsers(mail)) {
      e = 'User already exists !';
    } else if (!_RE.mail.test(mail)) {
      e = 'Invalid email !';
    } else if (!_RE.pass.test(pass)) {
      e = 'Invalid password !';
    } else if (pass !== chck) {
      e = 'Password/Confirmation mismatch !';
    }

    ifError(e);

    createUsers({
      name,
      mail,
      pass: await bcrypt.hash(pass, process.env.HASH_SALT),
    });

    res.status(200).send('GG gros gaillard aguerri !');
  },

  singIn: undefined,
};
