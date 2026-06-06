"use server"
import  prisma  from '@/lib/prisma';
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

async function signup(formData : FormData) {
    const name = (formData.get("name") ?? "") as string;
    const email = (formData.get("email") ?? "") as string;
    const password = (formData.get("password") ?? "") as string;

    // Bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashPassword : ", hashedPassword);

    // Storing the data in the database

    await prisma.user.create({
        data : {
            name,
            email,
            password
        }
    });

    // const output = await prisma.user.findMany();
    // console.log("Output : " + JSON.stringify(output));

    redirect('/login');
}

export default signup;