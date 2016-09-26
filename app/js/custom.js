$(function(){
  preloader();
  mesHeight();
});

function preloader(){

  var percent = $.animateNumber.numberStepFactories.append(' %');

  $('.num').prop("number", 0).animateNumber({
    number: 100,
    numberStep: percent
  },1500);

}

function mesHeight(){
  var section = $('section').height();
  $('span').html(section);
}


$(window).on("load",function(){

    $('.preloader').delay(500).fadeOut("slow").remove();
    $('.intro').fadeIn("slow");

});
