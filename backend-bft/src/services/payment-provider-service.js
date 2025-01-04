import { AbstractPaymentProvider } from "@medusajs/framework/utils";

class MyPaymentProviderService extends AbstractPaymentProvider {
  async availablePaymentMethods() {
    return [
      {
        id: "razorpay",
        provider_id: "razorpay",
        data: {
          label: "Razorpay",
          description: "Pay securely via Razorpay",
        },
      },
      // Other payment methods
    ];
  }
}
