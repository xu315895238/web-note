var express = require('express');
var router = express.Router();

const mongo=require("mongodb-curd");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//添加个人信息
router.post('/add', function(req, res, next) {
  const data=req.body;
  const db="resource";
  const coll="list";
  mongo.insert(db,coll,data,function(str){
    res.json(str)
  });
 
});

//修改个人信息
router.post('/xiugai', function(req, res, next) {
  const id=req.body.id;
  delete req.body.id;
  const data=req.body;
  console.log(data)
  const db="resource";
  const coll="list";


  mongo.update(db,coll,[{_id:id},data],function(str){
    res.json(str)
  });

});

//判断是否为本人需要验证秘钥
router.post('/isyesno', function(req, res, next) {
  const data=req.body;
  const db="resource";
  const coll="list";
 
  mongo.find(db,coll,{_id:data.id},function(str){
      if(str[0].password==data.password){
        res.json({code:1,mge:"验证成功"})
      }else{
        res.json({code:0,mge:"验证失败"})
      }

    
  })
   
 

});

module.exports = router;
