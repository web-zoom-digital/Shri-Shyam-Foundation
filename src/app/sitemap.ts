import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.shrishyamfoundation.org"

  const routes = [
    { path: "", priority: 1.0, freq: "daily" as const },
    { path: "/about", priority: 0.9, freq: "monthly" as const },
    { path: "/programs", priority: 0.9, freq: "weekly" as const },
    { path: "/impact", priority: 0.8, freq: "monthly" as const },
    { path: "/donate", priority: 0.95, freq: "weekly" as const },
    { path: "/cow-donation", priority: 0.95, freq: "weekly" as const },
    { path: "/account-details", priority: 0.9, freq: "monthly" as const },
    { path: "/gallery", priority: 0.8, freq: "weekly" as const },
    { path: "/contact", priority: 0.8, freq: "monthly" as const },
    { path: "/privacy-policy", priority: 0.3, freq: "yearly" as const },
    { path: "/terms", priority: 0.3, freq: "yearly" as const },
  ]

  return routes.map(({ path, priority, freq }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: freq,
    priority,
  }))
}
