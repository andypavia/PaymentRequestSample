var Global = {}

Global.startPaymentRequestStaticShipping = function()  {

    var methodData = [
        {
        supportedMethods: ['basic-card'],
        data: {
            supportedNetworks: ['visa', 'mastercard', 'amex'],
            supportedTypes: ['credit']
        }
        }
    ];

    var details =  {
        displayItems: [
        {
            label: "Sub-total",
            amount: { currency: "USD", value : "100.00" }, // US$100.00
        },
        {
            label: "Sales Tax",
            amount: { currency: "USD", value : "9.00" }, // US$9.00
        }
        ],
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

    //When the promise is fulfilled, pass the results to your server for processing
    .then(result => {
      return result.complete('success');
    });
}

Global.startPaymentRequestDynamicShipping = function()  {

    var methodData = [
        {
        supportedMethods: ['basic-card'],
        data: {
            supportedNetworks: ['visa', 'mastercard', 'amex'],
            supportedTypes: ['credit']
        }
        }
    ];

    var details =  {
        displayItems: [
        {
            label: "Sub-total",
            amount: { currency: "USD", value : "100.00" }, // US$100.00
        },
        {
            label: "Sales Tax",
            amount: { currency: "USD", value : "9.00" }, // US$9.00
        }
        ],
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

    //When the promise is fulfilled, pass the results to your server for processing
    .then(result => {
        return result.complete('success');
    });
}

Global.startPaymentRequestDigitalMerchandise = function()  {

    var methodData = [
        {
        supportedMethods: ['basic-card'],
        data: {
            supportedNetworks: ['visa', 'mastercard', 'amex'],
            supportedTypes: ['credit']
        }
        }
    ];

    var details =  {
        displayItems: [
        {
            label: "Sub-total",
            amount: { currency: "USD", value : "100.00" }, // US$100.00
        },
        {
            label: "Sales Tax",
            amount: { currency: "USD", value : "9.00" }, // US$9.00
        }
        ],
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

    //When the promise is fulfilled, pass the results to your server for processing
    .then(result => {
        return result.complete('success');
    });
}

Global.startPaymentRequestWithContactInfo = function()  {

    var methodData = [
        {
        supportedMethods: ['basic-card'],
        data: {
            supportedNetworks: ['visa', 'mastercard', 'amex'],
            supportedTypes: ['credit']
        }
        }
    ];

    var details =  {
        displayItems: [
        {
            label: "Sub-total",
            amount: { currency: "USD", value : "100.00" }, // US$100.00
        },
        {
            label: "Sales Tax",
            amount: { currency: "USD", value : "9.00" }, // US$9.00
        }
        ],
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

    //When the promise is fulfilled, pass the results to your server for processing
    .then(result => {
        return result.complete('success');
    });
}
