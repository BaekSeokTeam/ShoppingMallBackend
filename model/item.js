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
    name: { type: String, required: true, unique: true },
    description: String,
    price: Number,
    size:[String],
    count:[Number],
    tag:[String],
    imgURL: [String],
    uploadedDate:{type:Date, default:Date.now}
  });

  Item.statics.create = function (body) {

    const newItem = new this(body);
  
    // return the Promise
    return newItem.save();
  };


  Item.statics.findOneByName = function (name) {
    return this.findOne({
      name,
    }).exec();
  };
  module.exports = mongoose.model('Item', Item);