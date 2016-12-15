var Global = {}

Global.startPaymentRequestStaticShipping = function()  {

  var methodData = [{
    supportedMethods: ['basic-card'],
    data: {
      supportedNetworks: ['visa', 'mastercard', 'amex'],
      supportedTypes: ['credit']
    }
  }];

  var details =  {
    displayItems: [{
      label: "Sub-total",
      amount: { currency: "USD", value : "100.00" }, // US$100.00
    },
    {
      label: "Sales Tax",
      amount: { currency: "USD", value : "9.00" }, // US$9.00
    }],
    total:  {
      label: "Total due",
      amount: { currency: "USD", value : "109.00" }, // US$109.00
    },
    shippingOptions: [{
      id: 'NO_RUSH',
      label: 'No-Rush Shipping',
      amount: { currency: 'USD', value: '0.00' },
      selected: true
    }, {
      id: 'STANDARD',
      label: 'Standard Shipping',
      amount: { currency: 'USD', value: '5.00' }
    }, {
      id: 'EXPEDITED',
      label: 'Two-Day Shipping',
      amount: { currency: 'USD', value: '7.00' }
    }]
  };

  var options = {
    requestShipping: true
  };

  //constructor
  var request = new PaymentRequest(methodData, details, options);

  //Show the Native UI
  request.show()

  //When the promise is fulfilled, show the Wallet's success view
  //In a real world scenario, the result obj would be sent
  //to the server side for processing.
  .then(function(result) {
    return result.complete('success');
  });

  //Listen to a shipping option change
  paymentRequest.addEventListener('shippingoptionchange', function(changeEvent) {
    changeEvent.updateWith(new Promise(function(resolve) {
      onShippingOptionChange(paymentRequest);
      resolve(details);
    }));
  });

  function onShippingOptionChange(pr) {
    if (pr.shippingOption) {
      for (var index = 0; index < details.shippingOptions.length; index++) {
        var opt = details.shippingOptions[index];
        if (opt.id == pr.shippingOption) {
          var shippingOption = opt;
          break;
        }
      }
      if (!shippingOption) {
        return;
      }
      console.log('shippingOptionChange: ' + shippingOption.label);
      var shippingCost = Number(shippingOption.amount.value);

      details.displayItems = [{
         label: 'Sub-total',
         amount: { currency: 'USD', value: subtotal.toFixed(2) }
      }, {
         label: 'Shipping',
         amount: { currency: 'USD', value: shippingCost.toFixed(2) },
         pending: false
      }, {
         label: 'Sales Tax',
         amount: { currency: "USD", value: tax.toFixed(2) }
      }]
      var totalAmount = subtotal + shippingCost + tax;
      details.total.amount.value = Math.max(0, totalAmount).toFixed(2);
    }
  }
}

Global.startPaymentRequestDynamicShipping = function()  {

  var methodData = [{
    supportedMethods: ['basic-card'],
    data: {
      supportedNetworks: ['visa', 'mastercard', 'amex'],
      supportedTypes: ['credit']
    }
  }];

  var subtotal = 44.00;
  var tax = 4.40;
  var details = {
    total: {
      label: 'Total due',
      amount: { currency: 'USD', value: (subtotal + tax).toFixed(2) }
    },
    displayItems: [{
        label: 'Sub-total',
        amount: { currency: 'USD', value: subtotal.toFixed(2) }
      }, {
        label: 'Shipping',
        amount: { currency: 'USD', value: '0.00' },
        pending: true
      }, {
        label: 'Sales Tax',
        amount: { currency: "USD", value: tax.toFixed(2) }
    }]
  };

  var options = {
    requestShipping: true
  };

  //constructor
  var request = new PaymentRequest(methodData, details, options);

  //Show the Native UI
  request.show()

  //When the promise is fulfilled, show the Wallet's success view.
  //In a real world scenario, the result obj would be sent
  //to the server side for processing.
  .then(function(result) {
    // process transaction response here
    return result.complete('success');
  });

  //Listen to a shipping address change
  paymentRequest.addEventListener('shippingaddresschange', function(changeEvent) {
    changeEvent.updateWith(new Promise(function(resolve) {
      onShippingAddressChange(paymentRequest);
      resolve(details);
    }));
  });

  //Listen to a shipping option change
  paymentRequest.addEventListener('shippingoptionchange', function(changeEvent) {
    changeEvent.updateWith(new Promise(function(resolve) {
      onShippingOptionChange(paymentRequest);
      resolve(details);
    }));
  });

  function onShippingOptionChange(pr) {
    if (pr.shippingOption) {
      for (var index = 0; index < details.shippingOptions.length; index++) {
        var opt = details.shippingOptions[index];
        if (opt.id == pr.shippingOption) {
          var shippingOption = opt;
          break;
        }
      }
      if (!shippingOption) {
        return;
      }
      console.log('shippingOptionChange: ' + shippingOption.label);
      var shippingCost = Number(shippingOption.amount.value);

      details.displayItems = [{
        label: 'Sub-total',
        amount: { currency: 'USD', value: subtotal.toFixed(2) }
      }, {
        label: 'Shipping',
        amount: { currency: 'USD', value: shippingCost.toFixed(2) },
        pending: false
      }, {
        label: 'Sales Tax',
        amount: { currency: "USD", value: tax.toFixed(2) }
      }]
      var totalAmount = subtotal + shippingCost + tax;
      details.total.amount.value = Math.max(0, totalAmount).toFixed(2);
    }
  }

  function onShippingAddressChange(pr) {
    var addr = pr.shippingAddress;
    var strAddr = addr.addressLine[0] + ', ' + addr.region + ' ' + addr.postalCode
    console.log('shippingAddressChange: ' + strAddr);

    if (addr.country === 'US') {
      details.shippingOptions = getShippingOptions(addr.region);
      // shipping no longer pending, pre-selected
      details.displayItems[1].pending = false;
    } else {
      delete details.shippingOptions;
    }
  }

  function getShippingOptions(state) {
    switch (state) {
      case 'WA':
      case 'OR':
        return [{
            id: 'NO_RUSH',
            label: 'No-Rush Shipping',
            amount: { currency: 'USD', value: '0.00' },
            selected: true
          }, {
            id: 'STANDARD',
            label: 'Standard Shipping',
            amount: { currency: 'USD', value: '5.00' }
          }, {
            id: 'EXPEDITED',
            label: 'Two-Day Shipping',
            amount: { currency: 'USD', value: '7.00' }
        }];
      default:
        return [{
          id: 'NO_RUSH',
          label: 'No-Rush Shipping',
          amount: { currency: 'USD', value: '0.00' },
          selected: true
        }, {
          id: 'STANDARD',
          label: 'Standard Shipping',
          amount: { currency: 'USD', value: '6.00' }
        }, {
          id: 'EXPEDITED',
          label: 'Two-Day Shipping',
          amount: { currency: 'USD', value: '8.00' }
        }];
    }
  }
}

Global.startPaymentRequestDigitalMerchandise = function()  {

  var methodData = [{
    supportedMethods: ['basic-card'],
    data: {
      supportedNetworks: ['visa', 'mastercard', 'amex'],
      supportedTypes: ['credit']
    }
  }];

  var subtotal = 44.00;
  var tax = 4.40;

  var details = {
    total: {
      label: 'Total due',
      amount: { currency: 'USD', value: (subtotal + tax).toFixed(2) }
    },
    displayItems: [{
      label: 'Sub-total',
      amount: { currency: 'USD', value: subtotal.toFixed(2) }
    }, {
      label: 'Sales Tax',
      amount: { currency: "USD", value: tax.toFixed(2) }
    }]
  };

  var options = {
    requestPayerEmail: true
  };

  //constructor
  var request = new PaymentRequest(methodData, details, options);

  //Show the Native UI
  request.show()

  //When the promise is fulfilled, show the Wallet's success view.
  //In a real world scenario, the result obj would be sent
  //to the server side for processing.
  .then(function(result) {
    return result.complete('success');
  });
}

Global.startPaymentRequestWithContactInfo = function()  {

  var methodData = [{
    supportedMethods: ['basic-card'],
    data: {
      supportedNetworks: ['visa', 'mastercard', 'amex'],
      supportedTypes: ['credit']
    }
  }];

  var subtotal = 44.00;
  var tax = 4.40;

  var details = {
    total: {
      label: 'Total due',
      amount: { currency: 'USD', value: (subtotal + tax).toFixed(2) }
    },
    displayItems: [{
      label: 'Sub-total',
      amount: { currency: 'USD', value: subtotal.toFixed(2) }
    }, {
      label: 'Shipping',
      amount: { currency: 'USD', value: '0.00' }
    }, {
      label: 'Sales Tax',
      amount: { currency: "USD", value: tax.toFixed(2) }
    }],
    shippingOptions: [{
      id: 'NO_RUSH',
      label: 'No-Rush Shipping',
      amount: { currency: 'USD', value: '0.00' },
      selected: true
    }, {
      id: 'STANDARD',
      label: 'Standard Shipping',
      amount: { currency: 'USD', value: '5.00' }
    }, {
      id: 'EXPEDITED',
      label: 'Two-Day Shipping',
      amount: { currency: 'USD', value: '7.00' }
    }]
  };

  var options = {
    requestPayerEmail: true,
    requestPayerPhone: true,
    requestShipping: true
  };

  //constructor
  var request = new PaymentRequest(methodData, details, options);

  //Show the Native UI
  request.show()

  //When the promise is fulfilled, show the Wallet's success view.
  //In a real world scenario, the result obj would be sent to
  //the server side for processing.
  .then(function(result) {
    return result.complete('success');
  });
}
