const User = require('../../../model/user');
const Cart = require('../../../model/cart');

exports.changeUserInfo =(req,res)=>{
    const nickname= req.body.nickname

    User.updateOne({email:req.user.email},{nickname:nickname},()=>{
        res.json({
            success:true,
            nickname:nickname
        })
    }
    )
    
};
exports.getCart =async (req,res)=>{
   const cart=await Cart.find({user:req.user._id})
    res.json({
        cart:cart
    })
};