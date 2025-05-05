import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WealthWise",
  description: "One stop shop for all your financial needs",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          {/* Header Component */}
          <header>
            <Header />
          </header>

          {/* Main Component */}
          <main className="min-h-screen">
            {children}
          </main>

          <Toaster richColors />

          {/* Footer Component */}
          <footer className="bg-[#1E3A8A] py-12">
            <div className="container mx-auto text-center text-[#00FFFF]">
              <p>
                &copy; 2025 WealthWise. Crafted with 💡 & 💰 by Ayash.
                Empowering Your Financial Future. 🚀
              </p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
