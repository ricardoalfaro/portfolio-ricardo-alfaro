import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ricardoalfaro.cl"),
  title: {
    default: "Ricardo Alfaro | Producto, pagos y estrategia fintech",
    template: "%s | Ricardo Alfaro",
  },
  description:
    "Ricardo Alfaro lidera estrategia de producto, medios de pago, billeteras digitales, Open Finance y modernización de servicios financieros digitales.",
  openGraph: {
    title: "Ricardo Alfaro | Producto, pagos y estrategia fintech",
    description:
      "Producto, estrategia fintech, medios de pago, billeteras digitales, Open Finance y servicios financieros digitales.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-419" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Saltar al contenido
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
