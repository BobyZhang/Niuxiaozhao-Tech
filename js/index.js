
$(document).ready(function () {
  bgResize();
  $(window).resize(function () {
    // For resize home photo
    bgResize();
  })
})

function bgResize() {
  var windowsHeight = $('#home').height();
  var windowsWidth = $('#home').width();
  console.log(windowsWidth);
  console.log(windowsHeight);
  var windowsScale = windowsWidth / windowsHeight;

  var initWidth = 1400;
  var initHeight = 729;
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

  $(".home-background").width(finalWidth);
  $(".home-background").height(finalHeight);
}