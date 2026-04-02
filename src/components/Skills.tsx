import { 
  FaPython, FaReact, FaGitAlt, FaTools, FaBrain, FaSearch 
} from 'react-icons/fa';

const Skills = () => {
  const styles = {
    section: { 
      backgroundColor: '#f9fafb', // Light gray background for contrast
      padding: '1rem 0',
      width: '100%',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1.5rem',
    },
    headerTitle: {
      textAlign: 'center' as const,
      fontSize: '2rem',
      fontWeight: 700,
      color: '#111827',
      marginBottom: '1rem',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
      gap: '1.5rem',
    },
    card: {
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '0.5rem',
      overflow: 'hidden',
      transition: 'box-shadow 0.2s',
    },
    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '1rem',
      borderBottom: '1px solid #f3f4f6',
      backgroundColor: '#fff',
    },
    iconWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
    },
    cardTitle: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#374151',
    },
    cardBody: {
      padding: '1.25rem',
      fontSize: '0.875rem',
      lineHeight: '1.6',
      color: '#4b5563',
    },
  };

  const skillsData = [
    { title: "React & Next.js", icon: <FaReact color="#61DAFB" />, desc: "Proficient in building dynamic, SEO-friendly web applications with React ecosystems." },
    { title: "Python & Automation", icon: <FaPython color="#3776AB" />, desc: "Strong skills in writing efficient Python scripts for automation and serverless APIs." },
    { title: "SEO Optimization", icon: <FaSearch color="#10B981" />, desc: "Adept at optimizing web architecture, meta-tags, and crawlability strategies." },
    { title: "Git & GitHub", icon: <FaGitAlt color="#F05032" />, desc: "Experienced with CI/CD pipelines, GitHub Actions, and version control workflows." },
    { title: "AI & Computer Vision", icon: <FaBrain color="#8B5CF6" />, desc: "Experience integrating LLMs and using OpenCV/YOLOv5 for real-time projects." },
    { title: "Development Tools", icon: <FaTools color="#6B7280" />, desc: "Skilled in Vite, Postman, Vercel, and Netlify for efficient deployment." }
  ];

  return (
    <section style={styles.section} id="skills">
      <div style={styles.container}>
        <h2 style={styles.headerTitle}>Skills</h2>
        <div style={styles.grid}>
          {skillsData.map((skill, index) => (
            <div 
              key={index} 
              style={styles.card}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
            >
              <div style={styles.cardHeader}>
                <div style={styles.iconWrapper}>{skill.icon}</div>
                <h3 style={styles.cardTitle}>{skill.title}</h3>
              </div>
              <div style={styles.cardBody}>{skill.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;