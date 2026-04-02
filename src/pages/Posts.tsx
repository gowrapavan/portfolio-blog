import { useState } from 'react';
import { posts } from '../data/posts';
import PostCard from '../components/PostCard';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO'; // Import SEO
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
      padding: '2rem 1.5rem',
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
    },
    title: {
      fontSize: '2.25rem',
      fontWeight: 800,
      color: '#111827',
      marginBottom: '0.75rem',
      letterSpacing: '-0.025em',
    },
    subtitle: {
      fontSize: '1.1rem',
      color: '#6b7280',
      lineHeight: '1.6',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '2.5rem',
    },
    mobileSearch: {
      position: 'relative' as const,
      marginBottom: '2rem',
    },
    searchInput: {
      width: '100%',
      padding: '0.6rem 1rem 0.6rem 2.2rem',
      fontSize: '0.9rem',
      border: '1px solid #e5e7eb',
      borderRadius: '4px',
      backgroundColor: '#f3f4f6',
      outline: 'none',
    },
  };

  return (
    <>
      {/* SEO for the Listing Page */}
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
            <h1 style={styles.title}>Notes & Technical Writing</h1>
            <p style={styles.subtitle}>
              Documentation of my journey in learning SEO, React Performance, and API Automation.
            </p>
          </div>

          {isMobile && (
            <div style={styles.mobileSearch}>
              <FaSearch style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
              <input
                type="text"
                placeholder="Search posts..."
                style={styles.searchInput}
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
            <div style={{ color: '#9ca3af', padding: '2rem 0' }}>
              No posts found.
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Posts;