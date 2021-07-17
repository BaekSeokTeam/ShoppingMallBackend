const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*

totalPrice:총 물건 가격
payPrice:직접 결제한 금액
pointPrice: 포인트로 결제한 금액
*/
const Order = new Schema({
    user_id: String,
    item_id: String,
    item_size: Number,
    item_count: Number,

    totalPrice: Number,
    pointPrice: Number,
    payPrice: number,
    
    
    
    ordetState: String,
    orderDate:{type:Date, default:Date.now}
    
  });

  Order.statics.create = function (body) {

    const newOrder = new this(body);
  
    // return the Promise
    return newOrder.save();
  };
  module.exports = mongoose.model('Order', Order);