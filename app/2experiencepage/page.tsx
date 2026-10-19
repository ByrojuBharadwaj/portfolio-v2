import { Header } from "@/components/header";
import { GallerySection } from "@/components/sections/gallery-section";

export default function TwoExperiencePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header twoExperienceMode />
      <GallerySection enlargeImages horizontalMode title="My Projects" sectionId="two-experience" />
    </main>
  );
}
