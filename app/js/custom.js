$(function(){

  var percent = $.animateNumber.numberStepFactories.append(' %');

  $('.num').prop("number", 0).animateNumber({
    number: 100,
    numberStep: percent
  },1500);


  var section = $('section').height();
  $('span').html(section);

  $('#about').waypoint(function(direction) {
    $('.robot-1').addClass('animated moveRobot');
  });

});


$(window).on("load",function(){

    $('.preloader').delay(500).fadeOut("slow").remove();
    $('.intro').fadeIn("slow");

});
