# Portfolio Jag - Workspace Rules

This document outlines the conventions, architectural constraints, and coding standards for developing the J.A.G. Portfolio website.

## 1. Architecture Constraints

The project is a static HTML, CSS, and JavaScript website.
- **No external frameworks or libraries** (e.g., React, Vue, TailwindCSS, Bootstrap) should be introduced for the UI. Everything must be implemented in Vanilla HTML, CSS, and JavaScript in the `index.html` and assets.
- **Single Page Application**: The core structure is a single-page interface centered around `index.html`.

## 2. Core Navigation Rules

The primary navigation uses a custom, performance-optimized JavaScript implementation within `index.html` / `js/main.js`.
- **Do not replace** or rewrite the core navigation script without a compelling reason and explicit approval.
- **Animation Classes**: Maintain the existing class structure (`.film-content`, `.active`, `.next`) for the navigation animations.

## 3. Priority-Based Media Loading System

To display high-quality visual assets (GIFs/videos) without degrading page load performance, we use a priority-based loading system:
- **Rule**: All new media elements (videos, GIFs, large images) MUST have a corresponding lightweight thumbnail.
- **Attributes**: The `data-src` (for full media) and `data-thumbnail` (for the thumbnail) attributes are **mandatory** on media elements.
- **Caching**: Utilize `thumbnailCache` and `fullImageCache` inside the JavaScript runtime to store loaded image objects.
- **Load Priority Levels**:
  1. **High Priority (Thumbnails)**: Load all thumbnails immediately on DOMContentLoaded.
  2. **Medium Priority (Visible Images)**: Load the active full-size image/media immediately after thumbnails finish.
  3. **Low Priority (Background Images)**: Load remaining full-size images in the background one-by-one with a small delay (e.g., 100ms) between loads to avoid overwhelming the connection.

## 4. Code Style & Standards

### HTML
- Use strict semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`).
- Ensure all interactive elements have unique, descriptive `id` attributes (e.g., for testing and accessibility).

### CSS
- Use Vanilla CSS for styling (defined in `css/style.css`).
- Use descriptive, hyphenated, BEM-like class naming conventions (e.g., `.film-content__media`, `.navigation-btn--next`).
- Use `rem` units for responsive typography and layout spacing to support browser zoom/accessibility.
- Maintain consistent branding by using the project's custom fonts (`PerfectlySplendid` and `HelveticaNeueLight`).

### JavaScript
- Follow modern ES6+ conventions.
- Write clean, modular, and well-documented code. Add detailed comments for any complex, asynchronous, or performance-sensitive logic.

## 5. Workflow & Development Guidelines

- **No Placeholders**: Never use placeholder images. Use `generate_image` or existing assets in `/videos` / `/images` directories.
- **Milestones & Git**: Commit changes when reaching important development points (no bugs, deliverable complete) to ensure strong version control.
