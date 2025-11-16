'use client';

import Hero from './components/Hero';
import ProductDemo from './components/ProductDemo';
import Features from './components/Features';
import Achievements from './components/Achievements';
import Survey from './components/Survey';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <ProductDemo />
      {/* Здесь была "Ключевые преимущества" - её удалили, вместо неё "Уникальность" */}
      <Features /> {/* Только уникальность теперь */}
      <Achievements />
      <Survey />
      <Footer />
    </main>
  );
}
