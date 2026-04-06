import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Bus,
  CarFront,
  Hotel,
  IndianRupee,
  MapPin,
  Phone,
  Shield,
  Star,
  Users,
} from "lucide-react";
import { HeroBookingForm } from "@/components/hero-booking-form";
import { AdventureSection } from "@/components/adventure-section";

const services = [
  {
    icon: CarFront,
    title: "Car Rental",
    description: "Wide range of vehicles for comfortable travel",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: Hotel,
    title: "Hotel Booking",
    description: "Best hotels at affordable prices",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    icon: Bus,
    title: "Bus Booking",
    description: "Comfortable bus services to all destinations",
    gradient: "from-green-500 to-green-600",
  },
  {
    icon: MapPin,
    title: "Travel Packages",
    description: "Customized tour packages for your needs",
    gradient: "from-orange-500 to-orange-600",
  },
];

const destinations = [
  {
    name: "Darjeeling",
    image:
      "https://images.unsplash.com/photo-1545324367-8997ba3b801e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    description: "Queen of Hills",
  },
  {
    name: "Sikkim",
    image:
      "https://images.unsplash.com/photo-1551155311-88cda3ebe650?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    description: "Land of Monasteries",
  },
  {
    name: "Gangtok",
    image:
      "https://images.unsplash.com/photo-1628837234647-b35db4740c85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    description: "Capital of Sikkim",
  },
  {
    name: "Kalimpong",
    image:
      "https://images.unsplash.com/photo-1585898175463-4bb8b8a9dea2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    description: "Nature's Paradise",
  },
];

const testimonials = [
  {
    name: "Amit Kumar",
    location: "Delhi",
    rating: 5,
    text: "Excellent service! The car was clean and the driver was very professional. Highly recommended for Darjeeling tours.",
  },
  {
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "Best travel agency in Darjeeling. They arranged everything perfectly for our family trip. Will definitely book again!",
  },
  {
    name: "Rahul Verma",
    location: "Bangalore",
    rating: 5,
    text: "Great experience with Jericho Tours. Affordable prices and excellent customer service. Thank you team!",
  },
];

const reasons = [
  {
    icon: Shield,
    title: "Trusted Service",
    description: "5+ years of reliable travel services",
  },
  {
    icon: IndianRupee,
    title: "Affordable Pricing",
    description: "Best rates in the market",
  },
  {
    icon: Users,
    title: "Local Expertise",
    description: "Deep knowledge of the region",
  },
  {
    icon: BadgeCheck,
    title: "24/7 Support",
    description: "Always available to help",
  },
];

export default function HomePage() {
  return (
    <div className="pt-20">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-3 py-8 sm:px-4 sm:py-12">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1585898175463-4bb8b8a9dea2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="text-center text-white lg:text-left">
              <h1
                className="mb-4 text-white sm:mb-6"
                style={{ fontSize: "clamp(1.5rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.2 }}
              >
                Explore Darjeeling with Comfort & Trust
              </h1>
              <p className="mb-4 text-base text-white/90 sm:mb-6 sm:text-lg md:text-xl">
                Reliable car rental & travel services in the heart of Darjeeling
              </p>

              <div className="mb-6 flex items-center justify-center gap-1.5 text-sm text-white sm:gap-2 sm:text-base lg:justify-start">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="size-4 fill-yellow-400 text-yellow-400 sm:size-5" />
                ))}
                <span className="ml-1.5 sm:ml-2">5.0 Rating (27 Reviews)</span>
              </div>

              <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4 lg:justify-start">
                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm text-primary transition-all duration-300 hover:scale-105 hover:bg-white/90 sm:px-8 sm:py-4 sm:text-base"
                >
                  <Phone className="size-4 sm:size-5" />
                  <span>Call Now</span>
                </a>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-5 py-2.5 text-sm text-white transition-all duration-300 hover:scale-105 hover:bg-green-600 sm:px-8 sm:py-4 sm:text-base"
                >
                  <Phone className="size-4 sm:size-5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            <HeroBookingForm />
          </div>
        </div>
      </section>

      <section id="services" className="bg-white px-3 py-12 sm:px-4 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center sm:mb-16">
            <h2 style={{ fontSize: "clamp(1.75rem, 5vw, 2.5rem)", fontWeight: 700, color: "#0B3C5D" }}>Our Services</h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:mt-4 sm:text-base">
              Comprehensive travel solutions for your perfect journey
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-8 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className="rounded-xl border border-gray-100 bg-white p-4 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl sm:rounded-2xl sm:p-8"
                >
                  <div
                    className={`mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br sm:mb-6 sm:h-16 sm:w-16 ${service.gradient}`}
                  >
                    <Icon className="size-5 text-white sm:size-8" />
                  </div>
                  <h3 className="text-sm sm:text-xl" style={{ fontWeight: 600, color: "#0B3C5D", marginBottom: "0.5rem" }}>
                    {service.title}
                  </h3>
                  <p className="text-xs text-muted-foreground sm:text-base">{service.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="about" className="bg-muted px-3 py-12 sm:px-4 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="relative pb-4 pr-4 sm:pb-0 sm:pr-0">
              <Image
                src="https://images.unsplash.com/photo-1545324367-8997ba3b801e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="Darjeeling"
                width={800}
                height={800}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-2 right-0 rounded-xl bg-accent p-3 text-white shadow-xl sm:-right-6 sm:-bottom-6 sm:rounded-2xl sm:p-6">
                <p style={{ fontWeight: 700, lineHeight: 1 }} className="text-2xl sm:text-5xl">5+</p>
                <p className="mt-1 text-xs sm:mt-2 sm:text-base">Years Experience</p>
              </div>
            </div>

            <div>
              <h2
                style={{
                  fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
                  fontWeight: 700,
                  color: "#0B3C5D",
                  marginBottom: "1rem",
                }}
              >
                About Jericho Tour & Travels
              </h2>
              <p className="mb-6 text-muted-foreground">
                Located in the scenic Rangbull, Darjeeling, we have been serving travelers for over 5 years with
                dedication and passion. Our mission is to make your journey memorable with our reliable services and
                local expertise.
              </p>
              <p className="mb-8 text-muted-foreground">
                From car rentals to complete travel packages, we handle everything to ensure you have a stress-free and
                enjoyable experience exploring the beautiful hills of Darjeeling and beyond.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p style={{ fontSize: "2rem", fontWeight: 700, color: "#FF7A00" }}>500+</p>
                  <p className="text-muted-foreground">Happy Customers</p>
                </div>
                <div>
                  <p style={{ fontSize: "2rem", fontWeight: 700, color: "#FF7A00" }}>50+</p>
                  <p className="text-muted-foreground">Vehicles</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="destinations" className="bg-white px-3 py-12 sm:px-4 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center sm:mb-16">
            <h2 style={{ fontSize: "clamp(1.75rem, 5vw, 2.5rem)", fontWeight: 700, color: "#0B3C5D" }}>
              Popular Destinations
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:mt-4 sm:text-base">
              Discover the most beautiful places in Northeast India
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-8 lg:grid-cols-4">
            {destinations.map((destination) => (
              <article
                key={destination.name}
                className="group relative h-48 cursor-pointer overflow-hidden rounded-xl shadow-lg transition-transform hover:scale-[1.02] sm:h-80 sm:rounded-2xl"
              >
                <Image
                  src={destination.image}
                  alt={destination.name}
                  width={800}
                  height={800}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3 text-white sm:p-6">
                  <h3 className="text-sm sm:text-2xl" style={{ fontWeight: 700 }}>{destination.name}</h3>
                  <p className="text-xs text-white/90 sm:text-base">{destination.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <AdventureSection />

      <section className="bg-muted px-3 py-12 sm:px-4 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center sm:mb-16">
            <h2 style={{ fontSize: "clamp(1.75rem, 5vw, 2.5rem)", fontWeight: 700, color: "#0B3C5D" }}>
              What Our Clients Say
            </h2>
            <p className="mt-4 text-muted-foreground">Trusted by travelers from across India</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="rounded-xl bg-white p-5 shadow-lg sm:rounded-2xl sm:p-8">
                <div className="mb-4 flex justify-center">
                  {Array.from({ length: testimonial.rating }).map((_, idx) => (
                    <Star key={idx} className="size-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-6 text-center text-muted-foreground italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="text-center">
                  <p style={{ fontWeight: 600, color: "#0B3C5D" }}>{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-3 py-12 sm:px-4 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center sm:mb-16">
            <h2 style={{ fontSize: "clamp(1.75rem, 5vw, 2.5rem)", fontWeight: 700, color: "#0B3C5D" }}>Why Choose Us</h2>
            <p className="mt-4 text-muted-foreground">Your satisfaction is our priority</p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-4">
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <article key={reason.title} className="text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10 sm:mb-4 sm:h-20 sm:w-20">
                    <Icon className="size-7 text-secondary sm:size-10" />
                  </div>
                  <h3 className="text-sm sm:text-xl" style={{ fontWeight: 600, color: "#0B3C5D", marginBottom: "0.5rem" }}>
                    {reason.title}
                  </h3>
                  <p className="text-xs text-muted-foreground sm:text-base">{reason.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-3 py-12 sm:px-4 sm:py-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1752563029959-ce4f4b443a87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920')",
          }}
        >
          <div className="absolute inset-0 bg-primary/90" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl text-center text-white">
          <h2
            className="text-white"
            style={{ fontSize: "clamp(1.75rem, 5vw, 2.5rem)", fontWeight: 700, marginBottom: "1rem" }}
          >
            Plan Your Trip Today
          </h2>
          <p className="mb-8 text-lg text-white/90">
            Ready to explore the beautiful hills? Contact us now and let&apos;s make your journey unforgettable!
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/enquiry"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-white transition-all duration-300 hover:scale-105 hover:bg-accent/90"
            >
              <span>Send Enquiry</span>
              <MapPin className="size-5" />
            </Link>
            <a
              href="tel:+919876543210"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-primary transition-all duration-300 hover:scale-105 hover:bg-white/90"
            >
              <Phone className="size-5" />
              <span>Call +91 98765 43210</span>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white px-3 py-8 sm:px-4 sm:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="aspect-video overflow-hidden rounded-xl shadow-lg sm:rounded-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28234.72!2d88.26!3d27.04!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDAyJzI0LjAiTiA4OMKwMTUnMzYuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              title="Jericho Tour & Travels Location"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
