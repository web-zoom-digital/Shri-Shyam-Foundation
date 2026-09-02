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
  {
    id: "img-1",
    src: "/gallery/10-1.png",
    alt: "Volunteers serving hot meals in foil containers to a man",
    title: "Food For Life Initiative",
    description: "Our dedicated volunteers actively serving nutritious, freshly packed meals to individuals in need on the streets.",
    categories: ["All", "Food Distribution", "Community Meals", "Volunteer Activities"],
    spotlight: true,
  },
  {
    id: "img-2",
    src: "/gallery/11-1.png",
    alt: "Shri Shyam Foundation team and guests posing together in a park",
    title: "Community Outreach Event",
    description: "Our team members, volunteers, and local supporters gathered in front of the Shri Shyam Foundation banner at an outdoor park event.",
    categories: ["All", "Events", "NGO Team", "Awareness Programs"],
  },
  {
    id: "img-3",
    src: "/gallery/13-1.png",
    alt: "Female volunteer holding a food container ready to distribute",
    title: "Serving with a Smile",
    description: "Our passionate volunteers ensure that every meal distributed comes with warmth, respect, and a genuine smile.",
    categories: ["All", "Food Distribution", "Volunteer Activities"],
  },
  {
    id: "img-4",
    src: "/gallery/2-1.png",
    alt: "Group of volunteers and organizers in front of the NGO banner",
    title: "Team Dedication",
    description: "The core members and volunteers of Shri Shyam Foundation standing united for our ongoing social initiatives.",
    categories: ["All", "NGO Team", "Events"],
  },
  {
    id: "img-5",
    src: "/gallery/21-1.png",
    alt: "Foundation volunteer handing a saffron ceremonial trishul gift to a boy while schoolchildren in uniform watch",
    title: "Festival Gifts for Children",
    description: "During a school outreach visit, a foundation volunteer presents ceremonial gifts to children gathered outside the building.",
    categories: ["All", "Children", "Events", "Community Outreach"],
    spotlight: true,
  },
  {
    id: "img-6",
    src: "/gallery/25.png",
    alt: "Volunteer handing a large bubble wand toy to a boy in a narrow residential alley",
    title: "Reaching Every Alley",
    description: "Our volunteers walking through local neighbourhoods to personally hand gifts to children who often get left out of big events.",
    categories: ["All", "Children", "Community Outreach", "Volunteer Activities"],
  },
  {
    id: "img-7",
    src: "/gallery/26.png",
    alt: "Children smiling while receiving bright orange trishul toys from a female volunteer",
    title: "Smiles and Surprises",
    description: "The joy on children's faces as they receive colourful gifts during a neighbourhood outreach visit.",
    categories: ["All", "Children", "Community Outreach"],
  },
  {
    id: "img-8",
    src: "/gallery/3-1.png",
    alt: "NGO members and sponsors posing with a bouquet beside foil meal containers ready for distribution",
    title: "Honoring Our Supporters",
    description: "Welcoming guests and sponsors who help keep our food distribution drives running.",
    categories: ["All", "Events", "NGO Team", "Food Distribution"],
  },
  {
    id: "img-9",
    src: "/gallery/38.png",
    alt: "People queuing for meals served from a large pot in a park setting",
    title: "Community Feeding Program",
    description: "Hundreds of people queuing up in an outdoor park to receive freshly cooked hot meals served directly from our large community pots.",
    categories: ["All", "Food Distribution", "Community Meals"],
    spotlight: true,
  },
  {
    id: "img-10",
    src: "/gallery/39.png",
    alt: "Man standing next to Shri Shyam Foundation Food For Life banner",
    title: "Leading by Example",
    description: "Our team members proudly standing by the Food For Life banner, ready to serve the community in Delhi.",
    categories: ["All", "NGO Team", "Awareness Programs"],
  },
  {
    id: "img-11",
    src: "/gallery/41.png",
    alt: "Volunteers serving food from massive cooking pots to a line of people",
    title: "Mega Food Drive",
    description: "Serving hundreds of individuals from large community cooking pots, a testament to our large-scale food initiatives.",
    categories: ["All", "Food Distribution", "Community Meals", "Volunteer Activities"],
    spotlight: true,
  },
  {
    id: "img-12",
    src: "/gallery/42.png",
    alt: "Volunteers distributing meals, including to a delivery rider",
    title: "Food for Everyone",
    description: "Our food drives are open to all hard-working individuals in the community, providing them the energy they need.",
    categories: ["All", "Food Distribution", "Community Meals"],
  },
  {
    id: "img-13",
    src: "/gallery/43.png",
    alt: "Continuous food service in the park by NGO volunteers",
    title: "Nourishing the Community",
    description: "A continuous flow of individuals receiving warm meals as part of our daily commitment to fight hunger.",
    categories: ["All", "Food Distribution", "Volunteer Activities"],
  },
  {
    id: "img-14",
    src: "/gallery/44.png",
    alt: "Woman petting and comforting a calf resting on the ground",
    title: "Compassion for Animals",
    description: "Showing love and care to a resting calf. We believe in extending our compassion to all living beings.",
    categories: ["All", "Cow Welfare"],
    spotlight: true,
  },
  {
    id: "img-15",
    src: "/gallery/48.png",
    alt: "Man in NGO shirt in front of the foundation banner outdoors",
    title: "Foundation Representatives",
    description: "Our dedicated team members preparing for another successful day of community service and outreach.",
    categories: ["All", "NGO Team"],
  },
  {
    id: "img-16",
    src: "/gallery/49.png",
    alt: "Two men standing together representing the Shri Shyam Foundation",
    title: "United for a Cause",
    description: "Teamwork and dedication are the pillars of the Shri Shyam Foundation's success in helping the needy.",
    categories: ["All", "NGO Team", "Volunteer Activities"],
  },
  {
    id: "img-17",
    src: "/gallery/51.png",
    alt: "Large food distribution event taking place outside a building",
    title: "Serving the Masses",
    description: "A large-scale food distribution camp where our team successfully fed hundreds of locals in a single afternoon.",
    categories: ["All", "Food Distribution", "Community Meals"],
  },
  {
    id: "img-18",
    src: "/gallery/54.png",
    alt: "Woman interacting with school children sitting on the floor",
    title: "Engaging with Youth",
    description: "Interacting with and educating young school children to inspire them towards a brighter, more informed future.",
    categories: ["All", "Education Support", "Children", "Awareness Programs"],
    spotlight: true,
  },
  {
    id: "img-19",
    src: "/gallery/58.png",
    alt: "Foundation team standing before a banner addressing children seated on the floor",
    title: "Classroom Visit",
    description: "Representatives speak with children during an indoor school session under the foundation banner.",
    categories: ["All", "Education Support", "Children"],
  },
  {
    id: "img-20",
    src: "/gallery/59.png",
    alt: "Woman talking to children in a school setting",
    title: "Inspiring the Next Generation",
    description: "Connecting with children through conversations that encourage them to stay curious and keep learning.",
    categories: ["All", "Education Support", "Children"],
  },
  {
    id: "img-21",
    src: "/gallery/26.png",
    alt: "Volunteer carefully bottle-feeding a small white calf lying down",
    title: "Rescuing and Caring for Calves",
    description: "Bottle-feeding weak or abandoned calves so they can regain strength and stay alive.",
    categories: ["All", "Cow Welfare", "Volunteer Activities"],
  },
  {
    id: "img-22",
    src: "/gallery/cow.png",
    alt: "Woman feeding a biscuit to a brown calf resting by a roadside under trees",
    title: "Street Calf Feeding",
    description: "A volunteer offers food to a young calf resting under roadside trees, with another calf nearby.",
    categories: ["All", "Cow Welfare"],
  },
  {
    id: "img-23",
    src: "/gallery/gallery-3 (1).png",
    alt: "Three NGO members standing together happily",
    title: "The Faces Behind the Mission",
    description: "A motivated team working on the ground to carry out the foundation's programmes.",
    categories: ["All", "NGO Team"],
  },
  {
    id: "img-24",
    src: "/gallery/39.png",
    alt: "Man feeding a red tomato to a large black cow",
    title: "Nutritious Food for Cows",
    description: "Hand-feeding fresh produce to cows as part of our street cow and gaushala welfare work.",
    categories: ["All", "Cow Welfare"],
  }
]
