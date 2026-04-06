"use client";

import Link from "next/link";
import { Bike, Mountain, Waves, Wind, TreePine, Camera } from "lucide-react";

const adventures = [
  {
    slug: "cycling",
    icon: Bike,
    title: "Cycling",
    description: "Pedal through Darjeeling tea gardens and Sikkim mountain passes",
    gradient: "from-emerald-500 to-emerald-600",
    image:
      "/cycling.jpg",
  },
  {
    slug: "camping",
    icon: TreePine,
    title: "Camping",
    description: "Camp under the stars at Sandakphu with Kanchenjunga views",
    gradient: "from-amber-500 to-amber-600",
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    slug: "paragliding",
    icon: Wind,
    title: "Paragliding",
    description: "Soar above Gangtok valley and Darjeeling tea estates",
    gradient: "from-sky-500 to-sky-600",
    image: "/paragliding.jpg",
  },
  {
    slug: "rafting",
    icon: Waves,
    title: "River Rafting",
    description: "Conquer Grade II-IV rapids on the mighty Teesta River",
    gradient: "from-blue-500 to-blue-600",
    image: "/river-rafting.jpg",
  },
  {
    slug: "trekking",
    icon: Mountain,
    title: "Trekking",
    description: "Walk legendary trails to Sandakphu and Goechala base camp",
    gradient: "from-rose-500 to-rose-600",
    image: "/trekking.jpg",
  },
  {
    slug: "sightseeing",
    icon: Camera,
    title: "Sightseeing",
    description: "Tiger Hill sunrise, Tsomgo Lake, Nathula Pass and more",
    gradient: "from-violet-500 to-violet-600",
    image:
      "https://images.unsplash.com/photo-1626621331169-5f34be280ed9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
];

export function AdventureSection() {
  return (
    <section id="adventures" className="relative overflow-hidden bg-primary px-3 py-12 sm:px-4 sm:py-20">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-accent blur-3xl" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-secondary blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-8 text-center sm:mb-16">
          <p className="mb-2 text-sm font-semibold tracking-widest text-accent uppercase sm:text-base">
            Thrill & Excitement
          </p>
          <h2
            className="text-white"
            style={{
              fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
              fontWeight: 700,
            }}
          >
            Adventure Activities
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-white/70 sm:mt-4 sm:text-base">
            Add a dash of adventure to your Darjeeling & Sikkim trip
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {adventures.map((adventure, index) => {
            const Icon = adventure.icon;
            return (
              <Link
                key={adventure.slug}
                href={`/adventures/${adventure.slug}`}
                className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm transition-all duration-500 hover:bg-white/10 sm:rounded-2xl"
              >
                <div className="relative h-32 overflow-hidden sm:h-48">
                  <img
                    src={adventure.image}
                    alt={adventure.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
                  <div
                    className={`absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br sm:top-4 sm:right-4 sm:h-12 sm:w-12 ${adventure.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className="size-4 text-white sm:size-6" />
                  </div>
                </div>

                <div className="p-3 sm:p-5">
                  <h3
                    className="mb-1 text-sm text-white sm:mb-2 sm:text-lg"
                    style={{ fontWeight: 600 }}
                  >
                    {adventure.title}
                  </h3>
                  <p className="text-[0.688rem] leading-relaxed text-white/70 sm:text-sm">
                    {adventure.description}
                  </p>
                  <span className="mt-2 inline-block text-[0.625rem] font-semibold text-accent sm:mt-3 sm:text-xs">
                    Learn More →
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-accent to-secondary transition-transform duration-500 group-hover:scale-x-100" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
