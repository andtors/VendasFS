import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'bulma/css/versions/bulma-no-dark-mode.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vendas FS",
  description: "Projeto Vendas FullStack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
