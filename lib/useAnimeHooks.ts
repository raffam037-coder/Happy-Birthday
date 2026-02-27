'use client';

import { useEffect, useRef, useCallback } from 'react';
const anime = require('animejs') as any;
import { 
  EASING_PRESETS, 
  optimizeAnimationEngine,
  getVisibleElements 
} from './animeUtils';

/**
 * useAnimeGallery Hook - Easy integration of anime.js animations
 * 
 * Usage:
 * const { animateGallery, setupHover, pause, resume } = useAnimeGallery();
 * 
 * useEffect(() => {
 *   animateGallery('.gallery-item', { ... });
 * }, []);
 */
export const useAnimeGallery = () => {
  const timelinesRef = useRef<any[]>([]);
  const animationsRef = useRef<any[]>([]);

  // Initialize anime engine
  useEffect(() => {
    optimizeAnimationEngine();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      timelinesRef.current.forEach((tl) => {
        if (tl) {
          tl.pause();
          tl.reset();
        }
      });

      animationsRef.current.forEach((anim) => {
        if (anim) {
          anim.pause();
        }
      });

      timelinesRef.current = [];
      animationsRef.current = [];
    };
  }, []);

  /**
   * Animate gallery with stagger effect
   */
  const animateGallery = useCallback((
    selector: string,
    options: {
      duration?: number;
      staggerDelay?: number;
      easing?: string;
      fromCenter?: boolean;
      cols?: number;
      rows?: number;
    } = {}
  ) => {
    const {
      duration = 700,
      staggerDelay = 50,
      easing = EASING_PRESETS.ELASTIC_OUT,
      fromCenter = true,
      cols = 4,
      rows = 4
    } = options;

    const items = getVisibleElements(selector);
    if (items.length === 0) return;

    let delays = items.map((_, i) => i * staggerDelay);

    if (fromCenter) {
      delays = items.map((_, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;
        const centerRow = Math.floor(rows / 2);
        const centerCol = Math.floor(cols / 2);
        const distance = Math.abs(row - centerRow) + Math.abs(col - centerCol);
        return distance * staggerDelay;
      });
    }

    const animation = anime({
      targets: items,
      opacity: [0, 1],
      scale: [0.7, 1],
      rotate: [-20, 0],
      duration,
      easing,
      delay: (_el: any, i: number) => delays[i]
    });

    animationsRef.current.push(animation);
    return animation;
  }, []);

  /**
   * Setup hover effects for gallery items
   */
  const setupHover = useCallback((
    selector: string,
    options: {
      scaleOnHover?: number;
      duration?: number;
      easing?: string;
      glowColor?: string;
    } = {}
  ) => {
    const {
      scaleOnHover = 1.15,
      duration = 400,
      easing = EASING_PRESETS.ELASTIC_OUT,
      glowColor = 'rgba(236, 72, 153, 0.8)'
    } = options;

    const items = getVisibleElements(selector);

    items.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        anime({
          targets: item,
          scale: scaleOnHover,
          duration,
          easing
        });

        anime({
          targets: item,
          boxShadow: `0 0 30px ${glowColor}`,
          duration,
          easing: 'easeOutQuad'
        });
      });

      item.addEventListener('mouseleave', () => {
        anime({
          targets: item,
          scale: 1,
          duration: duration * 0.75,
          easing
        });

        anime({
          targets: item,
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
          duration: duration * 0.75,
          easing: 'easeOutQuad'
        });
      });
    });
  }, []);

  /**
   * Setup click feedback animation
   */
  const setupClickFeedback = useCallback((
    selector: string,
    options: {
      maxScale?: number;
      duration?: number;
    } = {}
  ) => {
    const {
      maxScale = 1.1,
      duration = 300
    } = options;

    const items = getVisibleElements(selector);

    items.forEach((item) => {
      item.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;

        const animation = anime({
          targets: target,
          scale: [1, maxScale, 0.95, 1],
          duration,
          easing: EASING_PRESETS.BOUNCE_OUT
        });

        animationsRef.current.push(animation);
      });
    });
  }, []);

  /**
   * Setup scroll animations
   */
  const setupScrollAnimation = useCallback((
    selector: string,
    options: {
      duration?: number;
      offset?: number;
      easing?: string;
      threshold?: number;
    } = {}
  ) => {
    const {
      duration = 600,
      offset = 50,
      easing = EASING_PRESETS.EXPO_OUT,
      threshold = 0.3
    } = options;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const animation = anime({
            targets: entry.target,
            opacity: [0, 1],
            translateY: [offset, 0],
            duration,
            easing
          });

          animationsRef.current.push(animation);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const items = document.querySelectorAll(selector);
    items.forEach((item) => observer.observe(item));

    return observer;
  }, []);

  /**
   * Create timeline animation
   */
  const createTimeline = useCallback((
    steps: Array<{
      targets: string | Element[];
      duration?: number;
      easing?: string;
      [key: string]: any;
    }>,
    options: {
      autoplay?: boolean;
      loop?: boolean;
      loopDelay?: number;
    } = {}
  ) => {
    const timeline = anime.timeline({
      autoplay: options.autoplay ?? true,
      loop: options.loop ?? false,
      loopDelay: options.loopDelay ?? 0
    });

    steps.forEach((step, index) => {
      timeline.add(step, index > 0 ? '-=200' : 0);
    });

    timelinesRef.current.push(timeline);
    return timeline;
  }, []);

  /**
   * Pause all animations
   */
  const pauseAll = useCallback(() => {
    anime.pauseAll();
  }, []);

  /**
   * Resume all animations
   */
  const resumeAll = useCallback(() => {
    anime.resumeAll();
  }, []);

  /**
   * Stop specific animation
   */
  const stop = useCallback((animation: any) => {
    if (animation) {
      animation.pause();
    }
  }, []);

  /**
   * Play specific animation
   */
  const play = useCallback((animation: any) => {
    if (animation) {
      animation.play();
    }
  }, []);

  return {
    animateGallery,
    setupHover,
    setupClickFeedback,
    setupScrollAnimation,
    createTimeline,
    pauseAll,
    resumeAll,
    stop,
    play
  };
};

/**
 * useScrollAnimation Hook - Animate on scroll
 */
export const useScrollAnimation = (
  ref: React.RefObject<HTMLElement>,
  options: {
    duration?: number;
    threshold?: number;
    offset?: number;
    easing?: string;
  } = {}
) => {
  const {
    duration = 600,
    threshold = 0.3,
    offset = 50,
    easing = EASING_PRESETS.EXPO_OUT
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: entry.target,
              opacity: [0, 1],
              translateY: [offset, 0],
              duration,
              easing
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [duration, threshold, offset, easing]);
};

/**
 * useHoverAnimation Hook - Hover animation on element
 */
export const useHoverAnimation = (
  ref: React.RefObject<HTMLElement>,
  options: {
    scale?: number;
    duration?: number;
    easing?: string;
  } = {}
) => {
  const {
    scale = 1.1,
    duration = 300,
    easing = EASING_PRESETS.ELASTIC_OUT
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const handleMouseEnter = () => {
      anime({
        targets: element,
        scale: scale,
        duration,
        easing
      });
    };

    const handleMouseLeave = () => {
      anime({
        targets: element,
        scale: 1,
        duration: duration * 0.75,
        easing
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [scale, duration, easing]);
};

/**
 * useStaggerAnimation Hook - Stagger animation for arrays
 */
export const useStaggerAnimation = (
  ref: React.RefObject<HTMLElement>,
  options: {
    selector?: string;
    staggerDelay?: number;
    duration?: number;
    easing?: string;
    autoplay?: boolean;
  } = {}
) => {
  const {
    selector = '*',
    staggerDelay = 50,
    duration = 600,
    easing = EASING_PRESETS.ELASTIC_OUT,
    autoplay = true
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    const elements = ref.current.querySelectorAll(selector);

    const animation = anime({
      targets: elements,
      opacity: [0, 1],
      scale: [0.8, 1],
      duration,
      easing,
      delay: anime.stagger(staggerDelay),
      autoplay
    });

    return () => {
      animation.pause();
    };
  }, [selector, staggerDelay, duration, easing, autoplay]);
};

export default {
  useAnimeGallery,
  useScrollAnimation,
  useHoverAnimation,
  useStaggerAnimation
};
