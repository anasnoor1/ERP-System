const Employee = require('../models/Employee');

exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 20, search, department } = req.query;
    const query = {};
    if (search) query.$or = [{ firstName: new RegExp(search, 'i') }, { lastName: new RegExp(search, 'i') }];
    if (department) query.department = department;
    const data = await Employee.find(query).sort('-createdAt').limit(+limit).skip((+page - 1) * +limit);
    const total = await Employee.countDocuments(query);
    res.json({ data, total, page: +page, pages: Math.ceil(total / +limit) });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
exports.getById = async (req, res) => {
  try { const doc = await Employee.findById(req.params.id); doc ? res.json(doc) : res.status(404).json({ message: 'Not found' }); }
  catch (err) { res.status(500).json({ message: err.message }); }
};
exports.create = async (req, res) => {
  try { res.status(201).json(await Employee.create(req.body)); }
  catch (err) { res.status(400).json({ message: err.message }); }
};
exports.update = async (req, res) => {
  try { const doc = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true }); doc ? res.json(doc) : res.status(404).json({ message: 'Not found' }); }
  catch (err) { res.status(400).json({ message: err.message }); }
};
exports.delete = async (req, res) => {
  try { await Employee.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); }
  catch (err) { res.status(500).json({ message: err.message }); }
};
