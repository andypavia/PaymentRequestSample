$(document).ready(function() {
  //Loading the same code into the HTML

  $('#static-shipping-sample').html(Global.startPaymentRequestStaticShipping.toString());

  $('#dynamic-shipping-sample').html(Global.startPaymentRequestDynamicShipping.toString());

  $('#no-shipping-sample').html(Global.startPaymentRequestDigitalMerchandise.toString());

  $('#request-contact-sample').html(Global.startPaymentRequestWithContactInfo.toString());

  //attaching event listeners

  $('#request-contact-info').click(Global.startPaymentRequestWithContactInfo);

  $('#no-shipping').click(Global.startPaymentRequestDigitalMerchandise);

  $('#dynamic-shipping').click(Global.startPaymentRequestDynamicShipping);

  $('#static-shipping').click(Global.startPaymentRequestStaticShipping);

  $('.top-bar').click((event) =>{
    var expander = $(event.target).parent().find('.expander')
    if(expander.hasClass('expand')){
      expander.removeClass('expand')
      event.target.innerHTML = 'See the code'
    } else {
      expander.addClass('expand')
      event.target.innerHTML = 'Hide the code'
    }
  })

  //highlighting samples

  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
});
