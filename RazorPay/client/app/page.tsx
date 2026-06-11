"use client";

import Script from "next/script";

export default function Home() {
  async function payNow(){
    // We will create the order -- createOrder API
    const orderResponse = await fetch('/api/createOrder', {
      method : "POST",
    });

    const order = await orderResponse.json();

    // You need to create options
    const options = {
      key : process.env.NEXT_PUBLIC_KEY_ID,
      order_id : order.id,
      amount : order.amount,
      currency : order.currency,
      name : "My-Shop",
      description : "Payment of RS 500",
      handler : async function(response : any) {
        const verifyPaymentRepsonse = await fetch("/api/verifyPayment", {
          method : "POST",
          headers : {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify(response),
        })
        const finalResponse = await verifyPaymentRepsonse.json();
        if(finalResponse.status === "success"){
          alert("Payment Verified");
        }else {
          alert("Payment verification failed");
        }
      }
    }
    const razorpay = new (window as any) .Razorpay(options);
    razorpay.open();
  }
  return (
    <div>
      <Script src="https://checkout.razorpay.com/v1/magic-checkout.js" />
      <h1>Payment Page</h1>
      <button onClick={payNow}>Pay Rs 500</button>
    </div>
  );
}
