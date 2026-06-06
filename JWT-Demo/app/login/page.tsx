"use client";
import login from "@/app/actions/login";

function SignUp() {
    return (
        <div>
            <h2>Login Here : </h2>
            <form action={login}>
                <label htmlFor="email">Email : </label>
                <input type="email" name="email" id="email" placeholder="Enter your email" required />
                <br /><br />

                <label htmlFor="password">Password : </label>
                <input type="password" name="password" id="password" placeholder="Enter your password" required />
                <br /><br />
                
                <button>Login</button>
            </form>
        </div>
    );
}

export default SignUp;