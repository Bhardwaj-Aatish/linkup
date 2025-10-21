import type { Metadata } from "next";
import "../../styles/globals.css";

export const metadata: Metadata = {
  title: "Social media website",
  description: "Social media website by aatish",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {

  return (
    <html lang="en">
      <body className="bg-myteal font-mono">
        <main>{children}</main>
      </body>
    </html>
  );
}
