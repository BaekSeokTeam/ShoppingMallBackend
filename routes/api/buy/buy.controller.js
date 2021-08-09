const Order = require('../../../model/order');

const User = require('../../../model/user');

//주문한 유저 정보는 현재 로그인한 유저
//일단 주소는 입력이 아니라 로그인한 유저의 address 가져옴. 나중에 주소 입력 추가
exports.buy =async(req,res)=>{

    const buyer=await User.findOne({email:req.body.email}) // 일단 req에서 주는거로 해둠

    if(buyer == null) {
        res.json({
          success:false,
          reason:'계정 에러'
        })
    } else if(buyer.point < req.body.price){
        res.json({
            success:false,
            reason:'포인트 잔액 부족'
          })
    } else {
        const orderInfo={
            user_id: buyer._id,
            item_id: req.body.item_id,
            item_size: req.body.item_size,
            item_count:req.body.item_count,
            price:req.body.price,
            address:buyer.address[0],
            orderState:'ordered'
            
        }
        afterpoint = buyer.point -req.body.price
        console.log(afterpoint)
        User.updateOne({email:req.body.email},{point:afterpoint},()=>{
            
        });


        await Order.create(orderInfo)
        return res.json({
            success:true
        })
    }
   



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

//주문 전체삭제
//
exports.deleteAllOrder =async(req,res)=>{

    
    Order.deleteMany({}, function(err,obj){
        if (err) return res.json({success:false, err})
        res.json({
         success:true
           
       })
    })
};