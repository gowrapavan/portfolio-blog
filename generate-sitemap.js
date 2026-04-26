import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CONFIGURATION ---
// Removed the trailing slash to prevent double slashes (//) in the final URLs
const BASE_URL = 'https://gowrapavan.netlify.app'; 

// 1. Static Routes (From App.tsx)
const staticRoutes = [
  '/',
  '/projects',
  '/posts',
  '/ziloplay',
  '/goal4u',
  '/logs'
];

// 2. Automatically generate Dynamic Routes for Blog Posts
const dynamicRoutes = [];
const postsFilePath = path.join(__dirname, 'src', 'data', 'posts.ts');

if (fs.existsSync(postsFilePath)) {
  // Read the posts.ts file as plain text
  const postsContent = fs.readFileSync(postsFilePath, 'utf-8');
  
  // Use regex to find all instances of `id: 'some-post-id'` or `id: "some-post-id"`
  const idRegex = /id:\s*['"]([^'"]+)['"]/g;
  let match;
  
  while ((match = idRegex.exec(postsContent)) !== null) {
    const postId = match[1];
    dynamicRoutes.push(`/posts/${postId}`);
  }
  console.log(`✅ Found ${dynamicRoutes.length} dynamic posts.`);
} else {
  console.warn('⚠️ Could not find src/data/posts.ts to generate dynamic routes.');
}

const allRoutes = [...staticRoutes, ...dynamicRoutes];

// 3. Build the XML String
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map((route) => {
    // Give the homepage the highest priority
    const priority = route === '/' ? '1.0' : route.startsWith('/posts/') ? '0.6' : '0.8';
    
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

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
console.log(`✅ sitemap.xml generated successfully in /public with ${allRoutes.length} total routes.`);