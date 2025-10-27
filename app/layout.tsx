import { ThemeProvider } from "@/components/shared/theme-provider";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Lexend } from "next/font/google";

const lexendSans = Lexend({
  variable: "--font-lexend-sans",
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
      <body className={`${lexendSans.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
