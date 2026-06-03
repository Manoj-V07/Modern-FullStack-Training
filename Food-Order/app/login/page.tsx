"use client";

import { login } from "../actions/authActions";

export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>

      <form action={login}>
        <div>
          <label>Email</label>
          <input type="email" name="email" required />
        </div>

        <div>
          <label>Password</label>
          <input type="password" name="password" required />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}