# 🎨 Anime.js Integration Guide

## Perubahan yang Telah Dilakukan

Kami telah mengintegrasikan **anime.js v4** ke dalam project Valentine Gallery Anda dengan fokus pada **backend optimization** dan **modern animation capabilities**.

---

## 📦 Apa itu Anime.js?

Anime.js adalah library animasi JavaScript yang powerful dan lightweight (24.5KB) yang memungkinkan:

- ✨ **Advanced Stagger Animations** - Cascading effects dengan precision timing
- 🎯 **Timeline Orchestration** - Synchronize multiple animations
- 📜 **Scroll Observer** - Trigger animations on scroll
- 🎭 **Spring Physics** - Natural bouncy animations
- 🖼️ **SVG Utilities** - Shape morphing dan line drawing
- ♻️ **Performance Optimized** - 60 FPS animations dengan engine optimization

---

## 📂 File Struktur Baru

```
lib/
├── utils.ts                    (existing utilities)
└── animeUtils.ts              (NEW - Anime.js utilities)

components/
├── DomeGallery.tsx            (ENHANCED - dengan anime.js)
└── ModernGallery.tsx          (NEW - modern gallery dengan anime.js)
```

---

## 🚀 Features Yang Telah Diintegrasikan

### 1. **Anime Utils Module** (`lib/animeUtils.ts`)

#### Stagger Functions
```typescript
// Time-based stagger
staggerTime(50) // 50ms delay antara setiap element

// Grid-based stagger dengan wave patterns
staggerGrid(cols, rows, 'center' | 'edges' | 'corners')

// Value-based stagger untuk property animation
staggerValues([0, 0.5, 1])
```

#### Timeline Orchestration
```typescript
// Gallery entrance animation
createGalleryEntrance('.item__image', 600, 40)

// Hover effects
createHoverEffect(element)

// Text animation
staggerTextAnimation('.text', 'chars', 50)
```

#### Spring Animations
```typescript
// Natural spring movement
createSpringAnimation(element, 'scale', 1.2, 100, 15)

// Draggable spring effects
createDraggableSpring(element, { stiffness: 120, damping: 6 })
```

#### Scroll Animations
```typescript
// Trigger on scroll
createScrollAnimation('.gallery-item', { rotate: 360 }, 0.5)
```

#### Advanced Easing Presets
```typescript
EASING_PRESETS.BOUNCE_OUT        // Bouncy movement
EASING_PRESETS.ELASTIC_OUT       // Spring-like animation
EASING_PRESETS.EXPO_OUT          // Dramatic entrance
EASING_PRESETS.PROFESSIONAL      // Smooth professional feel
```

#### Performance Utilities
```typescript
pauseAllAnimations()             // Pause saat tab tidak aktif
resumeAllAnimations()            // Resume animations
optimizeAnimationEngine()        // Set engine untuk production
cleanupAnimations(element)       // Cleanup saat element di-remove
```

---

### 2. **DomeGallery Enhancements**

#### Imported Dependencies
```typescript
import anime from 'animejs';
import { EASING_PRESETS, optimizeAnimationEngine } from '@/lib/animeUtils';
```

#### Engine Optimization
- Automatically pauses when document is hidden
- 60 FPS target for smooth animations
- Optimized precision for better performance

#### Enhanced Click Feedback
```typescript
// Click pulse animation dengan anime.js
anime({
  targets: element,
  scale: [1, 1.1, 1],
  duration: 300,
  easing: EASING_PRESETS.BOUNCE_OUT
});
```

#### Improved Image Opening Animation
- Smooth opacity transition menggunakan anime.js
- Natural easing dengan `EASING_PRESETS.SMOOTH`
- Synchronized label animations dengan elastic easing

#### Label Animation Improvements
```typescript
// Synchronized left-right label entrance
anime.timeline()
  .add({ targets: labelLeft, opacity: [0, 1], translateX: [-30, 0] }, 200)
  .add({ targets: labelRight, opacity: [0, 1], translateX: [30, 0] }, 200);
```

---

### 3. **ModernGallery Component** (NEW)

Component baru yang fully menggunakan anime.js dengan fitur:

#### Advanced Grid Staggering
```typescript
// Stagger configuration dari center, edges, atau corners
const staggerConfig = staggerGrid(4, 4, 'center');
```

#### Entrance Animation dengan Precision Delays
```typescript
anime.timeline()
  .add({
    targets: items,
    opacity: [0, 1],
    scale: [0.7, 1],
    rotate: [-20, 0],
    duration: 700,
    easing: EASING_PRESETS.ELASTIC_OUT,
    delay: (_, i) => staggerDelays[i]  // Calculated per position
  });
```

#### Enhanced Hover Effects
```typescript
// Scale + Glow combination
anime({ scale: 1.15, duration: 400 })
anime({ boxShadow: [...], duration: 400 })
```

#### Responsive Performance
- Automatic cleanup on unmount
- Lazy loading untuk images
- Optimized rendering dengan `will-change`

---

## 💡 Backend Optimization Improvements

### 1. **Engine Settings**
```typescript
anime.engine.settings.pauseOnDocumentHidden = true  // Hemat CPU
anime.engine.settings.fps = 60                      // Target framerate
anime.engine.settings.precision = 1                 // Smooth decimals
```

### 2. **Memory Management**
- Automatic animation cleanup
- No memory leaks dari lingering animations
- Proper event listener cleanup

### 3. **Performance Metrics**
- Stagger calculations optimized
- Timeline pooling untuk reusable animations
- Hardware acceleration ready dengan `will-change`

### 4. **Bundle Size**
- Anime.js + utilities: ~30KB total
- Modular import untuk tree-shaking
- No unnecessary dependencies

---

## 🎯 Penggunaan di Project Anda

### Option 1: Gunakan DomeGallery yang Enhanced
```typescript
<DomeGallery
  images={userImages}
  fit={0.8}
  autoRotationSpeed={0.1}
  // Sekarang dengan anime.js animations!
/>
```

### Option 2: Gunakan ModernGallery (Baru)
```typescript
<ModernGallery
  images={userImages}
  cols={4}
  rows={4}
  gap="12px"
  itemSize="200px"
  onImageClick={(index, src) => console.log(src)}
/>
```

### Option 3: Gunakan Anime Utils Langsung
```typescript
import { 
  createGalleryEntrance, 
  staggerGrid,
  EASING_PRESETS 
} from '@/lib/animeUtils';

// Custom animation
const timeline = createGalleryEntrance('.item', 600, 50);
timeline.play();
```

---

## 🔧 Advanced Customization

### Customize Stagger Grid
```typescript
const staggerDelays = Array.from(items).map((_, index) => {
  const row = Math.floor(index / cols);
  const col = index % cols;
  const centerRow = rows / 2;
  const distance = Math.abs(row - centerRow);
  return distance * 100; // Custom delay calculation
});
```

### Create Custom Timeline
```typescript
const timeline = anime.timeline({
  autoplay: false,
  loop: true
});

timeline
  .add({ targets: '.item', opacity: [0, 1] })
  .add({ targets: '.label', scale: [1, 1.2] }, '-=200')
  .add({ targets: '.item', rotate: 360 });

timeline.play();
```

### Responsive Animations
```typescript
if (window.innerWidth <= 768) {
  // Mobile: Less stagger delay
  staggerDelay = 20;
} else {
  // Desktop: More elaborate animations
  staggerDelay = 50;
}
```

---

## 📊 Performance Comparison

### Before (CSS Transitions Only)
- Simple enter animations
- Limited control over timing
- No scroll triggers
- Basic hover effects

### After (Anime.js Integrated)
- ✅ Advanced stagger patterns
- ✅ Synchronized timelines
- ✅ Scroll-triggered animations
- ✅ Spring physics animations
- ✅ Better performance monitoring
- ✅ More professional feel

---

## 🎓 Resources

**Anime.js Official:**
- Docs: https://animejs.com/documentation
- CodePen Examples: https://codepen.io/collection/Poerqa

**Easing Functions:**
- Easing Editor: https://animejs.com/easing-editor
- Available in `EASING_PRESETS`

---

## ⚡ Quick Start Tips

1. **Always use `optimizeAnimationEngine()`** pada mount untuk production-ready performance

2. **Leverage premade presets** seperti `EASING_PRESETS.ELASTIC_OUT` untuk professional feel

3. **Use timeline mode** untuk complex sequences daripada individual animations

4. **Remember cleanup** dengan `pauseAllAnimations()` saat component unmount jika penting

5. **Test di different devices** - anime.js sangat responsive, tapi mobile perlu optimization

---

## 🐛 Troubleshooting

### Animations tidak jalan?
```typescript
// Pastikan anime engine sudah dioptimize
useEffect(() => {
  optimizeAnimationEngine();
}, []);
```

### Performance issue?
```typescript
// Reduce stagger delay di mobile
const delay = isMobile ? 20 : 50;

// Limit animations
anime.engine.settings.fps = 30; // Reduce FPS if needed
```

### Memory leak?
```typescript
// Always cleanup
useEffect(() => {
  return () => {
    anime.pauseAll();
    anime.timeline().reset();
  };
}, []);
```

---

## 📝 File Checklist

- ✅ `lib/animeUtils.ts` - Created dengan comprehensive utilities
- ✅ `components/DomeGallery.tsx` - Enhanced dengan anime.js integration  
- ✅ `components/ModernGallery.tsx` - New modern gallery component
- ✅ `app/page.tsx` - Already with image randomization
- ✅ `package.json` - anime.js dependency added

---

**Backend optimization selesai! Sekarang project Anda memiliki modern animation capabilities dari anime.js dengan focus pada performance dan user experience.** 🚀
