export type Destination = {
  slug: string;
  name: string;
  tagline: string;
  heroImage: string;
  description: string;
  attractions: { name: string; detail: string }[];
  thingsToDo: string[];
  bestTime: string;
  howToReach: string;
  idealDuration: string;
  galleryImages: string[];
};

export const destinations: Destination[] = [
  {
    slug: "darjeeling",
    name: "Darjeeling",
    tagline: "Queen of the Hills — Where the mountains kiss the clouds",
    heroImage:
      "/darjeeling.jpg",
    description:
      "Darjeeling, perched at an altitude of 6,710 feet in the Eastern Himalayas, is one of India's most beloved hill stations. Famous for its sprawling tea gardens, the iconic Toy Train, and breathtaking views of Mount Kanchenjunga, Darjeeling has charmed travelers since the British era. The town blends colonial heritage with vibrant Gorkha culture, offering misty mornings, aromatic tea, Buddhist monasteries, and panoramic sunrises that leave visitors spellbound.",
    attractions: [
      { name: "Tiger Hill", detail: "The most famous sunrise point in India at 2,590m. Watch the golden rays illuminate Kanchenjunga and on clear days, even Mount Everest is visible on the horizon." },
      { name: "Darjeeling Himalayan Railway", detail: "The UNESCO World Heritage Toy Train has been chugging through the hills since 1881. The joyride from Darjeeling to Ghoom passes through Batasia Loop and offers stunning valley views." },
      { name: "Batasia Loop & War Memorial", detail: "A spectacular spiral railway loop where the Toy Train makes a full 360-degree turn through beautiful landscaped gardens with a war memorial honoring Gorkha soldiers." },
      { name: "Padmaja Naidu Himalayan Zoological Park", detail: "Home to rare and endangered species like the Red Panda, Snow Leopard, Siberian Tiger, and Himalayan Wolf. The Himalayan Mountaineering Institute is located within the zoo." },
      { name: "Peace Pagoda (Japanese Temple)", detail: "A serene white stupa built by Japanese monks to promote world peace. The temple offers panoramic views of Darjeeling town and Kanchenjunga." },
      { name: "Rock Garden & Ganga Maya Park", detail: "A terraced garden built with natural rocks, streams, and waterfalls. Ganga Maya Park nearby offers boating and picnic spots surrounded by lush greenery." },
    ],
    thingsToDo: [
      "Watch the sunrise at Tiger Hill over Kanchenjunga",
      "Ride the UNESCO heritage Toy Train through Batasia Loop",
      "Stroll through the tea gardens of Happy Valley Tea Estate",
      "Visit the Himalayan Mountaineering Institute & Zoo",
      "Shop for Darjeeling tea and handicrafts at Chowrasta Mall",
      "Take the Darjeeling Ropeway for aerial views of tea gardens and rivers",
    ],
    bestTime: "March to May & October to December",
    howToReach: "Nearest airport is Bagdogra (67 km). Nearest railway station is New Jalpaiguri (NJP, 74 km). Regular shared jeeps and taxis available from both.",
    idealDuration: "2 to 3 nights",
    galleryImages: [
      "https://images.unsplash.com/photo-1628837234647-b35db4740c85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1626621331169-5f34be280ed9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    ],
  },
  {
    slug: "gangtok",
    name: "Gangtok",
    tagline: "Capital of Sikkim — Where culture meets the clouds",
    heroImage: "/gangtok.jpg",
    description:
      "Gangtok, the capital of Sikkim, sits at 5,410 feet and is a perfect blend of modernity and tradition. The city is framed by the mighty Kanchenjunga and is known for its clean streets, vibrant MG Marg promenade, ancient Buddhist monasteries, and the stunning Tsomgo Lake. As the gateway to North Sikkim and the historic Nathula Pass on the Indo-China border, Gangtok is the starting point for some of the most unforgettable journeys in the Eastern Himalayas.",
    attractions: [
      { name: "Tsomgo Lake (Changu Lake)", detail: "A sacred glacial lake at 12,313 feet surrounded by steep mountains. The lake changes colors with the seasons — from deep blue to emerald green. Yak rides available on the shores." },
      { name: "Nathula Pass", detail: "The historic Indo-China border pass at 14,450 feet. One of the highest motorable roads in the world. Open to Indian nationals only (Wed-Sun). A deeply moving experience at the border post." },
      { name: "Rumtek Monastery", detail: "One of the most important seats of Tibetan Buddhism outside Tibet. Perched on a hilltop with stunning valley views, the monastery houses rare religious artworks and sacred relics." },
      { name: "MG Marg", detail: "The vibrant pedestrian-only promenade in the heart of Gangtok. Lined with shops, restaurants, and cafes, it comes alive in the evenings with lights and local culture." },
      { name: "Tashi Viewpoint", detail: "The best viewpoint in Gangtok to see Mount Kanchenjunga and the entire Himalayan range in their full glory. Best visited early morning for clear views." },
      { name: "Enchey Monastery", detail: "A 200-year-old monastery nestled among dense forests. Known for its annual Cham dance festival, the monastery offers peaceful surroundings and mountain views." },
    ],
    thingsToDo: [
      "Visit the stunning Tsomgo Lake and ride a yak",
      "Drive up to Nathula Pass on the Indo-China border",
      "Explore Rumtek Monastery and its sacred relics",
      "Stroll along MG Marg and try momos, thukpa, and local cuisine",
      "Take in Kanchenjunga views from Tashi Viewpoint at sunrise",
      "Visit the Namgyal Institute of Tibetology and Do-Drul Chorten",
    ],
    bestTime: "March to June & October to December",
    howToReach: "Nearest airport is Pakyong Airport (31 km) or Bagdogra (124 km). Nearest major railway station is New Jalpaiguri (NJP, 148 km). Shared jeeps run regularly from Siliguri.",
    idealDuration: "3 to 4 nights",
    galleryImages: [
      "https://images.unsplash.com/photo-1622308644420-67b56892ec01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1626621331169-5f34be280ed9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    ],
  },
  {
    slug: "pelling",
    name: "Pelling",
    tagline: "Gateway to Kanchenjunga — Sikkim's hidden jewel",
    heroImage: "/pelling.jpg",
    description:
      "Pelling, perched at 7,200 feet in West Sikkim, offers some of the most spectacular views of Mount Kanchenjunga in the entire region. This peaceful hill town is the gateway to ancient monasteries, sacred lakes, dramatic waterfalls, and the starting point for the legendary Goechala trek. With the Singshore Bridge (one of Asia's highest suspension bridges) and the new Chenrezig Sky Walk, Pelling perfectly blends natural beauty with adventure and spirituality.",
    attractions: [
      { name: "Kanchenjunga Falls", detail: "A stunning multi-tiered waterfall cascading through lush forest. One of the most photographed spots in Pelling. Rope sliding available for adventure seekers." },
      { name: "Pemayangtse Monastery", detail: "One of the oldest and most significant monasteries in Sikkim, dating back to the 17th century. Houses an incredible seven-tiered painted wooden model of the heavenly abode of Guru Rinpoche." },
      { name: "Rabdentse Ruins", detail: "The atmospheric remains of the second capital of the ancient Kingdom of Sikkim. A short forest walk leads to the ruins which offer magnificent views of Kanchenjunga." },
      { name: "Sky Walk & Chenrezig Statue", detail: "A glass-bottomed Sky Walk at the 137-foot Chenrezig statue offering thrilling views of the valley far below. A unique blend of adventure and spirituality." },
      { name: "Khecheopalri Lake", detail: "Known as the Wish-Fulfilling Lake, sacred to both Buddhists and Hindus. Surrounded by dense prayer-flag-draped forest. Legend says no leaf ever floats on its surface." },
      { name: "Singshore Bridge", detail: "One of the highest suspension bridges in Asia at 198 meters above the gorge. Walk across for heart-pumping views of waterfalls and deep valleys." },
    ],
    thingsToDo: [
      "Watch Kanchenjunga light up at sunrise from your hotel",
      "Walk the glass Sky Walk at Chenrezig Statue",
      "Explore the ancient Pemayangtse Monastery",
      "Trek through the forest to Rabdentse Ruins",
      "Make a wish at the sacred Khecheopalri Lake",
      "Cross the Singshore Bridge — one of Asia's highest",
    ],
    bestTime: "March to June & September to November",
    howToReach: "Nearest airport is Pakyong (115 km) or Bagdogra (152 km). Most visitors reach via Gangtok (130 km) or directly from NJP/Siliguri (145 km) by shared jeep or taxi.",
    idealDuration: "2 to 3 nights",
    galleryImages: [
      "https://images.unsplash.com/photo-1622308644420-67b56892ec01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1628837234647-b35db4740c85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    ],
  },
  {
    slug: "dooars",
    name: "Dooars",
    tagline: "Where the plains meet the Himalayas — Wildlife & Tea Gardens",
    heroImage:
      "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    description:
      "Dooars, the lush green gateway to Northeast India and Bhutan, stretches along the foothills of the Eastern Himalayas. Named after the 'doors' or passes into Bhutan, this region is a paradise of dense forests, rolling tea gardens, winding rivers, and some of India's finest wildlife sanctuaries. Home to the Great Indian One-Horned Rhinoceros, wild elephants, and Royal Bengal Tigers, Dooars offers an unforgettable blend of nature, wildlife safaris, and the tranquil beauty of endless tea estates.",
    attractions: [
      { name: "Jaldapara National Park", detail: "Spanning over 200 sq km, this park is home to one of India's largest populations of the Great Indian One-Horned Rhinoceros outside Kaziranga. Elephant and jeep safaris take you through grasslands teeming with wildlife." },
      { name: "Gorumara National Park", detail: "A UNESCO World Heritage-nominated park known for Asian One-Horned Rhinos, wild elephants, Royal Bengal Tigers, Indian Bison, and the majestic Great Indian Hornbill. Multiple watchtowers offer excellent wildlife viewing." },
      { name: "Buxa Tiger Reserve", detail: "One of India's 15 Tiger Reserves covering 745 sq km. Home to the elusive Royal Bengal Tiger along with rhinos, deer, bison, and over 230 bird species. The historic Buxa Fort sits within the reserve." },
      { name: "Tea Gardens", detail: "The Dooars region is covered in vast tea estates producing some of West Bengal's finest CTC tea. Visit working tea factories, walk through the emerald-green gardens, and stay at heritage tea bungalows dating back to the British era." },
      { name: "Suntalekhola & Samsing", detail: "Quiet offbeat villages surrounded by cardamom farms, orange orchards, and tea gardens on the edge of Neora Valley National Park. Perfect for nature walks and birdwatching away from the crowds." },
      { name: "Jayanti River & Forest", detail: "Located inside Buxa Tiger Reserve, Jayanti is a serene riverside hamlet at the India-Bhutan border. Crystal-clear river waters, dense sal forests, and the remote Bhutan hills make it magical." },
    ],
    thingsToDo: [
      "Go on an elephant or jeep safari in Jaldapara National Park",
      "Spot rhinos and wild elephants at Gorumara",
      "Walk through working tea gardens and visit a tea factory",
      "Stay at a heritage British-era tea bungalow",
      "Explore Buxa Tiger Reserve and trek to Buxa Fort",
      "Visit the riverside hamlet of Jayanti on the Bhutan border",
    ],
    bestTime: "October to April (forests open, clear skies, best wildlife spotting)",
    howToReach: "Nearest airport is Bagdogra (80-120 km depending on destination). Nearest major stations are New Jalpaiguri (NJP) and Alipurduar. Well connected by road from Siliguri.",
    idealDuration: "2 to 4 nights",
    galleryImages: [
      "https://images.unsplash.com/photo-1622308644420-67b56892ec01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1626621331169-5f34be280ed9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      "https://images.unsplash.com/photo-1628837234647-b35db4740c85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    ],
  },
];

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}
