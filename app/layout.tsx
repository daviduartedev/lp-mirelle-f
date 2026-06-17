import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://mirellejfpsi.com.br",
  ),
  title: "Mirelle J. Francisco | Psicóloga Clínica em Laguna",
  description:
    "Psicóloga clínica especialista em Terapia de Casal. Atendimento presencial em Laguna, SC, e online para adultos e casais.",
  keywords: [
    "Mirelle J. Francisco",
    "psicóloga em Laguna",
    "psicóloga clínica Laguna",
    "terapia de casal Laguna",
    "psicodrama",
    "CRP 12/19485",
  ],
  openGraph: {
    title: "Mirelle J. Francisco | Psicóloga Clínica em Laguna",
    description:
      "Atendimento presencial em Laguna, SC, e online. Psicóloga clínica especialista em Terapia de Casal.",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "/images/mirelle-hero-horizontal.webp",
        width: 2400,
        height: 1350,
        alt: "Mirelle J. Francisco Psicóloga Clínica",
      },
    ],
  },
  icons: {
    icon: "/brand/logo-wine.png",
    apple: "/brand/logo-wine.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
