const User = require('../../../model/user');

exports.getUserList =async(req,res)=>{
    userList=await User.find()
    res.json({
        userList:userList
    })
};


exports.changeUserState =async(req,res)=>{
    const id=req.body.userid
    const status=req.body.userStatus
    User.findByIdAndUpdate(id,{status: !status},(err,doc)=>{
        if(err){
            res.status(403).json({
                success: false
            })
        }
        else{
            res.json({
                status:!status
            })
        }
    })
 
};

//유저 이메일과 포인트를 전달받아 해당 계정에 포인트 지급
//포인트에 음수 주면 제거도 될듯?
exports.givePoint =async(req,res)=>{


    const email = req.body.email
    const user=await User.findOne({email:email})

    newPoint = user.point + req.body.point
    

    User.updateOne({email:req.body.email},{point:newPoint},()=>{
        res.json({
            success:true,
            point:newPoint
        })
    }
    )
    

};

//아이디 받아서 삭제
//undo같은거없음 신중하게 삭제하자!
exports.userDelete =async(req,res)=>{



    const user=await User.findOne({email:req.body.email})
    console.debug(user)
    //입력받은 이름에 해당하는 item 있는지 확인해서 없으면 false, 있으면 삭제하고 삭제한 이름 반환
    if(user == null) {
      res.json({
        success:false,
        reason:'해당하는 이름의 데이터 없음'
      })
    } else {  
  
        User.deleteOne({email:req.body.email}, function(err,obj){
         if (err) return res.json({success:false, err})
         res.json({
          success:user.name
            
        })
      })
    }
  
};