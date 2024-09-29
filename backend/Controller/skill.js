const Skill = require('../Model/skill');

// CREATE - POST /skills
exports.createSkill = async (req, res) => {
    try {
        const newSkill = new Skill(req.body); 
        const savedSkill = await newSkill.save(); 
        res.status(201).json(savedSkill); 
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: 'Error creating skill' });
    }
};

// GET all skills
exports.getSkills = async (req, res) => {
    try {
        const response = await Skill.find();
        console.log(response);
        res.status(200).json({ response });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Skills not found' });
    }
};

// GET a single skill by ID
exports.getSkill = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await Skill.findById(id);
        console.log(response);
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Skill not found' });
    }
};

// UPDATE - PUT /skills/:id (replace skill)
exports.replaceSkill = async (req, res) => {
    const id = req.params.id;
    try {
        const skill = await Skill.findOneAndReplace({ _id: id }, req.body, { new: true });
        res.status(201).json(skill);
    } catch (err) {
        res.status(401).json(err);
    }
};

// UPDATE - PATCH /skills/:id (update skill)
exports.updateSkill = async (req, res) => {
    const id = req.params.id;
    try {
        const skill = await Skill.findOneAndUpdate({ _id: id }, req.body, { new: true });
        res.status(201).json(skill);
    } catch (err) {
        res.status(401).json(err);
    }
};

// DELETE - DELETE /skills/:id
exports.deleteSkill = async (req, res) => {
    const id = req.params.id;
    try {
        const skill = await Skill.findOneAndDelete({ _id: id });
        res.status(201).json(skill);
    } catch (err) {
        res.status(401).json(err);
    }
};
