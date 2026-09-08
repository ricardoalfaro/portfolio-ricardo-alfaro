import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
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
    <html lang="es-419" className={geistSans.variable}>
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
