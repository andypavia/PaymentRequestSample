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
    }
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
  .then(result => {
    return result.complete('success');
  });
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
  .then(result => {
    // process transaction response here
    return result.complete('success');
  });

  //Listen to a shipping address change
  paymentRequest.addEventListener('shippingaddresschange', changeEvent => {
    changeEvent.updateWith(new Promise(resolve => {
      onShippingAddressChange(paymentRequest);
      resolve(details);
    }));
  });

  //Listen to a shipping option change
  paymentRequest.addEventListener('shippingoptionchange', changeEvent => {
    changeEvent.updateWith(new Promise(resolve => {
      onShippingOptionChange(paymentRequest);
      resolve(details);
    }));
  });

  function onShippingOptionChange(pr) {
    if (pr.shippingOption) {
      var shippingOption = _.find(details.shippingOptions, {
        id: pr.shippingOption
      });
      toastr.info(`shippingOptionChange: ${shippingOption.label}`);
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

      details.total.amount.value = Math.max(0, subtotal + shippingCost + tax).toFixed(2);
    }
  }

  function onShippingAddressChange(pr) {
    var addr = pr.shippingAddress;
    toastr.info(`shippingAddressChange: ${addr.addressLine[0]}, ${addr.region} ${addr.postalCode}`);

    if (addr.country === 'US') {
      details.shippingOptions = getShippingOptions(addr.region);
      details.displayItems[1].pending = false; // shipping no longer pending, pre-selected
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
  .then(result => {
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
  .then(result => {
    return result.complete('success');
  });
}
