import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/components/layout/ClientLayout";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
    title: "6666 | Next-gen SaaS Dashboard",
    description: "Experience the future of productivity with 6666. A cinematic, high-performance SaaS dashboard for modern teams.",
    icons: {
        icon: "/favicon.png",
    },
    openGraph: {
        title: "6666 | Next-gen SaaS Dashboard",
        description: "Experience the future of productivity with 6666.",
        url: "https://6666.app",
        siteName: "6666 Dashboard",
        images: [
            {
                url: "/favicon.png",
                width: 512,
                height: 512,
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "6666 | Next-gen SaaS Dashboard",
        description: "Experience the future of productivity with 6666.",
        images: ["/favicon.png"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning className={`${inter.variable} font-sans min-h-screen bg-background text-foreground overflow-hidden`}>
                <ClientLayout>
                    {children}
                </ClientLayout>
            </body>
        </html>
    );
}
