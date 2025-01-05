import { Router } from "express";
import RazorpayService from "../../../services/payment-provider/razorpay-service";
// import { logger } from "@medusajs/framework";
// import { PaymentSessionStatus } from "@medusajs/medusa/types";

const router = Router();

// Your Razorpay credentials (these can be stored in environment variables)
const apiKey = process.env.RAZORPAY_ID || '';
const apiSecret = process.env.RAZORPAY_SECRET || '';

if (!apiKey || !apiSecret) {
  throw new Error("Razorpay API key and secret must be defined in environment variables");
}

const razorpayService = new RazorpayService(apiKey, apiSecret);

// Initiate payment (create Razorpay order)
router.post("/payment/initiate", async (req, res) => {
  const { amount, currency_code, customerDetails } = req.body;

  try {
    const receipt = `receipt_${Date.now()}`;
    const order = await razorpayService.createOrder(amount, currency_code, receipt);
    res.json({ success: true, order_id: order.id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Capture payment
router.post("/payment/capture", async (req, res) => {
  const { razorpay_payment_id, amount } = req.body;

  try {
    const payment = await razorpayService.capturePayment(razorpay_payment_id, amount);
    res.json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Handle Razorpay Webhooks
router.post("/payment/webhook", (req, res) => {
  const data = req.body;
  razorpayService.handleWebhook(data);
  res.status(200).send({ success: true });
});

export default router;
