import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CONFIGURATION ---
// Replace this with your actual deployed domain
const BASE_URL = 'https://gowrapavan.com'; 

// 1. Static Routes (Matching your App.tsx)
const staticRoutes = [
  '/',
  '/projects',
  '/posts',
  '/ziloplay',
  '/goal4u',
  '/logs'
];

// 2. Dynamic Routes (Your Blog Posts)
// Note: If you have dozens of posts, you would ideally import your `posts.ts` 
// data here and map over the IDs. For a handful of posts, manual entry is fine.
const dynamicRoutes = [
  // Example: '/posts/my-first-post',
  // Example: '/posts/react-performance-guide',
];

const allRoutes = [...staticRoutes, ...dynamicRoutes];

// 3. Build the XML String
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map((route) => {
    // Give the homepage a slightly higher priority
    const priority = route === '/' ? '1.0' : '0.8';
    return `  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

// 4. Write to the public folder
const publicDir = path.join(__dirname, 'public');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
console.log('✅ sitemap.xml generated successfully in /public');