$(document).ready(function(){

   var windowSize = $(window).width();

  $('.srchbtn').click(function () {
    $('.header-search-container').toggleClass('is-active');
  });
  var min = $('#field1 input').attr('min');
  var max = $('#field1 input').attr('max');
  var input = $('#qty');

   if(input.val() == 1 ){
    $('.sub').attr("disabled", true);
   }
  $('.add').click(function () {
    $('.sub').attr("disabled", false);
    if ($(this).prev().val() < parseInt(max)) {
      $(this).prev().val(+$(this).prev().val() + 1);
    }
  });
  $('.sub').click(function () {

      if ($(this).next().val() > parseInt(min)) {
        if ($(this).next().val() > parseInt(min)) $(this).next().val(+$(this).next().val() - 1);
      }
       if(input.val() == 1 ){
        $('.sub').attr("disabled", true);
       }
  });

  $(window).scroll(function() {
    if ($(this).scrollTop() > 150){
      $('header').addClass("headerShow");
      setTimeout(function() {
        $('header').addClass("fixed");
      }, 50);
    }else {
      $('header').removeClass(" headerShow");
      $('header').removeClass("fixed");
      setTimeout(function() {
        $('header').removeClass("fixed");
      }, 50);
    }
   
    var offset = $("#buyNow").offset();
    if ($(this).scrollTop() > offset.top - 88){
      $('body').addClass("fixedBuy");
    }else{
      $('body').removeClass("fixedBuy");
    }
    
    if(windowSize < 768){
    productImage();
  }

  });
  
  if(windowSize < 768){
    productImage();
  }


  $('.billing .pay-item input[type="radio"]').change(function(){
    $('.billing .pay-item').removeClass('active');
    console.log('test')
      if( $(this).is(':checked') ){
          $(this).parents('.billing .pay-item').addClass('active');
      }
        
  });

  var NewTime = new Date(Date.now() + (300 * 60 * 1000));

  $('#js-countDown, #mobile-countDown').kkCountDown({
    // starttime:'2023/08/18 08:46:00',
    // endtime:'2023/08/18 08:48:00',
    starttime: new Date(),
    endtime:NewTime,
  });

  var now1 = new Date(Date.now() + (60 * 60 * 1000));
  $('#checkout-countDown').kkCountDown({
    starttime: new Date(),
    endtime: now1,
    hidenull: true,
  });

  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

function productImage(){

   $('.productImageSLider').on('init', function(event, slick) {
      $('.slick-counter').remove();
      if(slick){
        $(this).append('<div class="slick-counter"><span class="current"></span> / <span class="total"></span></div>');
        $('.current').text(slick.currentSlide + 1);
        $('.total').text(slick.slideCount);
        console.log(slick.slideCount)
     }
     })
      .slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
     })
     .on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('.current').text(nextSlide + 1);
     });
}
});