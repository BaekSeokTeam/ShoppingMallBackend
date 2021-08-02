const Item = require('../../../model/item');
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../../../public/images/');

exports.addItem =(req,res)=>{
    var imgURL=[]
    const files=req.files
    console.log(files)
    for(var i=0;i<files.length;i++){
        imgURL.push(`http://localhost:3000/images/`+files[i].filename)
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
        Tag:req.body.tag,
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
    
 

  const item=await Item.findOne({name:req.body.name})
  console.debug(item)
  //입력받은 이름에 해당하는 item 있는지 확인해서 없으면 false, 있으면 삭제하고 삭제한 이름 반환
  if(item == null) {
    res.json({
      success:false,
      reason:'해당하는 이름의 데이터 없음'
    })
  } else {
    //이미지삭제

      for(var i = 0;  i<item.imgURL.length; i++){
        fullURL =item.imgURL[i]
        var delURL = filePath+ fullURL.split('/')[4]
        
      
    
        fs.unlink(delURL, err => {
        
          if(err){
              console.log("파일 삭제 Error 발생");
          }
        });
     }


      Item.deleteOne({name:req.body.name}, function(err,obj){
       if (err) return res.json({success:false, err})
       res.json({
        success:item.name
          
      })
    })
  }

};

//현재는 name을 기준으로 그 외의 정보 수정
exports.editItem =async(req,res)=>{
    


    const item=await Item.findOne({name:req.body.name})
    //console.debug(item)
    //입력받은 이름에 해당하는 item 있는지 확인해서 없으면 false, 있으면 update
    if(item == null) {
      res.json({
        success:false,
        reason:'해당하는 이름의 데이터 없음'
      })
    } else {

      //안고치려고 값 안넣으면 update할때 그냥 값 지워버리는거때문에 이렇게 하긴 했는데
      //존나 비효율적인것 같음 다른 방법 있으면 좋겠다
      //섹스
      description= item.description
      price= item.price
      imgURL= item.imgURL//
      size= item.size
      count= item.count
      tag= item.tag
      //업로드데이터는 수정 x로 했는데, 아님 수정할때 수정시점 남겨야하나
      if(req.body.description != null) {
        description= req.body.description
      } 
      if(req.body.price != null) {
        price= req.body.price
      } 
      if(req.body.imgURL != null) {
        imgURL= req.body.imgURL
      } 
      if(req.body.size != null) {
        size= req.body.size
      } 
      if(req.body.count != null) {
        count= req.body.count
      } 
      if(req.body.tag != null) {
        tag= req.body.tag
      } 
      
   


      Item.updateOne({name:req.body.name},{description:description,price:price,imgURL:imgURL,size:size,count:count,Tag:tag},()=>{
        res.json({
            success:true
            
        })
    })
    }

 
};

exports.viewAllItem =async(req,res)=>{
    Item.find( (err, items) => {
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(items);
    })

};
exports.getItem =async(req,res)=>{
  console.log(req.query.item)
  const item= await Item.findOne({_id:req.query.item})
  if(item){
    res.json({
      success:true,
      item:item
    })

  }
  else{
    res.json({
      success:false,
      item:[]
    })

  }

};


exports.test =async(req,res)=>{

  const item=await Item.findOne({name:"test7"})

  for(var i = 0;  i<item.imgURL.length; i++){
    fullURL =item.imgURL[i]
    var newurl = fullURL.split('/')[4]
    var endi = filePath+newurl
    console.debug(endi)

    fs.unlink(endi, err => {
    
      if(err){
          console.log("파일 삭제 Error 발생");
      }
  });

  }
  
  res.json(item.imgURL.length);

};
