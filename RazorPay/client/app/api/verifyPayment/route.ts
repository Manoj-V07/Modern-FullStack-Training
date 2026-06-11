import crypto from "crypto";

export async function POST(request : Request) {
    try {
        const body = await request.json();
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = body;

        const generatedSignature = crypto.createHmac("sha256", process.env.KEY_SECRET!).update(razorpay_order_id + "|" + razorpay_payment_id).digest("hex");
        const isValid = razorpay_signature === generatedSignature;

        if(isValid) {
            return Response.json({
                status : "success"
            })
        } else {
            return Response.json({
                status : "failure"
            })
        }
    } catch(error : any){
        return Response.json({
            error : error.message
        })
    }
}

// To get the payment_id, order_id, and signature from request object
// Generate a signature
// Match the  signature with the returned Razorpay Signature
// if(match) - Return Response as success if not send as failed