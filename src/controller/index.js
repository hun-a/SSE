const models = require('../models');

const create = (req, res, next) => {
  const { title, contents, user } = req.body;
  models.create(title, contents, user)
    .then(() => res.send('OK'))
    .catch(next);
};

const update = (req, res, next) => {
  const { params: { id }, body: { title, contents, user } } = req;
  models.update(id, title, contents, user)
    .then(() => res.send('OK'))
    .catch(next);
};

const destroy = (req, res, next) => {
  const { id } = req.params;
  models.destroy(id)
    .then(() => res.send('OK'))
    .catch(next);
};

const select = (req, res, next) => {
  const { id } = req.params;
  models.select(id)
    .then(result => res.json(result))
    .catch(next);
};

module.exports = {
  create, update, destroy, select
};
