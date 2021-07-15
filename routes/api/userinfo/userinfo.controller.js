const User = require('../../../model/user');
const Cart = require('../../../model/cart');

exports.changeUserInfo =(req,res)=>{
    const phonenumber= req.body.phonenumber
    const address={
        roadAddr:req.body.roadAddr,
        detailedAddr:req.body.detailedAddr
    }
    User.updateOne({email:req.user.email},{phonenumber:phonenumber,address:address},()=>{
        res.json({
            success:true,
            phonenumber:phonenumber,
            address:address
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