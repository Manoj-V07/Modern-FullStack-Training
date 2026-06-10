import { CartProvider } from "./context/CartContext";

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html>
      <CartProvider>
        <body>{children}</body>
      </CartProvider>
    </html>
  );
}
