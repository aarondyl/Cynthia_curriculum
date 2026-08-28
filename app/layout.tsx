import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "2026 秋季课程表",
  description: "温州肯恩大学 2026 秋季可交互周课表",
  openGraph: {
    title: "2026 秋季课程表",
    description: "一周的节奏，一眼看清",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
