import jwt from "jsonwebtoken";


const secret = process.env.JWT_SECRET as string;

export function createToken({ user } : any) {
    // We get the payload or user data
    // We need to sign it with the secret key

    return jwt.sign(
        {user},
        secret,
        {expiresIn : "1 hr"}
    )
}

export function verifyToken(token : string){
    // JWT has inbuilt function -- jwt.verify()
    // It verifies the signature or the secret key and returns a payload

    return jwt.verify(token, secret);
}

