import Razorpay from "razorpay";

//Create a Razorpay instance
const razorpay = new Razorpay({
    key_id : process.env.KEY_ID,
    key_secret : process.env.KEY_SECRET
})


export async function POST(){

    try {
        const order = await razorpay.orders.create({
            amount : 50000,
            currency : "INR",
        });

        console.log("Order : "+ order);
        return Response.json({
            success : true,
            order
        })
    } catch(error : any) {
        return Response.json({
            error : error.message
        })
    }
}