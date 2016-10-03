$(function(){

  var percent = $.animateNumber.numberStepFactories.append(' %');

  $('.num').prop("number", 0).animateNumber({
    number: 100,
    numberStep: percent
  },1500);


  function onScrollInit( items, trigger ) {
  items.each( function() {
    var osElement = $(this),
        osAnimationClass = osElement.attr('data-animation-name'),
        osAnimationDuration = osElement.attr('data-animation-duration'),
        osAnimationDelay = osElement.attr('data-animation-delay');

        osElement.css({
          'animation-duration':          osAnimationDuration,
          'animation-delay':          osAnimationDelay
        });

        var osTrigger = ( trigger ) ? trigger : osElement;

        osTrigger.waypoint(function() {
          osElement.addClass('animated').addClass(osAnimationClass);
          },{
              triggerOnce: true,
              offset: '100%'
        });
  });
}

 onScrollInit( $('.animation') );

});


$(window).on("load",function(){

    $('.preloader').delay(500).fadeOut("slow").remove();
    $('.intro').fadeIn("slow");

});
