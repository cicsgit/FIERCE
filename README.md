# FIERCE Website

A modern, responsive website for the FIERCE (Fostering Inclusion by Engaging in Real-World Computing Education) program - an inclusive Residential RAP for incoming computer science and informatics majors.

## 🌟 Features

- **Multi-page Architecture**: Separate HTML pages for Home, Programming, and Contact
- **Responsive Design**: Mobile-first approach with flexible layouts
- **Smooth Animations**: Apple-style load-in effects triggered by scroll
- **Dynamic Navigation**: Active page highlighting with animated underlines
- **Team Showcase**: Interactive team member cards with role hierarchy
- **Modern UI**: Clean, professional design with consistent styling

## 📁 Project Structure

```
FIERCE/
├── index.html          # Home page with all main sections
├── programming.html    # Programming page
├── contact.html        # Contact page
├── styles.css          # Global styles and responsive design
├── script.js           # JavaScript functionality and animations
└── README.md           # This file
```

## 🏗️ Website Architecture

### Pages Overview

#### **Home Page (`index.html`)**
The main landing page containing all core sections:

- **Hero Section**: Full-height banner with call-to-action
- **Mission & History**: Combined section explaining FIERCE's purpose and background
- **Our Team**: 9 team members in organized rows (5 top, 4 bottom)
- **Requirements**: Program prerequisites and expectations
- **Logistics**: Practical information about the program
- **FAQs**: Frequently asked questions

#### **Programming Page (`programming.html`)**
Dedicated page for programming-related content and resources.

#### **Contact Page (`contact.html`)**
Contact information and communication channels.

### Team Section Structure

The team section features a unique layout:

- **Top Row**: 5 team members with horizontal scrolling if needed
- **Bottom Row**: 4 team members centered
- **Member Cards**: Each contains:
  - Role (above image)
  - Profile image (160px circle with border)
  - Name (below image)
  - Class year (below name)

## 🎨 Design System

### Color Palette
- **Primary Brand**: Blue gradient (`--brand`, `--brand-2`)
- **Background**: Light theme with alternating sections
- **Text**: High contrast for accessibility
- **Borders**: Subtle gray for visual separation

### Typography
- **Headings**: Bold, hierarchical sizing
- **Body Text**: Clean, readable fonts
- **Team Info**: Structured with role, name, and class year

### Layout Principles
- **Mobile-First**: Responsive design starting from mobile
- **Content-Sized Sections**: Sections adapt to content height (except hero)
- **Consistent Spacing**: 80px vertical padding, 20px horizontal
- **Centered Content**: Maximum width containers with auto margins

## ⚡ Interactive Features

### Navigation
- **Active Page Highlighting**: Current page underlined with animated effect
- **Smooth Scrolling**: Seamless navigation between sections
- **Hover Effects**: Color changes on navigation links

### Animations
- **Scroll-Triggered**: Content fades in when 50% of section is visible
- **Apple-Style Easing**: Smooth, natural animation curves
- **Staggered Delays**: Sequential animation of cards and list items
- **One-Time Play**: Animations trigger only once per section

### Team Section
- **Horizontal Scrolling**: Top row maintains 5 members in one row
- **Responsive Grid**: Bottom row adapts to screen size
- **Image Optimization**: Random placeholder images with consistent sizing

## 🛠️ Technical Implementation

### CSS Architecture
- **CSS Custom Properties**: Centralized color and spacing variables
- **Flexbox & Grid**: Modern layout techniques
- **Media Queries**: Responsive breakpoints
- **Pseudo-elements**: Animated underlines and decorative elements

### JavaScript Functionality
- **Intersection Observer**: Efficient scroll-based animations
- **Active Link Detection**: URL-based navigation highlighting
- **Event Listeners**: Page load and scroll event handling

### Performance Optimizations
- **Efficient Animations**: CSS transforms and opacity changes
- **Minimal JavaScript**: Lightweight, focused functionality
- **Optimized Images**: Placeholder service for consistent loading

## 🚀 Getting Started

### Local Development
1. Clone or download the project files
2. Start a local server:
   ```bash
   python3 -m http.server 5173 --bind 127.0.0.1
   ```
3. Open `http://127.0.0.1:5173` in your browser

### File Structure Details

#### `index.html`
- Main page with complete website content
- Semantic HTML structure with proper headings
- Accessible navigation and content organization

#### `styles.css`
- Global styles and CSS custom properties
- Responsive design with mobile-first approach
- Animation definitions and hover effects
- Team section specific styling

#### `script.js`
- Navigation highlighting logic
- Scroll-triggered animation system
- Intersection Observer implementation
- Page load event handling

## 📱 Responsive Design

### Breakpoints
- **Mobile**: Default styles (320px+)
- **Tablet**: Medium screens (768px+)
- **Desktop**: Large screens (1024px+)

### Mobile Optimizations
- Touch-friendly navigation
- Readable text sizes
- Optimized team member layout
- Smooth scrolling performance

## 🎯 Accessibility Features

- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG compliant color combinations
- **Screen Reader Support**: Descriptive alt text and labels

## 🔧 Customization

### Adding Team Members
1. Copy existing team member structure
2. Update image source with new random seed
3. Modify role, name, and class year
4. Maintain consistent HTML structure

### Styling Modifications
- Update CSS custom properties for color changes
- Modify spacing variables for layout adjustments
- Add new animation classes as needed

### Content Updates
- Edit HTML content directly in respective files
- Maintain consistent class names for styling
- Update navigation links if adding new pages

## 📄 License

This project is created for the FIERCE program. All rights reserved.

---

**FIERCE** - Fostering Inclusion by Engaging in Real-World Computing Education
