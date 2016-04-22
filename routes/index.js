var express = require('express');
var fs = require('fs');
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
