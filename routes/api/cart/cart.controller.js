const Cart = require('../../../model/cart');

exports.addCart =async(req,res)=>{
    console.log(req.body)
    const query={
        user:req.user._id,
        item:req.body.item,
        sizeIdx:req.body.sizeIdx

    }

    await Cart.create(query)
    return res.json({
        success:true
    })
};
exports.showAll =async(req,res)=>{


    cart=await Cart.find({user:req.user._id})
    return res.json({
        success:true,
        cart:cart
    })
};

exports.deleteCart =async(req,res)=>{
    console.log(req.body.cart)
    await Cart.deleteOne({_id:req.body.cart})
    return res.json({
        success:true
    })
};
exports.getCartInfo =async(req,res)=>{
    cart=await Cart.findOne({_id:req.query.id})
    return res.json({
        success:true,
        cart:cart
    })
};