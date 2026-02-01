# Home Page & Additional Pages - Luxury Design Implementation

## Home Page (Index) Design

### Overall Structure
- **Background**: Cream color for premium feel
- **Components**: Hero → Trust Indicators → Categories → Brand Logos → Featured Products → Newsletter → Footer
- **Spacing**: Generous padding and margins throughout
- **Consistency**: All components follow the luxury aesthetic

### Key Features
✓ Gradient hero section with floating decorations
✓ Trust indicators with icons and descriptions
✓ Masonry grid categories with hover effects
✓ Brand logos section with grayscale-to-color transition
✓ Featured products with elegant cards
✓ Newsletter signup with gradient background
✓ Premium footer with rose gold accents

---

## Cart Page Design

### Empty Cart State
- **Icon**: Shopping bag in pink-blush container
- **Heading**: Large serif typography (5xl)
- **Message**: Light font weight, welcoming tone
- **CTA**: Cream button with pink text

### Cart Items Section
- **Layout**: 2-column grid (3-column on desktop)
- **Item Cards**:
  - White background with rounded corners (2xl)
  - Image placeholder (pink-blush)
  - Serif typography for product names
  - Quantity controls with pink-soft borders
  - Trash icon for removal
  - Hover elevation effects

### Order Summary
- **Position**: Sticky sidebar (top-28)
- **Background**: White with rounded corners
- **Content**:
  - Subtotal, shipping, tax breakdown
  - Total in serif typography
  - Primary button (pink-deep)
  - Secondary button (outlined)
- **Styling**: Soft shadows with hover effects

### Design Elements
- **Colors**: Cream background, white cards, pink accents
- **Typography**: Serif for amounts, sans-serif for labels
- **Spacing**: Generous padding (p-6 to p-8)
- **Transitions**: Smooth 300ms transitions on all interactions

---

## Account Page Design

### Sidebar Navigation
- **Position**: Sticky (top-28)
- **Layout**: Vertical tabs with icons
- **Styling**:
  - White background with rounded corners (2xl)
  - Icons with 18px size
  - Active state: pink-deep background with cream text
  - Hover state: pink-blush background
  - Logout button with border separator

### Profile Tab
- **Form Fields**:
  - Full Name, Email, Phone
  - Rounded-lg borders with pink-soft/40 color
  - Focus states with ring effect
  - Light font weight
  - Smooth transitions (300ms)
- **Save Button**: Pink-deep with hover effect

### Orders Tab
- **Order Cards**:
  - Rounded-lg borders with pink-soft/30
  - Order number and date
  - Amount and status
  - Hover shadow effect
- **Status**: Rose gold color for "Delivered"

### Addresses Tab
- **Address Cards**: Bordered containers with padding
- **Add Button**: Outlined style with hover effect

### Settings Tab
- **Toggles**: Checkboxes with accent color
- **Layout**: Vertical list with border separators
- **Styling**: Light font weight, muted colors

---

## Product Detail Page Design

### Header Section
- **Back Button**: Arrow icon with hover effect
- **Product Title**: Large serif typography (5xl)
- **Category**: Muted text with light font weight

### Product Images
- **Main Image**: 
  - Rounded corners (2xl)
  - Pink-blush background
  - Soft shadow
  - Large size (h-96 md:h-[500px])
- **Thumbnails**: 
  - 3 smaller images
  - Rounded corners (xl)
  - Hover shadow effect
  - Clickable for gallery

### Product Info Section
- **Rating**:
  - Star icons (rose-gold color)
  - Average rating in serif font
  - Review count
  - Border separator below
- **Stock Status**: Pink-blush background with border
- **Description**: Light font weight, leading-relaxed

### Purchase Type Selector
- **Radio Buttons**: Full Bottle vs Decants
- **Styling**: Clean, minimal design
- **Labels**: Medium font weight

### Full Bottle Section
- **Price Display**: Large serif typography (4xl)
- **Quantity Controls**:
  - Minus/Plus buttons with borders
  - Input field with focus ring
  - Smooth transitions
- **Add to Cart**: Full-width button with hover effect

### Decant Section
- **Info Box**: White background with padding
- **Decant Selector**: Custom component
- **Selected State**: Pink-blush background with confirmation

### Wishlist Button
- **Icon**: Heart icon (filled when wishlisted)
- **States**: 
  - Default: Outlined with border
  - Wishlisted: Pink-blush background
- **Smooth transitions**: 300ms

### Tabs Section
- **Description Tab**:
  - Product description
  - Specifications table
  - Border separators
- **Reviews Tab**:
  - Average rating display
  - Individual review cards
  - Star ratings
  - Author, text, date

### Related Products
- **Grid**: 4-column layout (responsive)
- **Cards**:
  - Image with hover zoom
  - Product name (serif, light)
  - Price (serif, light)
  - View Details button
  - Rounded corners (2xl)
  - Soft shadows with hover elevation

---

## Design System Consistency

### Colors Used
- **Primary**: Pink-deep (#8B3A4A)
- **Accent**: Rose-gold (#D4956F)
- **Background**: Cream (#FDFBF8)
- **Cards**: White (#FFFFFF)
- **Borders**: Pink-soft/30 to pink-soft/40
- **Text**: Muted-foreground for secondary text

### Typography
- **Headings**: Serif (Cormorant Garamond), light weight
- **Body**: Sans-serif (Inter), light weight
- **Sizes**:
  - Hero: 5xl-6xl
  - Section: 3xl-4xl
  - Subsection: xl-2xl
  - Body: base-lg

### Spacing
- **Padding**: p-4 to p-12 (depending on context)
- **Margins**: mb-4 to mb-12
- **Gaps**: gap-4 to gap-12
- **Sticky offsets**: top-28 (header height)

### Shadows
- **Soft**: shadow-soft (0 2px 20px rgba(0,0,0,0.03))
- **Elevated**: shadow-elevated (0 10px 40px rgba(0,0,0,0.08))
- **Glow**: shadow-glow (0 0 30px hsl(15 55% 65% / 0.2))

### Transitions
- **Duration**: 300ms for most interactions
- **Easing**: ease-out (default)
- **Properties**: colors, shadows, transforms

### Border Radius
- **Cards**: rounded-2xl (0.75rem)
- **Buttons**: rounded-lg (0.5rem) or rounded-full
- **Inputs**: rounded-lg (0.5rem)
- **Images**: rounded-2xl (0.75rem)

### Hover Effects
- **Cards**: Shadow elevation
- **Buttons**: Background color change
- **Images**: Scale zoom (110%)
- **Links**: Color transition

---

## Responsive Design

### Breakpoints
- **Mobile**: Default (< 768px)
- **Tablet**: md (768px - 1024px)
- **Desktop**: lg (1024px+)

### Layout Adjustments
- **Cart**: 1-column → 3-column
- **Account**: 1-column → 4-column (1 sidebar + 3 content)
- **Product Detail**: 1-column → 2-column
- **Related Products**: 1-column → 4-column

### Typography Scaling
- **Headings**: Smaller on mobile, larger on desktop
- **Spacing**: Reduced on mobile, generous on desktop
- **Padding**: Smaller on mobile (px-4), larger on desktop (px-8)

---

## Accessibility Features

✓ Proper contrast ratios for all text
✓ Focus states on all interactive elements
✓ Semantic HTML structure
✓ Icon labels and descriptive text
✓ Form labels associated with inputs
✓ Keyboard navigation support
✓ ARIA attributes where needed

---

## Performance Optimizations

✓ Lazy loading for images
✓ Optimized shadows (soft, not heavy)
✓ Smooth transitions (not jarring)
✓ Efficient grid layouts
✓ Minimal animations
✓ Clean CSS classes

---

## Summary

All pages now feature:
- Luxury, modern, minimalist aesthetic
- Consistent color palette and typography
- Generous white space and breathing room
- Smooth micro-interactions and transitions
- Premium feel without being heavy
- Full responsiveness across devices
- Accessibility compliance
- Professional, elegant design

The entire website now feels like a high-end Parisian perfume boutique with sophisticated elegance and contemporary minimalism.
