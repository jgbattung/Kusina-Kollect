import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import AdminNavbar from "@/components/shared/AdminNavbar";
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
          <AdminNavbar />
          <main className="flex">
            <section className="w-full flex min-h-screen bg-light-200">
              <div className="w-full">
                {children}
              </div>
            </section>
          </main>
          <ActionModalWrapper />
        </body>
      </html>
    </ClerkProvider>
  );
}
