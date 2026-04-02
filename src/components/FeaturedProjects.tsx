import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';

const FeaturedProjects = () => {
  const styles = {
    section: { 
      padding: '2rem 0',
      backgroundColor: '#fff',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1.5rem',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: '1rem',
      flexWrap: 'wrap' as const, // Allows wrapping on very small screens
      gap: '1rem',
    },
    h2: {
      fontSize: '2rem', // Increased size for better hierarchy
      fontWeight: 800,
      color: '#111827',
      letterSpacing: '-0.025em',
    },
    link: {
      fontSize: '0.95rem',
      fontWeight: 600,
      color: '#0891b2', // Blue-600
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.25rem',
      transition: 'color 0.2s',
    },
    grid: {
      display: 'grid',
      // Responsive grid: cards will be at least 320px wide, filling the space
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
      gap: '1rem',
    },
  };

  return (
    <section id="projects" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.h2}>Featured Projects</h2>
          <a 
            href="https://github.com/gowrapavan" 
            target="_blank" 
            rel="noreferrer"
            style={styles.link}
            onMouseEnter={(e) => e.currentTarget.style.color = '#20c2eb'} // Darker blue on hover
            onMouseLeave={(e) => e.currentTarget.style.color = '#0891b2'}
          >
            View all on GitHub →
          </a>
        </div>
        <div style={styles.grid}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;