import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/theme-provider"
import MainHeader from "@/components/main-header"
import MainFooter from "@/components/main-footer"
import { Toaster } from "@/components/ui/sonner"
import FloatingProgressTracker from "@/components/floating-progress-tracker"
import FloatingInfo from "@/components/floating-info"
import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", });

export const metadata: Metadata = {
  title: "FRONT-END FOUNDATION",
  description: "Leverage your front-end skills by developing your foundation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`min-h-screen flex flex-col ${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <div className="fixed top-0 left-0 right-0 z-50">
              <MainHeader />
            </div>
            <div className="flex-1 pt-16">
              {children}
            </div>
            <Toaster richColors position="top-center" />
            <FloatingProgressTracker />
            <FloatingInfo />
            <MainFooter />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
