// Environment needs to be set before doing anything else.
require('dotenv').config({
  path: require('path').join(__dirname, './.env'),
});

const { appendFile } = require('fs');
const { join } = require('path');
const bcrypt = require('bcrypt');

const server = require('./server');
const db = require('./db/index');

async function main() {
  if (!process.env.HASH_SALT) {
    const rounds = parseInt(process.env.HASH_ROUNDS || '12');
    const salt = bcrypt.genSalt(rounds);

    appendFile(join(__dirname, '.env'), `HASH_SALT=${JSON.stringify(await salt)}`, e => e && console.log(e));
    process.env.HASH_SALT = salt;
  }
  db.connect();
  server.start();
}

main();
