import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: process.env.SITE_NAME || "MicroGym Living",
  description: "Apartment-friendly workouts & gear that actually fit your space.",
  openGraph: {
    title: process.env.SITE_NAME || "MicroGym Living",
    description: "Apartment-friendly workouts & gear that actually fit your space.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        {children}
      </body>
    </html>
  );
}
