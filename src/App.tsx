import { Header } from './components/Header';
import { Hero } from './components/Hero';
import ProductStory from './components/ProductStory';
import LoggingDemo from './components/LoggingDemo';
import { OfflineSection } from './components/OfflineSection';
import { Personalization } from './components/Personalization';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductStory />
        <LoggingDemo />
        <OfflineSection />
        <Personalization />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

export default App;
