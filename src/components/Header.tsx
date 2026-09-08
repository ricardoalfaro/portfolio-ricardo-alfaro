"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/#about", label: "Qué hago" },
  { href: "/#work", label: "Casos" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Inicio de Ricardo Alfaro" onClick={close}>
        RA
      </Link>
      <nav className="site-nav" aria-label="Navegación principal">
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <Link className="nav-cta" href="/#contacto">
          <span>Contacto</span>
          <span aria-hidden="true">↗</span>
        </Link>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>
      {open && (
        <nav className="mobile-menu" id="mobile-menu" aria-label="Navegación móvil">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={close}>
              {link.label}
            </Link>
          ))}
          <Link href="/#contacto" onClick={close} className="mobile-menu-cta">
            Contacto
          </Link>
        </nav>
      )}
    </header>
  );
}
