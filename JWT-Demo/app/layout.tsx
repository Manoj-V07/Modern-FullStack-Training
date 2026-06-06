import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JWT-Token Concept",
  description: "Implementing JWT-Token with login and signup functions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
