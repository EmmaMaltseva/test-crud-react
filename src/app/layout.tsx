import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import 'antd/dist/reset.css';
import "./globals.css";
import { AntdProvider } from "@/providers/AntdProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { 
    template: "%s | CRUD React",
    default: "CRUD React"
  },
  description: "Тестовое задание: CRUD приложение на React",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AntdProvider>
          {children}
        </AntdProvider>
      </body>
    </html>
  );
}
