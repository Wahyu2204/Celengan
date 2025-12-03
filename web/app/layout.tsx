import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Web3Provider } from "../context/Web3Provider"; // <--- Import ini
import Navbar from "../components/navbar";

// const geistSans = GeistSans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Celengan",
  description: "Nabung di Blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        {/* Bungkus disini 👇 */}
        <Web3Provider>
          <Navbar />
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}