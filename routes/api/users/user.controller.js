const { checkout } = require('.');
const User = require('../../../model/user');


/*
    POST /api/user/signup
    {
        email,
        password,
        phonenumber
    }
*/
exports.findNickname = (req, res) => {

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
      body: {
        error: error.message,
      },
    });
  };

  // check username duplication
  User.findOneByEmailAndNickName(email,nickname)
    .then(check)
    .then(respond)
    .catch(onError);
};