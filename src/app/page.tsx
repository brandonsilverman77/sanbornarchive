import { Navigation, Hero, ImageGrid, About, Footer } from '@/components';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <ImageGrid />
        <About />
      </main>
      <Footer />
    </>
  );
}
