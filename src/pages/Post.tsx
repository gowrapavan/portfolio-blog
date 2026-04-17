import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { posts } from '../data/posts';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';

const Post = () => {
  const { id } = useParams();

  const currentIndex = posts.findIndex((p) => p.id === id);
  const post = posts[currentIndex];

  const prevPost = posts[currentIndex - 1] || null;
  const nextPost = posts[currentIndex + 1] || null;

  const [sidebarSearch, setSidebarSearch] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 900;

  const styles = {
    pageLayout: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '2.5rem 2rem',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '260px 1fr',
      gap: '4rem',
      marginTop: '60px',
      minHeight: '80vh',
    },
    articleContainer: {
      maxWidth: '50rem',
      margin: '0 auto',
      width: '100%',
      animation: 'fadeIn 0.5s ease-in',
    },
    backLink: {
      fontSize: '0.875rem',
      fontWeight: 600,
      color: '#94a3b8',
      textDecoration: 'none',
      marginBottom: '2.5rem',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.35rem',
      cursor: 'pointer',
      transition: 'color 0.3s ease',
      letterSpacing: '0.01em',
    },
    header: {
      marginBottom: '3rem',
      borderBottom: '1px solid #f1f5f9',
      paddingBottom: '3rem',
    },
    imageWrapper: {
      width: '100%',
      height: '420px',
      marginBottom: '2.5rem',
      borderRadius: '1.25rem',
      overflow: 'hidden',
      boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.08)',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
      transition: 'transform 0.5s ease',
    },
    tagsWrapper: {
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap' as const,
      marginBottom: '1.25rem',
    },
    tag: {
      fontSize: '0.7rem',
      fontWeight: 700,
      color: '#0891b2',
      backgroundColor: '#ecfeff',
      padding: '0.3rem 0.85rem',
      borderRadius: '9999px',
      letterSpacing: '0.06em',
      textTransform: 'uppercase' as const,
      border: '1px solid #a5f3fc',
    },
    title: {
      fontSize: isMobile ? '2rem' : '2.75rem',
      lineHeight: '1.15',
      fontWeight: 900,
      color: '#0f172a',
      marginBottom: '1.25rem',
      letterSpacing: '-0.03em',
    },
    meta: {
      display: 'flex',
      gap: '0.75rem',
      alignItems: 'center',
      color: '#94a3b8',
      fontSize: '0.875rem',
    },
    metaDot: {
      width: '3px',
      height: '3px',
      borderRadius: '50%',
      backgroundColor: '#cbd5e1',
      display: 'inline-block',
    },
    content: {
      fontSize: '1.125rem',
      lineHeight: '1.85',
      color: '#334155',
    },
    navContainer: {
      marginTop: '5rem',
      borderTop: '1px solid #f1f5f9',
      paddingTop: '2.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      gap: '1.25rem',
      flexWrap: 'wrap' as const,
    },
    navButton: {
      flex: 1,
      minWidth: '200px',
      padding: '1.5rem 1.75rem',
      borderRadius: '1rem',
      border: '1px solid #f1f5f9',
      backgroundColor: '#ffffff',
      textDecoration: 'none',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.5rem',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
    },
    navLabel: {
      fontSize: '0.75rem',
      fontWeight: 700,
      color: '#94a3b8',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.08em',
    },
    navTitle: {
      fontSize: '1rem',
      fontWeight: 700,
      color: '#0f172a',
      lineHeight: '1.4',
    },
    notFound: {
      padding: '5rem 0',
      textAlign: 'center' as const,
      color: '#94a3b8',
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
            onMouseEnter={(e) => (e.currentTarget.style.color = '#06b6d4')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
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
              <span style={styles.metaDot}></span>
              <span>{post.readTime}</span>
            </div>
          </header>

          <div style={styles.content}>
            <ReactMarkdown components={{
              p: (props) => (
                <p style={{ marginBottom: '1.75rem', lineHeight: '1.85', color: '#334155', fontSize: '1.125rem' }} {...props} />
              ),
              h2: (props) => (
                <h2 style={{ fontSize: '1.875rem', fontWeight: 800, color: '#0f172a', marginTop: '3.5rem', marginBottom: '1.25rem', letterSpacing: '-0.02em', lineHeight: '1.2' }} {...props} />
              ),
              h3: (props) => (
                <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '0.875rem', letterSpacing: '-0.015em' }} {...props} />
              ),
              img: (props) => (
                <img style={{ width: '100%', borderRadius: '1rem', margin: '3rem 0', boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.1)', display: 'block' }} {...props} />
              ),
              ul: (props) => (
                <ul style={{ listStyleType: 'none', padding: '0', marginBottom: '1.75rem' }} {...props} />
              ),
              ol: (props) => (
                <ol style={{ paddingLeft: '1.5rem', marginBottom: '1.75rem', color: '#334155' }} {...props} />
              ),
              li: (props) => (
                <li style={{ marginBottom: '0.625rem', paddingLeft: '1.5rem', position: 'relative', lineHeight: '1.75', color: '#334155' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#06b6d4', fontWeight: 700 }}>›</span>
                  {/* @ts-ignore */}
                  {props.children}
                </li>
              ),
              blockquote: (props) => (
                <blockquote style={{ borderLeft: '3px solid #06b6d4', paddingLeft: '1.5rem', fontStyle: 'italic', color: '#64748b', margin: '2.5rem 0', fontSize: '1.2rem', lineHeight: '1.75', backgroundColor: '#f0fdfe', borderRadius: '0 0.75rem 0.75rem 0', padding: '1.25rem 1.5rem' }} {...props} />
              ),
              strong: (props) => (
                <strong style={{ fontWeight: 700, color: '#0f172a' }} {...props} />
              ),
              code: (props) => (
                <code style={{ backgroundColor: '#f1f5f9', color: '#0891b2', padding: '0.2em 0.45em', borderRadius: '0.35rem', fontSize: '0.9em', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', border: '1px solid #e2e8f0' }} {...props} />
              ),
              pre: (props) => (
                <pre style={{ backgroundColor: '#0f172a', color: '#e2e8f0', padding: '1.75rem', borderRadius: '1rem', overflowX: 'auto', marginBottom: '2rem', fontSize: '0.9rem', lineHeight: '1.75', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.15)' }} {...props} />
              ),
              a: (props) => (
                <a style={{ color: '#06b6d4', textDecoration: 'underline', textDecorationColor: '#a5f3fc', textUnderlineOffset: '3px', fontWeight: 500 }} {...props} />
              ),
              hr: () => (
                <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '3rem 0' }} />
              ),
            }}>
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Previous / Next Navigation */}
          <div style={styles.navContainer}>
            {prevPost ? (
              <Link
                to={`/posts/${prevPost.id}`}
                style={styles.navButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.09)';
                  e.currentTarget.style.borderColor = '#e0f2fe';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.04)';
                  e.currentTarget.style.borderColor = '#f1f5f9';
                }}
              >
                <span style={styles.navLabel}>← Previous</span>
                <span style={styles.navTitle}>{prevPost.title}</span>
              </Link>
            ) : <div style={{ flex: 1 }}></div>}

            {nextPost ? (
              <Link
                to={`/posts/${nextPost.id}`}
                style={{ ...styles.navButton, textAlign: 'right' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.09)';
                  e.currentTarget.style.borderColor = '#e0f2fe';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.04)';
                  e.currentTarget.style.borderColor = '#f1f5f9';
                }}
              >
                <span style={styles.navLabel}>Next →</span>
                <span style={styles.navTitle}>{nextPost.title}</span>
              </Link>
            ) : <div style={{ flex: 1 }}></div>}
          </div>
        </article>
      </div>
    </>
  );
};

export default Post;