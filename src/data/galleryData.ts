export type GalleryCategory =
  | "All"
  | "Food Distribution"
  | "Community Meals"
  | "Cow Welfare"
  | "Education Support"
  | "Children"
  | "Volunteer Activities"
  | "NGO Team"
  | "Events"
  | "Community Outreach"
  | "Awareness Programs"

export interface GalleryImage {
  id: string
  src: string
  alt: string
  title: string
  description: string
  categories: GalleryCategory[]
  spotlight?: boolean
}

export const galleryCategories: GalleryCategory[] = [
  "All",
  "Food Distribution",
  "Cow Welfare",
  "Education Support",
  "Volunteer Activities",
  "Events",
  "NGO Team",
]

export const galleryImages: GalleryImage[] = [
  // --- Food Distribution & Community Meals ---
  {
    id: "img-1",
    src: "/gallery/program-5.webp",
    alt: "Volunteers serving hot food meals to community members",
    title: "Food For Life Initiative",
    description: "Our dedicated volunteers actively serving nutritious, freshly packed meals to individuals in need.",
    categories: ["All", "Food Distribution", "Community Meals", "Volunteer Activities"],
    spotlight: true,
  },
  {
    id: "img-4",
    src: "/gallery/program-3.webp",
    alt: "People queuing for hot meals served from large community pots",
    title: "Community Mega Feeding Drive",
    description: "Serving hundreds of individuals with hot, freshly cooked meals served straight from large pots.",
    categories: ["All", "Food Distribution", "Community Meals", "Events"],
    spotlight: true,
  },
  {
    id: "img-8",
    src: "/gallery/program-4.webp",
    alt: "Volunteers organizing food trays for neighborhood distribution",
    title: "Warm Meals for All",
    description: "Preparing and packaging healthy food boxes for daily distribution drives.",
    categories: ["All", "Food Distribution", "Volunteer Activities"],
  },
  {
    id: "img-11",
    src: "/gallery/program-8.webp",
    alt: "Large gathering at community food event",
    title: "Festive Community Meal Drive",
    description: "Gathering community members together to share nutritious food during festival drives.",
    categories: ["All", "Food Distribution", "Events", "Community Meals"],
  },
  {
    id: "img-12",
    src: "/gallery/program-10.webp",
    alt: "Volunteers serving fresh rotis and curry to residents",
    title: "Nourishing Needy Families",
    description: "Ensuring no child or elder goes to bed hungry by reaching underserved neighborhoods.",
    categories: ["All", "Food Distribution", "Community Meals"],
  },
  {
    id: "img-19",
    src: "/images/live/community.webp",
    alt: "Community members assembling for food service",
    title: "Neighborhood Food Service",
    description: "Mobilizing local communities to join hands in food security drives.",
    categories: ["All", "Food Distribution", "Community Outreach"],
  },
  {
    id: "img-21",
    src: "/images/live/5.jpg-1.jpeg",
    alt: "Food packaging and distribution to homeless individuals",
    title: "Relief Food Packets",
    description: "Distributing freshly packed meals directly to homeless and destitute individuals.",
    categories: ["All", "Food Distribution", "Community Meals"],
  },
  {
    id: "img-24",
    src: "/images/live/8.jpg.jpeg",
    alt: "Serving hot food to elderly citizens",
    title: "Respectful Meals for Elders",
    description: "Providing warm, healthy food to elderly citizens who need daily care and attention.",
    categories: ["All", "Food Distribution", "Volunteer Activities"],
  },
  {
    id: "img-27",
    src: "/images/live/IMG20260714115736-6XDWu.jpg",
    alt: "On-field food distribution in slums",
    title: "Slum Neighborhood Support",
    description: "Reaching deep into informal settlements to deliver essential food items and support.",
    categories: ["All", "Food Distribution", "Community Outreach"],
  },
  {
    id: "img-30",
    src: "/images/live/Untitled-design-31.jpg",
    alt: "Food drive serving warm meals to families",
    title: "Family Food Security",
    description: "Supporting vulnerable families with wholesome food packages.",
    categories: ["All", "Food Distribution", "Events"],
  },
  {
    id: "img-38",
    src: "/images/live/image-2026-05-27T162851.033.jpg",
    alt: "Preparation of warm meal distribution packets",
    title: "Daily Meal Packet Seva",
    description: "Freshly prepared vegetarian meal packets packed and ready for immediate street distribution.",
    categories: ["All", "Food Distribution", "Volunteer Activities"],
  },

  // --- Cow Welfare & Animal Rescue ---
  {
    id: "img-3",
    src: "/gallery/program-9.webp",
    alt: "Volunteer caring for a calm calf outdoors",
    title: "Compassion for Animals",
    description: "Providing care, comfort, and nutrition to street calves and injured cows across Delhi NCR.",
    categories: ["All", "Cow Welfare", "Volunteer Activities"],
    spotlight: true,
  },
  {
    id: "img-5",
    src: "/gallery/emergency_rescue.webp",
    alt: "Emergency rescue team tending to injured animal on street",
    title: "Emergency Animal Rescue",
    description: "On-the-ground animal rescue squad performing quick treatment and medical assistance for stray cows.",
    categories: ["All", "Cow Welfare", "Volunteer Activities"],
    spotlight: true,
  },
  {
    id: "img-14",
    src: "/gallery/adopt_cow.webp",
    alt: "Cow welfare and adoption initiative banner with healthy cow",
    title: "Gaushala & Cow Adoption Drive",
    description: "Encouraging community participation in cow welfare, shelter support, and medical care.",
    categories: ["All", "Cow Welfare", "Awareness Programs"],
  },
  {
    id: "img-15",
    src: "/gallery/head_injury.png",
    alt: "Medical treatment given to injured cow",
    title: "On-site Medical Treatment",
    description: "Providing immediate wound dressing and veterinary care for injured street cattle.",
    categories: ["All", "Cow Welfare"],
  },
  {
    id: "img-16",
    src: "/gallery/highway_truck_rescue.png",
    alt: "Rescuing cattle trapped in vehicle transit",
    title: "Highway Rescue Mission",
    description: "Timely intervention and rescue operations for cattle involved in transit emergencies.",
    categories: ["All", "Cow Welfare", "Volunteer Activities"],
  },
  {
    id: "img-17",
    src: "/gallery/roadside_injury.png",
    alt: "Volunteers treating injured cow on roadside",
    title: "Roadside Animal Healthcare",
    description: "Delivering frontline medical support to street cows injured in traffic accidents.",
    categories: ["All", "Cow Welfare"],
  },
  {
    id: "img-18",
    src: "/gallery/treatment_Seva.webp",
    alt: "Volunteers feeding and dressing wounds of sick calf",
    title: "Treatment & Seva Drive",
    description: "Dedicated daily Seva focused on feeding, dressing wounds, and caring for recovering animals.",
    categories: ["All", "Cow Welfare", "Volunteer Activities"],
  },
  {
    id: "img-20",
    src: "/images/live/medical_support.jpg",
    alt: "Veterinary doctor and team assisting injured animal",
    title: "Specialized Veterinary Care",
    description: "Partnering with animal healthcare professionals to administer critical treatments.",
    categories: ["All", "Cow Welfare"],
  },
  {
    id: "img-25",
    src: "/images/live/9.jpg.jpeg",
    alt: "Feeding green fodder to cows",
    title: "Green Fodder Seva",
    description: "Distributing fresh green grass and cattle feed to gaushalas and street animals.",
    categories: ["All", "Cow Welfare", "Volunteer Activities"],
  },
  {
    id: "img-29",
    src: "/images/live/Untitled-design-30.jpg",
    alt: "Cows resting in gaushala with foundation volunteer",
    title: "Gaushala Care & Shelter",
    description: "Creating safe spaces and clean environments for sheltered cows.",
    categories: ["All", "Cow Welfare"],
  },
  {
    id: "img-44",
    src: "/images/hero/cow-banner.png",
    alt: "Cow protection and welfare banner",
    title: "Gau Seva Abhiyan",
    description: "Dedicated campaigns promoting cow protection, street feeding, and medical treatment.",
    categories: ["All", "Cow Welfare", "Events"],
  },

  // --- Education Support & Children ---
  {
    id: "img-2",
    src: "/gallery/program-1.webp",
    alt: "Foundation team engaging with young school children",
    title: "Classroom & Youth Engagement",
    description: "Interacting with school children to inspire education and foster a positive learning environment.",
    categories: ["All", "Education Support", "Children", "Awareness Programs"],
    spotlight: true,
  },
  {
    id: "img-6",
    src: "/images/live/education.webp",
    alt: "Children receiving educational materials and guidance",
    title: "Bright Minds Educational Campaign",
    description: "Supporting underprivileged children with essential learning tools, books, and mentorship.",
    categories: ["All", "Education Support", "Children"],
    spotlight: true,
  },
  {
    id: "img-7",
    src: "/gallery/program-2.webp",
    alt: "Foundation volunteer presenting gifts to school children",
    title: "School Outreach & Gift Distribution",
    description: "Spreading joy and excitement among school kids during special community outreach events.",
    categories: ["All", "Education Support", "Children", "Events"],
  },
  {
    id: "img-31",
    src: "/images/live/Untitled-design-32.jpg",
    alt: "School children receiving education materials",
    title: "Empowering Young Students",
    description: "Helping children build a better future through access to educational resources.",
    categories: ["All", "Education Support", "Children"],
  },
  {
    id: "img-37",
    src: "/images/live/download-2.jpg",
    alt: "Children smiling together during school outreach session",
    title: "Child Welfare & Literacy Drive",
    description: "Encouraging school attendance and nurturing confidence in young learners.",
    categories: ["All", "Education Support", "Children"],
  },
  {
    id: "img-39",
    src: "/images/live/image-66.jpg",
    alt: "Supporting schoolchildren with study kits and snacks",
    title: "School Snack & Book Distribution",
    description: "Combining nutritious snacks with educational kits to keep kids motivated at school.",
    categories: ["All", "Education Support", "Children", "Food Distribution"],
  },
  {
    id: "img-40",
    src: "/images/live/image-2026-05-27T162219.773.jpg",
    alt: "Interactive learning workshop with children",
    title: "Interactive Youth Workshop",
    description: "Conducting engaging group sessions focused on basic literacy, health, and ethics.",
    categories: ["All", "Education Support", "Children", "Volunteer Activities"],
  },

  // --- Volunteer Activities ---
  {
    id: "img-9",
    src: "/gallery/program-6.webp",
    alt: "Volunteers gathering for community service drive",
    title: "Community Outreach Team",
    description: "Bringing together local volunteers to serve communities in need across urban locations.",
    categories: ["All", "Volunteer Activities", "Community Outreach"],
  },
  {
    id: "img-22",
    src: "/images/live/6.jpg.jpeg",
    alt: "Volunteers wearing NGO t-shirts ready for service",
    title: "Volunteers on the Ground",
    description: "Our energetic team of young volunteers ready to serve with joy and empathy.",
    categories: ["All", "Volunteer Activities", "NGO Team"],
  },
  {
    id: "img-28",
    src: "/images/live/IMG20260714115739-bOYlA.jpg",
    alt: "Outdoor activity drive with foundation members",
    title: "Field Campaign Drive",
    description: "Conducting continuous field campaigns to assess community needs and provide aid.",
    categories: ["All", "Volunteer Activities", "Events"],
  },
  {
    id: "img-41",
    src: "/images/live/image-2026-05-26T180619.042.jpg",
    alt: "Volunteers coordinating relief efforts on field",
    title: "Ground Relief Coordination",
    description: "Hands-on volunteers executing logistics and distributing aid efficiently.",
    categories: ["All", "Volunteer Activities"],
  },
  {
    id: "img-42",
    src: "/images/live/image-67.jpg",
    alt: "Volunteer team member sharing food with community resident",
    title: "Direct Community Connection",
    description: "Building personal connections and offering support to individuals in local areas.",
    categories: ["All", "Volunteer Activities", "Community Outreach"],
  },

  // --- Events & Public Programs ---
  {
    id: "img-23",
    src: "/images/live/7.jpg.jpeg",
    alt: "Shri Shyam Foundation public event gathering",
    title: "Awareness & Action Event",
    description: "Raising public awareness on animal rights, education rights, and hunger eradication.",
    categories: ["All", "Events", "Community Outreach"],
  },
  {
    id: "img-32",
    src: "/images/live/Untitled-design-33.jpg",
    alt: "Community gathering and outreach drive",
    title: "Uniting Communities",
    description: "Building strong bonds within neighborhoods through collective social action.",
    categories: ["All", "Events", "Community Outreach"],
  },
  {
    id: "img-34",
    src: "/images/live/faq-shyam.png",
    alt: "NGO volunteers interacting with public",
    title: "Public Engagement & Awareness",
    description: "Answering questions and encouraging citizens to participate in voluntary work.",
    categories: ["All", "Events", "Awareness Programs"],
  },
  {
    id: "img-43",
    src: "/images/hero/clothes-banner.png",
    alt: "Clothing distribution banner for winter relief",
    title: "Clothing Relief Campaign",
    description: "Distributing warm clothes and blankets to vulnerable street dwellers during winter.",
    categories: ["All", "Events", "Volunteer Activities"],
  },

  // --- NGO Team & Leadership ---
  {
    id: "img-10",
    src: "/gallery/program-7.webp",
    alt: "Shri Shyam Foundation NGO members with banner",
    title: "Foundation Team Unity",
    description: "Core organizers and volunteers standing united under the Shri Shyam Foundation banner.",
    categories: ["All", "NGO Team", "Awareness Programs"],
  },
  {
    id: "img-13",
    src: "/gallery/program-11.webp",
    alt: "Foundation team members discussing upcoming social service project",
    title: "Strategic Planning for Change",
    description: "Our dedicated NGO leaders planning efficient rescue operations and relief drives.",
    categories: ["All", "NGO Team", "Volunteer Activities"],
  },
  {
    id: "img-26",
    src: "/images/live/10.jpg.jpeg",
    alt: "Shri Shyam Foundation core committee meeting",
    title: "Foundation Leadership",
    description: "Our board and committee members dedicated to scaling our social welfare programs.",
    categories: ["All", "NGO Team", "Events"],
  },
  {
    id: "img-33",
    src: "/images/live/abot-syam.png",
    alt: "Shri Shyam Foundation team portrait",
    title: "About Our Foundation",
    description: "Driven by compassion, fueled by community support, committed to real impact.",
    categories: ["All", "NGO Team", "Awareness Programs"],
  },
  {
    id: "img-35",
    src: "/images/live/gall-seliser.png",
    alt: "Highlights of Shri Shyam Foundation activities",
    title: "Impact Showcase",
    description: "A glimpse of our multi-sectoral initiatives spanning food, healthcare, and education.",
    categories: ["All", "NGO Team", "Events"],
  },
  {
    id: "img-36",
    src: "/images/live/jairam-8.png",
    alt: "NGO representative at official event",
    title: "Representative & Key Guests",
    description: "Key contributors and partners supporting the cause of Shri Shyam Foundation.",
    categories: ["All", "NGO Team", "Events"],
  },
  {
    id: "img-45",
    src: "/images/live/image-80.jpg",
    alt: "NGO members gathered at Foundation headquarters",
    title: "Dedicated Foundation Members",
    description: "Our team working behind the scenes to manage administrative and field operations.",
    categories: ["All", "NGO Team"],
  },
]

