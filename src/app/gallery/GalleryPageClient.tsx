"use client"

import { GalleryHero } from "@/components/sections/gallery/GalleryHero"
import { ActivitySpotlight } from "@/components/sections/gallery/ActivitySpotlight"
import { GalleryStats } from "@/components/sections/gallery/GalleryStats"
import { MasonryGallery } from "@/components/sections/gallery/MasonryGallery"
import { ImpactStoryCards } from "@/components/sections/gallery/ImpactStoryCards"
import { CategorySubGallery } from "@/components/sections/gallery/CategorySubGallery"
import { GalleryCTA } from "@/components/sections/gallery/GalleryCTA"

export function GalleryPageClient() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans w-full max-w-full overflow-x-clip">
      <main className="flex-1">
        <GalleryHero />
        <ActivitySpotlight />
        <GalleryStats />
        <MasonryGallery />
        <ImpactStoryCards />
        
        <CategorySubGallery 
          category="Volunteer Activities" 
          title="Volunteer Moments" 
          description="Glimpses of our incredible volunteers working on the ground to bring real change."
          bgColor="bg-white"
        />
        
        <CategorySubGallery 
          category="Cow Welfare" 
          title="Cow Welfare Gallery" 
          description="Moments of care for calves and cows we meet on the street — feeding, comfort, and hands-on welfare."
          bgColor="bg-slate-50"
        />
        
        <CategorySubGallery 
          category="Food Distribution" 
          title="Food Distribution Gallery" 
          description="Hot meals served outdoors and indoors — foil packs, community pots, and plates shared with dignity."
          bgColor="bg-white"
        />
        
        <CategorySubGallery 
          category="Education Support" 
          title="Education Support Gallery" 
          description="School visits and classroom sessions where our team meets children, listens, and encourages learning."
          bgColor="bg-slate-50"
        />
        
        <CategorySubGallery 
          category="Events" 
          title="Special Events" 
          description="Outdoor drives, guest welcomes, and community gatherings under the foundation banner."
          bgColor="bg-white"
        />
        
        <CategorySubGallery 
          category="NGO Team" 
          title="Leadership & Guests" 
          description="Honorable guests, leaders, and our core team working towards our mission."
          bgColor="bg-slate-50"
        />
        
        <GalleryCTA />
      </main>
    </div>
  )
}
