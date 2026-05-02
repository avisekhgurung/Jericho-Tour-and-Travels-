import Link from "next/link";
import { Globe, Mail, MapPin, MessageCircle, Phone, Share2 } from "lucide-react";

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
              {[Globe, MessageCircle, Share2].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-accent"
                  aria-label="social"
                >
                  <Icon className="size-5" />
                </a>
              ))}
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
