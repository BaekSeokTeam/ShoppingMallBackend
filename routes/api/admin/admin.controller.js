const User = require('../../../model/user');

exports.getUserList =async(req,res)=>{
    userList=await User.find()
    res.json({
        userList:userList
    })
};