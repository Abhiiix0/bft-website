import Razorpay from "razorpay";
import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_ID || "",
  key_secret: process.env.RAZORPAY_SECRET || "",
});

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    const { amount, currency, receipt } = req.body as { amount: number; currency: string; receipt: string };

    if (!amount || !currency || !receipt) {
      res.status(400).json({
        success: false,
        message: "Amount, currency, and receipt are required.",
      });
      return;
    }

    const options = {
      amount: amount * 100, // Convert to paise
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      message: "Order created successfully.",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create order.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
