const models = require('../models');

const send = (req, res) => {
  process.on('change', data => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  });
};

const notifier = (req, res, next) => {
  /**
   * format
   * {
   *  id: posting ID,
   *  type: CREATE or UPDATE or DELETE
   *  timestamp: Unix Epoch timestamp
   * }
   */
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  });
  res.write('\n');
  send(req, res);
};

const create = (req, res, next) => {
  const { title, contents, user } = req.body;
  models.create(title, contents, user)
    .then(id => {
      process.emit('change', { id, type: 'create', timestamp: Date.now() });
      res.json({ id });
    })
    .catch(next);
};

const update = (req, res, next) => {
  const { params: { id }, body: { title, contents, user } } = req;
  models.update(id, title, contents, user)
    .then(() => {
      process.emit('change', { id, type: 'update', timestamp: Date.now() });
      res.json({ id });
    })
    .catch(next);
};

const destroy = (req, res, next) => {
  const { id } = req.params;
  models.destroy(id)
    .then(() => {
      process.emit('change', { id, type: 'delete', timestamp: Date.now() });
      res.json({ id });
    })
    .catch(next);
};

const select = (req, res, next) => {
  const { id } = req.params;
  models.select(id)
    .then(result => res.json(result))
    .catch(next);
};

module.exports = {
  create, notifier, update, destroy, select
};
