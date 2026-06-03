import Link from "next/link";
import { cookies } from "next/headers";
import { logout } from "@/app/actions/authActions";

export default async function Header() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId");

  return (
    <header>
      <nav>
        <Link href="/">Food Menu</Link>

        {userId && <Link href="/cart">Cart</Link>}

        {!userId ? (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
          </>
        ) : (
          <form action={logout}>
            <button type="submit">Logout</button>
          </form>
        )}
      </nav>
    </header>
  );
}