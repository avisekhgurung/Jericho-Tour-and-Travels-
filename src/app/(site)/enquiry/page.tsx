import { Clock3, Mail, MapPin, Phone } from "lucide-react";

export default function EnquiryPage() {
  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-primary to-primary/80 px-4 py-20">
        <div className="mx-auto max-w-7xl text-center text-white">
          <h1
            className="text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, marginBottom: "1rem" }}
          >
            Get In Touch
          </h1>
          <p className="text-lg text-white/90">
            We&apos;d love to hear from you. Send us your enquiry and we&apos;ll respond promptly.
          </p>
        </div>
      </section>

      <section className="bg-muted px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-8">
            <div>
              <h2
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 2rem)",
                  fontWeight: 700,
                  color: "#0B3C5D",
                  marginBottom: "1.5rem",
                }}
              >
                Contact Information
              </h2>
              <p className="mb-8 text-muted-foreground">
                Feel free to reach out to us through any of the following channels.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-md transition-transform hover:translate-x-2">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="size-6 text-primary" />
                </div>
                <div>
                  <h3 style={{ fontWeight: 600, color: "#0B3C5D", marginBottom: "0.25rem" }}>Address</h3>
                  <p className="text-muted-foreground">Rangbull, Darjeeling, West Bengal, India</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-md transition-transform hover:translate-x-2">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <Phone className="size-6 text-accent" />
                </div>
                <div>
                  <h3 style={{ fontWeight: 600, color: "#0B3C5D", marginBottom: "0.25rem" }}>Phone</h3>
                  <a href="tel:+919876543210" className="text-muted-foreground transition-colors hover:text-accent">
                    +91 98765 43210
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-md transition-transform hover:translate-x-2">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary/10">
                  <Mail className="size-6 text-secondary" />
                </div>
                <div>
                  <h3 style={{ fontWeight: 600, color: "#0B3C5D", marginBottom: "0.25rem" }}>Email</h3>
                  <a
                    href="mailto:info@jerichotours.com"
                    className="text-muted-foreground transition-colors hover:text-secondary"
                  >
                    info@jerichotours.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-md transition-transform hover:translate-x-2">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-500/10">
                  <Clock3 className="size-6 text-green-600" />
                </div>
                <div>
                  <h3 style={{ fontWeight: 600, color: "#0B3C5D", marginBottom: "0.25rem" }}>Business Hours</h3>
                  <p className="text-muted-foreground">Monday - Sunday: 8:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-8 text-white transition-transform hover:scale-[1.01]">
              <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>Need Immediate Help?</h3>
              <p className="mb-6 text-white/90">Our team is available 24/7 to assist you with any urgent queries.</p>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-white transition-all hover:bg-accent/90"
              >
                <Phone className="size-5" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
