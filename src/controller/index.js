const models = require('../models');
const SSE = require('../sse');

const sse = new SSE('POSTING');

const notifier = (req, res, next) => {
  sse.register(req, res);
};

const create = (req, res, next) => {
  const { title, contents, user } = req.body;
  models.create(title, contents, user)
    .then(id => {
      sse.detect(id, 'create');
      res.json({ id });
    })
    .catch(next);
};

const update = (req, res, next) => {
  const { params: { id }, body: { title, contents, user } } = req;
  models.update(id, title, contents, user)
    .then(() => {
      sse.detect(id, 'update');
      res.json({ id });
    })
    .catch(next);
};

const destroy = (req, res, next) => {
  const { id } = req.params;
  models.destroy(id)
    .then(() => {
      sse.detect(id, 'delete');
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
