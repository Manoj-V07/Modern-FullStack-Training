import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Routing Task",
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
