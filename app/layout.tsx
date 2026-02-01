import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "meanval - All-in-One Platform for Agencies",
    description:
        "meanval is the all-in-one business management OS for agencies and associations. Manage proposals, contracts, clients, and projects in one place.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="tr">
            <body className="min-h-screen bg-white font-sans">{children}</body>
        </html>
    );
}
