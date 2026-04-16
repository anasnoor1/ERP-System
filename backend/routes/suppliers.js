const router = require('express').Router();
const ctrl = require('../controllers/supplierController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.route('/').get(ctrl.getAll).post(ctrl.create);
router.route('/:id').get(ctrl.getById).put(ctrl.update).delete(authorize('admin', 'manager'), ctrl.delete);

module.exports = router;
