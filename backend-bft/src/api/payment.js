const RazorpayService = require("../services/payment-provider/razorpay-service");

module.exports = (router) => {
  const apiKey = process.env.RAZORPAY_API_KEY;
  const apiSecret = process.env.RAZORPAY_API_SECRET;
  const razorpayService = new RazorpayService(apiKey, apiSecret, console);

  // Route to initiate Razorpay order
  router.get("/razorpay/initiate", async (req, res) => {
    const { amount, currency, receipt } = req.body;

    try {
      const order = await razorpayService.createOrder(
        amount,
        currency,
        receipt
      );
      res.status(200).json({ success: true, message: "hii" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  // Route to capture payment
  router.post("/razorpay/capture", async (req, res) => {
    const { payment_id, amount } = req.body;

    try {
      const payment = await razorpayService.capturePayment(payment_id, amount);
      res.status(200).json({ success: true, payment });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  return router;
};
