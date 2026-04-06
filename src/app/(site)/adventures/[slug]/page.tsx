import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, MapPin, Mountain, Phone } from "lucide-react";
import { adventures, getAdventureBySlug } from "@/lib/adventures";

export function generateStaticParams() {
  return adventures.map((a) => ({ slug: a.slug }));
}

export default async function AdventureDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const adventure = getAdventureBySlug(slug);
  if (!adventure) notFound();

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[320px] sm:h-[60vh]">
        <Image
          src={adventure.heroImage}
          alt={adventure.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-8 sm:pb-12">
            <Link
              href="/#adventures"
              className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white backdrop-blur-sm hover:bg-white/20 sm:text-sm"
            >
              <ArrowLeft className="size-3.5" /> Back to Adventures
            </Link>
            <h1
              className="text-white"
              style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)", fontWeight: 700, lineHeight: 1.2 }}
            >
              {adventure.title}
            </h1>
            <p className="mt-2 max-w-xl text-sm text-white/80 sm:text-lg">{adventure.tagline}</p>
          </div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-4 px-4 py-4 sm:gap-8 sm:py-5">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="size-4 text-accent" />
            <span className="text-xs sm:text-sm"><strong>Best Time:</strong> {adventure.bestTime}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mountain className="size-4 text-accent" />
            <span className="text-xs sm:text-sm"><strong>Difficulty:</strong> {adventure.difficulty}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="size-4 text-accent" />
            <span className="text-xs sm:text-sm"><strong>Duration:</strong> {adventure.duration}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white px-4 py-10 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="mb-4 text-xl font-bold text-primary sm:text-2xl">About This Adventure</h2>
              <p className="mb-8 leading-relaxed text-gray-600">{adventure.description}</p>

              <h3 className="mb-4 text-lg font-bold text-primary sm:text-xl">Highlights</h3>
              <ul className="mb-8 space-y-3">
                {adventure.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600 sm:text-base">
                    <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                      {i + 1}
                    </span>
                    {h}
                  </li>
                ))}
              </ul>

              <h3 className="mb-4 text-lg font-bold text-primary sm:text-xl">Popular Locations</h3>
              <div className="mb-8 space-y-3">
                {adventure.locations.map((loc, i) => (
                  <div key={i} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="size-4 text-accent" />
                      <h4 className="text-sm font-semibold text-primary sm:text-base">{loc.name}</h4>
                    </div>
                    <p className="mt-1 pl-6 text-xs text-gray-500 sm:text-sm">{loc.detail}</p>
                  </div>
                ))}
              </div>

              {/* Gallery */}
              <h3 className="mb-4 text-lg font-bold text-primary sm:text-xl">Gallery</h3>
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {adventure.galleryImages.map((img, i) => (
                  <div key={i} className="overflow-hidden rounded-xl">
                    <Image
                      src={img}
                      alt={`${adventure.title} ${i + 1}`}
                      width={400}
                      height={300}
                      className="h-24 w-full object-cover transition-transform duration-300 hover:scale-110 sm:h-40"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="sticky top-24 space-y-4">
                <div className="rounded-2xl bg-gradient-to-br from-primary to-primary/90 p-6 text-white shadow-xl">
                  <h3 className="mb-2 text-lg font-bold">Book This Adventure</h3>
                  <p className="mb-5 text-sm text-white/80">
                    Ready for {adventure.title.toLowerCase()} in Darjeeling & Sikkim? Contact us to plan your trip.
                  </p>
                  <div className="space-y-3">
                    <a
                      href="tel:+919876543210"
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-3 text-sm font-semibold text-white transition-all hover:bg-accent/90"
                    >
                      <Phone className="size-4" /> Call Now
                    </a>
                    <a
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 py-3 text-sm font-semibold text-white transition-all hover:bg-green-600"
                    >
                      WhatsApp Us
                    </a>
                    <Link
                      href="/#booking"
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/30 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  <h4 className="mb-3 text-sm font-semibold text-primary">Quick Facts</h4>
                  <div className="space-y-2.5 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Best Season</span>
                      <span className="font-medium text-primary">{adventure.bestTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Difficulty</span>
                      <span className="font-medium text-primary">{adventure.difficulty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration</span>
                      <span className="font-medium text-primary">{adventure.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
