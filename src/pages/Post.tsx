import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown'; // 1. Import Markdown Renderer
import { posts } from '../data/posts';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';

const Post = () => {
  const { id } = useParams();
  
  // 2. Navigation Logic
  const currentIndex = posts.findIndex((p) => p.id === id);
  const post = posts[currentIndex];
  
  // Logic: Previous is index - 1, Next is index + 1
  const prevPost = posts[currentIndex - 1] || null;
  const nextPost = posts[currentIndex + 1] || null;
  
  const [sidebarSearch, setSidebarSearch] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 900;

  const styles = {
    pageLayout: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '2rem 1.5rem',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '260px 1fr',
      gap: '4rem',
      marginTop: '60px',
      minHeight: '80vh',
    },
    articleContainer: {
      maxWidth: '48rem', 
      margin: '0 auto', 
      width: '100%',
      animation: 'fadeIn 0.5s ease-in',
    },
    backLink: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: '#6b7280',
      textDecoration: 'none',
      marginBottom: '2rem',
      display: 'inline-block',
      cursor: 'pointer',
      transition: 'color 0.2s',
    },
    header: {
      marginBottom: '2.5rem',
      borderBottom: '1px solid #f3f4f6',
      paddingBottom: '2.5rem',
    },
    imageWrapper: {
      width: '100%',
      height: '400px',
      marginBottom: '2rem',
      borderRadius: '0.75rem',
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
    },
    title: {
      fontSize: '2.5rem',
      lineHeight: '1.1',
      fontWeight: 800,
      color: '#111827',
      marginBottom: '1rem',
    },
    meta: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center',
      color: '#6b7280',
      fontSize: '0.875rem',
      marginBottom: '1.5rem',
    },
    tagsWrapper: {
      display: 'flex',
      gap: '0.5rem',
    },
    tag: {
      fontSize: '0.75rem',
      fontWeight: 600,
      color: '#0e7490',
      backgroundColor: '#cffafe',
      padding: '0.25rem 0.625rem',
      borderRadius: '0.25rem',
    },
    content: {
      fontSize: '1.125rem',
      lineHeight: '1.8',
      color: '#374151',
      // whiteSpace: 'pre-wrap' as const, // REMOVED: Markdown handles this
    },
    // Navigation Buttons Styles
    navContainer: {
      marginTop: '4rem',
      borderTop: '1px solid #e5e7eb',
      paddingTop: '2rem',
      display: 'flex',
      justifyContent: 'space-between',
      gap: '1rem',
      flexWrap: 'wrap' as const,
    },
    navButton: {
      flex: 1,
      minWidth: '200px',
      padding: '1.5rem',
      borderRadius: '0.5rem',
      border: '1px solid #e5e7eb',
      backgroundColor: '#f9fafb',
      textDecoration: 'none',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.5rem',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
    },
    navLabel: {
      fontSize: '0.85rem',
      fontWeight: 600,
      color: '#9ca3af', // Gray label (Previous / Next)
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
    },
    navTitle: {
      fontSize: '1rem',
      fontWeight: 700,
      color: '#1f2937',
    },
    notFound: {
      padding: '5rem 0',
      textAlign: 'center' as const,
      color: '#6b7280',
      gridColumn: '1 / -1', 
    },
  };

  if (!post) {
    return (
      <div style={styles.pageLayout}>
         <SEO title="Post Not Found" />
         <div style={styles.notFound}>Post not found</div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={post.title} 
        description={post.content.substring(0, 160).replace(/\n/g, ' ') + '...'} 
        image={post.image}
        type="article"
      />

      <Navbar onToggleSidebar={() => setIsSidebarOpen(prev => !prev)} />
      
      <div style={styles.pageLayout}>
        <Sidebar 
          posts={posts} 
          activePostId={post.id} 
          searchQuery={sidebarSearch} 
          setSearchQuery={setSidebarSearch} 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <article style={styles.articleContainer}>
          <Link 
            to="/posts" 
            style={styles.backLink}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#000')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#6b7280')}
          >
            ← Back to Posts
          </Link>
          
          <header style={styles.header}>
            <div style={styles.imageWrapper}>
              <img src={post.image} alt={post.title} style={styles.image} />
            </div>

            <div style={styles.tagsWrapper}>
              {post.tags.map(tag => (
                <span key={tag} style={styles.tag}>{tag}</span>
              ))}
            </div>

            <h1 style={styles.title}>{post.title}</h1>
            
            <div style={styles.meta}>
              <time>{post.date}</time>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </header>
          
          <div style={styles.content}>
            {/* 3. Render Markdown with Custom Styles */}
            <ReactMarkdown components={{
                // Paragraphs
                p: (props) => <p style={{marginBottom: '1.5rem', lineHeight: '1.8', color: '#374151'}} {...props} />,
                // Main Headers (h2)
                h2: (props) => <h2 style={{fontSize: '1.75rem', fontWeight: '700', color: '#111827', marginTop: '3rem', marginBottom: '1rem'}} {...props} />,
                // Sub Headers (h3)
                h3: (props) => <h3 style={{fontSize: '1.4rem', fontWeight: '600', color: '#1f2937', marginTop: '2rem', marginBottom: '0.75rem'}} {...props} />,
                // Images inside content
                img: (props) => <img style={{width: '100%', borderRadius: '0.75rem', margin: '2.5rem 0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} {...props} />,
                // Lists
                ul: (props) => <ul style={{listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1.5rem'}} {...props} />,
                li: (props) => <li style={{marginBottom: '0.5rem', paddingLeft: '0.5rem'}} {...props} />,
                // Blockquotes
                blockquote: (props) => <blockquote style={{borderLeft: '4px solid #e5e7eb', paddingLeft: '1rem', fontStyle: 'italic', color: '#6b7280', margin: '1.5rem 0'}} {...props} />,
                // Bold text
                strong: (props) => <strong style={{fontWeight: '700', color: '#111827'}} {...props} />,
            }}>
              {post.content}
            </ReactMarkdown>
          </div>

          {/* 4. Previous / Next Navigation Buttons */}
          <div style={styles.navContainer}>
            {prevPost ? (
              <Link 
                to={`/posts/${prevPost.id}`} 
                style={styles.navButton}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f3f4f6'; e.currentTarget.style.borderColor = '#d1d5db'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f9fafb'; e.currentTarget.style.borderColor = '#e5e7eb'; }}
              >
                <span style={styles.navLabel}>← Previous</span>
                <span style={styles.navTitle}>{prevPost.title}</span>
              </Link>
            ) : <div style={{flex: 1}}></div>} {/* Spacer if no prev post */}

            {nextPost ? (
              <Link 
                to={`/posts/${nextPost.id}`} 
                style={{...styles.navButton, textAlign: 'right'}}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f3f4f6'; e.currentTarget.style.borderColor = '#d1d5db'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f9fafb'; e.currentTarget.style.borderColor = '#e5e7eb'; }}
              >
                <span style={styles.navLabel}>Next →</span>
                <span style={styles.navTitle}>{nextPost.title}</span>
              </Link>
            ) : <div style={{flex: 1}}></div>}
          </div>

        </article>
      </div>
    </>
  );
};

export default Post;