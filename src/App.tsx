import { useState, useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { Releases } from './components/Releases';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import ProductStory from './components/ProductStory';
import LoggingDemo from './components/LoggingDemo';
import { OfflineSection } from './components/OfflineSection';
import { Personalization } from './components/Personalization';
import { FAQ } from './components/FAQ';
import { Installation } from './components/Installation';
import { Footer } from './components/Footer';

function App() {
  const [isReleases, setIsReleases] = useState(
    window.location.hash.startsWith('#/releases'),
  );
  useEffect(() => {
    const navigate = () => {
      setIsReleases(window.location.hash.startsWith('#/releases'));
      if (window.location.hash.startsWith('#/') || !window.location.hash)
        window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', navigate);
    return () => window.removeEventListener('hashchange', navigate);
  }, []);
  useEffect(() => {
    if (!isReleases && window.location.hash) {
      const id = window.location.hash.slice(1);
      document.getElementById(id)?.scrollIntoView();
    }
  }, [isReleases]);
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        {isReleases ? (
          <Releases />
        ) : (
          <>
            <Hero />
            <ProductStory />
            <LoggingDemo />
            <OfflineSection />
            <Personalization />
            <Installation />
            <FAQ />
          </>
        )}
      </main>
      <Footer />
    </MotionConfig>
  );
}

export default App;
