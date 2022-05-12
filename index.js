// Environment needs to be set before doing anything else.
require('dotenv').config({
  path: require('path').join(__dirname, './.env'),
});

const server = require('./server');
const db = require('./db/index');

async function main() {
  db.connect();
  server.start();
}

main();
