$(function(){
  
//ANIMATION ELEMENTS WHEN SCROLL
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
                offset: '30%'
          });
    });
  }
  onScrollInit( $('.red-monster-anim'), $('#about') );
  onScrollInit( $('.purple-monster-anim'), $('#color') );
  onScrollInit( $('.marvel-animation'), $('#marvel') );


// SELECT BG COLORS
  function bgColorChange(){
    $('.colors-box').click(function(){
       $(this).parents().eq(5).css('background-color', $(this).data('color'));
    });
  }
  bgColorChange();

// LINE SVG ANIMATION
  function lineAnimation(){
    var div = $('#marvel');

    div.waypoint(function(){
      $('.animMarvel .path').addClass('js-dash');
    });
  }
  lineAnimation();

});
