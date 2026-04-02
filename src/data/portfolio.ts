export const contact = {
  name: "Gowra Pavan Kumar",
  title: "Frontend Developer & B.Tech Graduate",
  email: "gowrapavankumar2004@gmail.com",
  phone: "+91-9642027908",
  location: "Guntur, India",
  links: {
    github: "https://github.com/gowrapavan",
    linkedin: "#", // Add your LinkedIn URL
    portfolio: "https://gowra.netlify.app",
    goal4u: "https://goal4u.netlify.app",
    ziloplay: "https://ziloplay.netlify.app",
    anipop: "https://anipop.netlify.app"
  }
};

export const skills = {
  frontend: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript (ES6+)"],
  backend: ["Python", "Serverless Workflows", "JSON Handling", "REST APIs"],
  tools: ["Git", "GitHub Actions", "Netlify", "Vercel", "Postman"],
  concepts: ["SDLC", "Component Architecture", "Performance Optimization", "Caching Strategies"]
};

export const projects = [
  {
    id: 1,
    title: "Football Analytics Platform (Goal4u)",
    date: "Jan 2025 - Present",
    description: "A responsive platform displaying live scores, fixtures, and match stats. Replaced a traditional backend with automated GitHub Actions for periodic JSON data fetching and caching, significantly reducing API costs.",
    tech: ["React", "Football API", "GitHub Actions", "Caching Strategies"],
    link: contact.links.goal4u,
    github: contact.links.github,
  },
  {
    id: 2,
    title: "Serverless API Optimization System",
    date: "Sep 2025",
    description: "Designed a Python-based serverless solution to overcome third-party API rate limits. Implemented scheduled calls to fetch data once and store it locally as JSON, improving response speed and reliability during high traffic.",
    tech: ["Python", "Serverless", "JSON", "API Optimization"],
    link: "#", // Add specific link if available
    github: contact.links.github,
  },
  {
    id: 3,
    title: "ZiloPlay – Movie Streaming UI",
    date: "Sep 2025 - Nov 2025",
    description: "Developed a React-based streaming UI integrating TMDb API with embedded IMDb trailers. Focused on reusable components and a fully responsive layout optimized for multiple screen sizes.",
    tech: ["React.js", "TMDb API", "CSS Modules", "Git"],
    link: contact.links.ziloplay,
    github: contact.links.github,
  },
  {
    id: 4,
    title: "Hand Gesture Recognition System",
    date: "Nov 2024 - Apr 2025",
    description: "Academic project building a real-time gesture recognition system using YOLOv5 and Python. Trained custom datasets to apply computer vision techniques for accurate gesture classification.",
    tech: ["Python", "YOLOv5", "Computer Vision", "Machine Learning"],
    link: "#",
    github: contact.links.github,
  },
  {
    id: 5,
    title: "Hugo Static Blog",
    date: "May 2024 - Nov 2024",
    description: "Deployed a fully responsive static website using Hugo and Markdown. Configured templates and SEO-friendly routing for high performance and accessibility.",
    tech: ["Hugo", "Markdown", "HTML/CSS", "SEO"],
    link: "#",
    github: contact.links.github,
  }
];