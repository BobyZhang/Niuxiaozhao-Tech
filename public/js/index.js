
$(document).ready(function () {
  
  // For nav event
  $('.nav-button').click(function () {
    $('#hidden-nav').show();
  });
  $('.hidden-nav-li').click(function () {
    $('#hidden-nav').hide();
  });
  
  bgResize($('#home'), $(".home-background"), 1400, 729);
  $(window).resize(function () {
    // For resize home photo
    bgResize($('#home'), $(".home-background"), 1400, 729);
  })
  
  $('.send').click(function () {
    $('.tips').hide();
    // restForm($('.input-form'));
    submitForm();
  })
})

function restForm(form) {
  // clear all input
  var allInputs = form.find('input');
  for (var i = 0; i < allInputs.length; ++i) {
    console.log(allInputs[i]);
    allInputs[i].value = "";
  }
  // clear all textarea
  var allText = form.find('textarea');
  for (i = 0; i < allText.length; ++i) {
    allText[i].value = "";
  }
}

function submitForm() {
  // Fist test the valid of input
  var valid = true;
  var name = $('.input-name')[0].value;
  if (name.length == 0) {
    $('.name-tips').show();
    valid = false;
  }
  
  var email = $('.input-email')[0].value;
  var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
  if (!reg.test(email)) {
    $('.email-tips').show();
    valid = false;
  };
  
  var subject = $('.input-subject')[0].value;
  if (subject == "") {
    $('.subject-tips').show();
    valid = false;
  }
  
  var detail = $('.input-details')[0].value;
  if (detail == "") {
    $('.detail-tips').show();
    valid = false;
  }
  
  // if invalid, return
  if (!valid) return;
  
  // submit
  var submitData = {
    "name": name,
    "email": email,
    "subject": subject,
    "detail": detail
  }
  
  $.ajax({
    url: '/feedback',
    type: 'POST',
    data: submitData
  })
  .done(function (resData) {
    var res = JSON.parse(resData);
    if (res.success == 1) {
      alert("发送成功！");
    }
    else {
      alert("发送失败，稍后再试！");
    }
  })
}

function bgResize(container, img, initW, initH) {
  var windowsHeight = container.height();
  var windowsWidth = container.width();

  var windowsScale = windowsWidth / windowsHeight;

  var initWidth = initW;
  var initHeight = initH;
  var initScale = initWidth / initHeight;

  var finalWidth = 0;
  var finalHeight = 0;
  var tempScale;

  if (windowsScale >= initScale) {
    finalWidth = windowsWidth;
    tempScale = finalWidth / initWidth;
    finalHeight = initHeight * tempScale;
  }
  else {
    finalHeight = windowsHeight;
    tempScale = finalHeight / initHeight;
    finalWidth = initWidth * tempScale;
  }

  img.width(finalWidth);
  img.height(finalHeight);
}