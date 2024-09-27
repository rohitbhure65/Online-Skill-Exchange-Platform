const express = require('express')
const User = require('../Model/user')

const router = express.Router()
const usercontrollers = require('../Controller/user')

router
    // .post('/users', usercontrollers.postusers)
    .get('/users', usercontrollers.getusers)
    .get('/user/:id', usercontrollers.getuser)
    // .put('/user/:id', usercontrollers.putuser)
// .patch('/users/:id', usercontrollers.patchuser)
// .delete('/user/:id', usercontrollers.deleteuser)

exports.routes = router