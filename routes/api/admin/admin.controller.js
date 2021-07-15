const User = require('../../../model/user');

exports.getUserList =async(req,res)=>{
    userList=await User.find()
    res.json({
        userList:userList
    })
};


exports.changeUserState =async(req,res)=>{
    const id=req.body.userid
    const status=req.body.userStatus
    User.findByIdAndUpdate(id,{status: !status},(err,doc)=>{
        if(err){
            res.status(403).json({
                success: false
            })
        }
        else{
            res.json({
                status:!status
            })
        }
    })
 
};