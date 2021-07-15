const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Name
// Description
// Price
// Size [] 
// Tag []
// Count [] 
// Item: _id
// ImageUrl []
// (Date)

const Item = new Schema({
    name: String,
    description: String,
    price: Number,
    imgURL: String,
    size:[String],
    count:[Number],
    Tag:[String],
    uploadedDate:{type:Date, default:Date.now}
  });

  Item.statics.create = function (body) {

    const newItem = new this(body);
  
    // return the Promise
    return newItem.save();
  };
  module.exports = mongoose.model('Item', Item);