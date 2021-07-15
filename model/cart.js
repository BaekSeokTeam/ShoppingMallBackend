const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const Cart = new Schema({
    user:Schema.Types.ObjectId
});

module.exports = mongoose.model('Cart', Cart);