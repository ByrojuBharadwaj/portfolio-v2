import { Header } from "@/components/header";
import { GallerySection } from "@/components/sections/gallery-section";

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header experienceMode />
      <GallerySection enlargeImages showQuestion />
    </main>
  );
}
