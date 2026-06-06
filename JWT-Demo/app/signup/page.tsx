"use client";
import signup from "@/app/actions/signup";

function SignUp() {
    return (
        <div>
            <h2>Register Here : </h2>
            <form action={signup}>
                <label htmlFor="name">Name : </label>
                <input type="text" name="name" id="name" placeholder="Enter your name" required />
                <br /><br />

                <label htmlFor="email">Email : </label>
                <input type="email" name="email" id="email" placeholder="Enter your email" required />
                <br /><br />

                <label htmlFor="password">Password : </label>
                <input type="password" name="password" id="password" placeholder="Enter your password" required />
                <br /><br />
                
                <button>Signup</button>
            </form>
        </div>
    );
}

export default SignUp;