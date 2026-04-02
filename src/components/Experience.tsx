import React, { CSSProperties, useState } from 'react';

const Experience: React.FC = () => {
  const styles: { [key: string]: CSSProperties } = {
    section: {
      padding: '2rem 0', 
      backgroundColor: '#f9fafb', 
      fontFamily: '"Inter", sans-serif',
      color: '#1f2937',
    },
    container: {
      maxWidth: '1100px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      // FIX: Split gap. Reduced rowGap (vertical) to 2rem to close the bottom space.
      columnGap: '4rem', 
      rowGap: '2rem',     
      padding: '0 1.5rem',
    },
    // Main Header Style
    mainHeader: {
      gridColumn: '1 / -1', 
      textAlign: 'center' as const,
      fontSize: '2.5rem',
      fontWeight: 800,
      color: '#111827',
      // FIX: Removed default browser margins to close the top gap
      marginTop: 0,
      marginBottom: 0, 
      lineHeight: 1.2,
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
    },
    subHeader: {
      fontSize: '0.875rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: '#0891b2',
      marginBottom: '1.5rem', // Slightly increased for visual balance
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    },
    line: {
      width: '24px', 
      height: '2px', 
      background: '#0891b2' 
    },
    item: {
      position: 'relative',
      paddingLeft: '2rem',
      borderLeft: '1px solid #e5e7eb',
      paddingBottom: '3rem',
      transition: 'all 0.3s ease',
    },
    dot: {
      position: 'absolute',
      left: '-5px',
      top: '0.5rem',
      width: '9px',
      height: '9px',
      borderRadius: '50%',
      backgroundColor: '#0891b2',
      boxShadow: '0 0 0 4px #fff',
      border: '1px solid #0891b2',
      transition: 'transform 0.3s ease',
      zIndex: 1,
    },
    roleTitle: {
      fontSize: '1.25rem',
      fontWeight: 700,
      color: '#111827',
      marginBottom: '0.5rem',
    },
    meta: {
      fontSize: '0.875rem',
      color: '#6b7280',
      marginBottom: '1rem',
      fontFamily: '"JetBrains Mono", monospace',
      fontWeight: 500,
    },
    desc: {
      fontSize: '0.95rem',
      color: '#4b5563',
      lineHeight: '1.6',
    },
  };

  const TimelineItem = ({ title, meta, desc, isLast }: { title: string, meta: string, desc?: string, isLast?: boolean }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
      <div 
        style={{
          ...styles.item,
          borderLeftColor: isLast ? 'transparent' : (isHovered ? '#0891b2' : '#e5e7eb'),
          borderLeftStyle: isLast ? 'none' : 'solid',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{
          ...styles.dot,
          transform: isHovered ? 'scale(1.3)' : 'scale(1)',
          backgroundColor: isHovered ? '#0891b2' : '#fff',
        }}></div>
        <h3 style={styles.roleTitle}>{title}</h3>
        <p style={styles.meta}>{meta}</p>
        {desc && <p style={styles.desc}>{desc}</p>}
      </div>
    );
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        
        {/* Main "CAREER" Header centered */}
        <h2 style={styles.mainHeader}>Career</h2>

        <div style={styles.column}>
          <div style={styles.subHeader}>
            <span style={styles.line}></span> EXPERIENCE
          </div>
          <TimelineItem 
            title="Junior Software Engineer"
            meta="Freelance / Projects • 2024 – Present"
            desc="Developing full-stack web applications with a focus on performance. Specializing in React, Next.js, and backend integration. Implemented CI/CD pipelines via GitHub Actions."
          />
        </div>

        <div style={styles.column}>
          <div style={styles.subHeader}>
            <span style={styles.line}></span> EDUCATION
          </div>
          <TimelineItem 
            title="B.Tech in Information Technology"
            meta="Kallam Haranadhareddy Institute • 2021 – 2025"
          />
          <TimelineItem 
            title="Intermediate (MPC)"
            meta="Board of Intermediate Education • 2019 – 2021"
          />
          <TimelineItem 
            title="CBSE – Class X"
            meta="Dr. K.L.P Public School • 2019"
            isLast={true}
          />
        </div>

      </div>
    </section>
  );
};

export default Experience;