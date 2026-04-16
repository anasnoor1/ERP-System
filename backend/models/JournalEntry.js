const mongoose = require('mongoose');

const entryLineSchema = new mongoose.Schema({
  account: { type: String, required: true },
  description: { type: String },
  debit: { type: Number, default: 0 },
  credit: { type: Number, default: 0 },
});

const journalEntrySchema = new mongoose.Schema({
  entryNumber: { type: String, required: true, unique: true },
  date: { type: Date, required: true },
  lines: [entryLineSchema],
  reference: { type: String },
  notes: { type: String },
  status: { type: String, enum: ['draft', 'posted', 'void'], default: 'draft' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('JournalEntry', journalEntrySchema);
