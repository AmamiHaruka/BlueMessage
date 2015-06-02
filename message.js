/**
 * Created by 攀松 on 2015/4/23.
 */
var mongoose = require('mongoose');
var dbUrl = 'mongodb://localhost/bluemessage';                                 /// 写入数据库地址 依情况更改
mongoose.connect(dbUrl);
console.log('dbconnection success!');
var messageSchema = new mongoose.Schema({
    content:String,
    ctitle:String
},{
    collection:'msgs'
});
var messageModel = mongoose.model('Message',messageSchema);
function Message(message){
    this.content = message.content;
    this.ctitle = message.ctitle;
};
Message.prototype.save = function(callback){
    var message ={
        content:this.content,
        ctitle:this.ctitle
    };
    var newMessage = new messageModel(message);
    newMessage.save(function(err,post){
        if(err){
            return callback(err);
        }
       // console.log('Lianjie shengc');
        callback(null,post);
    });
};
Message.getall = function(callback){
    messageModel.find({} ,function(err,docs){
        if(err){
            return callback(err);
        }
       // console.log(docs[0].content);
        callback(null,docs);
    });
};
module.exports = Message;