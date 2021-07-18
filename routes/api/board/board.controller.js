const Board = require('../../../model/board');

exports.write = async(req,res) => {

    const newPost = {

    writer:req.user._id,
    title: req.body.title, 
    description: req.body.description,

    }

    await Board.create(newPost)
    return res.json({
        success:true
    })
}

exports.rewrite = (req,res) => {

    

    Board.rewritepost(req.body)
    
}

exports.deletePost = (req, res) => {


}

