import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"
import MainHeader from "@/components/main-header"
import MainFooter from "@/components/main-footer"
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
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MainHeader />
          {children}
          <MainFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
