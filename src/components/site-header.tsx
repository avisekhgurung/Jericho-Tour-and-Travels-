"use client";

import Link from "next/link";
import { Menu, Phone, Plane, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/#services" },
  { name: "Destinations", href: "/#destinations" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/enquiry" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";
  const floating = !scrolled && isHome && !menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        floating ? "bg-transparent" : "bg-white/95 shadow-lg backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <span className="rounded-full bg-primary p-2">
            <Plane className="size-5 text-white sm:size-6" />
          </span>
          <span>
            <span className="block text-primary" style={{ fontSize: "clamp(1rem, 3vw, 1.5rem)", fontWeight: 700, lineHeight: 1.2 }}>
              Jericho Tour & Travels
            </span>
            <span className="hidden text-xs text-muted-foreground sm:block">Rangbull, Darjeeling</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-primary transition-colors duration-300 hover:text-accent"
            >
              {link.name}
            </Link>
          ))}
          <a
            href="tel:+919876543210"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-white transition-all duration-300 hover:scale-105 hover:bg-accent/90"
          >
            <Phone className="size-4" />
            <span>Call Now</span>
          </a>
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-primary transition-colors hover:bg-primary/10 lg:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-primary/10 bg-white/95 px-4 py-4 backdrop-blur-md lg:hidden">
          <nav className="space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-2 text-primary transition-colors hover:text-accent"
              >
                {link.name}
              </Link>
            ))}
            <a
              href="tel:+919876543210"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-white transition-all hover:bg-accent/90"
            >
              <Phone className="size-4" />
              <span>Call Now</span>
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
