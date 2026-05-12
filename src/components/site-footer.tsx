import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <img src="/logo.png" alt="Jericho Tour & Travel" className="h-12 w-12 rounded-full object-cover" />
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Jericho Tour & Travels</h3>
            </div>
            <p className="mb-4 text-white/80">
              Your trusted travel partner across Darjeeling & Sikkim with 5+ years of experience
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/jerichotravels23"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-accent"
                aria-label="Follow us on Instagram"
              >
                <InstagramIcon className="size-5" />
              </a>
              <a
                href="https://wa.me/917478029354"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-accent"
                aria-label="Chat with us on WhatsApp"
              >
                <MessageCircle className="size-5" />
              </a>
              <a
                href="tel:+917478029354"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-accent"
                aria-label="Call us"
              >
                <Phone className="size-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "1rem" }}>Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/80 transition-colors hover:text-accent">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-white/80 transition-colors hover:text-accent">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#destinations" className="text-white/80 transition-colors hover:text-accent">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-white/80 transition-colors hover:text-accent">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "1rem" }}>Services</h4>
            <ul className="space-y-2 text-white/80">
              <li>Car Rental</li>
              <li>Tour & Travels</li>
              <li>Hotel Booking</li>
              <li>Adventure Activities</li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "1rem" }}>Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-accent" />
                <span className="text-white/80">Rangbull, Darjeeling, West Bengal</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-5 shrink-0 text-accent" />
                <a href="tel:+917478029354" className="text-white/80 transition-colors hover:text-accent">
                  +91 74780 29354
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-5 shrink-0 text-accent" />
                <a href="mailto:jerichotourandtravels@gmail.com" className="text-white/80 transition-colors hover:text-accent">
                  jerichotourandtravels@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 text-center text-white/60">
          <p>© 2026 Jericho Tour & Travels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
