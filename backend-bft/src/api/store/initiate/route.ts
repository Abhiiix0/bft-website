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
      console.log("options",options)
    const order = await razorpay.orders.create(options);
console.log("order",order)
    res.status(200).json({
      success: true,
      message: "Order created successfully.",
      order,
    });
  } catch (error) {
      console.log("error",error)
    res.status(500).json({
      success: false,
      message: "Failed to create order.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
