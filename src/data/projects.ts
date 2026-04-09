export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
  tags?: string[];
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
  },
  {
    id: 2,
    title: "AniPop — SEO Content Platform",
    category: "Frontend / SEO",
    description: "SEO-first platform designed to grow organic traffic. Currently generating ~35+ organic clicks/month through optimized architecture, sitemaps, and dynamic content rendering.",
    tech: ["React", "Vite", "SEO Strategies", "Tailwind"],
    link: "https://anipop.netlify.app",
    github: "https://github.com/gowrapavan",
  },
  {
    id: 3,
    title: "ZiloPlay — Movie Discovery",
    category: "Frontend / API",
    description: "Movie discovery application integrating TMDb API with embedded IMDb trailers. Features a responsive, clean UI and is fully indexed by Google for high performance.",
    tech: ["React", "REST API", "Tailwind", "Git"],
    link: "https://ziloplay.netlify.app",
    github: "https://github.com/gowrapavan",
  },
  {
    id: 4,
    title: "Serverless API Caching System",
    category: "Backend / Automation",
    description: "Designed a Python-based serverless solution to overcome third-party API rate limits. Fetches data once per period and stores it locally as JSON to serve multiple frontend projects.",
    tech: ["Python", "JSON Pipelines", "GitHub Actions"],
    github: "https://github.com/gowrapavan/shortsdata",
  },
  {
    id: 5,
    title: "Hand Gesture Recognition",
    category: "AI / Computer Vision",
    description: "Real-time AI computer vision project using YOLOv5 and OpenCV to detect hand gestures. Demonstrates integration of Machine Learning models with practical interfaces.",
    tech: ["Python", "YOLOv5", "OpenCV", "PyTorch"],
    github: "https://github.com/gowrapavan",
  },
  {
    id: 6,
    title: "PNP (Pachadlu & Pindivantalu)",
    category: "Full Stack / E-Commerce",
    description: "A production-grade e-commerce platform capturing authentic Andhra heritage. Built in collaboration with Ch.Mohith Sankar. Features a 3-tier RBAC architecture for customers, admins, and delivery staff.",
    tech: ["Next.js 16", "Supabase", "Zustand", "Tailwind"],
    link: "https://pnppickles.netlify.app/", // <-- Update this if you have a live link
    github: "https://github.com/gowrapavan/pnp", // <-- Update this with the repo link
  }
];