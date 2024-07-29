import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Menu } from "@/components/menu";
import { Sidebar } from "@/components/sidebar";
import { Newsidebar } from "@/components/newsidebar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
              <div className="flex flex-row">
                <div className="flex flex-col w-2/12"><Newsidebar/></div>
                <div className="flex flex-col w-10/12">
                  <Menu />
                    <div className="flex flex-col w-full">
                      <main className="container items-center justify-center">
                        {children}
                      </main>
                      <footer className="flex items-center justify-center">
                        <Link
                          isExternal
                          className="flex items-center gap-1 text-current"
                          href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
                          title="nextui.org homepage"
                        >
                          <span className="text-default-600">Powered by</span>
                          <p className="text-primary">NextUI</p>
                        </Link>
                      </footer>
                    </div>
                </div>
              </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
