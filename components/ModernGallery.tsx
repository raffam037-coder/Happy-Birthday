'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
const anime = (typeof window !== 'undefined' ? require('animejs') : null) as any;
import {
  staggerGrid,
  createGalleryEntrance,
  createHoverEffect,
  createScrollAnimation,
  EASING_PRESETS,
  optimizeAnimationEngine,
  getVisibleElements
} from '@/lib/animeUtils';

interface ModernGalleryProps {
  images: string[];
  cols?: number;
  rows?: number;
  gap?: string;
  itemSize?: string;
  onImageClick?: (index: number, src: string) => void;
}

/**
 * Modern Gallery Component using Anime.js
 * Features:
 * - Advanced stagger animations with grid positioning
 * - Smooth scroll-triggered animations
 * - Enhanced hover effects with spring physics
 * - Responsive grid layout
 * - Optimized performance
 */
export default function ModernGallery({
  images,
  cols = 4,
  rows = 4,
  gap = '12px',
  itemSize = '200px',
  onImageClick
}: ModernGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const timelineRef = useRef<any>(null);

  // Initialize anime engine with optimizations
  useEffect(() => {
    optimizeAnimationEngine();
  }, []);

  // Main entrance animation with advanced stagger
  useEffect(() => {
    if (!containerRef.current || hasAnimated) return;

    // Get all gallery items
    const items = containerRef.current.querySelectorAll('.gallery-item');
    if (items.length === 0) return;

    // Create stagger grid configuration
    const staggerConfig = staggerGrid(cols, rows, 'center');

    // Build stagger delays based on grid position
    const staggerDelays = Array.from(items).map((_, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;

      if (staggerConfig.from === 'center') {
        const centerRow = rows / 2;
        const centerCol = cols / 2;
        const distance = Math.abs(row - centerRow) + Math.abs(col - centerCol);
        return distance * 80; // 80ms per distance unit
      } else if (staggerConfig.from === 'edges') {
        const edgeDistance = Math.min(
          row,
          col,
          rows - row - 1,
          cols - col - 1
        );
        return edgeDistance * 100;
      }

      return index * 50;
    });

    // Create entrance timeline
    const timeline = anime.timeline({
      autoplay: true
    });

    timeline.add({
      targets: items,
      opacity: [0, 1],
      scale: [0.7, 1],
      rotate: [-20, 0],
      duration: 700,
      easing: EASING_PRESETS.ELASTIC_OUT,
      delay: (_el: any, i: number) => staggerDelays[i]
    });

    timelineRef.current = timeline;
    setHasAnimated(true);

    return () => {
      if (timelineRef.current) {
        timelineRef.current.pause();
      }
    };
  }, [cols, rows, hasAnimated]);

  // Hover effect with spring physics
  const handleItemHover = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const item = e.currentTarget;

    anime({
      targets: item,
      scale: 1.15,
      duration: 400,
      easing: EASING_PRESETS.ELASTIC_OUT
    });

    // Enhanced glow effect
    anime({
      targets: item,
      boxShadow: [
        '0 10px 20px rgba(0, 0, 0, 0.2)',
        '0 20px 50px rgba(236, 72, 153, 0.8)'
      ],
      duration: 400,
      easing: 'easeOutQuad'
    });
  }, []);

  const handleItemHoverEnd = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const item = e.currentTarget;

    anime({
      targets: item,
      scale: 1,
      duration: 300,
      easing: EASING_PRESETS.ELASTIC_OUT
    });

    anime({
      targets: item,
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
      duration: 300,
      easing: 'easeOutQuad'
    });
  }, []);

  const handleItemClick = (index: number, src: string) => {
    // Click feedback animation
    const item = itemsRef.current[index];
    if (item) {
      anime({
        targets: item,
        scale: [1.15, 0.95, 1.1],
        duration: 400,
        easing: EASING_PRESETS.BOUNCE_OUT
      });
    }

    onImageClick?.(index, src);
  };

  // Responsive grid styles
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(${itemSize}, 1fr))`,
    gap: gap,
    padding: gap,
    animation: 'none'
  };

  const itemStyle: React.CSSProperties & { aspectRatio?: string } = {
    aspectRatio: '1',
    borderRadius: '16px',
    overflow: 'hidden',
    cursor: 'pointer',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    willChange: 'transform, box-shadow'
  };

  return (
    <div className="w-full h-full overflow-auto bg-gradient-to-br from-[#060010] to-[#1a0a2e]">
      <style dangerouslySetInnerHTML={{
        __html: `
          .gallery-container {
            animation: fadeIn 0.5s ease-out;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          .gallery-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: none;
            transition: filter 0.3s ease;
          }

          .gallery-item:hover img {
            filter: brightness(1.1) saturate(1.2);
          }

          .gallery-item::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(0, 0, 0, 0.1) 100%);
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            border-radius: 16px;
          }

          .gallery-item:hover::before {
            opacity: 1;
          }
        `
      }} />

      <div
        ref={containerRef}
        className="gallery-container"
        style={gridStyle}
      >
        {images.map((src, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) itemsRef.current[index] = el;
            }}
            className="gallery-item relative"
            style={itemStyle}
            onMouseEnter={handleItemHover}
            onMouseLeave={handleItemHoverEnd}
            onClick={() => handleItemClick(index, src)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleItemClick(index, src);
              }
            }}
          >
            <img
              src={src}
              alt={`Gallery item ${index + 1}`}
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
