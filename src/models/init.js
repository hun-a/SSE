const sqlite3 = require('sqlite3');

const db = new sqlite3.Database(
  ':memory:',
  err => console.log(err ? err : 'Connected to the in-memory SQlite DB')
);

const createQuery = `
  CREATE TABLE IF NOT EXISTS post(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(256),
    contents TEXT,
    user VARCHAR(256),
    timestamp INTEGER
  )
`;

db.serialize(() => db.each(createQuery));

module.exports = db;
