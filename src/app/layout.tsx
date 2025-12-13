import type React from "react"
import type { Metadata } from "next"
import "../styles/global.css"
import { ThemeProvider } from "@/components/shared/theme-provider"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Koda",
  description: "Plataforma educacional de programação com tema claro e escuro",
  generator: "v0.dev",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
    ]
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
