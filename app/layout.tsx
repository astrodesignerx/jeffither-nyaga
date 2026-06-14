import type { Metadata } from "next";
import { Poppins, Inter, DM_Mono } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "./components/ClientLayout";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jeffither Nyaga — Advocate | Kenya",
  description:
    "Jeffither Nyaga is a seasoned advocate specializing in commercial litigation, constitutional law, and dispute resolution.",
  keywords: [
    "Jeffither Nyaga",
    "Advocate",
    "Kenya",
    "Commercial Litigation",
    "Constitutional Law",
    "Nairobi Lawyer",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} ${dmMono.variable} antialiased`}
    >
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
