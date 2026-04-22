'use client';

import { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 190;

export default function ScrollHero() {
  const [loaded, setLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [scrollFraction, setScrollFraction] = useState(0);

  useEffect(() => {
    const loadImages = async () => {
      let loadedCount = 0;
      const images: HTMLImageElement[] = [];

      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new window.Image();
        const paddedIndex = i.toString().padStart(3, '0');
        img.src = `/mango-frames/ezgif-frame-${paddedIndex}.jpg`;

        await new Promise((resolve) => {
          img.onload = () => {
            loadedCount++;
            setLoadingProgress(Math.floor((loadedCount / TOTAL_FRAMES) * 100));
            images.push(img);
            resolve(null);
          };
          img.onerror = resolve;
        });
      }

      imagesRef.current = images;
      setLoaded(true);
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const handleScroll = () => {
      if (!containerRef.current || !canvasRef.current) return;

      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const scrollDistance = -top;
      const scrollableHeight = height - windowHeight;

      const fraction = Math.max(
        0,
        Math.min(1, scrollDistance / scrollableHeight)
      );

      setScrollFraction(fraction);

      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(fraction * TOTAL_FRAMES)
      );

      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const img = imagesRef.current[frameIndex];

      if (!img || !context) return;

      if (
        canvas.width !== window.innerWidth ||
        canvas.height !== window.innerHeight
      ) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [loaded]);

  if (!loaded) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading... {loadingProgress}%
      </div>
    );
  }

  return (
    <section ref={containerRef} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen">
        <canvas ref={canvasRef} className="absolute inset-0" />

        {/* Hero Text */}
        <div className="absolute inset-0 flex items-center justify-center text-white text-center">
          <h1 className="text-5xl md:text-8xl font-bold">
            શ્રેષ્ઠ કેસર કેરી
          </h1>
        </div>
      </div>
    </section>
  );
}