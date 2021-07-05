const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


const User = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phonenumber: { type: String, required: true },
  admin: { type: Boolean, default: false },
});

// create new User document
User.pre("save", function (next) { 

    var user = this;
    if (user.isModified("password")) { 
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) return next(err);
          user.password = hash;
          next();
        });
      });
    } else {
      next();
    }
  });
User.statics.create = function (email, password, phonenumber) {

  const user = new this({
    email,
    password,
    phonenumber,
  });

  // return the Promise
  return user.save();
};

// find one user by using username
User.statics.findOneByEmail = function (email) {
  return this.findOne({
    email,
  }).exec();
};





module.exports = mongoose.model('User', User);