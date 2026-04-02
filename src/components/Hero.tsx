import { 
  FaGithub, 
  FaLinkedin, 

  FaPhone
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Responsive Check
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 850);
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    section: { 
      // FIX: Added marginTop to push content below the 50px fixed navbar
      marginTop: isMobile ? '50px' :'20px',
      padding: isMobile ? '4rem 0' : '6rem 0',
      backgroundColor: '#fff', 
      display: 'flex',
      justifyContent: 'center',
    },
    container: {
      width: '100%',
      maxWidth: '1200px', 
      padding: '0 1.5rem',
      display: 'grid',
      // Mobile: Stacked | Desktop: Side-by-Side
      gridTemplateColumns: isMobile ? '1fr' : '1.2fr 0.8fr',
      gap: isMobile ? '3rem' : '4rem',
      alignItems: 'center',
    },
    textContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1.5rem',
      maxWidth: '600px',
      // Center text on mobile, Left align on desktop
      textAlign: isMobile ? 'center' as const : 'left' as const, 
      margin: isMobile ? '0 auto' : '0', 
    },
    h1: {
      fontSize: isMobile ? '2.75rem' : '3.75rem', 
      lineHeight: '1.1',
      fontWeight: 800,
      letterSpacing: '-0.025em',
      color: '#111827',
    },
    subtitle: {
      fontSize: isMobile ? '1.25rem' : '1.5rem',
      color: '#4b5563',
      lineHeight: '1.5',
      fontWeight: 500,
      marginTop: '0.25rem',
    },
    desc: {
      color: '#6b7280',
      fontSize: isMobile ? '1rem' : '1.125rem',
      lineHeight: '1.75',
      marginBottom: '0.5rem',
    },
    socialRow: {
      display: 'flex',
      gap: '1.25rem',
      marginTop: '0.5rem',
      flexWrap: 'wrap' as const,
      // Center icons on mobile to match text
      justifyContent: isMobile ? 'center' : 'flex-start', 
    },
    iconLink: {
      color: '#4b5563', // Gray-600
      fontSize: isMobile ? '1.5rem' : '1.75rem',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
    },
    imageContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // On mobile, moving image to the top looks better (order -1)
      // Change to '0' if you want image below text
      order: isMobile ? -1 : 0, 
    },
    profileImage: {
      width: '100%',
      maxWidth: isMobile ? '260px' : '380px', // Slightly smaller for better proportions
      aspectRatio: '1 / 1', 
      borderRadius: '1.5rem', 
      objectFit: 'cover' as const,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // FIX: Updated to Sky Blue to match your Navbar active state
    e.currentTarget.style.color = '#0284c7'; 
    e.currentTarget.style.transform = 'translateY(-3px)';
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = '#4b5563';
    e.currentTarget.style.transform = 'translateY(0)';
  };

  return (
    <section id="home" style={styles.section}>
      <div style={styles.container}>
        {/* Left: Text */}
        <div style={styles.textContainer}>
          <div>
            <h1 style={styles.h1}>Gowra Pavan Kumar</h1>
            <p style={styles.subtitle}>Software Engineer & Full Stack Developer</p>
          </div>
          <p style={styles.desc}>
            I build robust, scalable, and SEO-friendly web applications. 
            Focused on performance, automation, and data-driven solutions using React, Next.js, and Python.
          </p>
          <div style={styles.socialRow}>
            {[
              { icon: <MdEmail />, href: "mailto:gowrapavankumar2004@gmail.com" },
              { icon: <FaGithub />, href: "https://github.com/gowrapavan" },
              { icon: <FaLinkedin />, href: "#" },
              { icon: <FaPhone />, href: "tel:+919642027908" },

            ].map((item, index) => (
              <a 
                key={index} 
                href={item.href} 
                target="_blank" 
                rel="noreferrer" 
                style={styles.iconLink}
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Right: Image */}
        <div style={styles.imageContainer}>
          <img 
            src="https://avatars.githubusercontent.com/u/160145497?v=4" 
            alt="Gowra Pavan Kumar" 
            style={styles.profileImage} 
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;