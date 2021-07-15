const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const Cart = new Schema({
    user:Schema.Types.ObjectId,
    item:Schema.Types.ObjectId,
    sizeIdx:Number
});
Cart.statics.create = function (body) {

    const newCart = new this(body);
  
    // return the Promise
    return newCart.save();
  };

module.exports = mongoose.model('Cart', Cart);