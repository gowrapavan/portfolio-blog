import type { Project } from '../data/projects';

const ProjectCard = ({ project }: { project: Project }) => {
  const styles = {
    card: {
      backgroundColor: 'white',
      border: '1px solid #e5e7eb', // border-gray-200
      borderRadius: '0.75rem', // rounded-xl
      padding: '1.5rem',
      position: 'relative' as const,
      transition: 'all 0.3s ease',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '0.75rem',
    },
    category: {
      fontSize: '0.75rem', // text-xs
      fontWeight: 700,
      color: '#0891b2', // blue-600
      textTransform: 'uppercase' as const,
      letterSpacing: '0.025em',
      display: 'block',
    },
    title: {
      fontSize: '1.125rem', // text-lg
      fontWeight: 700,
      color: '#111827', // gray-900
      marginTop: '0.25rem',
      transition: 'color 0.2s',
    },
    description: {
      color: '#4b5563', // text-gray-600
      fontSize: '0.875rem', // text-sm
      marginBottom: '1rem',
      lineHeight: '1.6',
    },
    techContainer: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '0.5rem',
      marginBottom: '1.25rem',
    },
    techTag: {
      padding: '0.25rem 0.625rem',
      backgroundColor: '#f9fafb', // bg-gray-50
      color: '#4b5563', // text-gray-600
      fontSize: '0.75rem', // text-xs
      fontWeight: 500,
      borderRadius: '0.375rem',
      border: '1px solid #f3f4f6',
    },
    footer: {
      display: 'flex',
      gap: '1rem',
      fontSize: '0.875rem',
      fontWeight: 600,
      borderTop: '1px solid #f9fafb',
      paddingTop: '1rem',
      marginTop: 'auto',
    },
    link: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      textDecoration: 'none',
      color: '#111827',
      transition: 'color 0.2s',
    },
    githubLink: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      textDecoration: 'none',
      color: '#6b7280',
      transition: 'color 0.2s',
    }
  };

  return (
    <div 
      style={styles.card}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.borderColor = '#bfdbfe'; // blue-200
        const title = e.currentTarget.querySelector('h3');
        if(title) title.style.color = '#0891b2';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = '#e5e7eb';
        const title = e.currentTarget.querySelector('h3');
        if(title) title.style.color = '#111827';
      }}
    >
      <div style={styles.header}>
        <div>
          <span style={styles.category}>
            {project.category}
          </span>
          <h3 style={styles.title}>
            {project.title}
          </h3>
        </div>
      </div>
      
      <p style={styles.description}>
        {project.description}
      </p>

      <div style={styles.techContainer}>
        {project.tech.map((t) => (
          <span key={t} style={styles.techTag}>
            {t}
          </span>
        ))}
      </div>

      <div style={styles.footer}>
        {project.link && (
          <a 
            href={project.link} 
            target="_blank" 
            rel="noreferrer" 
            style={styles.link}
            onMouseEnter={(e) => e.currentTarget.style.color = '#0891b2'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#111827'}
          >
            Live Demo ↗
          </a>
        )}
        {project.github && (
          <a 
            href={project.github} 
            target="_blank" 
            rel="noreferrer" 
            style={styles.githubLink}
            onMouseEnter={(e) => e.currentTarget.style.color = '#111827'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
          >
            Code ↗
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;