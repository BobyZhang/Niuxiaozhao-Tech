
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
})

function bgResize(container, img, initW, initH) {
  var windowsHeight = container.height();
  var windowsWidth = container.width();
  console.log(windowsWidth);
  console.log(windowsHeight);
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