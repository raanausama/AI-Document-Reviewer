const axios = require("axios");

exports.payment = async (req, res) => {
  const { amount, currency, customer } = req.body;
  const secretKey = "sk_test_2lhY0pd856buzW7oUnCEgjOm";
  console.log(customer);

  axios
    .post(
      "https://api.tap.company/v2/charges",
      {
        amount,
        currency,
        customer_initiated: true,
        threeDSecure: true,
        save_card: false,
        description: "Tap Payment",
        metadata: {
          udf1: "Metadata 1",
        },
        reference: {
          transaction: "txn_01",
          order: "ord_01",
        },
        receipt: {
          email: true,
          sms: true,
        },
        customer: {
          first_name: customer?.first_name,
          middle_name: customer?.middle_name,
          last_name: customer?.last_name,
          email: customer?.email,
          phone: {
            country_code: customer?.phone.country_code,
            number: customer?.phone?.number,
          },
        },
        merchant: {
          id: '38840112'
        },
        source: { id: "src_all" },
        post: {
          url: "http://localhost:3000/pricing",
        },
        redirect: {
          url: "http://localhost:3000/pricing",
        },
        // platform: {
        //   id: 'commerce_platform_opiJ423***14JK8M474'
        // }
      },
      {
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      res.json(response.data);
      console.log('success', response.data)
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: error.message });
    });
};

exports.getChargeDetails = async (req, res) => {
  const { chargeId } = req.params;  // Retrieve charge ID from request parameters
  const secretKey = 'sk_test_2lhY0pd856buzW7oUnCEgjOm'; 
  // console.log(chargeId) // Your Tap Payments secret key

  try {
    const response = await axios.get(`https://api.tap.company/v2/charges/${chargeId}`, {
      headers: {
        'Authorization': `Bearer ${secretKey}`,
        'Accept': 'application/json',
      },
    });

    // Send the response data back to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching charge details:', error);
    res.status(500).json({ error: error.message });
  }
};