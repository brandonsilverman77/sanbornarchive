import { Navigation, Hero, ImageGrid, About, Footer } from '@/components';
import JsonLd from '@/components/JsonLd';
import { getCollectionPageJsonLd } from '@/lib/jsonld';

export default function Home() {
  return (
    <>
      <JsonLd data={getCollectionPageJsonLd()} />
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
