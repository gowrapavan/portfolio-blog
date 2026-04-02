const Certifications = () => {
  const styles = {
    wrapper: {
      paddingBottom: '5rem', // Space at the bottom of the page
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
      backgroundColor: '#f9fafb',
      borderRadius: '1rem',
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#111827',
      marginBottom: '1.5rem',
    },
    tags: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '0.75rem',
    },
    tag: {
      padding: '0.375rem 0.75rem',
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      color: '#374151',
      fontSize: '0.875rem',
      borderRadius: '9999px',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    },
  };

  const certList = [
    "AWS Cloud Practitioner", 
    "Google AI-ML Internship", 
    "Salesforce Dev Internship", 
    "Android Dev Internship",
    "Cybersecurity Essentials (CISCO)",
    "Problem Solving in C"
  ];

  return (
    <div style={styles.wrapper}>
      <section style={styles.container}>
        <h2 style={styles.h2}>Certifications</h2>
        <div style={styles.tags}>
          {certList.map((cert) => (
            <span key={cert} style={styles.tag}>
              {cert}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Certifications;