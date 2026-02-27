/**
 * ANIME.JS INTEGRATION EXAMPLES
 * 
 * File ini berisi contoh-contoh praktis tentang cara menggunakan
 * anime.js dengan gallery Anda untuk berbagai use case.
 * 
 * Copy-paste code di bawah sesuai kebutuhan Anda!
 */

const anime = require('animejs') as any;
import {
  staggerTime,
  staggerGrid,
  createGalleryEntrance,
  createScrollAnimation,
  createSpringAnimation,
  EASING_PRESETS,
  shuffleAnimationOrder,
  randomValue,
  getVisibleElements
} from '@/lib/animeUtils';

// ============================================================
// EXAMPLE 1: Gallery Entrance dengan Grid Stagger
// ============================================================

export const galleryEntranceExample = () => {
  const items = document.querySelectorAll('.gallery-item');
  
  // Konfigurasi stagger dari center
  const timeline = anime.timeline();
  
  timeline.add({
    targets: items,
    opacity: [0, 1],
    scale: [0.5, 1],
    rotate: [-45, 0],
    duration: 800,
    delay: anime.stagger(80, { start: 100 }),
    easing: 'easeOutElastic(1, .6)'
  });
};

// ============================================================
// EXAMPLE 2: Advanced Stagger dengan Wave Pattern
// ============================================================

export const waveStaggerExample = () => {
  const items = document.querySelectorAll('.gallery-item');
  const cols = 4;
  const rows = 4;

  const delays = Array.from(items).map((_, index) => {
    // Calculate grid position
    const row = Math.floor(index / cols);
    const col = index % cols;
    
    // Wave pattern dari center
    const centerRow = Math.floor(rows / 2);
    const centerCol = Math.floor(cols / 2);
    const distance = Math.abs(row - centerRow) + Math.abs(col - centerCol);
    
    return distance * 100; // 100ms per distance
  });

  anime({
    targets: items,
    opacity: [0, 1],
    translateY: [40, 0],
    rotate: [-10, 0],
    duration: 600,
    delay: (_el: any, i: number) => delays[i],
    easing: EASING_PRESETS.ELASTIC_OUT
  });
};

// ============================================================
// EXAMPLE 3: Hover dengan Spring Effect
// ============================================================

export const setupHoverEffects = () => {
  const items = document.querySelectorAll('.gallery-item');

  items.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      anime({
        targets: item,
        scale: 1.2,
        duration: 400,
        easing: EASING_PRESETS.ELASTIC_OUT
      });

      // Add glow effect
      anime({
        targets: item,
        boxShadow: '0 0 30px rgba(236, 72, 153, 0.8)',
        duration: 400,
        easing: 'easeOutQuad'
      });
    });

    item.addEventListener('mouseleave', () => {
      anime({
        targets: item,
        scale: 1,
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
        duration: 300,
        easing: EASING_PRESETS.ELASTIC_OUT
      });
    });
  });
};

// ============================================================
// EXAMPLE 4: Intersection Observer + Anime untuk Scroll Animation
// ============================================================

export const setupScrollAnimations = () => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Animate when in view
        anime({
          targets: entry.target,
          opacity: [0, 1],
          translateY: [50, 0],
          duration: 600,
          easing: EASING_PRESETS.EXPO_OUT
        });

        observer.unobserve(entry.target); // Stop observing setelah animated
      }
    });
  }, options);

  // Observe semua gallery items
  document.querySelectorAll('.gallery-item').forEach((item) => {
    observer.observe(item);
  });
};

// ============================================================
// EXAMPLE 5: Click Feedback Animation
// ============================================================

export const setupClickFeedback = () => {
  const items = document.querySelectorAll('.gallery-item');

  items.forEach((item) => {
    item.addEventListener('click', (e: Event) => {
      const target = e.currentTarget as Element;

      // Pulse animation
      anime({
        targets: target,
        scale: [1, 1.2, 0.95, 1],
        duration: 500,
        easing: 'easeOutElastic(1, .8)'
      });

      // Optional: Add ripple effect
      addRippleEffect(target, e as MouseEvent);
    });
  });
};

// ============================================================
// EXAMPLE 6: Text Character Animation
// ============================================================

export const setupTextAnimation = (textSelector: string) => {
  const element = document.querySelector(textSelector);
  if (!element) return;

  // Split text into characters
  const text = element.textContent || '';
  const chars = text.split('');

  // Clear dan rebuild dengan spans
  element.innerHTML = chars
    .map((char) => `<span class="char">${char}</span>`)
    .join('');

  // Animate each character
  anime.timeline({
    autoplay: true
  }).add({
    targets: element.querySelectorAll('.char'),
    opacity: [0, 1],
    translateY: [20, 0],
    rotate: [-10, 0],
    duration: 500,
    delay: anime.stagger(50, { start: 100 }),
    easing: EASING_PRESETS.ELASTIC_OUT
  });
};

// ============================================================
// EXAMPLE 7: Timeline untuk Sequence Animation
// ============================================================

export const sequenceAnimationExample = () => {
  const timeline = anime.timeline({
    autoplay: true,
    loop: true,
    loopDelay: 500
  });

  timeline
    // Step 1: Fade in gallery
    .add({
      targets: '.gallery-container',
      opacity: [0, 1],
      duration: 600,
      easing: 'easeOutQuad'
    })
    // Step 2: Scale items
    .add({
      targets: '.gallery-item',
      scale: [0.9, 1],
      duration: 400,
      delay: anime.stagger(50),
      easing: EASING_PRESETS.ELASTIC_OUT
    }, '-=300')
    // Step 3: Rotate & glow
    .add({
      targets: '.gallery-item',
      rotate: [0, 360],
      duration: 3000,
      delay: anime.stagger(100),
      easing: 'linear'
    })
    // Step 4: Return to normal
    .add({
      targets: '.gallery-item',
      rotate: 0,
      duration: 600,
      easing: 'easeOutQuad'
    });
};

// ============================================================
// EXAMPLE 8: Randomized Animation Order
// ============================================================

export const randomizedAnimationExample = () => {
  const items = Array.from(document.querySelectorAll('.gallery-item'));
  const randomized = shuffleAnimationOrder(items);

  anime({
    targets: randomized,
    opacity: [0, 1],
    scale: [randomValue(0.5, 0.8), 1],
    rotate: [randomValue(-45, 45), 0],
    duration: () => randomValue(400, 800),
    delay: anime.stagger(30, { start: 0 }),
    easing: EASING_PRESETS.ELASTIC_OUT
  });
};

// ============================================================
// EXAMPLE 9: Image Zoom on Hover
// ============================================================

export const setupImageZoomHover = () => {
  const items = document.querySelectorAll('.gallery-item');

  items.forEach((item) => {
    const img = item.querySelector('img');
    if (!img) return;

    item.addEventListener('mouseenter', () => {
      anime({
        targets: img,
        scale: 1.3,
        duration: 600,
        easing: 'easeOutQuad'
      });
    });

    item.addEventListener('mouseleave', () => {
      anime({
        targets: img,
        scale: 1,
        duration: 400,
        easing: 'easeOutQuad'
      });
    });
  });
};

// ============================================================
// EXAMPLE 10: Color Transition Animation
// ============================================================

export const setupColorTransition = () => {
  const colors = ['#000000', '#ec4899', '#06b6d4', '#000000'];

  anime.timeline({
    autoplay: true,
    loop: true
  }).add({
    targets: 'body',
    backgroundColor: colors,
    duration: 1000,
    easing: 'easeInOutQuad',
    delay: 2000
  });
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Add ripple effect on click
 */
const addRippleEffect = (element: Element, event: MouseEvent) => {
  const ripple = document.createElement('span');
  ripple.classList.add('ripple');

  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';

  element.appendChild(ripple);

  anime({
    targets: ripple,
    scale: 4,
    opacity: 0,
    duration: 600,
    easing: 'easeOutQuad',
    complete: () => ripple.remove()
  });
};

/**
 * Pause all animations (useful for performance)
 */
export const pauseAllGalleryAnimations = () => {
  anime.pauseAll();
};

/**
 * Resume all animations
 */
export const resumeAllGalleryAnimations = () => {
  anime.resumeAll();
};

/**
 * Clean up animations on element
 */
export const cleanupAnimationsOnElement = (element: Element) => {
  anime.set(element, {
    opacity: 1,
    scale: 1,
    rotate: 0,
    translateX: 0,
    translateY: 0
  });
};

// ============================================================
// CSS STYLES untuk Ripple Effect
// ============================================================

const rippleStyles = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transform: scale(0);
    pointer-events: none;
  }

  .gallery-item {
    position: relative;
    overflow: hidden;
  }

  .char {
    display: inline-block;
    will-change: transform, opacity;
  }
`;

// Inject styles ke document head
export const injectRippleStyles = () => {
  const style = document.createElement('style');
  style.textContent = rippleStyles;
  document.head.appendChild(style);
};

// ============================================================
// REACT HOOK UNTUK EASY INTEGRATION
// ============================================================

export const useAnimeGallery = () => {
  const setupAnimations = () => {
    setupHoverEffects();
    setupClickFeedback();
    setupScrollAnimations();
    injectRippleStyles();
  };

  return {
    setupAnimations,
    galleryEntranceExample,
    waveStaggerExample,
    setupTextAnimation,
    sequenceAnimationExample,
    randomizedAnimationExample,
    pauseAllGalleryAnimations,
    resumeAllGalleryAnimations
  };
};

export default {
  galleryEntranceExample,
  waveStaggerExample,
  setupHoverEffects,
  setupScrollAnimations,
  setupClickFeedback,
  setupTextAnimation,
  sequenceAnimationExample,
  randomizedAnimationExample,
  setupImageZoomHover,
  setupColorTransition,
  useAnimeGallery
};
