import { listCartShippingMethods } from "@lib/data/fulfillment"
import { listCartPaymentMethods } from "@lib/data/payment"
import { HttpTypes } from "@medusajs/types"
import Addresses from "@modules/checkout/components/addresses"
import Payment from "@modules/checkout/components/payment"
import Review from "@modules/checkout/components/review"
import Shipping from "@modules/checkout/components/shipping"

export default async function CheckoutForm({
  cart,
  customer,
}: {
  cart: any
  customer: HttpTypes.StoreCustomer | null
  }) {
    if (!cart) {
      // console.log("running null")
      return null
    }
    // console.log("cart",cart)
console.log("cart id",cart?.id)
  const shippingMethods = await listCartShippingMethods(cart?.id)
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "")
console.log("paymentMethods",paymentMethods)
  if (!shippingMethods || !paymentMethods) {
    return null
  }

  return (
    <div className="w-full grid grid-cols-1 gap-y-8">
      <Addresses cart={cart} customer={customer} />

      <Shipping cart={cart} availableShippingMethods={shippingMethods} />

      <Payment cart={cart} availablePaymentMethods={paymentMethods} />

      <Review cart={cart} />
    </div>
  )
}
