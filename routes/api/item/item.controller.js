const Item = require('../../../model/item');

exports.addItem =async(req,res)=>{

    await Item.create(req.body)
    return res.json({
        success:true
    })
};