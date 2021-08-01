const Order = require('../../../model/order');

const User = require('../../../model/user');

//주문한 유저 정보는 현재 로그인한 유저
//일단 주소는 입력이 아니라 로그인한 유저의 address 가져옴. 나중에 주소 입력 추가
exports.buy =async(req,res)=>{

   
    const orderInfo={
        user_id: req.body.user_id,//일단은 입력으로 해둠
        item_id: req.body.item_id,
        item_size: req.body.item_size,
        item_count:req.body.item_count,
        price:req.body.price,
        orderState:'ordered'
        
    }

    await Order.create(orderInfo)
    return res.json({
        success:true
    })
};



//여기 말고 admin쪽으로 옮겨야 할듯한데 일단 여기 해둠
//유저 아이디랑 포인트 입력하면 포인트 넣어줌
exports.givePoint =async(req,res)=>{


    const email = req.user.email
    const user=await User.findOne({email:email})

    newPoint = User.point + req.user.point
    

    User.updateOne({email:req.user.email},{point:newPoint},()=>{
        res.json({
            success:true,
            point:newPoint
        })
    }
    )
    

};

//order id를 받아와서
exports.stateChange =async(req,res)=>{

/*
    const order=await Order.findOne({name:req.body.order_id})
    //console.debug(item)
    //입력받은 id에 해당하는 주문 있는지 확인해서 없으면 false, 있으면 update
    if(order == null) {
      res.json({
        success:false,
        reason:'해당하는 이름의 데이터 없음'
      })
    } else {

      
      newstate = req.body.state

      Order.updateOne({_id:req.body.order_id},{orderState:newstate},()=>{
        res.json({
            success:true
            
        })
    })
    }
*/
};



exports.viewAllOrder =async(req,res)=>{
    Order.find( (err, orders) => {
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(orders);
    })
};