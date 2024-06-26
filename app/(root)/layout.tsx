import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "../../components/shared/Navbar";
import Footer from "../../components/shared/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import LoadingScreen from "@/components/shared/LoadingScreen";
import SideNavbar from "@/components/shared/SideNavbar";
import ActionModalWrapper from "@/components/shared/ActionModalWrapper";

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
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <SideNavbar />
          <LoadingScreen />
          <main className="flex">
            <section className="w-full flex min-h-screen bg-light-200">
              <div className="w-full mb-8">
                {children}
              </div>
            </section>
          </main>
          <Footer />
          <ActionModalWrapper />
        </body>
      </html>
    </ClerkProvider>
  );
}
