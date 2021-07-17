const Item = require('../../../model/item');

exports.addItem =async(req,res)=>{

    await Item.create(req.body)
    return res.json({
        success:true
    })
};

//현재는 name을 기준으로 삭제
exports.deleteItem =async(req,res)=>{
    

    Item.deleteOne({name:req.body.name}, function(err,obj){
        if (err) return res.json({success:false, err})
        res.json({
            success:req.body.name
            
        })
    })

};

//현재는 name을 기준으로 그 외의 정보 수정
exports.editItem =async(req,res)=>{
    const description= req.body.description

    Item.updateOne({name:req.body.name},{description:description},()=>{
        res.json({
            success:true
            
        })
    })
};

exports.viewAllItem =async(req,res)=>{
    Item.find( (err, items) => {
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(items);
    })

};