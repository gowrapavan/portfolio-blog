import React from 'react';
import type { CSSProperties } from 'react';
const Accomplishments: React.FC = () => {
  // --- STYLES ---
  const styles: { [key: string]: CSSProperties } = {
    section: {
      padding: '2rem 0', // Reduced top padding to remove the large gap
      backgroundColor: '#f9fafb', // Light gray background for contrast
      fontFamily: '"Inter", sans-serif',
      color: '#1f2937',
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
      marginBottom: '3rem',
    },
    grid: {
      display: 'grid',
      // FIX: Lowered min-width to 300px to prevent horizontal scrollbar on smaller screens
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
      rowGap: '1rem',    
      columnGap: '1rem', 
    },
    // Card Styling
    card: {
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '0.5rem',
      padding: '1.5rem', 
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      transition: 'all 0.2s ease',
      boxSizing: 'border-box' as const, // Ensures padding doesn't add to width
    },
    title: {
      fontSize: '1.125rem',
      fontWeight: 600,
      color: '#1f2937',
      marginBottom: '0.25rem',
      lineHeight: '1.4',
    },
    metaRow: {
      fontSize: '0.875rem',
      color: '#6b7280',
      marginBottom: '0.75rem',
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center',
    },
    issuer: {
      color: '#0891b2',
      fontWeight: 500,
    },
    description: {
      fontSize: '0.925rem',
      lineHeight: '1.6',
      color: '#4b5563',
      marginBottom: '1.5rem', 
      flex: 1,
    },
    // Button style
    button: {
      display: 'inline-block',
      padding: '0.5rem 1rem',
      border: '1px solid #0891b2',
      borderRadius: '0.375rem',
      color: '#0891b2',
      fontSize: '0.875rem',
      fontWeight: 500,
      textDecoration: 'none',
      width: 'fit-content',
      transition: 'background 0.2s',
      cursor: 'pointer',
    }
  };

  // Base URL for your GitHub Certificates
  const repoBaseUrl = "https://github.com/gowrapavan/gowrapavan/blob/main";

  const items = [
    {
      id: 1,
      title: "Google AI-ML Virtual Internship",
      issuer: "Google / AICTE",
      desc: "Gained practical experience in Artificial Intelligence and Machine Learning methodologies through a virtual internship program.",
      link: `${repoBaseUrl}/Certificates/Ai-ML-Gowra-Pavan-Kumar.pdf`
    },
    {
      id: 2,
      title: "Salesforce Developer Virtual Internship",
      issuer: "Salesforce",
      desc: "Completed extensive training in the Salesforce ecosystem, focusing on Apex programming, Lightning components, and cloud architecture.",
      link: `${repoBaseUrl}/Certificates/Salesforce_developer_virtual_internship.pdf`
    },
    {
      id: 3,
      title: "Android Developer Virtual Internship",
      issuer: "Google",
      desc: "Hands-on experience in mobile application development using Android Studio, Java/Kotlin, and modern Android development practices.",
      link: `${repoBaseUrl}/Certificates/ANDROID-DEVELOPER-Gowra-Pavan-Kumar.pdf`
    },
    {
      id: 4,
      title: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      desc: "Foundational understanding of AWS Cloud concepts, security, technology, billing, and pricing models.",
      link: `${repoBaseUrl}/Certificates/AWS_Cloud_Practitioner.pdf`
    },
    {
      id: 5,
      title: "Machine Learning with Python",
      issuer: "Technical Certification",
      desc: "Comprehensive course covering ML algorithms, regression, classification, clustering, and sci-kit learn implementation.",
      link: `${repoBaseUrl}/Certificates/Machine_Learning_with_Python.pdf`
    },
    {
      id: 6,
      title: "Python Programming",
      issuer: "Technical Certification",
      desc: "Mastery of Python syntax, data structures, and core programming concepts essential for backend development and automation.",
      link: `${repoBaseUrl}/Certificates/Python_Programming.pdf`
    },
    {
      id: 7,
      title: "Linux Essentials",
      issuer: "Cisco NetAcad",
      desc: "Fundamental concepts of the Linux operating system, command line interface, and open source software licensing.",
      link: `${repoBaseUrl}/Certificates/Linux_Essentials.pdf`
    },
    {
      id: 8,
      title: "Cybersecurity Essentials",
      issuer: "Cisco",
      desc: "Understanding of security principles, technologies, and procedures used to protect networks and data.",
      link: `${repoBaseUrl}/Certificates/Introduction_to_Cybersecurity_certificate_218x1a1227.pdf`
    },
    {
      id: 9,
      title: "JavaScript Essentials 1",
      issuer: "JSE",
      desc: "Core competency in JavaScript programming, including syntax, semantics, and best practices for web development.",
      link: `${repoBaseUrl}/Certificates/JavaScript_Essentials_1_-JSE-_certificate_218x1a1227.pdf`
    }
  ];

  return (
    <section id="accomplishments" style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.headerTitle}>Accomplishments & Certifications</h2>

        <div style={styles.grid}>
          {items.map((item) => (
            <div 
              key={item.id} 
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <h3 style={styles.title}>{item.title}</h3>
              
              <div style={styles.metaRow}>
                <span style={styles.issuer}>{item.issuer}</span>
              </div>

              <p style={styles.description}>{item.desc}</p>

              <a 
                href={item.link} 
                target="_blank"
                rel="noreferrer"
                style={styles.button}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ecfeff'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                View Certificate
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accomplishments;