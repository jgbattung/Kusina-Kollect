import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Kusina Kollect',
  description: "Recipe Hub Webapp made with Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="w-full">
            {children}
          </div>  
        </body>
      </html>
    </ClerkProvider>
  )
}