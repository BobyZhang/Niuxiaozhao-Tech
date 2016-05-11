var express = require('express');
var fs = require('fs');
var nodemailer = require('nodemailer');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function (req, res, next) {
  res.send('This is a test');
});

router.post('/feedback', function (req, res, next) {
  console.log(req.body);
  var resData = {
    "success": 1
  }
  
  var smtpTransport = nodemailer.createTransport("SMTP", {
    host: 'smtp.qq.com',
    port: 465, // SMTP 端口
    secureConnection: true,
    requiresAuth: true,
    domains: ["qq.com"],
    auth: {
      user: "877208487@qq.com", // 账号
      pass: "zsb0213AA" // 密码
    }
  });
 
  var mailOptions = {
    from: "Boby <877208487@qq.com>", // 发件地址
    to: "zhangshibao1@live.com", // 收件列表
    subject: "Hello world", // 标题
    html: "<b>thanks a for visiting!</b> 世界，你好！" // html 内容
  }
  
  // 发送邮件
  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
      console.log(error);
    }else{
      console.log("Message sent: " + response.message);
    }
    smtpTransport.close(); // 如果没用，关闭连接池
  });

  fs.readFile('./feedback.json', {flag: 'a+', encoding: 'utf8'}, function (err, data) {
    if (err) {
      console.log(err);
      resData.success = 0;
      res.send(JSON.stringify(resData));
    }
    else {
      console.log('open success');
      var all = [];
      if (data != "") {
        all = JSON.parse(data);
      }
      all.push(req.body);
      
      // write
      fs.writeFile('./feedback.json', JSON.stringify(all), function (err) {
        if (err) {
          console.log(err);
          resData.success = 0;
          res.send(JSON.stringify(resData));
        }
        else {
          resData.success = 1;
          res.send(JSON.stringify(resData));
        }
      })
    }
  })
})

module.exports = router;
