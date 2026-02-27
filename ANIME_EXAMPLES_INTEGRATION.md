/**
 * EXAMPLE: How to Update page.tsx with Anime.js Features
 * 
 * Copy code dari file ini sesuai kebutuhan untuk mengupdate page.tsx
 * dan components Anda dengan anime.js animations.
 */

// ============================================================
// EXAMPLE 1: Using ModernGallery (Recommended untuk new feature)
// ============================================================

// Uncomment di page.tsx untuk gunakan ModernGallery

import ModernGallery from '@/components/ModernGallery';

export default function Home() {
  // ... existing code ...

  return (
    <main className="w-screen h-screen bg-[#060010]">
      {/* ... existing audio code ... */}
      
      {!showGallery ? (
        <InteractionFlow onFlowComplete={() => setShowGallery(true)} />
      ) : (
        <>
          {/* Audio Button */}
          {/* ... existing audio button code ... */}
          
          {/* NEW: Use ModernGallery instead of DomeGallery */}
          <ModernGallery
            images={userImages}
            cols={4}
            rows={5}
            gap="16px"
            itemSize="250px"
            onImageClick={(index, src) => console.log('Clicked:', src)}
          />
        </>
      )}
    </main>
  );
}

// ============================================================
// EXAMPLE 2: Enhance existing DomeGallery dengan React Hook
// ============================================================

import { useAnimeGallery } from '@/lib/useAnimeHooks';
import DomeGallery from '@/components/DomeGallery';

export default function Home() {
  const [showGallery, setShowGallery] = useState(false);
  const { setupHover, setupClickFeedback } = useAnimeGallery();

  useEffect(() => {
    if (showGallery) {
      // Setup anime animations setelah gallery di-render
      setTimeout(() => {
        setupHover('.item__image', {
          scaleOnHover: 1.2,
          glowColor: 'rgba(236, 72, 153, 0.8)'
        });

        setupClickFeedback('.item__image', {
          maxScale: 1.15,
          duration: 300
        });
      }, 100); // Wait untuk gallery render
    }
  }, [showGallery, setupHover, setupClickFeedback]);

  return (
    <main className="w-screen h-screen bg-[#060010]">
      {/* ... existing code ... */}
      {!showGallery ? (
        <InteractionFlow onFlowComplete={() => setShowGallery(true)} />
      ) : (
        <>
          {/* Audio Button */}
          {/* ... */}
          
          <DomeGallery
            images={userImages}
            fit={0.8}
            minRadius={600}
            maxVerticalRotationDeg={0}
            segments={34}
            dragDampening={2}
            grayscale={false}
            autoRotationSpeed={0.1}
          />
        </>
      )}
    </main>
  );
}

// ============================================================
// EXAMPLE 3: Create Custom Gallery dengan Full Control
// ============================================================

import { useAnimeGallery } from '@/lib/useAnimeHooks';
import { EASING_PRESETS } from '@/lib/animeUtils';

interface GalleryGridProps {
  images: string[];
  cols?: number;
  rows?: number;
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({
  images,
  cols = 4,
  rows = 5
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    animateGallery,
    setupHover,
    setupClickFeedback,
    setupScrollAnimation
  } = useAnimeGallery();

  useEffect(() => {
    if (!containerRef.current) return;

    // Entrance animation
    animateGallery('.gallery-item', {
      duration: 700,
      staggerDelay: 60,
      fromCenter: true,
      cols,
      rows,
      easing: EASING_PRESETS.ELASTIC_OUT
    });

    // Hover effects
    setupHover('.gallery-item', {
      scaleOnHover: 1.2,
      glowColor: 'rgba(236, 72, 153, 0.8)'
    });

    // Click feedback
    setupClickFeedback('.gallery-item', {
      maxScale: 1.15,
      duration: 300
    });

    // Scroll animations untuk late-loading items
    setupScrollAnimation('.gallery-item', {
      offset: 50,
      threshold: 0.3
    });
  }, [animateGallery, setupHover, setupClickFeedback, setupScrollAnimation, cols, rows]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-gradient-to-br from-[#060010] to-[#1a0a2e] p-4 overflow-auto"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(250px, 1fr))`,
        gap: '16px'
      }}
    >
      {images.map((src, index) => (
        <div
          key={index}
          className="gallery-item relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-lg"
          onClick={() => console.log('Clicked:', src)}
        >
          <img
            src={src}
            alt={`Gallery item ${index + 1}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Optional: Image overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      ))}
    </div>
  );
};

// Gunakan di page.tsx:
// <GalleryGrid images={userImages} cols={4} rows={5} />

// ============================================================
// EXAMPLE 4: Interactive Features dengan Anime.js
// ============================================================

import anime from 'animejs';
import { useAnimeGallery } from '@/lib/useAnimeHooks';

export const InteractiveGallery = ({ images }: { images: string[] }) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const { createTimeline, pauseAll, resumeAll } = useAnimeGallery();
  const [isAnimating, setIsAnimating] = useState(false);

  const playShowAnimation = () => {
    const timeline = createTimeline(
      [
        {
          targets: galleryRef.current,
          opacity: [0, 1],
          scale: [0.95, 1],
          duration: 600,
          easing: 'easeOutExpo'
        },
        {
          targets: galleryRef.current?.querySelectorAll('.gallery-item'),
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 400,
          delay: anime.stagger(50)
        }
      ],
      { autoplay: true }
    );

    setIsAnimating(true);
    timeline.complete = () => setIsAnimating(false);
  };

  return (
    <div className="w-full h-full">
      <button
        onClick={playShowAnimation}
        disabled={isAnimating}
        className="px-6 py-2 bg-pink-500 text-white rounded-lg mb-4 disabled:opacity-50"
      >
        {isAnimating ? 'Animating...' : 'Show Gallery'}
      </button>

      <div
        ref={galleryRef}
        className="grid grid-cols-4 gap-4"
        style={{ opacity: 0 }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Item ${i}`}
            className="gallery-item w-full h-full object-cover rounded-lg"
            style={{ opacity: 0 }}
          />
        ))}
      </div>
    </div>
  );
};

// ============================================================
// EXAMPLE 5: Filter & Sort dengan Animation
// ============================================================

import { useAnimeGallery } from '@/lib/useAnimeHooks';

export const FilterableGallery = ({ images }: { images: string[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState('all');
  const { animateGallery } = useAnimeGallery();

  useEffect(() => {
    // Re-animate saat filter berubah
    animateGallery('.gallery-item:not(.hidden)', {
      duration: 500,
      staggerDelay: 30
    });
  }, [filter, animateGallery]);

  return (
    <div>
      {/* Filter buttons */}
      <div className="flex gap-2 mb-4">
        {['all', 'recent', 'popular'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded ${
              filter === f ? 'bg-pink-500' : 'bg-gray-500'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Gallery grid */}
      <div ref={containerRef} className="grid grid-cols-4 gap-4">
        {images.map((src, i) => (
          <div
            key={i}
            className={`gallery-item rounded-lg overflow-hidden ${
              filter !== 'all' && i % 2 === 0 ? 'hidden' : ''
            }`}
          >
            <img src={src} alt={`Item ${i}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// EXAMPLE 6: Lightbox / Modal dengan Anime.js
// ============================================================

import { useRef, useState } from 'react';
import anime from 'animejs';

export const GalleryModal = ({ images }: { images: string[] }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const openModal = (index: number) => {
    setSelectedIndex(index);
    
    // Animate modal entrance
    anime.timeline()
      .add({
        targets: modalRef.current,
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuad'
      })
      .add({
        targets: imageRef.current,
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 400,
        easing: 'easeOutElastic(1, .6)'
      }, '-=200');
  };

  const closeModal = () => {
    anime({
      targets: modalRef.current,
      opacity: [1, 0],
      duration: 300,
      easing: 'easeOutQuad',
      complete: () => setSelectedIndex(null)
    });
  };

  return (
    <>
      {/* Gallery grid */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Item ${i}`}
            onClick={() => openModal(i)}
            className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
          />
        ))}
      </div>

      {/* Modal */}
      {selectedIndex !== null && (
        <div
          ref={modalRef}
          onClick={closeModal}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          style={{ opacity: 0 }}
        >
          <img
            ref={imageRef}
            src={images[selectedIndex]}
            alt="Selected"
            className="max-w-2xl max-h-screen rounded-lg"
            onClick={(e) => e.stopPropagation()}
            style={{ scale: 0.9, opacity: 0 }}
          />
        </div>
      )}
    </>
  );
};

// ============================================================
// TIPS & BEST PRACTICES:
// ============================================================

/**
 * TIPS:
 * 
 * 1. Selalu gunakan useCallback untuk animation functions:
 *    const setupAnimation = useCallback(() => { ... }, []);
 * 
 * 2. Cleanup animations di useEffect return:
 *    useEffect(() => {
 *      return () => { pauseAll(); cleanup(); };
 *    }, []);
 * 
 * 3. Test di mobile - reduce stagger delay untuk performance
 * 
 * 4. Use EASING_PRESETS untuk consistent timing
 * 
 * 5. Lazy load images dengan loading="lazy"
 * 
 * 6. Respect user preferences:
 *    if (window.matchMedia('(prefers-reduced-motion)').matches) {
 *      // Skip animations atau reduce duration
 *    }
 * 
 * 7. Performance: Anime.js support GPU acceleration dengan will-change
 *    Add di CSS: will-change: transform, opacity;
 */

export default {};
