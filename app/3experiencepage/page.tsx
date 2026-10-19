import { Header } from "@/components/header";
import { GallerySection } from "@/components/sections/gallery-section";

export default function ThreeExperiencePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header threeExperienceMode />
      <GallerySection staticMode enlargeImages title="Case Study" sectionId="three-experience" />
    </main>
  );
}
