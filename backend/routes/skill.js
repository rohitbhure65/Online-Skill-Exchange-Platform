const express = require('express')

const router = express.Router()
const skillController = require('../Controller/skill')

router
    .post('/skills', skillController.createSkill)
    .get('/skills', skillController.getSkills)
    .get('/skills/:id', skillController.getSkill)
    .put('/skills/:id', skillController.replaceSkill)
    .patch('/skills/:id', skillController.updateSkill)
    .delete ('/skills/:id', skillController.deleteSkill)


exports.routes = router