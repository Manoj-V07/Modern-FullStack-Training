"use client";

import { signup } from "../actions/authActions";

export default function SignupPage() {
  return (
    <div>
      <h1>Signup</h1>

      <form action={signup}>
        <div>
          <label>Name</label>
          <input type="text" name="name" required />
        </div>

        <div>
          <label>Email</label>
          <input type="email" name="email" required />
        </div>

        <div>
          <label>Password</label>
          <input type="password" name="password" required />
        </div>

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}