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
  // NEW: Props for mobile drawer control
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ posts, activePostId, searchQuery, setSearchQuery, isOpen, onClose }: SidebarProps) => {
  const sidebarFilteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 900;

  const styles = {
    // --- YOUR EXACT DESKTOP STYLE (Unchanged) ---
    container: {
      position: 'sticky' as const,
      top: '100px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1.5rem',
      overflowY: 'auto' as const,
      scrollbarWidth: 'none' as const,
      msOverflowStyle: 'none' as const,
      paddingRight: '1rem',
      width: '100%',
      overflowX: 'hidden' as const,
    },
    // --- NEW: Mobile Drawer Styles ---
    mobileOverlay: {
      position: 'fixed' as const,
      top: '50px', // Below navbar
      left: 0,
      width: '100vw',
      height: 'calc(100vh - 50px)',
      backgroundColor: 'rgba(0,0,0,0.4)',
      zIndex: 40,
      display: isOpen ? 'block' : 'none',
    },
    mobileContainer: {
      position: 'fixed' as const,
      top: '50px',
      left: 0,
      width: '260px',
      height: 'calc(100vh - 50px)',
      backgroundColor: '#ffffff',
      zIndex: 41,
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1.5rem',
      overflowY: 'auto' as const,
      transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
      transition: 'transform 0.3s ease-in-out',
      borderRight: '1px solid #e2e8f0',
    },
    // --- CONTENT STYLES (Your Code - Unchanged) ---
    searchWrapper: {
      position: 'relative' as const,
      marginBottom: '0.5rem',
      width: '100%', 
    },
    searchInput: {
      width: '100%',
      padding: '0.6rem 1rem 0.6rem 2.2rem',
      fontSize: '0.9rem',
      border: '1px solid #e5e7eb',
      borderRadius: '4px',
      backgroundColor: '#f9fafb',
      color: '#374151',
      outline: 'none',
      boxSizing: 'border-box' as const,
    },
    searchIcon: {
      position: 'absolute' as const,
      left: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9ca3af',
      fontSize: '0.8rem',
    },
    sectionTitle: {
      fontSize: '0.95rem',
      fontWeight: 700,
      color: '#0891b2', 
      marginBottom: '-0.5rem',
      paddingLeft: '10px',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
    },
    listContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      position: 'relative' as const,
      borderLeft: '2px solid #e5e7eb',
      marginLeft: '10px', 
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
    },
    listItem: {
      position: 'relative' as const,
      paddingLeft: '1.25rem',
      paddingTop: '0.4rem',
      paddingBottom: '0.4rem',
      fontSize: '0.9rem',
      color: '#6b7280',
      textDecoration: 'none',
      display: 'block',
      transition: 'all 0.2s ease',
      lineHeight: '1.4',
      wordWrap: 'break-word' as const,
    },
    itemBranch: {
      position: 'absolute' as const,
      left: '0',
      top: '50%',
      width: '10px',
      height: '2px',
      backgroundColor: '#e5e7eb',
      transform: 'translateY(-50%)',
    },
    activeItem: {
      color: '#0891b2',
      fontWeight: 600,
    },
  };

  // Helper to render content to avoid duplication
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
        />
      </div>

      <h3 style={styles.sectionTitle}>Posts</h3>

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
                if (!isActive) e.currentTarget.style.color = '#0891b2';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = '#6b7280';
              }}
            >
              <span style={{
                ...styles.itemBranch,
                backgroundColor: isActive ? '#0891b2' : '#e5e7eb'
              }}></span>
              {post.title}
            </Link>
          );
        })}
        {sidebarFilteredPosts.length === 0 && (
           <div style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#9ca3af' }}>
             No results
           </div>
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
        // MOBILE: Render Overlay + Drawer (using new mobile styles)
        <>
          {isOpen && <div style={styles.mobileOverlay} onClick={onClose}></div>}
          <aside style={styles.mobileContainer} className="sidebar-scroll-container">
            <SidebarContent />
          </aside>
        </>
      ) : (
        // DESKTOP: Render your Original Sticky Sidebar
        <aside style={styles.container} className="sidebar-scroll-container">
          <SidebarContent />
        </aside>
      )}
    </>
  );
};

export default Sidebar;