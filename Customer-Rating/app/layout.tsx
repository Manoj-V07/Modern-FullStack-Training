import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Product Rating",
  description: "Details are stored in Database using PostgreSQL",
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
