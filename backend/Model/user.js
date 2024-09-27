const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profile_pic: { type: String },
    gender: { type: String },
    bio: { type: String },
    location: {
        city: { type: String },
        state: { type: String },
        country: { type: String }
    },
    skills_offered: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
    skills_needed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
    rating: {
        average_rating: { type: Number },
        total_rating: { type: Number }
    },
    token: { type: String },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
