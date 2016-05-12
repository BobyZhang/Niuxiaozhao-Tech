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

router.post('/api/feedback', function (req, res, next) {
  var resData = {
    "success": 1
  }

  fs.readFile('./feedback.json', {flag: 'a+', encoding: 'utf8'}, function (err, data) {
    if (err) {
      console.log(err);
      resData.success = 0;
      res.send(JSON.stringify(resData));
    }
    else {
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
          console.log('write success!');
          resData.success = 1;
          res.send(JSON.stringify(resData));
        }
      })
      
      // send email
      sendEmail({
        user: 'XXX@qq.com',
        pass: 'XXX'
      }, '570932322@qq.com', '仙人掌官网反馈', req.body);
    }
  })
})

function sendEmail(sender, target, subject, content) {
  
  var smtpTransport = nodemailer.createTransport("SMTP", {
    host: 'smtp.qq.com',
    port: 465, // SMTP 端口
    secureConnection: true,
    requiresAuth: true,
    domains: ["qq.com"],
    auth: {
      user: sender.user, // 账号
      pass: sender.pass // 密码
    }
  });
 
  var mailOptions = {
    from: '邮件转发 <' + sender.user + '>', // 发件地址
    to: target, // 收件列表
    subject: subject, // 标题
    html: generateHtml(content) // html 内容
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
}

function generateHtml(content) {
  var html = "";
  for (attr in content) {
    html += attr + ': ' + content[attr] + '</br></br>';
  }
  return html;
}
module.exports = router;
