import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/common/theme-provider";

const figtreeSans = Figtree({
  variable: "--font-figtree-sans",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Portify",
  description:
    "Portify is a portfolio management system with a secure admin panel and public API — designed to make managing and showcasing your projects effortless.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${figtreeSans.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
