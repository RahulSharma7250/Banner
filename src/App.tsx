/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import Navbar from './components/Layout/Navbar';
import Hero from './components/Hero/Hero';

export default function App() {
  // Preload images for smooth luxury transition
  useEffect(() => {
    const images = [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200&h=1600',
      'https://images.unsplash.com/photo-1539109132314-347f85403045?auto=format&fit=crop&q=80&w=1200&h=1600',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1200&h=1600'
    ];
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
    </main>
  );
}

