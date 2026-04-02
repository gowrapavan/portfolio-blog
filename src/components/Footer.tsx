// For your second file:
import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaPhone, FaEnvelope } from 'react-icons/fa';
import { SiResearchgate } from 'react-icons/si';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Responsive Check
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    footer: {
      backgroundColor: '#ffffff', 
      borderTop: '2px solid #f3f4f6', 
      color: '#4b5563', // Gray-600
      padding: isMobile ? '2rem 1.5rem' : '2rem 2rem 2rem',
      fontFamily: '"Inter", sans-serif',
      marginTop: 'auto',
    },
    // Top Section: Navigation & Contact
    topContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      // Mobile: 1 Column | Desktop: 2 Columns
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
      gap: '3rem',
      marginBottom: '3rem',
    },
    // --- COLUMNS ---
    column: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: isMobile ? 'center' : 'flex-start',
      textAlign: isMobile ? 'center' as const : 'left' as const,
    },
    heading: {
      color: '#111827', // Gray-900 (Dark)
      fontSize: '1.125rem',
      fontWeight: 700,
      marginBottom: '1.5rem',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
    },
    // --- LISTS ---
    linkList: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.875rem',
      width: '100%',
    },
    linkItem: {
      color: '#6b7280', // Gray-500
      textDecoration: 'none',
      fontSize: '0.95rem',
      transition: 'color 0.2s ease',
      cursor: 'pointer',
      width: 'fit-content',
      margin: isMobile ? '0 auto' : '0', 
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    // --- FOOTER BOTTOM SECTION ---
    divider: {
      borderTop: '1px solid #e5e7eb', 
      margin: '0 auto 2rem',
      width: '100%',
      maxWidth: '1200px',
    },
    bottomContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1.5rem',
    },
    infoSection: {
      textAlign: isMobile ? 'center' as const : 'left' as const,
      fontSize: '0.85rem',
      color: '#9ca3af', // Gray-400
      lineHeight: '1.6',
    },
    copyright: {
      fontSize: '0.85rem',
      color: '#6b7280',
      textAlign: isMobile ? 'center' as const : 'left' as const,
      fontWeight: 500,
    },
    highlight: {
      color: '#4b5563', 
      fontWeight: 600,
    }
  };

  const handleHover = (e: React.MouseEvent<HTMLElement>, isHovering: boolean) => {
    e.currentTarget.style.color = isHovering ? '#0284c7' : '#6b7280'; 
  };

  // --- DESKTOP CONTENT ---
  const DesktopContent = () => (
    <>
      <div style={styles.topContainer}>
        {/* Navigation Column */}
        <div style={styles.column}>
          <h3 style={styles.heading}>Navigation</h3>
          <div style={styles.linkList}>
            <Link to="/" style={styles.linkItem} onMouseEnter={(e) => handleHover(e, true)} onMouseLeave={(e) => handleHover(e, false)}>About Me</Link>
            <a href="/#experience" style={styles.linkItem} onMouseEnter={(e) => handleHover(e, true)} onMouseLeave={(e) => handleHover(e, false)}>Career Journey</a>
            <a href="/#skills" style={styles.linkItem} onMouseEnter={(e) => handleHover(e, true)} onMouseLeave={(e) => handleHover(e, false)}>Technical Skills</a>
            <a href="/#projects" style={styles.linkItem} onMouseEnter={(e) => handleHover(e, true)} onMouseLeave={(e) => handleHover(e, false)}>Projects</a>
            <Link to="/posts" style={styles.linkItem} onMouseEnter={(e) => handleHover(e, true)} onMouseLeave={(e) => handleHover(e, false)}>Latest Posts</Link>
            <a href="/#accomplishments" style={styles.linkItem} onMouseEnter={(e) => handleHover(e, true)} onMouseLeave={(e) => handleHover(e, false)}>Certifications</a>
          </div>
        </div>

        {/* Contact Column */}
        <div style={styles.column}>
          <h3 style={styles.heading}>Contact Me</h3>
          <div style={styles.linkList}>
            <a href="mailto:gowrapavankumar2004@gmail.com" style={styles.linkItem} onMouseEnter={(e) => handleHover(e, true)} onMouseLeave={(e) => handleHover(e, false)}>
              <FaEnvelope /> gowrapavankumar2004@gmail.com
            </a>
            <a href="https://github.com/gowrapavan" target="_blank" rel="noreferrer" style={styles.linkItem} onMouseEnter={(e) => handleHover(e, true)} onMouseLeave={(e) => handleHover(e, false)}>
              <FaGithub /> gowrapavan
            </a>
            <a href="https://linkedin.com/in/gowrapavan" target="_blank" rel="noreferrer" style={styles.linkItem} onMouseEnter={(e) => handleHover(e, true)} onMouseLeave={(e) => handleHover(e, false)}>
              <FaLinkedin /> Gowra Pavan Kumar
            </a>
            <a href="tel:+919642027908" style={styles.linkItem} onMouseEnter={(e) => handleHover(e, true)} onMouseLeave={(e) => handleHover(e, false)}>
              <FaPhone /> +91 9642027908
            </a>
            <a href="#" style={styles.linkItem} onMouseEnter={(e) => handleHover(e, true)} onMouseLeave={(e) => handleHover(e, false)}>
              <SiResearchgate /> ResearchGate
            </a>
          </div>
        </div>
      </div>

      <div style={styles.divider}></div>

      <div style={styles.bottomContainer}>
        {/* Updated Info Text */}
        <div style={styles.infoSection}>
          <span style={styles.highlight}>About this Portfolio:</span> This website was personally architected and coded by Gowra Pavan Kumar using React & TypeScript. It is a custom-built showcase of my professional work and is not based on any pre-existing theme or template.
        </div>
        
        {/* Copyrights */}
        <p style={{ ...styles.copyright,display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem'}}>
          © {new Date().getFullYear()} Gowra Pavan Kumar. Guntur, India. All rights reserved.
        </p>
      </div>
    </>
  );

  // --- MOBILE CONTENT (Minimal & Clean) ---
  const MobileContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ ...styles.heading, marginBottom: '0.5rem', fontSize: '1.25rem' }}>Gowra Pavan Kumar</h3>
        <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
          Software Engineer & Full Stack Developer
        </p>
      </div>
      
      {/* Social Icons Row */}
      <div style={{ display: 'flex', gap: '1.75rem', fontSize: '1.5rem' }}>
        <a href="mailto:gowrapavankumar2004@gmail.com" style={{ color: '#9ca3af', transition: 'color 0.2s' }} aria-label="Email" onMouseEnter={(e) => handleHover(e, true)} onMouseLeave={(e) => handleHover(e, false)}><FaEnvelope /></a>
        <a href="https://github.com/gowrapavan" style={{ color: '#9ca3af', transition: 'color 0.2s' }} aria-label="GitHub" onMouseEnter={(e) => handleHover(e, true)} onMouseLeave={(e) => handleHover(e, false)}><FaGithub /></a>
        <a href="tel:+919642027908" style={styles.linkItem} onMouseEnter={(e) => handleHover(e, true)} onMouseLeave={(e) => handleHover(e, false)}><FaPhone /></a>
        <a href="https://linkedin.com/in/gowrapavan" style={{ color: '#9ca3af', transition: 'color 0.2s' }} aria-label="LinkedIn" onMouseEnter={(e) => handleHover(e, true)} onMouseLeave={(e) => handleHover(e, false)}><FaLinkedin /></a>
      </div>

      <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
        © {new Date().getFullYear()} Gowra Pavan Kumar.
      </p>
    </div>
  );

  return (
    <footer style={styles.footer}>
      {isMobile ? <MobileContent /> : <DesktopContent />}
    </footer>
  );
};

export default Footer;