var express = require('express');
var router = express.Router();

/* GET home page. */

var messages = [];
var messagebody =
{
    "message":"",
    "on":null
};


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/addtochat', function(req, res, next) {
  res.render('michat', { "messages": messages});
});
router.post('/addtochat', function(req, res, next) {

  var newMessage = {  "message": req.body.chattext,"on":Date.now()};
  messages.push(newMessage);
  messages = messages.sort(function(a,b){
    return b.on - a.on;
  });
  res.render('michat', { "messages": messages });
});
/*-------------------*/
/*
HTTP Methods
 get
 post
 put --
 delete
*/

var messagesnew = [];
function addnewMessage(usr, msg){
  var newJSONDoc = {
    "mensaje": msg,
    "usr":usr,
    "time": Date.now()
    }
    messagesnew.push(newJSONDoc);
}

function getMsgByIndex(i){
  if (i < messagesnew.length ){
    return messagesnew[i];
  }else{
    return null;
  }
}
function removeByIndex(i){
  var result = messagesnew.map(function(obj,j){
    if(j !== i){
      return obj;
    }
  });
  messagesnew = result;
}

router.get('/api/getchat',function(req,res,next){
  res.json(messagesnew);
}
);

router.get('/api/getchatitem/:index',function(req,res,next){
  res.json(getMsgByIndex(req.params.index));
}
);



router.post('/api/addtochat', function(req,res,next){
  var usr = req.body.user;
  var msg = req.body.message;
  addnewMessage(usr , msg);
  res.status(200).json({"status":"ok"});
});

router.delete("/api/removeatindex/:index",function(req,res,next){
  var i = parseInt(req.params.index);
  removeByIndex(i);
  res.status(200).json({"status":"ok"});
});



module.exports = router;
