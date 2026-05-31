import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h2>Click on any link to move to other page</h2>

      <Link href="/about"> <h3>About</h3> </Link>
      <br />

      <Link href="/skill"> <h3>Skill</h3> </Link>
      <br />

      <Link href="/project"> <h3>Project</h3> </Link>
      <br />

      <Link href="/achievement"> <h3>Achievement</h3> </Link>
      <br />

      <Link href="/contact"> <h3>Contact</h3> </Link>
    </div>
  );
}
