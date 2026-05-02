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
      "Darjeeling, perched at an altitude of 6,710 feet in the Eastern Himalayas, is one of India's most beloved hill stations. Famous for its sprawling tea gardens, the iconic Toy Train, and breathtaking views of Mount Kanchenjunga, Darjeeling has charmed travelers since the British era. The town blends colonial heritage with vibrant Gorkha culture, offering misty mornings, aromatic tea, Buddhist monasteries, and panoramic sunrises that leave visitors spellbound. The wider Darjeeling district also includes the charming neighbouring hill towns of Mirik, Kurseong and Kalimpong — each with their own lakes, monasteries and tea estates.",
    attractions: [
      { name: "Tiger Hill", detail: "The most famous sunrise point in India at 2,590m. Watch the golden rays illuminate Kanchenjunga and on clear days, even Mount Everest is visible on the horizon." },
      { name: "Darjeeling Himalayan Railway", detail: "The UNESCO World Heritage Toy Train has been chugging through the hills since 1881. The joyride from Darjeeling to Ghoom passes through Batasia Loop and offers stunning valley views." },
      { name: "Batasia Loop & War Memorial", detail: "A spectacular spiral railway loop where the Toy Train makes a full 360-degree turn through beautiful landscaped gardens with a war memorial honoring Gorkha soldiers." },
      { name: "Padmaja Naidu Himalayan Zoological Park", detail: "Home to rare and endangered species like the Red Panda, Snow Leopard, Siberian Tiger, and Himalayan Wolf. The Himalayan Mountaineering Institute is located within the zoo." },
      { name: "Peace Pagoda (Japanese Temple)", detail: "A serene white stupa built by Japanese monks to promote world peace. The temple offers panoramic views of Darjeeling town and Kanchenjunga." },
      { name: "Rock Garden & Ganga Maya Park", detail: "A terraced garden built with natural rocks, streams, and waterfalls. Ganga Maya Park nearby offers boating and picnic spots surrounded by lush greenery." },
      { name: "Mirik", detail: "A picture-perfect hill town 49 km from Darjeeling, built around the serene Sumendu Lake. Famous spots include Sumendu Lake (boating & horse rides), Bokar Monastery, the sprawling Thurbo and Gopaldhara tea gardens, Rai Dhap viewpoint and the orange orchards & cardamom plantations on the way." },
      { name: "Kurseong", detail: "The 'Land of White Orchids' at 4,864 ft, midway between NJP and Darjeeling. Famous spots include Eagle's Crag viewpoint, Dow Hill & Forest Museum, the world-renowned Makaibari and Ambootia tea estates, Salamander (Deer Park) Lake, Giddapahar view and the Toy Train ride through the heart of town." },
      { name: "Kalimpong", detail: "A peaceful hill town 51 km from Darjeeling, known for monasteries, flower nurseries and Himalayan views. Famous spots include Deolo Hill, Durpin Dara & Zang Dhok Palri Phodang Monastery, Mangal Dham, Pineview (cactus) Nursery, Hanuman Tok, Morgan House and the nearby forest hamlets of Lava, Lolegaon and Rishyap." },
    ],
    thingsToDo: [
      "Watch the sunrise at Tiger Hill over Kanchenjunga",
      "Ride the UNESCO heritage Toy Train through Batasia Loop",
      "Stroll through the tea gardens of Happy Valley Tea Estate",
      "Visit the Himalayan Mountaineering Institute & Zoo",
      "Shop for Darjeeling tea and handicrafts at Chowrasta Mall",
      "Take the Darjeeling Ropeway for aerial views of tea gardens and rivers",
      "Enjoy a boat ride on Sumendu Lake at Mirik and visit Bokar Monastery",
      "Tour Makaibari Tea Estate in Kurseong and stop at Eagle's Crag viewpoint",
      "Catch sunset over Kanchenjunga from Deolo Hill in Kalimpong",
      "Drive out to the forest hamlets of Lava, Lolegaon and Rishyap near Kalimpong",
    ],
    bestTime: "March to May & October to December",
    howToReach: "Nearest airport is Bagdogra (67 km). Nearest railway station is New Jalpaiguri (NJP, 74 km). Regular shared jeeps and taxis available from both — Mirik (49 km), Kurseong (32 km) and Kalimpong (51 km) are all easily combined with Darjeeling on the same trip.",
    idealDuration: "3 to 5 nights (to comfortably cover Darjeeling + Mirik / Kurseong / Kalimpong)",
    galleryImages: [
      "/destinations/darjeeling/tiger-hill.jpg",
      "/destinations/darjeeling/toy-train.jpg",
      "/destinations/darjeeling/batasia-loop.jpg",
      "/destinations/darjeeling/mirik.jpg",
      "/destinations/darjeeling/kurseong.jpg",
      "/destinations/darjeeling/kalimpong.jpg",
    ],
  },
  {
    slug: "sikkim",
    name: "Sikkim",
    tagline: "Land of Monasteries, Snow Peaks & Sacred Lakes",
    heroImage: "/gangtok.jpg",
    description:
      "Sikkim, India's mystical north-eastern state, is a land of soaring snow peaks, turquoise glacial lakes, ancient Buddhist monasteries, and warm-hearted mountain people. From the lively capital Gangtok with its MG Marg promenade and Kanchenjunga views, to the sacred Tsomgo Lake and the historic Nathula Pass on the Indo-China border, to the otherworldly Yumthang Valley and Gurudongmar Lake high up in North Sikkim — every corner of Sikkim feels like a different country. Add the spiritual towns of Namchi and Ravangla in the south, and you have one of the most complete Himalayan experiences in India.",
    attractions: [
      { name: "Gangtok — the Capital", detail: "Sikkim's vibrant capital at 5,410 ft. Highlights include the pedestrian-only MG Marg promenade, Tashi & Hanuman Tok viewpoints for Kanchenjunga sunrises, the sacred Do-Drul Chorten, the Namgyal Institute of Tibetology, Banjhakri Falls and the Gangtok Ropeway." },
      { name: "Tsomgo (Changu) Lake & Baba Mandir", detail: "A sacred glacial lake at 12,313 ft that changes colour with the seasons, with yak rides on its shores. The route continues to Baba Harbhajan Singh Mandir, a deeply revered shrine to an Indian Army soldier." },
      { name: "Nathula Pass", detail: "The historic Indo-China border pass at 14,450 ft — one of the highest motorable roads in the world. Open to Indian nationals (Wed-Sun) with permits. A deeply moving experience at the border post with the Indian Army." },
      { name: "Rumtek Monastery", detail: "The largest monastery in Sikkim and one of the most important seats of Tibetan Buddhism outside Tibet. Perched on a hilltop near Gangtok, it houses rare religious artworks, sacred relics and the famous Golden Stupa." },
      { name: "Lachung & Yumthang Valley (North Sikkim)", detail: "The 'Switzerland of the East' — a stunning alpine valley at 11,800 ft carpeted with rhododendrons in spring, and snow-bound in winter. Drive further to Zero Point (Yumesamdong) at 15,300 ft for breathtaking glacier views, with Lachung village as your base." },
      { name: "Lachen & Gurudongmar Lake (North Sikkim)", detail: "One of the highest lakes in the world at 17,800 ft, sacred to Buddhists, Hindus and Sikhs. The journey from Lachen village through Thangu Valley and Chopta is among the most dramatic high-altitude drives in India." },
      { name: "Namchi (South Sikkim)", detail: "Famous for the towering 135-ft Samdruptse statue of Guru Padmasambhava and the Char Dham complex with replicas of India's four holy shrines and a 108-ft Lord Shiva statue. Sweeping views of the Kanchenjunga range." },
      { name: "Ravangla & Buddha Park (South Sikkim)", detail: "Home to the magnificent 130-ft Buddha statue at Tathagata Tsal, set against panoramic Himalayan views. Ravangla also offers Ralong Monastery, Temi Tea Garden (Sikkim's only tea estate) and serene pine-forest walks." },
    ],
    thingsToDo: [
      "Stroll along MG Marg in Gangtok and try momos, thukpa and Sikkimese cuisine",
      "Visit the sacred Tsomgo Lake, Baba Mandir and ride up to Nathula Pass",
      "Explore Rumtek Monastery and its Golden Stupa",
      "Drive into North Sikkim to Lachung and the rhododendron-filled Yumthang Valley",
      "Witness the sunrise at Gurudongmar Lake from Lachen — one of the highest lakes on earth",
      "Pay your respects at the Char Dham complex and Samdruptse statue in Namchi",
      "Sit in silence before the giant Buddha statue at Tathagata Tsal in Ravangla",
      "Sip Sikkim's only home-grown tea at Temi Tea Garden",
    ],
    bestTime: "March to June (rhododendrons & clear skies) and October to December (snow & sharp Kanchenjunga views)",
    howToReach: "Nearest airport is Pakyong (Gangtok, 31 km) or Bagdogra (124 km). Nearest major railway station is New Jalpaiguri (NJP, 148 km). Shared jeeps and private taxis run regularly from Siliguri to Gangtok, with onward permits arranged for Tsomgo, Nathula and North Sikkim.",
    idealDuration: "5 to 7 nights (to cover Gangtok, Tsomgo/Nathula, North Sikkim and South Sikkim)",
    galleryImages: [
      "/destinations/sikkim/tsomgo-lake.jpg",
      "/destinations/sikkim/nathula.jpg",
      "/destinations/sikkim/yumthang-valley.jpg",
      "/destinations/sikkim/gurudongmar-lake.jpg",
      "/destinations/sikkim/rumtek-monastery.jpg",
      "/destinations/sikkim/buddha-park.jpg",
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
      "/destinations/pelling/pemayangtse-monastery.jpg",
      "/destinations/pelling/khecheopalri-lake.jpg",
      "/destinations/pelling/rabdentse.jpg",
      "/destinations/pelling/kanchenjunga.jpg",
      "/destinations/pelling/yuksom.jpg",
      "/destinations/pelling/pelling-town.jpg",
    ],
  },
  {
    slug: "dooars",
    name: "Dooars",
    tagline: "Where the plains meet the Himalayas — Wildlife & Tea Gardens",
    heroImage: "/destinations/dooars/jaldapara.jpg",
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
      "/destinations/dooars/jaldapara.jpg",
      "/destinations/dooars/rhinoceros.jpg",
      "/destinations/dooars/gorumara.jpg",
      "/destinations/dooars/elephant.jpg",
      "/destinations/dooars/buxa.jpg",
      "/destinations/dooars/tea-garden.jpg",
    ],
  },
];

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}
