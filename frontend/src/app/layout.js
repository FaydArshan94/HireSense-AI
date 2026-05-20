import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import LenisProvider from "@/utils/lenis/LenisProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "HireSense AI",
  description: "Your AI-Powered Resume Optimization Tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* This script runs IMMEDIATELY, before any rendering */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'dark';
                  var isLandingPage = window.location.pathname === "/";
                  if (theme === 'dark' && !isLandingPage) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <LenisProvider>
          <Providers>{children}</Providers>
        </LenisProvider>
      </body>
    </html>
  );
}
