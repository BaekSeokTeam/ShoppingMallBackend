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
      message: 'success'
    
    });
  };
  const onError=(error)=>{
    res.status(403).json({
      message: 'unsuccess',
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
      message: 'success'
    
    });
  };
  const onError=(error)=>{
    res.status(403).json({
      message: 'unsuccess',
      error: error.message,
     
    });
  }
  User.findOneByEmail(email)
  .then(check)
  .then(respond)
  .catch(onError);
};



exports.signUp = (req, res) => {
  const { email,nickname, password,passwordCheck, phonenumber } = req.body;

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

  // respond to the client
  const respond = (user) => {
    res.json({
      message: 'success'
    
    });
  };
  // run when there is an error (username exists)
  const onError = (error) => {
    res.status(403).json({
      
      message: 'unsuccess',
      error: error.message,

    });
  };

  // check username duplication
  User.findOneByEmailAndNickName(email,nickname)
    .then(check)
    .then(respond)
    .catch(onError);
};