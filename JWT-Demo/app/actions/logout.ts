"use server"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function logout() {
    const cookie = await cookies();
    cookie.delete("token");
    redirect("/login");
}

export default logout;