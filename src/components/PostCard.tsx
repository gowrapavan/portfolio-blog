import { Link } from 'react-router-dom';
import type { Post } from '../data/posts';

const PostCard = ({ post }: { post: Post }) => {
  const styles = {
    // Card Container
    card: {
      display: 'flex',
      flexDirection: 'column' as const,
      backgroundColor: 'white',
      borderRadius: '0.5rem', // Rounded corners
      border: '1px solid #e5e7eb', // Light border
      overflow: 'hidden', // Clips the image corners
      transition: 'all 0.3s ease',
      height: '100%', // Full height for grid alignment
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
      cursor: 'pointer',
      textDecoration: 'none',
      color: 'inherit',
    },
    // Top Image
    imageWrapper: {
      width: '100%',
      height: '200px', // Fixed height for uniformity
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
      transition: 'transform 0.3s ease',
    },
    // Content Area
    content: {
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column' as const,
      flex: 1, // Pushes footer to bottom
    },
    title: {
      fontSize: '1.25rem',
      fontWeight: 700,
      color: '#111827',
      marginBottom: '0.75rem',
      lineHeight: '1.4',
    },
    excerpt: {
      fontSize: '0.875rem',
      color: '#6b7280',
      lineHeight: '1.6',
      marginBottom: '1.5rem',
      flex: 1, // Takes available space
    },
    // Tags
    tagsWrapper: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '0.5rem',
      marginBottom: '1.5rem',
    },
    tag: {
      fontSize: '0.75rem',
      fontWeight: 600,
      color: '#0e7490', // Cyan-700
      backgroundColor: '#cffafe', // Cyan-100
      padding: '0.25rem 0.625rem',
      borderRadius: '0.25rem',
    },
    // Footer (Date | Read)
    footer: {
      borderTop: '1px solid #f3f4f6',
      paddingTop: '1rem',
      marginTop: 'auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    meta: {
      fontSize: '0.75rem',
      color: '#9ca3af', // Gray-400
    },
    readButton: {
      fontSize: '0.75rem',
      fontWeight: 600,
      color: '#0891b2', // Cyan-600
      border: '1px solid #0891b2',
      borderRadius: '0.25rem',
      padding: '0.25rem 0.75rem',
      transition: 'background 0.2s',
    }
  };

  return (
    <Link 
      to={`/posts/${post.id}`} 
      style={styles.card}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        const img = e.currentTarget.querySelector('img');
        if (img) img.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
        const img = e.currentTarget.querySelector('img');
        if (img) img.style.transform = 'scale(1)';
      }}
    >
      {/* Image Section */}
      <div style={styles.imageWrapper}>
        <img src={post.image} alt={post.title} style={styles.image} />
      </div>

      {/* Text Content */}
      <div style={styles.content}>
        <h3 style={styles.title}>{post.title}</h3>
        <p style={styles.excerpt}>
          {post.excerpt.length > 100 ? `${post.excerpt.substring(0, 100)}...` : post.excerpt}
        </p>

        {/* Tags */}
        <div style={styles.tagsWrapper}>
          {post.tags.map(tag => (
            <span key={tag} style={styles.tag}>{tag}</span>
          ))}
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <div style={styles.meta}>
            {post.date} | {post.readTime}
          </div>
          <div style={styles.readButton}>Read</div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;