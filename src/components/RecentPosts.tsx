import { Link } from 'react-router-dom';
import { posts } from '../data/posts';
import PostCard from './PostCard';

const RecentPosts = () => {
  // Get only the first 3 posts
  const recentPosts = posts.slice(0, 3);

  const styles = {
    section: {
      // FIX: Reduced from 5rem to 2rem to remove top gap
      padding: '2rem 0', 
      backgroundColor: '#fff', 
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1.5rem',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      // FIX: Reduced from 3rem to 1.5rem
      marginBottom: '1.5rem', 
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 800,
      color: '#111827',
      letterSpacing: '-0.025em',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
    },
    buttonContainer: {
      // FIX: Reduced from 3rem to 2rem
      marginTop: '2rem', 
      display: 'flex',
      justifyContent: 'center',
    },
    viewAllButton: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '0.75rem 1.5rem',
      backgroundColor: '#ffffff',
      color: '#111827',
      border: '1px solid #e5e7eb',
      borderRadius: '0.5rem',
      fontSize: '0.95rem',
      fontWeight: 600,
      textDecoration: 'none',
      transition: 'all 0.2s',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
      cursor: 'pointer',
    }
  };

  return (
    <section id="posts" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.h2}>Recent Writing</h2>
        </div>

        <div style={styles.grid}>
          {recentPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        <div style={styles.buttonContainer}>
          <Link 
            to="/posts" 
            style={styles.viewAllButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#d1d5db';
              e.currentTarget.style.backgroundColor = '#f9fafb';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            View All Posts →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;