'use client';

import Hero from './components/Hero';
import Product from './components/Product';
import Features from './components/Features';
import Survey from './components/Survey';

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <Hero />
      <Product />
      <Features />
      <Survey />
    </main>
  );
}
