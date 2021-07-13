const User = require('../../../model/user');

exports.changeUserInfo =(req,res)=>{
    
    User.updateOne({email:req.user.email},{phonenumber:req.body.phonenumber},()=>{
        res.json({
            success:"hi"
        })
    }
    )
    
};