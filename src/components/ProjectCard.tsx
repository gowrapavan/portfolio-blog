import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';
import { useState, useEffect } from 'react';

const ProjectCard = ({ project }: { project: Project }) => {
  // Mobile detection for compact sizing and 2-row layout
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile(); // Check on initial load
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isInternal = project.logoLink?.startsWith('/');

  const styles = {
    card: {
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '0.75rem',
      // Low size: Less padding on mobile
      padding: isMobile ? '1.25rem' : '1.5rem', 
      position: 'relative' as const,
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column' as const,
      height: '100%',
    },
    header: {
      display: 'flex',
      // Two row on mobile: Stack title and logo vertically
      flexDirection: isMobile ? ('column' as const) : ('row' as const),
      justifyContent: 'space-between',
      alignItems: isMobile ? 'flex-start' : 'center',
      marginBottom: isMobile ? '0.5rem' : '0.75rem',
      gap: isMobile ? '0.75rem' : '1rem',
    },
    logoWrapper: {
      flexShrink: 0,
      // Wider container for landscape/rectangular logos
      width: isMobile ? '100px' : '120px', 
      height: isMobile ? '40px' : '48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: isMobile ? 'flex-start' : 'flex-end',
      transition: 'transform 0.2s',
      cursor: project.logoLink ? 'pointer' : 'default',
    },
    logoImage: {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain' as const, // Ensures landscape logos aren't squished
    },
    category: {
      fontSize: '0.75rem',
      fontWeight: 700,
      color: '#0891b2',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.025em',
      display: 'block',
    },
    title: {
      // Low size: Smaller font on mobile
      fontSize: isMobile ? '1rem' : '1.125rem',
      fontWeight: 700,
      color: '#111827',
      marginTop: '0.25rem',
      transition: 'color 0.2s',
      cursor: project.logoLink ? 'pointer' : 'default',
    },
    description: {
      color: '#4b5563',
      // Low size: Smaller font on mobile
      fontSize: isMobile ? '0.8rem' : '0.875rem',
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
      padding: '0.25rem 0.5rem',
      backgroundColor: '#f9fafb',
      color: '#4b5563',
      fontSize: isMobile ? '0.65rem' : '0.75rem', // Compact tags
      fontWeight: 500,
      borderRadius: '0.375rem',
      border: '1px solid #f3f4f6',
    },
    footer: {
      display: 'flex',
      gap: '1rem',
      fontSize: isMobile ? '0.8rem' : '0.875rem',
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
      cursor: 'pointer',
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

  // --- LOGO RENDER LOGIC ---
  const LogoElement = () => (
    <div 
      style={styles.logoWrapper}
      onMouseEnter={(e) => {
        if (project.logoLink) e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        if (project.logoLink) e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {project.logo && <img src={project.logo} alt={`${project.title} logo`} style={styles.logoImage} />}
    </div>
  );

  const renderLogoSection = () => {
    if (!project.logo) return null;
    if (!project.logoLink) return <LogoElement />;
    if (isInternal) return <Link to={project.logoLink}><LogoElement /></Link>;
    return <a href={project.logoLink} target="_blank" rel="noreferrer"><LogoElement /></a>;
  };

  // --- TITLE RENDER LOGIC (New feature added here) ---
  const TitleElement = () => (
    <h3 
      style={styles.title}
      onMouseEnter={(e) => {
        if (project.logoLink) e.currentTarget.style.color = '#0891b2';
      }}
      onMouseLeave={(e) => e.currentTarget.style.color = '#111827'}
    >
      {project.title}
    </h3>
  );

  const renderTitleSection = () => {
    if (!project.logoLink) return <TitleElement />;
    if (isInternal) return <Link to={project.logoLink} style={{ textDecoration: 'none' }}><TitleElement /></Link>;
    return <a href={project.logoLink} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}><TitleElement /></a>;
  };

  // --- FOOTER RENDER LOGIC ---
  const renderFooterLink = () => {
    if (!project.link) return null;
    if (project.link.startsWith('/')) {
      return (
        <Link 
          to={project.link} 
          style={styles.link}
          onMouseEnter={(e) => e.currentTarget.style.color = '#0891b2'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#111827'}
        >
          Live Demo ↗
        </Link>
      );
    }
    return (
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
    );
  };

  return (
    <div 
      style={styles.card}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.borderColor = '#bfdbfe';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = '#e5e7eb';
      }}
    >
      {/* Dynamic 2-Row Header on Mobile */}
      <div style={styles.header}>
        <div>
          <span style={styles.category}>{project.category}</span>
          {renderTitleSection()}
        </div>
        {renderLogoSection()}
      </div>
      
      <p style={styles.description}>{project.description}</p>

      <div style={styles.techContainer}>
        {project.tech.map((t) => (
          <span key={t} style={styles.techTag}>{t}</span>
        ))}
      </div>

      <div style={styles.footer}>
        {renderFooterLink()}
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