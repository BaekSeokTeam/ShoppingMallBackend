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
    Price: Number,
    address:{
      
      default:{
      roadAddr:"",
      detailedAddr:""
    }},
    
    
    //orderState : ordered(주문됨)->shipping(배송중)->shiped(배송완료) / canceled(취소됨)
    orderState: String,
    orderDate:{type:Date, default:Date.now}
    
  });

Order.statics.create = function (body) {

    const newOrder = new this(body);
  
    // return the Promise
    return newOrder.save();
  };


Order.statics.findOneByID = function (user_id) {
    return this.findOne({
      user_id,
    }).exec();
  };
module.exports = mongoose.model('Order', Order);