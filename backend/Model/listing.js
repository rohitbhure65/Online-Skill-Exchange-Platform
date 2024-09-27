const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  skill_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill',
    required: true
  },
  type: {
    type: String,
    enum: ['offer', 'request'],
    required: true
  },
  details: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'pending', 'closed'],
    default: 'open',
    required: true
  },
  location: {
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
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


ListingSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const Listing = mongoose.model('Listing', ListingSchema);

module.exports = Listing;
