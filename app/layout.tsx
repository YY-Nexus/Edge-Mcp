import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "言语云 YanYu Cloud - 智能管理平台",
  description: "万象归元于云枢，深栈智启新纪元 - 企业级智能云管理平台",
  keywords: "言语云,YanYu Cloud,云管理,智能平台,企业管理",
  authors: [{ name: "YanYu Cloud Team" }],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
