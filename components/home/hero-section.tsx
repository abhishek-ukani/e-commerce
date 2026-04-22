'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const TOTAL_FRAMES = 150;
const PRELOAD_FRAMES = 20; // Load first 20 frames immediately
const BATCH_SIZE = 10; // Load 10 frames at a time

export default function ScrollHero() {
  const [loaded, setLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [scrollFraction, setScrollFraction] = useState(0);
  const loadingRef = useRef(false);
  const loadedFramesRef = useRef(new Set<number>());

  const loadImageBatch = useCallback(async (startFrame: number, endFrame: number) => {
    if (loadingRef.current) return;
    loadingRef.current = true;

    const promises: Promise<void>[] = [];

    for (let i = startFrame; i <= Math.min(endFrame, TOTAL_FRAMES); i++) {
      if (loadedFramesRef.current.has(i)) continue;

      promises.push(
        new Promise<void>((resolve) => {
          const img = new window.Image();
          const paddedIndex = i.toString().padStart(3, '0');
          img.src = `/mango-frames/ezgif-frame-${paddedIndex}.jpg`;

          img.onload = () => {
            imagesRef.current[i - 1] = img;
            loadedFramesRef.current.add(i);
            setLoadingProgress(Math.floor((loadedFramesRef.current.size / TOTAL_FRAMES) * 100));
            resolve();
          };

          img.onerror = () => resolve();
        })
      );
    }

    await Promise.all(promises);
    loadingRef.current = false;

    if (loadedFramesRef.current.size >= PRELOAD_FRAMES && !loaded) {
      setLoaded(true);
    }
  }, [loaded]);

  useEffect(() => {
    // Load initial batch
    loadImageBatch(1, PRELOAD_FRAMES);
  }, [loadImageBatch]);

  const loadFramesForScroll = useCallback((frameIndex: number) => {
    const startFrame = Math.max(1, frameIndex - BATCH_SIZE);
    const endFrame = Math.min(TOTAL_FRAMES, frameIndex + BATCH_SIZE);
    loadImageBatch(startFrame, endFrame);
  }, [loadImageBatch]);

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

      setCurrentFrame(frameIndex);

      // Load frames around current scroll position
      loadFramesForScroll(frameIndex + 1);

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
  }, [loaded, loadFramesForScroll]);

  // Preload more frames when user is idle
  useEffect(() => {
    if (!loaded) return;

    const preloadRemaining = async () => {
      for (let i = PRELOAD_FRAMES + 1; i <= TOTAL_FRAMES; i += BATCH_SIZE) {
        await loadImageBatch(i, i + BATCH_SIZE - 1);
        // Small delay to not block main thread
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    };

    const timer = setTimeout(preloadRemaining, 2000); // Start preloading after 2 seconds
    return () => clearTimeout(timer);
  }, [loaded, loadImageBatch]);

  if (!loaded) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
        <div className="text-2xl mb-4">Loading Mango Animation...</div>
        <div className="w-64 bg-gray-700 rounded-full h-2">
          <div
            className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${loadingProgress}%` }}
          ></div>
        </div>
        <div className="mt-2 text-sm text-gray-400">{loadingProgress}%</div>
      </div>
    );
  }

  return (
    <section ref={containerRef} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen">
        <canvas ref={canvasRef} className="absolute inset-0" />

        {/* Hero Text */}
        <div className="absolute inset-0 flex items-center justify-center text-white text-center z-10">
          <h1 className="text-5xl md:text-8xl font-bold drop-shadow-lg">
            શ્રેષ્ઠ કેસર કેરી
          </h1>
        </div>

        {/* Loading indicator for additional frames */}
        {loadingProgress < 100 && (
          <div className="absolute bottom-4 left-4 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded">
            Loading frames... {loadingProgress}%
          </div>
        )}
      </div>
    </section>
  );
}