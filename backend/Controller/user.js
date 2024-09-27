const User = require('../Model/user')

exports.getusers = async (req, res) => {
    try {
        const response = await User.find()
        console.log(response)
        res.status(200).json({response})
    } catch (err) {
        console.log(err)
    }
}

exports.getuser = async (req, res) =>{
    try{
        const id = req.query.id
        const response = await User.findById(id)
        console.log(response)
        res.status(200).json({response})
    }catch(err){
        console.log(err)
    }
}