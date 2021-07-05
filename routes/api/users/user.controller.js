const User = require('../../../model/user');


/*
    POST /api/user/signup
    {
        email,
        password,
        phonenumber
    }
*/

exports.signUp = (req, res) => {
  const { email, password,passwordCheck, phonenumber } = req.body;

  // create a new user if does not exist

  const create = (user) => {
    if (user) {
      throw new Error('이미 가입된 이메일 입니다.');
    } else {
        if (password!=passwordCheck){
            throw new Error('패스워드가 일치하지 않습니다.')
        }
      return User.create(email, password, phonenumber);
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
  User.findOneByEmail(email)
    .then(create)
    .then(respond)
    .catch(onError);
};