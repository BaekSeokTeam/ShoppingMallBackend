const Cart = require('../../../model/cart');

exports.addCart =async(req,res)=>{


    await Cart.create(req.body)
    return res.json({
        success:true
    })
};