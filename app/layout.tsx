import type { Metadata } from "next";
import { Bungee, Varela_Round } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const bungee = Bungee({
  variable: "--font-bungee",
  subsets: ["latin"],
  weight: "400",
});

const varela_round = Varela_Round({
  variable: "--font-varela-round",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Eventify",
  description: "Know, What's happening around you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bungee.variable} ${varela_round.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen pt-20 lg:pt-32 px-8 lg:px-32 font-varela-round">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
