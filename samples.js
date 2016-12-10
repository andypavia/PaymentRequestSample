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
        return process(result).then(response => {
        // Examine server response
        if (response.status === 200) {
            //Show that the transaction was successful in the UI
            return result.complete('success');
        } else {
            //Show in the Native UI that the transaction failed
            return result.complete('fail');
        }
        })
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
        return process(result).then(response => {
        // Examine server response
        if (response.status === 200) {
            //Show that the transaction was successful in the UI
            return result.complete('success');
        } else {
            //Show in the Native UI that the transaction failed
            return result.complete('fail');
        }
        })
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
        return process(result).then(response => {
        // Examine server response
        if (response.status === 200) {
            //Show that the transaction was successful in the UI
            return result.complete('success');
        } else {
            //Show in the Native UI that the transaction failed
            return result.complete('fail');
        }
        })
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
        return process(result).then(response => {
        // Examine server response
        if (response.status === 200) {
            //Show that the transaction was successful in the UI
            return result.complete('success');
        } else {
            //Show in the Native UI that the transaction failed
            return result.complete('fail');
        }
        })
    });
}
