const router = require('express').Router();
const ctrl = require('../controllers/salesOrderController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.route('/').get(ctrl.getAll).post(ctrl.create);
router.route('/:id').get(ctrl.getById).put(ctrl.update).delete(ctrl.delete);

module.exports = router;
