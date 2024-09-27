const express = require('express')

const router = express.Router()
const usercontrollers = require('../Controller/user')

router
    .get('/users', usercontrollers.getUsers)
    .get('/user/:id', usercontrollers.getUser)
    .put('/user/:id', usercontrollers.replaceUser)
    .patch('/users/:id', usercontrollers.updateUser)
    .delete('/user/:id', usercontrollers.deleteUser)

exports.routes = router