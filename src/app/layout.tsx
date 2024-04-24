import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/theme-provider"
import MainHeader from "@/components/main-header"
import MainFooter from "@/components/main-footer"
import FloatingProgressTracker from "@/components/floating-progress-tracker"
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
        <body className={`flex h-screen flex-col ${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <MainHeader />
            {children}
            <FloatingProgressTracker />
            <MainFooter />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
