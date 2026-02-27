# 🎬 Anime.js Integration - Quick Start Guide

## 📋 Apa Yang Sudah Diintegrasikan?

Kami telah mengintegrasikan **anime.js v4** ke project Valentine Gallery Anda dengan 3 layer:

1. **Core Utilities** (`lib/animeUtils.ts`) - Reusable animation functions
2. **React Hooks** (`lib/useAnimeHooks.ts`) - Easy React integration  
3. **Examples** (`lib/animeExamples.ts`) - Ready-to-use code snippets
4. **Enhanced Components** - DomeGallery & ModernGallery dengan anime.js

---

## 🚀 Quick Start

### Option 1: Gunakan React Hooks (RECOMMENDED untuk React)

```tsx
'use client';

import { useEffect } from 'react';
import { useAnimeGallery } from '@/lib/useAnimeHooks';

export default function Gallery() {
  const { animateGallery, setupHover, setupClickFeedback } = useAnimeGallery();

  useEffect(() => {
    // Initialize animations
    animateGallery('.gallery-item', { 
      duration: 700, 
      staggerDelay: 50,
      fromCenter: true 
    });
    
    setupHover('.gallery-item', { glowColor: 'rgba(236, 72, 153, 0.8)' });
    setupClickFeedback('.gallery-item');
  }, [animateGallery, setupHover, setupClickFeedback]);

  return (
    <div className="gallery">
      <div className="gallery-item">
        <img src="/image1.jpg" alt="Gallery item" />
      </div>
      {/* More items */}
    </div>
  );
}
```

### Option 2: Gunakan Utility Functions Langsung

```typescript
import { createGalleryEntrance, createHoverEffect, EASING_PRESETS } from '@/lib/animeUtils';

// Create entrance animation
const timeline = createGalleryEntrance('.gallery-item', 600, 50);
timeline.play();

// Create hover effect
createHoverEffect('.gallery-item');
```

### Option 3: Gunakan ModernGallery Component

```tsx
import ModernGallery from '@/components/ModernGallery';

export default function Page() {
  const images = ['/image1.jpg', '/image2.jpg', /* ... */];

  return (
    <ModernGallery 
      images={images}
      cols={4}
      rows={4}
      gap="12px"
    />
  );
}
```

### Option 4: Gunakan Enhanced DomeGallery

```tsx
import DomeGallery from '@/components/DomeGallery';

export default function Page() {
  const images = ['/image1.jpg', '/image2.jpg', /* ... */];

  return (
    <DomeGallery 
      images={images}
      // Sekarang dengan anime.js animations!
    />
  );
}
```

---

## 📚 Available Hooks

### `useAnimeGallery()` - Main Hook

```typescript
const {
  animateGallery,      // Gallery entrance dengan stagger
  setupHover,          // Hover effects
  setupClickFeedback,  // Click animations
  setupScrollAnimation,// Scroll trigger
  createTimeline,      // Complex sequences
  pauseAll,            // Pause semua
  resumeAll,           // Resume semua
  stop,                // Stop specific animation
  play                 // Play specific animation
} = useAnimeGallery();
```

**Example:**
```typescript
// Gallery entrance dari center
animateGallery('.item', { 
  duration: 700,
  fromCenter: true,
  cols: 4,
  rows: 4 
});

// Setup hover dengan custom scale
setupHover('.item', { 
  scaleOnHover: 1.2,
  glowColor: 'rgba(236, 72, 153, 0.8)'
});

// Click feedback
setupClickFeedback('.item', { maxScale: 1.15 });

// Scroll animations
setupScrollAnimation('.item', { offset: 50, threshold: 0.5 });
```

### `useScrollAnimation()` - Scroll Trigger

```typescript
const ref = useRef<HTMLDivElement>(null);

useScrollAnimation(ref, {
  duration: 600,
  offset: 50,
  threshold: 0.3,
  easing: 'easeOutExpo'
});

return <div ref={ref}>Content to animate on scroll</div>;
```

### `useHoverAnimation()` - Hover Effect

```typescript
const ref = useRef<HTMLDivElement>(null);

useHoverAnimation(ref, {
  scale: 1.1,
  duration: 300,
  easing: 'easeOutElastic(1, .6)'
});

return <div ref={ref}>Hover me!</div>;
```

### `useStaggerAnimation()` - Stagger Effect

```typescript
const containerRef = useRef<HTMLDivElement>(null);

useStaggerAnimation(containerRef, {
  selector: '.item',
  staggerDelay: 50,
  duration: 600
});

return (
  <div ref={containerRef}>
    <div className="item">Item 1</div>
    <div className="item">Item 2</div>
    <div className="item">Item 3</div>
  </div>
);
```

---

## 🎨 Available Easing Presets

```typescript
import { EASING_PRESETS } from '@/lib/animeUtils';

// Bounce effects
EASING_PRESETS.BOUNCE_IN         // Bouncy entrance
EASING_PRESETS.BOUNCE_OUT        // Bouncy exit

// Elastic/Spring effects
EASING_PRESETS.ELASTIC_OUT       // Natural spring feel
EASING_PRESETS.ELASTIC_IN_OUT    // Spring both ways

// Exponential effects
EASING_PRESETS.EXPO_OUT          // Dramatic entrance
EASING_PRESETS.EXPO_IN_OUT       // Smooth dramatic

// Smooth effects  
EASING_PRESETS.SMOOTH            // Basic smooth
EASING_PRESETS.SMOOTH_IN         // Smooth entrance

// Professional effects
EASING_PRESETS.PROFESSIONAL      // Studio quality
EASING_PRESETS.SHARP             // Crisp timing
```

---

## 💡 Common Patterns

### Pattern 1: Gallery Grid dengan Wave Entrance

```typescript
const { animateGallery } = useAnimeGallery();

useEffect(() => {
  animateGallery('.gallery-item', {
    duration: 800,
    staggerDelay: 100,
    fromCenter: true,  // Wave dari center
    cols: 4,
    rows: 4,
    easing: 'easeOutElastic(1, .6)'
  });
}, []);
```

### Pattern 2: Hover + Glow + Click Feedback

```typescript
const { setupHover, setupClickFeedback } = useAnimeGallery();

useEffect(() => {
  setupHover('.gallery-item', {
    scaleOnHover: 1.2,
    glowColor: 'rgba(236, 72, 153, 0.8)'
  });
  
  setupClickFeedback('.gallery-item', {
    maxScale: 1.15
  });
}, []);
```

### Pattern 3: Scroll-triggered Animations

```typescript
const { setupScrollAnimation } = useAnimeGallery();

useEffect(() => {
  setupScrollAnimation('.section', {
    offset: 100,
    threshold: 0.3
  });
}, []);
```

### Pattern 4: Timeline untuk Complex Sequence

```typescript
const { createTimeline } = useAnimeGallery();

useEffect(() => {
  const timeline = createTimeline([
    {
      targets: '.header',
      opacity: [0, 1],
      duration: 600,
      easing: 'easeOutQuad'
    },
    {
      targets: '.item',
      scale: [0.8, 1],
      duration: 400,
      delay: anime.stagger(50)
    }
  ]);
  
  timeline.play();
}, []);
```

---

## 🔧 Advanced: Custom Timeline

```typescript
import anime from 'animejs';

const timeline = anime.timeline({
  autoplay: true,
  loop: false
});

timeline
  // Step 1: Fade in
  .add({
    targets: '.gallery',
    opacity: [0, 1],
    duration: 500
  })
  // Step 2: Scale items (start 200ms before step 1 ends)
  .add({
    targets: '.gallery-item',
    scale: [0.8, 1],
    duration: 400,
    delay: anime.stagger(30)
  }, '-=200')
  // Step 3: Add glow
  .add({
    targets: '.gallery-item',
    boxShadow: ['0 0 0px rgba(236, 72, 153, 0)', '0 0 20px rgba(236, 72, 153, 0.8)'],
    duration: 600
  }, '-=300');
```

---

## 🎯 Performance Tips

### Tip 1: Initialize Optimization
```typescript
useEffect(() => {
  optimizeAnimationEngine(); // Do this ONCE
}, []);
```

### Tip 2: Cleanup on Unmount
```typescript
const { pauseAll } = useAnimeGallery();

useEffect(() => {
  return () => {
    pauseAll();  // Cleanup
  };
}, [pauseAll]);
```

### Tip 3: Respect Scroll
```typescript
// Pause animations saat tidak visible
useEffect(() => {
  const handleVisibilityChange = () => {
    if (document.hidden) {
      anime.pauseAll();
    } else {
      anime.resumeAll();
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
  return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
}, []);
```

### Tip 4: Reduce jika Low-Performance Device
```typescript
const isPerfDevice = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

const staggerDelay = isPerfDevice ? 50 : 10; // Reduce di perangkat low-end
```

---

## 🐛 Troubleshooting

### Q: Animations tidak jalan?
**A:** Pastikan:
1. Element selector cocok dengan HTML
2. `optimizeAnimationEngine()` sudah dipanggil
3. Element tidak di-hide dengan `display: none`

### Q: Performance issue?
**A:** Coba:
1. Reduce `staggerDelay` dari 50ms ke 20ms
2. Reduce animation `duration`
3. Set max animations dengan `maxAnimations: 10`

### Q: Animations restart setiap time component re-render?
**A:** Use `useCallback` atau move animation setup ke `useEffect` dengan dependency array

### Q: Glow effect tidak visible?
**A:** Check:
1. Browser support untuk `boxShadow` animation
2. Element bukan transparent
3. Try dengan lebih besar shadow value

---

## 📖 Documentation Files

- **`ANIME_JS_INTEGRATION.md`** - Comprehensive guide
- **`lib/animeUtils.ts`** - Core utilities
- **`lib/useAnimeHooks.ts`** - React Hooks
- **`lib/animeExamples.ts`** - Code snippets
- **Official Docs:** https://animejs.com/documentation

---

## 🌟 Next Steps

1. **Try React Hooks** - Paling mudah untuk React integration
2. **Explore Examples** - Lihat `lib/animeExamples.ts` untuk ideas
3. **Customize** - Adjust `staggerDelay`, `duration`, `easing` sesuai preferensi
4. **Performance** - Test di mobile devices
5. **Deploy** - Bundle size anime.js kecil (~30KB), aman untuk production

---

## 🎓 Learning Resources

- **Anime.js Docs:** https://animejs.com/documentation
- **Easing Editor:** https://animejs.com/easing-editor
- **CodePen Examples:** https://codepen.io/collection/Poerqa
- **Timeline Guide:** https://animejs.com/documentation/timeline

---

**Selamat! Project Anda sekarang memiliki modern animation capabilities! 🚀**

Jika ada pertanyaan atau butuh customization lebih lanjut, refer ke documentation files atau anime.js official docs.
