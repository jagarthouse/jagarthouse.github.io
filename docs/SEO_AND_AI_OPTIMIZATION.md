# Search & AI Engine Optimization Documentation

This document explains the search engine optimization (SEO) and generative engine optimization (GEO) changes implemented to expand the digital outreach of the Jag Art House portfolio. It details the technical changes and provides a maintenance guide for adding future content.

---

## 1. Overview of Optimizations

Visual portfolios (especially single-page, JavaScript-driven applications) present challenges for search crawlers and AI search tools (like Gemini, ChatGPT Search, Claude, and Perplexity). AI tools rely heavily on structured text to answer qualitative questions like *"What films has Jag Manalang directed?"* or *"What is the style of the film DIASPORA?"*.

To maximize outreach, we implemented a multi-layered optimization strategy:
1. **Search Indexing**: Created a dynamic sitemap.
2. **Structured Metadata (Schema)**: Provided rich context about each project to AI knowledge bases.
3. **Bot Scraper Fallbacks**: Exposed all film data in static HTML.
4. **Accessibility & Visual Search**: Linked dynamic image alt attributes to the active slide.

---

## 2. Technical Implementations

### A. XML Sitemap (`sitemap.xml`)
We added a [sitemap.xml](file:///Users/kennethross/dev/portfolio_jag/sitemap.xml) to the project root, mapping the priority of the portfolio pages:
- **Homepage (`/`)**: Set to priority `1.0` (crawled monthly).
- **Business Card (`/business-card.html`)**: Set to priority `0.6` (crawled yearly).

This resolved the broken sitemap reference in the `robots.txt` file.

### B. Structured Data Schema (`index.html`)
The JSON-LD metadata block inside the `<head>` of [index.html](file:///Users/kennethross/dev/portfolio_jag/index.html) was upgraded. Each film is declared as a `CreativeWork` containing:
- `genre`: Specific category (e.g. *Short Film*, *Music Video*, *Commercial / Narrative*).
- `datePublished`: The year the piece was released.
- `description`: A brief summary of the film's artistic focus.

AI crawlers read this block directly to understand details about Jag Manalang's filmography.

### C. Static Fallback List (`index.html`)
Simple scrapers that do not run JavaScript would see an empty slideshow on the main site. To resolve this, we embedded a `<noscript>` container directly under the `<main>` tag containing a semantic list (`<ul>`) of all films:
```html
<noscript>
    <section class="noscript-section">
        <h2>Films Portfolio Directory</h2>
        <ul>
            <li><strong>DIASPORA (Short Film, 2026)</strong> - An atmospheric short film exploring displacement...</li>
            ...
        </ul>
    </section>
</noscript>
```
*Note: This section remains visually hidden to regular users with Javascript enabled, but is fully visible to bot scrapers.*

### D. Dynamic Alt Attribute Updates (`js/main.js`)
Previously, the primary slideshow poster image (`#film-poster`) had a static `alt="loading.."` tag. We updated the slideshow rendering in [js/main.js](file:///Users/kennethross/dev/portfolio_jag/js/main.js) to dynamically change the image's `alt` attribute during slide changes:
```javascript
posterElement.alt = `Film poster for ${films[index].title.trim()} by film director Jag Manalang`;
```
This enables search engines (like Google Image Search) to index the portfolio's visual stills correctly under their respective film titles.

### E. Dynamic Catalog Grid Years (`js/main.js`)
We changed the hardcoded year (`2026`) in the "All Films" card grid. It now dynamically reads the publication year from the `films` metadata array:
```javascript
<span class="film-card-year">${film.year || '2026'}</span>
```

---

## 3. How to Maintain and Add New Content

When adding a new project or updating an existing film, you must add it in **three places** to maintain complete SEO and AI crawl parity:

### Step 1: Update the JavaScript Database
Open [js/main.js](file:///Users/kennethross/dev/portfolio_jag/js/main.js) and add the new film object to the `films` array with `year`, `genre`, and `description` properties:
```javascript
{
    title: 'NEW PROJECT NAME',
    thumbnail: 'videos/your_thumbnail_thumb.webp',
    src: 'videos/your_full_media.webp',
    year: '2026',
    genre: 'Short Film / Narrative',
    description: 'A brief 1-2 sentence description of the project detailing style, story, or composition.'
}
```

### Step 2: Update the JSON-LD Schema
Open [index.html](file:///Users/kennethross/dev/portfolio_jag/index.html), locate the `<script type="application/ld+json">` tag, and add a new item to the `@graph` array:
```json
{
  "@type": "CreativeWork",
  "name": "NEW PROJECT NAME",
  "creator": {
    "@id": "https://jagarthouse.com/#person"
  },
  "genre": "Short Film / Narrative",
  "datePublished": "2026",
  "description": "A brief 1-2 sentence description of the project detailing style, story, or composition.",
  "thumbnailUrl": "https://jagarthouse.com/videos/your_thumbnail_thumb.webp"
}
```

### Step 3: Update the Noscript Fallback List
Open [index.html](file:///Users/kennethross/dev/portfolio_jag/index.html), find the `<noscript>` tag, and append a list item inside the `<ul>` block:
```html
<li><strong>NEW PROJECT NAME (Short Film / Narrative, 2026)</strong> - A brief 1-2 sentence description of the project detailing style, story, or composition.</li>
```
