$(document).ready(function(){
  $('.srchbtn').click(function () {
    $('.header-search-container').toggleClass('is-active');
  });
  $('.add').click(function () {
      var max = $('#field1 input').attr('max');
      
      if ($(this).prev().val() < parseInt(max)) {
        console.log($(this).prev().val() , ' : ' ,parseInt(max));
        $(this).prev().val(+$(this).prev().val() + 1);
      }
  });
  $('.sub').click(function () {
    var min = $('#field1 input').attr('min');
      if ($(this).next().val() > parseInt(min)) {
        if ($(this).next().val() > parseInt(min)) $(this).next().val(+$(this).next().val() - 1);
      }
  });

  $(window).scroll(function() {
    if ($(this).scrollTop() > 150){
      $('header').addClass("fixed");
    } else {
      $('header').removeClass("fixed");
    }
  });

  $('.pay-item input[type="radio"]').change(function(){
    $('.pay-item').removeClass('active');
      if( $(this).is(':checked') ){
          $(this).parents('.pay-item').addClass('active');
          console.log($(this).val());
      }
        
  });

});