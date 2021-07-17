const Item = require('../../../model/item');
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../../../public/api/');

exports.addItem =(req,res)=>{
    var imgURL=[]
    const files=req.files
    for(var i=0;i<files.length;i++){
        imgURL.push('http://localhost:3000'+ '/api/' + files[i].filename)
    }

//    res.json({
//        body:req.body
//    })
    const itemInfo={
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        size:req.body.size,
        count:req.body.count,
        tag:req.body.tag,
        imgURL: imgURL
    }

    const create = (item) => {
        if (item) {

        for(var i=0;i<files.length;i++){
          fs.access(filePath + files[i].filename, fs.constants.F_OK, (err) => {
            if (err) console.log('file cannot be deleted');
            else {
              fs.unlink(filePath + files[i].filename, (err) => {
                if (err) {
                  console.log(err);
                }
              });
            }
          });
        }
          throw new Error('item exists');
        } else {
          return Item.create(itemInfo);
        }
      };

    const respond = (itemInfo) => {
        res.json({
            success:true
        });
      };
    const onError = (error) => {
        res.status(403).json({
            success:false,
            error:error.message
        });
      };
      Item.findOneByName(itemInfo.name).then(create).then(respond).catch(onError);
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