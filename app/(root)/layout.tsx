import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kusina Kollect",
  description: "Recipe Hub Webapp made with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="flex">
          <section className="w-full flex min-h-screen bg-light-200">
            <div className="w-full mx-12 mb-8">
              {children}
            </div>
          </section>
        </main>
        <Footer />
      </body>
    </html>
  );
}
