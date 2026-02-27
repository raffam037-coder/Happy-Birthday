'use client';

/**
 * Anime.js Utilities for Gallery Animation
 * Integrates modern animation capabilities from anime.js library
 */

const anime = require('animejs') as any;

// ============================================================
// STAGGER UTILITIES - Create cascading animations
// ============================================================

/**
 * Time-based stagger function
 * Delays animation start for each element incrementally
 * Usage: Perfect for gallery item entrance, hover effects
 */
export const staggerTime = (interval: number = 50) => {
  let index = 0;
  return () => {
    return index++ * interval;
  };
};

/**
 * Grid-based stagger function
 * Creates wave patterns from center, edges, or corners
 * Usage: For gallery grids, creates professional entrance effects
 */
export const staggerGrid = (
  cols: number = 5,
  rows: number = 5,
  fromPosition: 'center' | 'edges' | 'corners' | 'random' = 'center'
) => {
  return {
    grid: [cols, rows],
    from: fromPosition,
    amount: 100 // stagger amount in 0-100%
  };
};

/**
 * Value-based stagger function
 * Staggers animation between different property values
 * Usage: For opacity, scale, color animations
 */
export const staggerValues = (values: number[]) => {
  return values;
};

// ============================================================
// TIMELINE ORCHESTRATION - Sequence multiple animations
// ============================================================

/**
 * Gallery items entrance timeline
 * Orchestrates coordinated animation for gallery
 */
export const createGalleryEntrance = (
  selector: string = '.item__image',
  duration: number = 600,
  staggerDelay: number = 40
) => {
  const timeline = anime.timeline({
    autoplay: false,
    delay: 0
  });

  timeline.add(
    {
      targets: selector,
      opacity: [0, 1],
      scale: [0.8, 1],
      rotate: [-15, 0],
      duration: duration,
      easing: 'easeOutElastic(1, .75)',
      delay: anime.stagger(staggerDelay, { start: 100 })
    },
    0
  );

  return timeline;
};

/**
 * Gallery hover effect timeline
 * Creates enhanced hover interaction
 */
export const createHoverEffect = (element: string | HTMLElement) => {
  return anime({
    targets: element,
    scale: 1.08,
    boxShadow: '0 20px 50px rgba(236, 72, 153, 0.6)',
    duration: 400,
    easing: 'easeOutElastic(1, .6)'
  });
};

/**
 * Advanced stagger animation for text
 * Animates text character by character or word by word
 */
export const staggerTextAnimation = (
  selector: string,
  mode: 'chars' | 'words' | 'lines' = 'chars',
  delay: number = 50
) => {
  const elements = document.querySelectorAll(selector);
  
  return anime.timeline({
    autoplay: true
  }).add({
    targets: elements,
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 600,
    easing: 'easeOutExpo',
    delay: anime.stagger(delay)
  });
};

// ============================================================
// SPRING ANIMATIONS - Natural, bouncy animations
// ============================================================

/**
 * Create spring animation for element
 * Useful for gallery item reactions
 */
export const createSpringAnimation = (
  target: string | HTMLElement,
  property: string,
  value: number | string,
  stiffness: number = 100,
  damping: number = 15
) => {
  return anime({
    targets: target,
    [property]: value,
    duration: 1500,
    easing: `easeOutElastic(${stiffness / 100}, ${damping / 100})`,
    delay: 0
  });
};

/**
 * Draggable spring effect
 * Simulates physics-based dragging
 */
export const createDraggableSpring = (
  element: HTMLElement,
  options: {
    releaseStiffness?: number;
    releaseDamping?: number;
    friction?: number;
  } = {}
) => {
  const {
    releaseStiffness = 120,
    releaseDamping = 6,
    friction = 0.8
  } = options;

  return {
    releaseEase: `easeOutElastic(${releaseStiffness / 100}, ${releaseDamping / 100})`,
    releaseVelocity: friction,
    clickToRelease: true
  };
};

// ============================================================
// SCROLL OBSERVER - Trigger animations on scroll
// ============================================================

/**
 * Scroll-triggered animation
 * Animates elements when they come into view
 */
export const createScrollAnimation = (
  selector: string,
  animationOptions: Record<string, any> = {},
  triggerThreshold: number = 0.5
) => {
  const elements = document.querySelectorAll(selector);

  elements.forEach((el) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({
            targets: el,
            opacity: [0, 1],
            translateY: [50, 0],
            ...animationOptions,
            duration: 800,
            easing: 'easeOutExpo'
          });
          observer.unobserve(el);
        }
      });
    }, { threshold: triggerThreshold });

    observer.observe(el);
  });
};

// ============================================================
// ADVANCED EASING FUNCTIONS - Professional timing
// ============================================================

/**
 * Custom easing presets optimized for gallery
 */
export const EASING_PRESETS = {
  // Bouncy effects
  BOUNCE_IN: 'easeInBounce',
  BOUNCE_OUT: 'easeOutBounce',
  BOUNCE_IN_OUT: 'easeInOutBounce',

  // Elastic effects (spring-like)
  ELASTIC_OUT: 'easeOutElastic(1, .75)',
  ELASTIC_IN_OUT: 'easeInOutElastic(1, .5)',

  // Exponential effects (dramatic)
  EXPO_OUT: 'easeOutExpo',
  EXPO_IN_OUT: 'easeInOutExpo',

  // Smooth effects
  SMOOTH: 'easeInOutQuad',
  SMOOTH_IN: 'easeInQuad',

  // Professional effects
  PROFESSIONAL: 'easeInOutCubic',
  SHARP: 'easeInOutQuart',
};

// ============================================================
// BATCH ANIMATIONS - Animate multiple targets
// ============================================================

/**
 * Create batch animation for multiple elements
 * Useful for gallery grid animations
 */
export const createBatchAnimation = (
  targets: string | HTMLElement[],
  keyframes: Record<string, any>[],
  options: {
    stagger?: number;
    duration?: number;
    delay?: number;
    easing?: string;
  } = {}
) => {
  const {
    stagger: staggerValue = 50,
    duration = 600,
    delay = 0,
    easing = 'easeOutExpo'
  } = options;

  return anime.timeline({
    autoplay: false,
    delay: delay
  }).add({
    targets: targets,
    keyframes: keyframes,
    duration: duration,
    easing: easing,
    delay: anime.stagger(staggerValue)
  });
};

// ============================================================
// SVG ANIMATIONS - Advanced shape effects
// ============================================================

/**
 * SVG Shape morphing animation
 */
export const createSVGMorph = (
  targetPath: string,
  duration: number = 800
) => {
  return {
    d: targetPath,
    duration: duration,
    easing: 'easeInOutQuad',
    fill: 'rgba(236, 72, 153, 0.3)'
  };
};

/**
 * SVG Line drawing animation
 */
export const createLineDrawing = (
  selector: string,
  duration: number = 1000,
  delay: number = 0
) => {
  return anime({
    targets: selector,
    strokeDashoffset: [anime.setDashoffset, 0],
    duration: duration,
    delay: delay,
    direction: 'normal',
    easing: 'easeInOutQuad'
  });
};

// ============================================================
// COLOR & TRANSFORMS - Advanced property animations
// ============================================================

/**
 * Color gradient animation
 * Animates element through color transitions
 */
export const createColorAnimation = (
  element: string | HTMLElement,
  colors: string[],
  duration: number = 2000,
  loop: boolean = true
) => {
  const timeline = anime.timeline({
    loop: loop ? true : false
  });

  colors.forEach((color, index) => {
    timeline.add({
      targets: element,
      backgroundColor: color,
      duration: duration / colors.length,
      easing: 'linear'
    }, index > 0 ? '-=' + (duration / colors.length * 0.1) : 0);
  });

  return timeline;
};

/**
 * Advanced transform composition
 * Combines multiple transforms smoothly
 */
export const createTransformAnimation = (
  element: string | HTMLElement,
  transforms: {
    scale?: number | number[];
    rotate?: number | number[];
    translateX?: number | string;
    translateY?: number | string;
    skewX?: number;
    skewY?: number;
  },
  options: {
    duration?: number;
    easing?: string;
    delay?: number;
  } = {}
) => {
  const { duration = 600, easing = 'easeOutExpo', delay = 0 } = options;

  return anime({
    targets: element,
    ...transforms,
    duration: duration,
    easing: easing,
    delay: delay
  });
};

// ============================================================
// PERFORMANCE UTILITIES - Optimize animations
// ============================================================

/**
 * Pause all active animations
 */
export const pauseAllAnimations = () => {
  anime.pauseAll();
};

/**
 * Resume all paused animations
 */
export const resumeAllAnimations = () => {
  anime.resumeAll();
};

/**
 * Clean up animations on element removal
 */
export const cleanupAnimations = (element: HTMLElement) => {
  anime.set(element, {
    opacity: 1,
    scale: 1,
    rotate: 0,
    translateX: 0,
    translateY: 0
  });
};

/**
 * Set animation engine settings for performance
 */
export const optimizeAnimationEngine = () => {
  // Disable animations when tab is hidden
  anime.engine.settings.pauseOnDocumentHidden = true;

  // Set FPS for better performance
  anime.engine.settings.fps = 60;

  // Set precision for smoother animations
  anime.engine.settings.precision = 1;
};

// ============================================================
// UTILITY HELPERS
// ============================================================

/**
 * Shuffle array utility for randomized animations
 */
export const shuffleAnimationOrder = (array: any[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Random value generator within range
 */
export const randomValue = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

/**
 * Get all visible elements matching selector
 */
export const getVisibleElements = (selector: string): HTMLElement[] => {
  const elements = document.querySelectorAll(selector);
  return Array.from(elements).filter(el => {
    const style = window.getComputedStyle(el);
    return style.display !== 'none' && style.visibility !== 'hidden';
  }) as HTMLElement[];
};

export default anime;
