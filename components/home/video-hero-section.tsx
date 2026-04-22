'use client';

import { useEffect, useRef, useState } from 'react';

export default function VideoScrollHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoaded(true);
    };

    video.addEventListener('loadeddata', handleLoadedData);

    // Preload the video
    video.load();

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const handleScroll = () => {
      const video = videoRef.current;
      const container = containerRef.current;
      if (!video || !container) return;

      const { top, height } = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const scrollDistance = -top;
      const scrollableHeight = height - windowHeight;

      const fraction = Math.max(0, Math.min(1, scrollDistance / scrollableHeight));

      // Set video currentTime based on scroll fraction
      if (video.duration) {
        video.currentTime = fraction * video.duration;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoaded]);

  if (!isLoaded) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
        <div className="text-2xl mb-4">Loading Mango Animation...</div>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <section ref={containerRef} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
          style={{ pointerEvents: 'none' }}
        >
          {/* Replace with your actual video file path */}
          <source src="/mango-animation.mp4" type="video/mp4" />
          <source src="/mango-animation.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>

        {/* Hero Text */}
        <div className="absolute inset-0 flex items-center justify-center text-white text-center z-10">
          <h1 className="text-5xl md:text-8xl font-bold drop-shadow-lg">
            શ્રેષ્ઠ કેસર કેરી
          </h1>
        </div>
      </div>
    </section>
  );
}