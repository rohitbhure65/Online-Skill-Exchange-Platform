const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

SkillSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const Skill = mongoose.model('Skill', SkillSchema);

module.exports = Skill;
