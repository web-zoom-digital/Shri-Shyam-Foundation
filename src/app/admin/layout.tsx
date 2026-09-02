import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Panel | Shri Shyam Foundation",
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Root layout's SiteChrome already hides Header/Footer on /admin routes.
  // Root layout's MainWrapper already removes bottom padding on /admin routes.
  // This layout just sets admin-specific metadata.
  return <>{children}</>
}
