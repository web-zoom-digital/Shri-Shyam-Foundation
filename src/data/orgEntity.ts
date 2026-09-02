const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.shrishyamfoundation.org"

/** Canonical NGO entity for schema + AI citation consistency */
export const orgEntity = {
  "@type": "NGO" as const,
  "@id": `${SITE_URL}/#organization`,
  name: "Shri Shyam Foundation",
  alternateName: ["SSF", "Shri Shyam Foundation NGO"],
  url: SITE_URL,
  logo: {
    "@type": "ImageObject" as const,
    url: `${SITE_URL}/images/live/shri-shyam-final-logo-1-1.gif`,
  },
  image: `${SITE_URL}/og-image.jpg`,
  email: "shrishyamfoundation1@gmail.com",
  telephone: "+91 9990145555",
  foundingDate: "2015",
  description:
    "Shri Shyam Foundation is a registered non-profit organisation based in Delhi. Since 2015 it has run free food distribution, education support for underprivileged children, cow rescue and gaushala care, and free medical outreach across Delhi NCR. Donations are eligible for Section 80G tax benefits as applicable.",
  slogan: "Food, education and cow welfare — seva on the ground",
  knowsAbout: [
    "Food distribution NGO Delhi NCR",
    "Free meal seva Delhi",
    "Cow donation and Gau Seva",
    "Gaushala and cow rescue",
    "Education support for underprivileged children",
    "Free medical camps NGO",
    "80G tax exempt donations India",
  ],
  areaServed: [
    { "@type": "AdministrativeArea" as const, name: "Delhi NCR" },
    { "@type": "State" as const, name: "Delhi" },
    { "@type": "City" as const, name: "Delhi" },
    { "@type": "City" as const, name: "Delhi" },
  ],
  address: {
    "@type": "PostalAddress" as const,
    streetAddress: "House Number - J88 Gali No. 9/4 Pusta",
    addressLocality: "Delhi",
    addressRegion: "Delhi",
    postalCode: "110053",
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint" as const,
      telephone: "+91 9990145555",
      contactType: "customer support",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    {
      "@type": "ContactPoint" as const,
      telephone: "+91 9990145555",
      contactType: "donations",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
  ],
  sameAs: ["https://wa.me/919990145555"],
}

export const orgPlainSummary = {
  name: "Shri Shyam Foundation",
  founded: "2015",
  location: "House Number - J88 Gali No. 9/4 Pusta, Delhi, 110053, India",
  phone: "+91 9990145555",
  email: "shrishyamfoundation1@gmail.com",
  what: "A registered Indian NGO working on free food distribution, education kits for underprivileged children, cow rescue and gaushala care, and free medical outreach in Delhi NCR and Delhi.",
  howToHelp:
    "Donate online at /donate, support Gau Seva at /cow-donation, transfer via UPI or bank on /account-details, or volunteer via /contact.",
  taxNote: "Eligible donations may qualify for deduction under Section 80G of the Income Tax Act, as applicable.",
}

export const programEntities = [
  {
    name: "Free Food Distribution",
    description:
      "Hot meals and community food drives for underserved families across Delhi NCR and Delhi.",
    url: `${SITE_URL}/programs`,
  },
  {
    name: "Education Support",
    description:
      "School kits, stationery and learning support for children who cannot afford basic supplies.",
    url: `${SITE_URL}/programs`,
  },
  {
    name: "Cow Donation / Gau Seva",
    description:
      "Rescue, treatment, fodder and shelter for abandoned and injured cows through gaushala care.",
    url: `${SITE_URL}/cow-donation`,
  },
  {
    name: "Medical Outreach",
    description:
      "Free medical camps and medicine support for communities with limited access to healthcare.",
    url: `${SITE_URL}/programs`,
  },
]

export { SITE_URL }
