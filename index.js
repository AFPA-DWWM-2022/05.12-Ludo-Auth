// Environment needs to be set before doing anything else.
require('dotenv').config({
  path: require('path').join(__dirname, './.env'),
});

const { appendFile } = require('fs');
const { join } = require('path');
const { genSalt } = require('bcrypt');

const server = require('./server');
const db = require('./db/index');
const { ifError } = require('assert');

async function main() {
  if (!process.env.HASH_SALT) {
    const rounds = parseInt(process.env.HASH_ROUNDS || '12');
    const salt = genSalt(rounds);

    appendFile(
      join(__dirname, '.env'),
      `HASH_SALT=${JSON.stringify(await salt)}`,
      ifError
    );
    process.env.HASH_SALT = salt;
  }
  db.connect();
  server.start();
}

main();
