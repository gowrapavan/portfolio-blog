export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
  tags?: string[];
  logo?: string;
  logoLink?: string; // New property for explicit logo routing
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Goal4u — Football Analytics",
    category: "Full Stack / Data",
    description: "A React-based sports analytics platform displaying live scores and match stats. Replaced traditional backend with automated GitHub Actions for periodic JSON data fetching, significantly reducing API costs.",
    tech: ["React", "Tailwind", "Python", "GitHub Actions"],
    link: "https://goal4u.netlify.app",
    github: "https://github.com/gowrapavan",
    logo: "https://goal4u.netlify.app/assets/img/site-logo/bg-white.png",
    logoLink: "/goal4u" // Internal route for logo click
  },
  {
    id: 2,
    title: "AniPop — SEO Content Platform",
    category: "Frontend / SEO",
    description: "SEO-first platform designed to grow organic traffic. Currently generating ~35+ organic clicks/month through optimized architecture, sitemaps, and dynamic content rendering.",
    tech: ["React", "Vite", "SEO Strategies", "Tailwind"],
    link: "https://anipop.netlify.app",
    github: "https://github.com/gowrapavan",
    logo: "https://anipop.netlify.app/img/logo.png",
    logoLink: "https://anipop.netlify.app" // External fallback if no internal route exists
  },
  {
    id: 3,
    title: "ZiloPlay — Movie Discovery",
    category: "Frontend / API",
    description: "Movie discovery application integrating TMDb API with embedded IMDb trailers. Features a responsive, clean UI and is fully indexed by Google for high performance.",
    tech: ["React", "REST API", "Tailwind", "Git"],
    link: "https://ziloplay.netlify.app",
    github: "https://github.com/gowrapavan",
    logo: "https://raw.githubusercontent.com/gowrapavan/ziloplay/main/public/logo.png",
    logoLink: "/ziloplay" // Internal route for logo click
  },
  {
    id: 4,
    title: "Serverless API Caching System",
    category: "Backend / Automation",
    description: "Designed a Python-based serverless solution to overcome third-party API rate limits. Fetches data once per period and stores it locally as JSON to serve multiple frontend projects.",
    tech: ["Python", "JSON Pipelines", "GitHub Actions"],
    github: "https://github.com/gowrapavan/shortsdata",
    logo: "https://media.licdn.com/dms/image/v2/C4D12AQHgB0F63IjJeQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1568663838574?e=2147483647&v=beta&t=5qjISqnjqyTpZ_BPkEpoXoeZU4MBu6CnM2rt0ARh1ak",
    logoLink: "https://github.com/gowrapavan/shortsdata"
  },
  {
    id: 5,
    title: "Hand Gesture Recognition",
    category: "AI / Computer Vision",
    description: "Real-time AI computer vision project using YOLOv5 and OpenCV to detect hand gestures. Demonstrates integration of Machine Learning models with practical interfaces.",
    tech: ["Python", "YOLOv5", "OpenCV", "PyTorch"],
    github: "https://github.com/gowrapavan",
    logo: "https://www.electronics-engineering.com/wp-content/uploads/2024/06/3hql0qh3b7.png",
    logoLink: "https://github.com/gowrapavan"
  },
  {
    id: 6,
    title: "PNP (Pachadlu & Pindivantalu)",
    category: "Full Stack / E-Commerce",
    description: "A production-grade e-commerce platform capturing authentic Andhra heritage. Built in collaboration with Ch.Mohith Sankar. Features a 3-tier RBAC architecture for customers, admins, and delivery staff.",
    tech: ["Next.js 16", "Supabase", "Zustand", "Tailwind"],
    link: "https://pnppickles.netlify.app/", 
    github: "https://github.com/gowrapavan/pnp", 
    logo: "https://pnppickles.netlify.app/pnp.png",
    logoLink: "https://pnppickles.netlify.app/"
  }
];