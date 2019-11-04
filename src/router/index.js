const { Router } = require('express');
const controller = require('../controller');

const router = Router();

router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/:id', controller.select);

module.exports = router;
