import { Toaster } from "react-hot-toast";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AgriConnect",
  description: "Smart Farming App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-right" />

        {children}

      </body>
    </html>
  );
}