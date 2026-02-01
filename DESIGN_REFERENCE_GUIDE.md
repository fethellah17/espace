# Espace Parfum - Design Reference Guide

## 🎨 Quick Reference

### Color Codes

```
Primary Colors:
- Deep Pink:     #8B3A4A (hsl(340, 45%, 35%))
- Pink Dark:     #7A2E3A (hsl(340, 40%, 25%))
- Pink Medium:   #A04A5A (hsl(340, 35%, 50%))

Accent Colors:
- Rose Gold:     #D4956F (hsl(15, 55%, 65%))
- Rose Gold Lt:  #E0A87F (hsl(15, 60%, 75%))
- Rose Gold Dk:  #C8845F (hsl(15, 45%, 55%))

Background:
- Cream:         #FDFBF8 (hsl(20, 30%, 98%))
- Cream Dark:    #F5F1ED (hsl(20, 20%, 94%))

Soft Colors:
- Pink Soft:     #F0E8E5 (hsl(350, 40%, 85%))
- Pink Blush:    #F8F3F1 (hsl(350, 35%, 92%))

Text:
- Foreground:    #2D1F1F (hsl(340, 30%, 15%))
- Muted:         #8B7A7A (hsl(340, 15%, 45%))
```

### Typography

```
Serif Font:
- Family: Cormorant Garamond
- Weights: 300 (light), 400 (regular), 500 (medium), 600 (semibold)
- Use: Headings, product names, prices

Sans-serif Font:
- Family: Inter
- Weights: 300 (light), 400 (regular), 500 (medium), 600 (semibold)
- Use: Body text, labels, buttons

Sizes:
- Hero:        6xl-8xl (48px-64px)
- Section:     4xl-5xl (36px-48px)
- Subsection:  2xl-3xl (24px-30px)
- Body:        base-lg (16px-18px)
- Small:       sm-xs (12px-14px)
```

### Spacing Scale

```
Padding:
- p-4:  1rem (16px)
- p-6:  1.5rem (24px)
- p-8:  2rem (32px)
- p-12: 3rem (48px)

Margins:
- mb-4:  1rem (16px)
- mb-6:  1.5rem (24px)
- mb-8:  2rem (32px)
- mb-12: 3rem (48px)

Gaps:
- gap-4:  1rem (16px)
- gap-6:  1.5rem (24px)
- gap-8:  2rem (32px)
- gap-12: 3rem (48px)
```

### Border Radius

```
Cards:     rounded-2xl (0.75rem / 12px)
Buttons:   rounded-lg (0.5rem / 8px) or rounded-full
Inputs:    rounded-lg (0.5rem / 8px)
Images:    rounded-2xl (0.75rem / 12px)
Small:     rounded-xl (0.625rem / 10px)
```

### Shadows

```
Soft:      0 2px 20px rgba(0, 0, 0, 0.03)
Elevated:  0 10px 40px rgba(0, 0, 0, 0.08)
Glow:      0 0 30px hsl(15 55% 65% / 0.2)
Pink:      0 10px 40px hsl(340 45% 35% / 0.15)
```

---

## 🎯 Component Styles

### Primary Button
```
Background:    Pink-deep (#8B3A4A)
Text:          Cream (#FDFBF8)
Hover:         Pink-medium (#A04A5A)
Padding:       px-8 py-4 (32px 16px)
Border Radius: rounded-full
Font:          Medium, text-sm
Transition:    300ms ease-out
```

### Secondary Button
```
Background:    Transparent
Border:        Cream/30
Text:          Cream (#FDFBF8)
Hover:         Cream/60 border, Cream/10 bg
Padding:       px-8 py-4 (32px 16px)
Border Radius: rounded-full
Font:          Medium, text-sm
Transition:    300ms ease-out
```

### Product Card
```
Background:    White (#FFFFFF)
Border Radius: rounded-2xl (12px)
Padding:       p-6 (24px)
Shadow:        shadow-soft
Hover Shadow:  shadow-elevated
Image Height:  h-64 (256px)
Transition:    300ms ease-out
Image Zoom:    110% on hover
```

### Input Field
```
Background:    White (#FFFFFF)
Border:        Pink-soft/40
Border Radius: rounded-lg (8px)
Padding:       px-5 py-3 (20px 12px)
Focus Ring:    ring-2 ring-pink-deep/30
Font:          Light weight
Transition:    300ms ease-out
```

### Header
```
Background:    Cream/95 with backdrop blur
Position:      Fixed, top-0
Height:        h-20 (80px)
Logo Font:     Serif, light, italic
Logo Size:     text-3xl (30px)
Nav Font:      text-xs, tracking-wide
Transition:    300ms ease-out
```

---

## 📐 Layout Patterns

### Hero Section
```
Background:    Gradient (pink-deep to pink-dark)
Padding:       pt-40 pb-24 (160px 96px)
Max Width:     max-w-7xl (80rem)
Heading:       6xl-7xl serif light
Subheading:    lg-xl sans light
Decorations:   Floating orbs with animations
```

### 3-Column Grid
```
Grid:          grid-cols-1 md:grid-cols-2 lg:grid-cols-3
Gap:           gap-8 (32px)
Card Style:    Rounded-2xl, white, shadow-soft
Hover:         shadow-elevated
Responsive:    1 col mobile, 2 col tablet, 3 col desktop
```

### 2-Column Layout
```
Grid:          grid-cols-1 lg:grid-cols-2
Gap:           gap-12 (48px)
Left Column:   Image or content
Right Column:  Text or form
Responsive:    1 col mobile, 2 col desktop
```

### Sidebar Layout
```
Grid:          grid-cols-1 lg:grid-cols-4
Sidebar:       lg:col-span-1 (sticky top-28)
Content:       lg:col-span-3
Gap:           gap-8 (32px)
Responsive:    1 col mobile, 4 col desktop
```

---

## 🎬 Animation Patterns

### Fade In
```
Duration:      600ms
Easing:        ease-out
From:          opacity-0, translateY(10px)
To:            opacity-1, translateY(0)
```

### Fade In Up
```
Duration:      800ms
Easing:        ease-out
From:          opacity-0, translateY(20px)
To:            opacity-1, translateY(0)
```

### Scale In
```
Duration:      500ms
Easing:        ease-out
From:          opacity-0, scale(0.95)
To:            opacity-1, scale(1)
```

### Float
```
Duration:      6s
Easing:        ease-in-out
Animation:     Infinite
Movement:      translateY(-10px) at 50%
```

### Hover Zoom
```
Duration:      700ms
Easing:        ease-out
From:          scale(1)
To:            scale(1.1)
```

---

## 🎨 Color Usage Guide

### When to Use Deep Pink
- Primary buttons
- Active navigation
- Headings
- Emphasis text
- Icons (primary)

### When to Use Rose Gold
- Accent elements
- Hover states
- Icons (secondary)
- Decorative elements
- Badges

### When to Use Cream
- Main background
- Button text (on pink)
- Hover backgrounds
- Light accents

### When to Use White
- Cards
- Form backgrounds
- Content containers
- Overlays

### When to Use Pink Soft/Blush
- Hover backgrounds
- Light accents
- Icon containers
- Subtle highlights

---

## 📱 Responsive Breakpoints

### Mobile First
```
Default:       < 768px
- 1 column layouts
- Compact spacing (px-4)
- Smaller typography
- Full-width elements
```

### Tablet
```
md: 768px - 1024px
- 2 column layouts
- Medium spacing (px-6)
- Medium typography
- Flexible elements
```

### Desktop
```
lg: 1024px+
- 3-4 column layouts
- Generous spacing (px-8)
- Large typography
- Optimized layouts
```

---

## ✅ Quality Checklist

### Colors
- [ ] Deep pink used for primary elements
- [ ] Rose gold used for accents
- [ ] Cream used for backgrounds
- [ ] White used for cards
- [ ] Proper contrast ratios (WCAG AA)

### Typography
- [ ] Serif used for headings
- [ ] Sans-serif used for body
- [ ] Light font weights used
- [ ] Proper font sizes
- [ ] Consistent line heights

### Spacing
- [ ] Generous white space
- [ ] Consistent padding
- [ ] Proper gaps between elements
- [ ] Responsive adjustments
- [ ] Breathing room maintained

### Shadows
- [ ] Soft shadows on cards
- [ ] Elevated shadows on hover
- [ ] Glow effects on accents
- [ ] Subtle, not heavy
- [ ] Consistent application

### Animations
- [ ] Smooth transitions (300ms)
- [ ] Fade-in on load
- [ ] Hover effects on interactive
- [ ] No jarring movements
- [ ] Performance optimized

### Responsiveness
- [ ] Mobile layout works
- [ ] Tablet layout works
- [ ] Desktop layout works
- [ ] Images scale properly
- [ ] Text is readable

### Accessibility
- [ ] Focus states visible
- [ ] Color contrast sufficient
- [ ] Semantic HTML used
- [ ] Labels on inputs
- [ ] Keyboard navigation works

---

## 🎓 Design Tips

### For Headings
- Use serif font (Cormorant Garamond)
- Use light weight (300)
- Use deep pink color
- Add tracking-tight for elegance
- Use italic for brand name

### For Body Text
- Use sans-serif font (Inter)
- Use light weight (300)
- Use muted-foreground color
- Use leading-relaxed for readability
- Keep line length reasonable

### For Buttons
- Use rounded-full for primary
- Use rounded-lg for secondary
- Use medium font weight
- Add hover effects
- Use consistent padding

### For Cards
- Use white background
- Use rounded-2xl corners
- Add soft shadow
- Add hover elevation
- Use consistent padding

### For Spacing
- Use multiples of 4px (Tailwind scale)
- Maintain consistent gaps
- Use generous margins
- Add breathing room
- Adjust for mobile

### For Hover Effects
- Change shadow (300ms)
- Change color (300ms)
- Scale image (700ms)
- Maintain consistency
- Keep subtle

---

## 📚 Resources

### Font Links
- Cormorant Garamond: https://fonts.google.com/specimen/Cormorant+Garamond
- Inter: https://fonts.google.com/specimen/Inter

### Color Tools
- Color Picker: https://htmlcolorcodes.com/
- Contrast Checker: https://webaim.org/resources/contrastchecker/
- Palette Generator: https://coolors.co/

### Design Tools
- Figma: https://www.figma.com/
- Adobe XD: https://www.adobe.com/products/xd.html
- Sketch: https://www.sketch.com/

---

## 🎯 Summary

This design system provides:
✓ Consistent color palette
✓ Unified typography
✓ Standardized spacing
✓ Reusable components
✓ Smooth animations
✓ Responsive layouts
✓ Accessibility compliance
✓ Premium aesthetic

Use this guide to maintain consistency across the Espace Parfum website and ensure a cohesive luxury brand experience.
