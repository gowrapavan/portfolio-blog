import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

export interface Post {
  id: string;
  title: string;
  category?: string;
  [key: string]: any;
}

interface SidebarProps {
  posts: Post[];
  activePostId?: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ posts, activePostId, searchQuery, setSearchQuery, isOpen, onClose }: SidebarProps) => {
  const sidebarFilteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 900;

  const styles = {
    container: {
      position: 'sticky' as const,
      top: '100px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1.25rem',
      overflowY: 'auto' as const,
      scrollbarWidth: 'none' as const,
      msOverflowStyle: 'none' as const,
      paddingRight: '0.5rem',
      width: '100%',
      overflowX: 'hidden' as const,
    },
    mobileOverlay: {
      position: 'fixed' as const,
      top: '50px',
      left: 0,
      width: '100vw',
      height: 'calc(100vh - 50px)',
      backgroundColor: 'rgba(15, 23, 42, 0.35)',
      backdropFilter: 'blur(2px)',
      zIndex: 40,
      display: isOpen ? 'block' : 'none',
    },
    mobileContainer: {
      position: 'fixed' as const,
      top: '50px',
      left: 0,
      width: '280px',
      height: 'calc(100vh - 50px)',
      backgroundColor: '#ffffff',
      zIndex: 41,
      padding: '1.75rem 1.25rem',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1.25rem',
      overflowY: 'auto' as const,
      transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      borderRight: '1px solid #f1f5f9',
      boxShadow: '4px 0 24px rgba(0,0,0,0.06)',
    },
    searchWrapper: {
      position: 'relative' as const,
      marginBottom: '0.25rem',
      width: '100%',
    },
    searchInput: {
      width: '100%',
      padding: '0.6rem 1rem 0.6rem 2.4rem',
      fontSize: '0.875rem',
      border: '1px solid #e2e8f0',
      borderRadius: '9999px',
      backgroundColor: '#f8fafc',
      color: '#334155',
      outline: 'none',
      boxSizing: 'border-box' as const,
      transition: 'all 0.3s ease',
    },
    searchIcon: {
      position: 'absolute' as const,
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#94a3b8',
      fontSize: '0.75rem',
      pointerEvents: 'none' as const,
    },
    sectionTitle: {
      fontSize: '0.7rem',
      fontWeight: 800,
      color: '#94a3b8',
      paddingLeft: '0.75rem',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.1em',
      marginBottom: '-0.25rem',
    },
    listContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.2rem',
    },
    listItem: {
      padding: '0.6rem 0.875rem',
      fontSize: '0.875rem',
      color: '#64748b',
      textDecoration: 'none',
      display: 'block',
      transition: 'all 0.2s ease',
      lineHeight: '1.45',
      wordBreak: 'break-word' as const,
      borderRadius: '0.625rem',
      fontWeight: 500,
    },
    activeItem: {
      color: '#0891b2',
      fontWeight: 700,
      backgroundColor: '#ecfeff',
      borderRadius: '0.625rem',
    },
    noResults: {
      padding: '0.5rem 0.875rem',
      fontSize: '0.8rem',
      color: '#94a3b8',
      fontStyle: 'italic' as const,
    },
  };

  const SidebarContent = () => (
    <>
      <div style={styles.searchWrapper}>
        <FaSearch style={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search..."
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
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
      </div>

      <p style={styles.sectionTitle}>Posts</p>

      <div style={styles.listContainer}>
        {sidebarFilteredPosts.map((post) => {
          const isActive = post.id === activePostId;
          return (
            <Link
              key={post.id}
              to={`/posts/${post.id}`}
              onClick={isMobile && onClose ? onClose : undefined}
              style={{
                ...styles.listItem,
                ...(isActive ? styles.activeItem : {}),
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#0891b2';
                  e.currentTarget.style.backgroundColor = '#f0fdfe';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#64748b';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {post.title}
            </Link>
          );
        })}

        {sidebarFilteredPosts.length === 0 && (
          <div style={styles.noResults}>No results found</div>
        )}
      </div>
    </>
  );

  return (
    <>
      <style>
        {`
          .sidebar-scroll-container::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      {isMobile ? (
        <>
          {isOpen && <div style={styles.mobileOverlay} onClick={onClose}></div>}
          <aside style={styles.mobileContainer} className="sidebar-scroll-container">
            <SidebarContent />
          </aside>
        </>
      ) : (
        <aside style={styles.container} className="sidebar-scroll-container">
          <SidebarContent />
        </aside>
      )}
    </>
  );
};

export default Sidebar;