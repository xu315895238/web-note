var express = require('express');
var router = express.Router();

const mongo = require("mongodb-curd");


/* GET home page. */
//渲染信息页面
router.get('/', function (req, res, next) {
  var db = "resource";
  var coll = "list";
  mongo.find(db, coll, function (str) {
    res.render('index', {
      data: str
    });
  })

});

//展示信息详情
router.get('/xiangqings', function (req, res, next) {
  var db = "resource";
  var coll = "list";
  var id = req.query;
  mongo.find(db, coll, {
    _id: id.id
  }, function (str) {
    res.render('xiangqing', {
      data: str[0]
    });
  })



});

//添加信息页面
router.get('/tianjia', function (req, res, next) {
  var db = "resource";
  var coll = "list";
  res.render('geren')

});

//删除个人信息
router.post('/clears', function (req, res, next) {
  var db = "resource";
  var coll = "list";
  const data = req.body;
  mongo.find(db, coll, {
    _id: data.id
  }, function (str) {
    if (str[0].password == data.password) {
      mongo.remove(db, coll, {
        _id: data.id
      }, function () {
        res.json({
          code: 1,
          mge: "操作成功"
        })
      })

    } else {
      res.json({
        code: 0,
        mge: "操作失败"
      })
    }

  })


});


module.exports = router;