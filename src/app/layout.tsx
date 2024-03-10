import type { Metadata } from "next";

import "./globals.css";

import { inter } from "@/assets/fonts";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { AlertProvider } from "@/providers/alert-provider";
import { ModalProvider } from "@/providers/modal-provider";
import { ThemeProvider } from "@/providers/theme-provider";

export const metadata: Metadata = {
  title: {
    template: "%s | TypingGo",
    default: "TypingGo - Type with TypingGo",
  },
  description:
    "TypingGo is a web service designed to offer students a conducive environment for enhancing their typing skills. It provides content to aid in preparation for typing exams through short typing quizzes, games, practice sessions, and weekly full typing tests. For paid users, access is granted to a comprehensive range of mock typing test courses and practice sessions. The primary focus is on students (aspirants) striving to improve their typing speed.",
  applicationName: "TypingGo",
  authors: {
    name: "Ankit Kumar",
    url: "https://www.github.com/alpha-alexxx",
  },
  icons: [
    {
      rel: "icon",
      type: "image/x-icon",
      url: "/favicon/favicon.ico",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon/favicon-16x16.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/favicon/apple-touch-icon.png",
    },
  ],
  generator: "NextJS, React, Supabase, React Form Hook , TypeScript",
  keywords:
    "TypingGo, Learning Typing, Typing Exams, SSC Typing Test, BSF Typing Test, Practice Typing",
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="min-h-full" lang="en" suppressHydrationWarning>
      <head />
      <body className={cn("h-full", inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
        >
          <AlertProvider />
          <ModalProvider />
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
