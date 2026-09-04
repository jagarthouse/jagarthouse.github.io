# Search and LLM SEO

This site is a single-page portfolio for Jag 'Arthouse' Manalang. The optimization layer gives search engines and AI systems the same clear, factual description of his identity, locations, capabilities, work, and contact links.

## Current implementation

### 1. Page and social metadata

The `<head>` in [`index.html`](../index.html) includes:

- A concise title focused on the name, Bay Area, Los Angeles, and cinematography.
- A current meta description covering atmospheric films, music videos, commercials, and documentaries.
- Author, robots, theme-color, canonical, and `rel="me"` identity links.
- Open Graph and Twitter metadata with an accessible image description.

### 2. Person and page identity schema

The JSON-LD graph in [`index.html`](../index.html) identifies:

- Jag 'Arthouse' Manalang, Jag Manalang, and Jag Art House as the same person/brand context.
- IMDb, Instagram, and YouTube profiles through `sameAs`.
- Bay Area and Los Angeles work locations.
- Cinematography, camera operation, 1st AC, drone piloting, lighting, and the listed camera systems through `knowsAbout`.
- The homepage as a `WebPage` about the Person entity, with its primary portfolio image.

Structured data is kept aligned with visible page content. Google recommends JSON-LD and requires structured data to represent the content users can see; validate changes with the [Rich Results Test](https://search.google.com/test/rich-results) and the [Schema Markup Validator](https://validator.schema.org/).

### 3. Portfolio context

Each project is represented in the JSON-LD graph as a `CreativeWork` with a title, genre, year, description, creator, and crawlable thumbnail. The JavaScript film catalog in [`js/main.js`](../js/main.js) remains the source for the interactive portfolio.

The no-JavaScript fallback in [`index.html`](../index.html) exposes the filmmaker profile, capabilities, gear, IMDb link, and film directory as ordinary HTML text and links.

### 4. LLM-readable summary

[`llms.txt`](../llms.txt) provides a concise, human-readable reference for AI systems. It summarizes the person, locations, roles, gear, portfolio history, contact links, and filmography without adding claims that are not present on the site.

This is an additional discovery aid, not a guaranteed ranking or answer mechanism. The visible site, canonical metadata, and structured data remain the primary sources of truth.

### 5. Crawl and URL signals

- [`robots.txt`](../robots.txt) permits public crawling and points to the sitemap.
- [`sitemap.xml`](../sitemap.xml) lists only the canonical homepage, because the portfolio views are hash-based sections rather than separate crawlable pages.
- The homepage `lastmod` date should change only after a significant content, metadata, or structured-data update.

## Maintenance checklist

When adding or changing a project:

1. Update the film object in [`js/main.js`](../js/main.js), including `title`, `thumbnail`, `src`, `year`, `genre`, and `description`.
2. Update the matching `CreativeWork` in the JSON-LD graph in [`index.html`](../index.html).
3. Update the no-JavaScript film list in [`index.html`](../index.html).
4. Add or remove the asset with exact filename casing; GitHub Pages is case-sensitive even when local macOS development is not.
5. Update [`llms.txt`](../llms.txt) when the person profile, capabilities, links, or filmography changes.
6. Update the homepage `<lastmod>` in [`sitemap.xml`](../sitemap.xml) for significant changes.

For identity changes, update the visible About Me copy, the Person JSON-LD, `rel="me"` links, `sameAs`, and `llms.txt` together. Keep descriptions specific, factual, and consistent across all four surfaces.

## Deployment and monitoring

After deployment, verify:

- The canonical homepage returns successfully over HTTPS.
- Metadata and JSON-LD are present in the served HTML, not only in local files.
- Every structured-data image URL and portfolio thumbnail returns successfully.
- IMDb, Instagram, YouTube, and contact navigation resolve.
- The sitemap contains no deleted or redirected pages.

Search engines may take days or weeks to recrawl and reprocess updated titles and structured data. Use Search Console URL Inspection to request a crawl after a major update.
