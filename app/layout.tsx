import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'

const font = localFont({
  src: '../public/SendFlowers-Regular.ttf',
})


export const metadata: Metadata = {
  title: "Happy Valentine!"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={font.className}>
        {children}
      </body>
    </html>
  );
}
