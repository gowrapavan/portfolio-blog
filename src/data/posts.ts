export interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  content: string; // Markdown-ready
  image: string;
  tags: string[];
  readTime: string;
}

export const posts: Post[] = [
  {
    id: "seo-react-optimization",
    title: "How I Optimized React for SEO (AniPop)",
    excerpt: "Strategies for dynamic rendering, meta-tags, and indexing SPAs.",
    date: "Nov 15, 2025",
    readTime: "5 min read",
    image: "https://www.bluefrogdm.com/hubfs/Imported_Blog_Media/Google-SEO-3.jpg",
    tags: ["React", "SEO", "Performance"],
    content: `
Single Page Applications (SPAs) like React apps face SEO challenges because content is rendered client-side. Without proper handling, Google crawlers often see an empty page.

## Implementing React Helmet

I used **React Helmet** to dynamically manage document head per route. This allowed updating the title, description, and canonical tags.

## Structured Data (JSON-LD)

I added **JSON-LD** scripts for 'Article' schema, helping search engines understand page content and improve rich snippets.

## Performance Optimization

Images were converted to WebP, lazy loading implemented, and core web vitals monitored to boost SEO ranking.
`
  },
  {
    id: "serverless-caching",
    title: "Reducing API Costs with GitHub Actions",
    excerpt: "How I automated serverless caching for Goal4u to bypass API limits.",
    date: "Jun 20, 2025",
    readTime: "4 min read",
    image: "https://www.winwire.com/wp-content/uploads/2024/10/Github-Actions.webp",
    tags: ["Python", "Automation", "GitHub"],
    content: `
The sports API for Goal4u had strict rate limits. To optimize requests, I implemented **serverless caching** with Python scripts triggered via GitHub Actions.

## Workflow

- Python script fetches API data hourly (CRON job)
- Data is stored in JSON format
- Frontend fetches cached data, reducing API calls

This approach improved speed and reduced server dependency.
`
  },
  {
    id: "goal4u-analytics",
    title: "Building a Football Analytics Platform (Goal4u)",
    excerpt: "React-based sports analytics app with real-time data and responsive design.",
    date: "Dec 10, 2024",
    readTime: "6 min read",
    image: "/goal4u-home.png",
    tags: ["React", "Tailwind", "Data"],
    content: `
Goal4u visualizes football stats with **React** and **Tailwind CSS**.

## Real-Time Data Handling

- Separated Live vs Historical data
- Custom hook \`useMatchData\` with exponential backoff

## Mobile-First UI

- Multi-column dashboard on desktop
- Stacked swipeable cards on mobile
`
  },
  {
    id: "ziloplay-movie-api",
    title: "Dynamic Movie Discovery with React (ZiloPlay)",
    excerpt: "Movie discovery app leveraging TMDB API and smooth UI transitions.",
    date: "Oct 05, 2025",
    readTime: "3 min read",
    image: "/ziloplay-home.png",
    tags: ["React", "API", "UI/UX"],
    content: `
ZiloPlay is a movie discovery app using TMDB API. It provides a Netflix-like browsing experience.

## Navigation & State

- React Router v6 for routing
- Scroll restoration with session storage

## Image Optimization

- Custom Image component with low-res placeholder
- Prevents layout shifts (CLS)
`
  },
  {
    id: "ai-automation-workflows",
    title: "Automating Web Tasks with AI and Python",
    excerpt: "Using Python scripts + AI for repetitive workflow automation.",
    date: "May 12, 2025",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop",
    tags: ["Python", "AI", "Automation"],
    content: `
I automated blog summaries and data scraping using Python + AI.

## LLM Summaries

- Script sends project README to LLM API
- Generates concise summaries
- Updates portfolio data automatically

## Web Scraping

- Collected agricultural data
- Parsed tables with BeautifulSoup and Selenium
- Stored clean CSV
`
  },
  {
    id: "seo-strategies-for-content",
    title: "Boosting Organic Traffic with SEO-First Design",
    excerpt: "Designing AniPop with SEO-first structure and sitemaps.",
    date: "Aug 01, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2074&auto=format&fit=crop",
    tags: ["SEO", "Design", "Growth"],
    content: `
SEO-first design improves indexing and traffic.

## Semantic HTML

- Single H1 per page
- Nested H2/H3
- Use of <article>, <section>, <aside>

## Dynamic Sitemap

- Generated sitemap.xml post-build
- Iterates through all dynamic routes
`
  },
  {
    id: "react-typescript-best-practices",
    title: "React + TypeScript Best Practices",
    excerpt: "Type safety and state management tips for React projects.",
    date: "Nov 20, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2031&auto=format&fit=crop",
    tags: ["TypeScript", "React", "Code Quality"],
    content: `
Switching to TypeScript improved productivity and reduced runtime errors.

## Strict Prop Typing

- Use explicit interfaces
- Avoid 'any'
- Compile-time safety

## Union Types for State

- Status = 'idle' | 'loading' | 'success' | 'error'
- Prevents impossible states
`
  },
  {
    id: "serverless-api-design",
    title: "Designing Serverless APIs for Portfolio Projects",
    excerpt: "Python serverless endpoints for Goal4u with stateless architecture.",
    date: "Mar 05, 2025",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
    tags: ["Serverless", "Python", "API"],
    content: `
Serverless endpoints reduce cost and maintenance.

## Python Functions

- Run only on request
- Combine multiple API data sources

## Stateless Design

- Each request self-contained
- Uses proper HTTP methods and status codes
`
  },
  {
    id: "yolov5-hand-gesture",
    title: "Real-Time Hand Gesture Detection with YOLOv5",
    excerpt: "AI CV project detecting hand gestures via webcam feed.",
    date: "Feb 25, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1932&auto=format&fit=crop",
    tags: ["AI", "Computer Vision", "Python"],
    content: `
Trained YOLOv5 to detect 'Thumbs Up', 'Peace', 'Stop' gestures.

## Data Collection

- Recorded videos
- Extracted frames
- Annotated with LabelImg

## Model Training

- PyTorch transfer learning
- Pre-trained YOLOv5s fine-tuned
`
  },
  {
    id: "portfolio-optimization",
    title: "Building a Remote-Ready Portfolio with React & Tailwind",
    excerpt: "Component-based React + Tailwind portfolio designed for recruiters.",
    date: "Aug 10, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2055&auto=format&fit=crop",
    tags: ["React", "Portfolio", "Career"],
    content: `
Portfolio as a product showcasing skills in React, Tailwind, and SEO.

## Component Architecture

- Hero, Skills, Projects as separate components
- Consistent design with Tailwind

## Accessibility

- Alt text for images
- Keyboard navigable
- Proper color contrast
`
  },
  {
    id: "pnp-ecommerce-architecture",
    title: "Engineering PNP: A Production-Grade Next.js E-Commerce Platform",
    excerpt: "How my friend Mohith and I built a highly scalable, full-stack web application with a 3-tier RBAC system using Next.js 16 and Supabase.",
    date: "Apr 02, 2026",
    readTime: "8 min read",
    image: "/pnp.png",
    tags: ["Next.js", "Supabase", "E-Commerce", "Architecture"],
    content: `
PNP (Pachadlu & Pindivantalu) has evolved from a basic Next.js app into a production-grade, full-stack e-commerce platform. Built in collaboration with my friend **Ch.Mohith Sankar**, this project perfectly captures authentic Andhra heritage while running on a highly scalable, modern web architecture.

Here is a breakdown of how we engineered the platform.

## 1. The Core Technology Stack

We utilized the cutting edge of modern web development:
* **Framework:** Next.js 16 (App Router) for Server-Side Rendering (SSR) and blistering fast performance.
* **Styling:** Tailwind CSS, utilizing a custom "Heritage Palette" (Deep Reds, Oranges, and warm Beige) to create a premium aesthetic.
* **Database & Auth:** Supabase (PostgreSQL), handling secure user authentication, product catalogs, and order management.
* **State Management:** Zustand, providing a lightweight, lightning-fast global state for the shopping cart.
* **Hosting:** Netlify with automated CI/CD linked directly to our GitHub.

## 2. The 3-Tier Architecture

We engineered a secure, role-based access control (RBAC) system. When a user logs in, Supabase checks their role and routes them to an entirely different experience:
* **Customers:** Directed to the main storefront to browse and shop.
* **Super Admins:** Directed to the secure \`/dashboard\` to manage the business.
* **Delivery Staff:** Directed to a specialized \`/queue\` to handle local dispatch.

## 3. The Customer Experience (Frontend)

The public-facing site is optimized for conversion and mobile responsiveness. We built a custom, wide-format Login/Register page that prevents annoying desktop scrolling, featuring live form validation.

**Dynamic Product Pages:**
* Interactive variant selectors (250g, 500g, 1kg) that dynamically recalculate discounted prices.
* A storytelling UI with tabbed sections for Story, Ingredients, and Reviews.
* A frictionless cart managed via Zustand, allowing users to add/remove items instantly without waiting for database loads.

## 4. The Admin Engine (Backend Dashboard)

Instead of relying on a third-party tool like Shopify, we built a custom CRM/Inventory manager protected from the public. 
* **Inventory Vault:** Tracks stock levels, pricing, and product details.
* **Orders Hub:** Manages incoming orders and fulfillments.
* **User Management:** Tracks customer data and assigns secure roles.

## 5. Production Readiness & SEO

We didn't just write code; we prepared the site for the real world. Every single product has its own server-generated OpenGraph (OG) metadata. When shared on WhatsApp or Twitter, it renders a beautiful preview card with the exact product image, title, and price. 

We also built a dynamic \`sitemap.ts\` that automatically updates when we add new products, and a \`robots.ts\` file that acts as a firewall to keep Google out of our private admin pages.
    `
  }
];
