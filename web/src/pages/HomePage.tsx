import HeroSection from '@/sections/HeroSection';
import PhilosophySection from '@/sections/PhilosophySection';
import ProductsSection from '@/sections/ProductsSection';
import GallerySection from '@/sections/GallerySection';
import ShowroomSection from '@/sections/ShowroomSection';
import FooterSection from '@/sections/FooterSection';

const HomePage = () => {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <PhilosophySection />
      <ProductsSection />
      <GallerySection />
      <ShowroomSection />
      <FooterSection />
    </main>
  );
};

export default HomePage;
