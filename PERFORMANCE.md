# Performance Optimization Guide

## 🚀 Hero Section Optimization

The hero section has been optimized with lazy loading and parallel image loading. However, for even better performance, consider converting the 190 image frames to a video.

### Option 1: Use Optimized Image Loading (Current)
- ✅ Loads first 20 frames immediately
- ✅ Lazy loads frames based on scroll position
- ✅ Parallel loading instead of sequential
- ✅ Background preloading of remaining frames

### Option 2: Convert to Video (Recommended for Production)

To convert the image frames to a video for much better performance:

1. **Install FFmpeg** (if not already installed):
   ```bash
   # On macOS
   brew install ffmpeg

   # On Ubuntu/Debian
   sudo apt install ffmpeg

   # On Windows (using Chocolatey)
   choco install ffmpeg
   ```

2. **Convert frames to video**:
   ```bash
   # Navigate to the frames directory
   cd public/mango-frames

   # Convert to MP4 (high quality)
   ffmpeg -framerate 30 -i ezgif-frame-%03d.jpg -c:v libx264 -preset slow -crf 22 -c:a aac mango-animation.mp4

   # Convert to WebM (smaller file size)
   ffmpeg -framerate 30 -i ezgif-frame-%03d.jpg -c:v libvpx-vp9 -b:v 1M -c:a libopus mango-animation.webm
   ```

3. **Optimize video files**:
   ```bash
   # Compress MP4 further
   ffmpeg -i mango-animation.mp4 -c:v libx264 -preset slow -crf 28 -c:a aac mango-animation-compressed.mp4
   ```

4. **Replace the hero component**:
   - Change the import in `app/page.tsx` from `HeroSection` to `VideoScrollHero`
   - Update the import: `import VideoScrollHero from '@/components/home/video-hero-section'`

### Additional Performance Optimizations

1. **Image Optimization**:
   - Consider converting frames to WebP format
   - Use responsive images with different sizes

2. **Bundle Analysis**:
   - Run `npm install --save-dev @next/bundle-analyzer`
   - Add to package.json scripts: `"analyze": "ANALYZE=true next build"`
   - Run `npm run analyze` to see bundle sizes

3. **Lazy Loading Other Components**:
   - Consider lazy loading non-critical components below the fold

4. **CDN Optimization**:
   - Serve images/videos from a CDN for faster loading
   - Use Netlify's built-in CDN features

### Current Performance Improvements Made

- ✅ Parallel image loading instead of sequential
- ✅ Lazy loading based on scroll position
- ✅ Progressive loading with better UX
- ✅ Optimized Next.js config for static export
- ✅ Added video-based alternative component