import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/env";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sudanese Forum for Building and Development",
    template: "%s | Sudanese Forum for Building and Development"
  },
  description: "Bilingual Arabic and English platform for Sudanese development sectors, publications, and institutional knowledge.",
  metadataBase: new URL(getSiteUrl())
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
