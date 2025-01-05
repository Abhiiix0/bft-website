const Razorpay = require("razorpay");

class RazorpayService {
  constructor(apiKey, apiSecret) {
    this.razorpay = new Razorpay({
      key_id: apiKey,
      key_secret: apiSecret,
    });
  }

  // Create order
  async createOrder(amount, currency, receipt) {
    try {
      const options = {
        amount: amount * 100, // Razorpay accepts amount in paise
        currency,
        receipt,
      };

      const order = await this.razorpay.orders.create(options);
      return order;
    } catch (error) {
      console.error("Error creating Razorpay order", error);
      throw new Error("Failed to create Razorpay order");
    }
  }

  // Capture payment
  async capturePayment(paymentId, amount) {
    try {
      const payment = await this.razorpay.payments.capture(paymentId, amount * 100, "INR"); // amount in paise
      return payment;
    } catch (error) {
      console.error("Error capturing Razorpay payment", error);
      throw new Error("Failed to capture Razorpay payment");
    }
  }

  // Get payment status
  async getPaymentStatus(paymentId) {
    try {
      const payment = await this.razorpay.payments.fetch(paymentId);
      switch (payment.status) {
        case "captured":
          return "captured";
        case "authorized":
          return "authorized";
        default:
          return "pending";
      }
    } catch (error) {
      console.error("Error fetching Razorpay payment status", error);
      throw new Error("Failed to fetch Razorpay payment status");
    }
  }

  // Handle Razorpay Webhooks
  async handleWebhook(data) {
    if (data.event === "payment.captured") {
      console.info(`Payment captured: ${JSON.stringify(data)}`);
      // Update the order status to 'captured' in Medusa or trigger related actions
    }
  }
}

module.exports = RazorpayService;
