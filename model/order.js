const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
Price:총 물건 가격
포인트로만 구매하게 하면서 price 통일
*/
const Order = new Schema({
    user_id: String,
    item_id: String,
    item_size: Number,
    item_count: Number,
    Price: number,
    
    
    
    ordetState: String,
    orderDate:{type:Date, default:Date.now}
    
  });

  Order.statics.create = function (body) {

    const newOrder = new this(body);
  
    // return the Promise
    return newOrder.save();
  };
  module.exports = mongoose.model('Order', Order);