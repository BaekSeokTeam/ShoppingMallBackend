const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


const User = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickname:{type: String, required: true, unique: true},
  phonenumber: { type: String, required: true },
  address:[{
    roadAddr:String,
    detailedAddr:String
  }],
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


User.statics.create = function (email,nickname, password, phonenumber) {

  const user = new this({
    email,
    nickname,
    password,
    phonenumber,
  });

  // return the Promise
  return user.save();
};
User.statics.findOneByEmailAndNickName = async function (email,nickname) {
  user=await this.findOne({
    email
  })
  if(user) return user
  user=await this.findOne({
    nickname
  })
  return user
};

// find one user by using username
User.statics.findOneByEmail = function (email) {
  return this.findOne({
    email,
  }).exec();
};
User.statics.findOneByNickname = function (nickname) {
  
  return this.findOne({
    nickname,
  }).exec();
};

User.methods.assignAdmin = function () {
  this.admin = true;
  return this.save();
};


module.exports = mongoose.model('User', User);