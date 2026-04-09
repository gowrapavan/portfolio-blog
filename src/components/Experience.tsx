import React, { useState } from 'react';
import type { CSSProperties } from 'react';

const Experience: React.FC = () => {
  const primaryBlue = '#0284c7'; // Matching the Navbar & Hero
  
  const styles: { [key: string]: CSSProperties } = {
    section: {
      padding: '4rem 0 6rem', 
      backgroundColor: '#f8fafc', // Very subtle slate background to contrast with white Hero
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      color: '#1e293b',
    },
    container: {
      maxWidth: '1100px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      columnGap: '5rem', 
      rowGap: '3rem',     
      padding: '0 1.5rem',
    },
    mainHeader: {
      gridColumn: '1 / -1', 
      textAlign: 'center' as const,
      fontSize: '2.5rem',
      fontWeight: 800,
      color: '#0f172a',
      marginTop: 0,
      marginBottom: '1rem', 
      lineHeight: 1.2,
      letterSpacing: '-0.025em',
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
      color: primaryBlue,
      marginBottom: '2rem', 
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    },
    line: {
      width: '30px', 
      height: '2px', 
      background: primaryBlue,
      borderRadius: '2px',
    },
    itemWrapper: {
      position: 'relative',
      paddingLeft: '2.5rem',
      borderLeft: '2px solid #e2e8f0',
      paddingBottom: '3rem',
      transition: 'border-color 0.3s ease',
    },
    dot: {
      position: 'absolute',
      left: '-6px',
      top: '0.25rem',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: '#cbd5e1',
      boxShadow: '0 0 0 6px #f8fafc',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: 1,
    },
    contentBox: {
      transition: 'transform 0.3s ease',
    },
    roleTitle: {
      fontSize: '1.25rem',
      fontWeight: 700,
      color: '#0f172a',
      marginBottom: '0.25rem',
      transition: 'color 0.2s ease',
    },
    meta: {
      fontSize: '0.85rem',
      color: '#64748b',
      marginBottom: '0.75rem',
      fontWeight: 500,
    },
    desc: {
      fontSize: '0.95rem',
      color: '#475569',
      lineHeight: '1.7',
    },
  };

  const TimelineItem = ({ title, meta, desc, isLast }: { title: string, meta: string, desc?: string, isLast?: boolean }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <div 
        style={{
          ...styles.itemWrapper,
          borderLeftColor: isLast ? 'transparent' : (isHovered ? primaryBlue : '#e2e8f0'),
          borderLeftStyle: isLast ? 'none' : 'solid',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{
          ...styles.dot,
          transform: isHovered ? 'scale(1.4)' : 'scale(1)',
          backgroundColor: isHovered ? primaryBlue : '#cbd5e1',
          boxShadow: isHovered ? `0 0 0 6px rgba(2, 132, 199, 0.15)` : '0 0 0 6px #f8fafc',
        }}></div>
        
        <div style={{
          ...styles.contentBox,
          transform: isHovered ? 'translateX(8px)' : 'translateX(0)',
        }}>
          <h3 style={{
            ...styles.roleTitle,
            color: isHovered ? primaryBlue : '#0f172a'
          }}>{title}</h3>
          <p style={styles.meta}>{meta}</p>
          {desc && <p style={styles.desc}>{desc}</p>}
        </div>
      </div>
    );
  };

  return (
    <section id="experience" style={styles.section}>
      <div style={styles.container}>
        
        <h2 style={styles.mainHeader}>Career & Education</h2>

        {/* Experience Column */}
        <div style={styles.column}>
          <div style={styles.subHeader}>
            <span style={styles.line}></span> EXPERIENCE
          </div>
          <TimelineItem 
            title="Junior Software Engineer"
            meta="Freelance / Projects • 2024 – Present"
            desc="Developing full-stack web applications with a focus on performance. Specializing in React, Next.js, and backend integration. Implemented CI/CD pipelines via GitHub Actions."
          />
          <TimelineItem 
            title="AWS Cloud Banking Analytics"
            meta="Virtual Internship • Dec 2024 – Mar 2025"
            desc="Explored cloud infrastructure and analytics tools, gaining hands-on experience with AWS services tailored for financial data processing."
            isLast={true}
          />
        </div>

        {/* Education Column */}
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