import { useState } from 'react';
import { posts } from '../data/posts';
import PostCard from '../components/PostCard';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';
import { FaSearch } from 'react-icons/fa';

const Posts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 900;

  const styles = {
    pageContainer: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '2.5rem 2rem',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '260px 1fr',
      gap: '4rem',
      minHeight: '80vh',
      marginTop: '60px',
    },
    mainContent: {
      width: '100%',
    },
    header: {
      marginBottom: '3rem',
      paddingBottom: '2.5rem',
      borderBottom: '1px solid #f1f5f9',
    },
    eyebrow: {
      fontSize: '0.75rem',
      fontWeight: 700,
      letterSpacing: '0.12em',
      textTransform: 'uppercase' as const,
      color: '#06b6d4',
      marginBottom: '1rem',
      display: 'block',
    },
    title: {
      fontSize: isMobile ? '2rem' : '3rem',
      fontWeight: 900,
      color: '#0f172a',
      marginBottom: '1rem',
      letterSpacing: '-0.04em',
      lineHeight: 1.1,
    },
    subtitle: {
      fontSize: '1.125rem',
      color: '#64748b',
      lineHeight: '1.7',
      maxWidth: '540px',
    },
    searchWrapper: {
      position: 'relative' as const,
      marginTop: '2rem',
      maxWidth: '420px',
    },
    searchInput: {
      width: '100%',
      padding: '0.75rem 1.25rem 0.75rem 2.75rem',
      fontSize: '0.9rem',
      border: '1px solid #e2e8f0',
      borderRadius: '9999px',
      backgroundColor: '#f8fafc',
      color: '#0f172a',
      outline: 'none',
      boxSizing: 'border-box' as const,
      transition: 'all 0.3s ease',
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    },
    searchIcon: {
      position: 'absolute' as const,
      left: '14px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#94a3b8',
      fontSize: '0.85rem',
      pointerEvents: 'none' as const,
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '2rem',
    },
    emptyState: {
      color: '#94a3b8',
      padding: '3rem 0',
      fontSize: '1rem',
      textAlign: 'center' as const,
    },
    mobileSearchWrapper: {
      position: 'relative' as const,
      marginBottom: '2rem',
    },
    mobileSearchInput: {
      width: '100%',
      padding: '0.75rem 1.25rem 0.75rem 2.75rem',
      fontSize: '0.9rem',
      border: '1px solid #e2e8f0',
      borderRadius: '9999px',
      backgroundColor: '#f8fafc',
      outline: 'none',
      boxSizing: 'border-box' as const,
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    },
  };

  return (
    <>
      <SEO
        title="Notes & Technical Writing"
        description="Documentation of my journey in learning SEO, React Performance, and API Automation."
      />

      <Navbar onToggleSidebar={() => setIsSidebarOpen(prev => !prev)} />

      <div style={styles.pageContainer}>
        <Sidebar
          posts={posts}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main style={styles.mainContent}>
          <div style={styles.header}>
            <span style={styles.eyebrow}>Writing</span>
            <h1 style={styles.title}>Notes &amp; Technical Writing</h1>
            <p style={styles.subtitle}>
              Documentation of my journey in learning SEO, React Performance, and API Automation.
            </p>

            {!isMobile && (
              <div style={styles.searchWrapper}>
                <FaSearch style={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search posts..."
                  style={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#06b6d4';
                    e.currentTarget.style.backgroundColor = '#ffffff';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(6, 182, 212, 0.12)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.backgroundColor = '#f8fafc';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
                  }}
                />
              </div>
            )}
          </div>

          {isMobile && (
            <div style={styles.mobileSearchWrapper}>
              <FaSearch style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '0.85rem' }} />
              <input
                type="text"
                placeholder="Search posts..."
                style={styles.mobileSearchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}

          <div style={styles.grid}>
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div style={styles.emptyState}>No posts found.</div>
          )}
        </main>
      </div>
    </>
  );
};

export default Posts;