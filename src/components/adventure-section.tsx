"use client";

import { Bike, Mountain, Waves, Wind, TreePine, Camera } from "lucide-react";

const adventures = [
  {
    icon: Bike,
    title: "Cycling",
    description: "Ride through scenic mountain trails and tea gardens",
    gradient: "from-emerald-500 to-emerald-600",
    image:
      "https://images.unsplash.com/photo-1541625602330-2277a4c46182?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    icon: TreePine,
    title: "Camping",
    description: "Camp under the stars with breathtaking mountain views",
    gradient: "from-amber-500 to-amber-600",
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    icon: Wind,
    title: "Paragliding",
    description: "Soar above the hills and enjoy panoramic views",
    gradient: "from-sky-500 to-sky-600",
    image:
      "https://images.unsplash.com/photo-1503104834685-7205e8607eb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    icon: Waves,
    title: "Rafting",
    description: "Experience thrilling white water rafting in Teesta river",
    gradient: "from-blue-500 to-blue-600",
    image:
      "https://images.unsplash.com/photo-1530866495561-507c83d06890?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    icon: Mountain,
    title: "Trekking",
    description: "Trek through lush green trails of the Eastern Himalayas",
    gradient: "from-rose-500 to-rose-600",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    icon: Camera,
    title: "Sightseeing",
    description: "Explore hidden gems and iconic landmarks of the region",
    gradient: "from-violet-500 to-violet-600",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
];

export function AdventureSection() {
  return (
    <section className="relative overflow-hidden bg-primary px-3 py-12 sm:px-4 sm:py-20">
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
            Add a dash of adventure to your trip with our exciting outdoor activities
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {adventures.map((adventure, index) => {
            const Icon = adventure.icon;
            return (
              <article
                key={adventure.title}
                className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm transition-all duration-500 hover:bg-white/10 sm:rounded-2xl"
                style={{ animationDelay: `${index * 100}ms` }}
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
                </div>

                <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-accent to-secondary transition-transform duration-500 group-hover:scale-x-100" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
