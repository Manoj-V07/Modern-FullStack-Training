"use server"
import  prisma  from '@/lib/prisma';
import { redirect } from "next/navigation";
import { createToken } from "@/lib/jwt";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

async function login(formData : FormData) {
    const email = (formData.get("email") ?? "") as string;
    const password = (formData.get("password") ?? "") as string;

    // Verify the user password 
    // If password fails in verification, throe some error
    // Generate a token
    // Store the token in a cookie
    // Redirect the user to the Product Page
    
    // Fetch the User Detail
    const user = await prisma.user.findUnique({
        where : { email }
    });

    if(!user){
        throw new Error("No user found in that given email");
    }

    const isMatch = await bcrypt.compare(password, user?.password);

    if(!isMatch){
        console.error("Password does not match");
    }

    // Create token
    const token = createToken(user);

    const cookie = await cookies();
    cookie.set("Token : ", token);

    redirect('/');
}

export default login;