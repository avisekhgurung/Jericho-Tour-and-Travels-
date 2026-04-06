export type Adventure = {
  slug: string;
  title: string;
  tagline: string;
  heroImage: string;
  description: string;
  highlights: string[];
  locations: { name: string; detail: string }[];
  bestTime: string;
  difficulty: string;
  duration: string;
  galleryImages: string[];
};

export const adventures: Adventure[] = [
  {
    slug: "cycling",
    title: "Cycling",
    tagline: "Pedal through the misty hills of Darjeeling & Sikkim",
    heroImage: "/cycling.jpg",
    description:
      "Experience the thrill of cycling through some of the most scenic mountain roads in the Eastern Himalayas. From the winding tea garden trails of Darjeeling to the breathtaking mountain passes of Sikkim, every pedal stroke reveals a new panoramic vista. Ride past colonial-era buildings, Buddhist monasteries, and lush green valleys with the mighty Kanchenjunga watching over you.",
    highlights: [
      "Ride through Darjeeling's famous tea estates on quiet hill roads",
      "Cycle from Darjeeling to Ghoom — home to the highest railway station in India",
      "Downhill ride from Gangtok to Rumtek Monastery with valley views",
      "Mountain pass cycling on the Silk Route through Zuluk's 32 hairpin bends",
    ],
    locations: [
      { name: "Darjeeling Tea Garden Loop", detail: "25 km circuit through Happy Valley and surrounding estates" },
      { name: "Gangtok to Rumtek", detail: "24 km scenic ride through forests and river valleys" },
      { name: "Pelling to Yuksom", detail: "35 km route with views of Kanchenjunga range" },
    ],
    bestTime: "October to May",
    difficulty: "Moderate to Challenging",
    duration: "Half day to multi-day tours",
    galleryImages: [
      "https://images.unsplash.com/photo-1571188654248-7a89213915f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1622308644420-67b56892ec01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1628837234647-b35db4740c85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    ],
  },
  {
    slug: "camping",
    title: "Camping",
    tagline: "Sleep under the stars with Kanchenjunga in sight",
    heroImage:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    description:
      "There is nothing quite like camping in the Eastern Himalayas. Wake up to the golden sunrise painting Kanchenjunga, breathe the crisp mountain air, and fall asleep to the sounds of the forest. From high-altitude camps near Sandakphu to riverside camping along the Teesta, the Darjeeling and Sikkim region offers unforgettable camping experiences for every level of adventurer.",
    highlights: [
      "Camp at Sandakphu (3,636m) with views of four of the five highest peaks in the world",
      "Riverside camping along the Teesta and Rangeet rivers",
      "Forest camping in Neora Valley National Park among rare wildlife",
      "Stargazing at high-altitude camps with zero light pollution",
    ],
    locations: [
      { name: "Sandakphu Base Camp", detail: "High-altitude camping with panoramic Himalayan views" },
      { name: "Teesta River Banks", detail: "Peaceful riverside camping in the Sikkim valleys" },
      { name: "Dooars Forest Camp", detail: "Jungle camping near Jaldapara and Gorumara reserves" },
    ],
    bestTime: "October to April",
    difficulty: "Easy to Moderate",
    duration: "1 to 3 nights",
    galleryImages: [
      "https://images.unsplash.com/photo-1487730116645-74489c95b41b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1626621331169-5f34be280ed9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    ],
  },
  {
    slug: "paragliding",
    title: "Paragliding",
    tagline: "Soar above the valleys of Darjeeling & Sikkim",
    heroImage: "/paragliding.jpg",
    description:
      "Take flight and soar over the stunning landscapes of the Eastern Himalayas. Paragliding in the Darjeeling and Sikkim region offers a bird's-eye view of terraced tea gardens, dense forests, winding rivers, and snow-capped peaks. With experienced pilots and tandem flights available, both beginners and experienced flyers can enjoy this incredible aerial adventure.",
    highlights: [
      "Tandem paragliding flights over Gangtok valley",
      "Aerial views of Kanchenjunga and the entire Himalayan range",
      "Fly over the lush green tea estates of Darjeeling",
      "Professional instructors with internationally certified equipment",
    ],
    locations: [
      { name: "Gangtok", detail: "Take off from Baliman Dara with views of the entire Gangtok valley" },
      { name: "Kalimpong", detail: "Launch from Deolo Hill overlooking the Teesta valley" },
      { name: "Darjeeling", detail: "Seasonal flights from Tiger Hill area" },
    ],
    bestTime: "October to May",
    difficulty: "Beginner Friendly (tandem)",
    duration: "15 to 30 minutes flight time",
    galleryImages: [
      "https://images.unsplash.com/photo-1622308644420-67b56892ec01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1628837234647-b35db4740c85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1626621331169-5f34be280ed9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    ],
  },
  {
    slug: "rafting",
    title: "River Rafting",
    tagline: "Conquer the rapids of the mighty Teesta River",
    heroImage: "/river-rafting.jpg",
    description:
      "The Teesta River, originating from the glaciers of Sikkim, offers some of the most thrilling white-water rafting experiences in Northeast India. Rushing through deep gorges and dense forests, the Teesta has rapids ranging from Grade I to Grade IV, making it perfect for both beginners and experienced rafters. The stretch between Makha and the Teesta Bazaar is particularly popular for its mix of calm stretches and exciting rapids.",
    highlights: [
      "Grade II to IV rapids on the Teesta River for all experience levels",
      "9 km and 15 km rafting stretches available",
      "Raft through stunning river gorges flanked by tropical forests",
      "Combine rafting with riverside camping for a complete adventure",
    ],
    locations: [
      { name: "Makha to Teesta Bazaar", detail: "The most popular 15 km stretch with Grade III-IV rapids" },
      { name: "Rangpo to Teesta Bazaar", detail: "A gentler 9 km stretch ideal for beginners" },
      { name: "Rangeet River", detail: "A tributary of Teesta offering calmer rafting in beautiful surroundings" },
    ],
    bestTime: "October to March",
    difficulty: "Moderate to Challenging",
    duration: "2 to 4 hours",
    galleryImages: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1626621331169-5f34be280ed9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1622308644420-67b56892ec01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    ],
  },
  {
    slug: "trekking",
    title: "Trekking",
    tagline: "Walk the legendary trails of the Eastern Himalayas",
    heroImage: "/trekking.jpg",
    description:
      "The Darjeeling and Sikkim region is a trekker's paradise, home to some of India's most iconic trails. Trek to Sandakphu for sunrise views over four of the world's five highest peaks, follow the historic Goechala trail to the base of Kanchenjunga, or walk through the rhododendron forests of Singalila Ridge. Every trail offers a unique blend of natural beauty, cultural encounters, and Himalayan adventure.",
    highlights: [
      "Sandakphu Trek — see Everest, Kanchenjunga, Lhotse and Makalu in one view",
      "Goechala Trek — reach the base camp of the mighty Kanchenjunga",
      "Singalila Ridge Trail through blooming rhododendron forests",
      "Yuksom to Dzongri Trek with pristine alpine meadows",
    ],
    locations: [
      { name: "Sandakphu (3,636m)", detail: "4-day trek from Manebhanjan through Singalila National Park" },
      { name: "Goechala (4,940m)", detail: "9-day trek from Yuksom to the foot of Kanchenjunga" },
      { name: "Varsey Rhododendron Sanctuary", detail: "Easy 2-day trek through colorful flower forests" },
    ],
    bestTime: "March to May, October to December",
    difficulty: "Easy to Challenging (varies by trail)",
    duration: "2 to 10 days",
    galleryImages: [
      "https://images.unsplash.com/photo-1622308644420-67b56892ec01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1487730116645-74489c95b41b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1626621331169-5f34be280ed9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    ],
  },
  {
    slug: "sightseeing",
    title: "Sightseeing",
    tagline: "Discover the iconic landmarks of Darjeeling & Sikkim",
    heroImage:
      "https://images.unsplash.com/photo-1626621331169-5f34be280ed9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    description:
      "From the world-famous Tiger Hill sunrise to the serene Tsomgo Lake, Darjeeling and Sikkim are packed with unforgettable sights. Visit ancient Buddhist monasteries like Rumtek and Pemayangtse, take a ride on the UNESCO heritage Darjeeling Himalayan Railway, explore the vibrant MG Marg in Gangtok, and witness the stunning Kanchenjunga from countless viewpoints. Every turn offers a postcard-perfect moment.",
    highlights: [
      "Tiger Hill sunrise with panoramic views of Kanchenjunga and Everest",
      "Ride the iconic Darjeeling Himalayan Railway (Toy Train) — a UNESCO World Heritage",
      "Visit Rumtek Monastery, one of the most sacred Buddhist sites in India",
      "Tsomgo Lake and Nathula Pass on the Indo-China border",
    ],
    locations: [
      { name: "Tiger Hill, Darjeeling", detail: "Famous sunrise point at 2,590m with views of the highest peaks" },
      { name: "Tsomgo Lake, Sikkim", detail: "Sacred glacial lake at 3,753m surrounded by mountains" },
      { name: "Nathula Pass", detail: "Historic Indo-China border pass at 4,310m (Indian nationals only)" },
    ],
    bestTime: "Year-round (Nathula closed Mon-Tue)",
    difficulty: "Easy",
    duration: "Half day to full day trips",
    galleryImages: [
      "https://images.unsplash.com/photo-1628837234647-b35db4740c85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1622308644420-67b56892ec01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    ],
  },
];

export function getAdventureBySlug(slug: string): Adventure | undefined {
  return adventures.find((a) => a.slug === slug);
}
