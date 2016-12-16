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

  //Hide demo buttons if the browser doesn't support the Payment Request API
  if (!('PaymentRequest' in window)) {
    $('.not-supported').html('This browser does not support web payments. You should try Microsoft Edge.')
    $('button').each(function(i, block) {
      block.setAttribute('style', 'display: none;');
    });
  }

  //Expand or contract code displayer
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
