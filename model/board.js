const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Board = new Schema({

    writer: {type: Schema.Types.ObjectId, ref: 'user'},
    title: {type: String, required: true}, 
    description: {type: String, required: true},
    date: {type: Date, default: Date.now}

});

Board.statics.create = function ( body ) {

    const newBoard = new this(body);
    return newBoard.save();

};

Board.statics.rewritepost = async function ( body ) {

    const boardId=body.boardId;
    const description=body.description;
    await Board.findOne({"_id":boardId},{description:description})
    res.json({  
        success:true,
        description:description
    })
    

};

module.exports = mongoose.model('Board', Board);