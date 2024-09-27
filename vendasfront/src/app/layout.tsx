import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/mdc-light-indigo/theme.css'
import 'bulma/css/versions/bulma-no-dark-mode.css'
import './components/common/loader/loader.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'


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
