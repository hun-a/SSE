const db = require('./init');

const create = (title, contents, user) => new Promise((resolve, reject) => {
  db.run(
    `INSERT INTO post (title, contents, user, timestamp) VALUES (?, ?, ?, ?)`,
    [title, contents, user, Date.now()],
    function(err) { return err ? reject(err) : resolve(this.lastID) }
  );
});

const update = (id, title, contents, user) => new Promise((resolve, reject) => {
  db.run(
    `UPDATE post SET title = ?, contents = ?, user = ?, timestamp = ? WHERE id = ?`,
    [title, contents, user, Date.now(), id],
    err => err ? reject(err) : resolve()
  )
});

const destroy = id => new Promise((resolve, reject) => {
  db.run(
    `DELETE FROM post WHERE id = ?`,
    [id],
    err => err ? reject(err) : resolve()
  )
});

const select = id => new Promise((resolve, reject) => {
  db.all(
    `SELECT * FROM post WHERE id = ?`,
    [id],
    (err, row) => err ? reject(err) : resolve(row)
  )
});

module.exports = {
  create, update, destroy, select
};
