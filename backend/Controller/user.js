const User = require('../Model/user')

exports.getUsers = async (req, res) => {
    try {
        const response = await User.find().populate('skills_offered').populate('skills_needed')
        console.log(response)
        res.status(200).json({ response })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'users not found' });
    }
}

exports.getUser = async (req, res) => {
    try {
        const id = req.params.id
        const response = await User.findById(id).populate('skills_offered').populate('skills_needed')
        console.log(response)
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Error user not found ' });
    }
}

// UPDATE - PUT /users/:id
exports.replaceUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findOneAndReplace({ _id: id }, req.body, { new: true }).populate('skills_offered', 'skills_needed');
        res.status(201).json(user);
    } catch (err) {
        res.status(401).json(err);
    }
};

// UPDATE - PATCH /users/:id
exports.updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findOneAndUpdate({ _id: id }, req.body, { new: true }).populate('skills_offered').populate('skills_needed')
        res.status(201).json(user);
    } catch (err) {
        res.status(401).json(err);
    }
};

// DELETE - DELETE /users/:id
exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findOneAndDelete({ _id: id }, { new: true }).populate('skills_offered').populate('skills_needed')
        res.status(201).json(user);
    } catch (err) {
        res.status(401).json(err);
    }
};