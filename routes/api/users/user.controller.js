//const { checkout } = require('.');
const User = require('../../../model/user');

exports.checkNickname = (req, res) => {
  console.log(req.query.nickname)
  const nickname=req.query.nickname
  const check=(user)=>{
    if(user){
      throw new Error('이미 가입된 닉네임 입니다.');
    }
    return user
  };
  
  const respond=(True)=>{
    res.json({
      success:true,
      nickname:nickname
    
    });
  };
  const onError=(error)=>{
    res.status(403).json({
      success: false,
      error: error.message,
     
    });
  }
  User.findOneByNickname(nickname)
  .then(check)
  .then(respond)
  .catch(onError);

};




exports.checkEmail = (req, res) => {
  const email=req.query.email
  const check=(user)=>{
    if(user){
      throw new Error('이미 가입된 이메일 입니다.');
    }
    return user;
  };
  const respond=()=>{
    res.json({
      success: true,
      email:email
    
    });
  };
  const onError=(error)=>{
    res.status(403).json({
      success: false,
      error: error.message,
     
    });
  }
  User.findOneByEmail(email)
  .then(check)
  .then(respond)
  .catch(onError);
};



exports.signUp = (req, res) => {
  console.log(req.body)

  const email=req.body.Email
  const nickname=req.body.Nickname
  const password=req.body.Password
  const passwordCheck=req.body.PasswordCheck
  const phonenumber=req.body.PhoneNumber

  // create a new user if does not exist

  const check = (user) => {
    if (user) {
      if (user.email==email){
        throw new Error('이미 가입된 이메일 입니다.');
      }
      else{
        throw new Error('이미 가입된 닉네임 입니다.');
      }
    } else {
        if (password!=passwordCheck){
            throw new Error('패스워드가 일치하지 않습니다.')
        }
      return User.create(email,nickname, password, phonenumber);
    }
  };
  const count = (user) => {
    newUser = user;
    return User.count({}).exec();
  };

  const assign = (count) => {
    if (count === 1) {
      return newUser.assignAdmin();
    } else {
      // if not, return a promise that returns false
      return Promise.resolve(false);  
    }
  };

  // respond to the client
  const respond = (isAdmin) => {

    return res.json({
      singup: true
    
    });
  };
  // run when there is an error (username exists)
  const onError = (error) => {

    res.status(200).json({
      
      signup: false,  
      error: error.message,

    });
  };

  // check username duplication
  User.findOneByEmailAndNickName(email,nickname)
    .then(check)
    .then(count)
    .then(assign)
    .then(respond)
    .catch(onError);
};