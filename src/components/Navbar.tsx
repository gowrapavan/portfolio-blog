import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaColumns } from 'react-icons/fa';

// NavLinks defined outside to prevent ReferenceError
const navLinks = [
  { name: 'Home', path: '/', id: 'home' },
  { name: 'Career', path: '/#experience', id: 'experience' },
  { name: 'Projects', path: '/#projects', id: 'projects' },
  { name: 'Skills', path: '/#skills', id: 'skills' },
  { name: 'Certificates', path: '/#accomplishments', id: 'accomplishments' },
];

interface NavbarProps {
  onToggleSidebar?: () => void;
}

const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  const [activeSection, setActiveSection] = useState<string>('home');
  // FIX: Removed setHoveredLink since it is unused
  const [hoveredLink] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isPostsPage = location.pathname.startsWith('/posts');

  const styles = {
    nav: {
      position: 'fixed' as const,
      top: 0,
      zIndex: 50,
      width: '100%',
      backgroundColor: isScrolled || isMenuOpen ? 'rgba(255, 255, 255, 0.98)' : 'transparent',
      backdropFilter: isScrolled || isMenuOpen ? 'blur(8px)' : 'none',
      borderBottom: isScrolled || isMenuOpen ? '1px solid #e2e8f0' : '1px solid transparent',
      transition: 'all 0.3s ease-in-out',
      color: '#0f172a',
      fontFamily: '"Inter", sans-serif',
      height: '50px', 
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: isMobile ? '0 0.75rem' : '0 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '100%', 
    },
    leftGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    sidebarToggleBtn: {
      display: isMobile && isPostsPage ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.1rem',
      color: '#64748b',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '4px',
      marginLeft: '-4px', 
    },
    logoGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      textDecoration: 'none',
      color: 'inherit',
      zIndex: 60,
    },
    logoIcon: {
      height: '28px',
      width: '28px',
      borderRadius: '50%',
      objectFit: 'cover' as const, 
      display: 'block',
    },
    logoText: {
      fontSize: '1.15rem',
      fontWeight: 600,
      letterSpacing: '-0.025em',
      color: '#0f172a',
    },
    desktopLinks: {
      display: isMobile ? 'none' : 'flex',
      gap: '0.25rem',
      fontSize: '0.9rem',
      fontWeight: 500,
      alignItems: 'stretch',
      height: '100%',
    },
    menuButton: {
      display: isMobile ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.25rem',
      cursor: 'pointer',
      color: '#0f172a',
      zIndex: 60,
      background: 'transparent',
      border: 'none',
      padding: '5px',
    },
    mobileMenu: {
      position: 'absolute' as const,
      top: '50px',
      left: 0,
      width: '100%',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      display: isMenuOpen ? 'flex' : 'none',
      flexDirection: 'column' as const,
      padding: '1rem 0',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      zIndex: 55,
    },
    link: {
      textDecoration: 'none',
      color: '#475569',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      padding: '0 1.25rem',
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      borderBottom: '3px solid transparent',
      boxSizing: 'border-box' as const,
      marginBottom: '-1px',
    },
    activeLink: {
      backgroundColor: '#e0f2fe',
      color: '#0284c7',
      borderBottom: '3px solid #0284c7',
      fontWeight: 600,
    },
    mobileLinkItem: {
      width: '100%',
      padding: '1rem 2rem',
      textAlign: 'left' as const,
      borderLeft: '4px solid transparent',
      borderBottom: 'none',
      height: 'auto',
      backgroundColor: 'transparent',
      marginBottom: 0,
    },
    activeMobileLink: {
      backgroundColor: '#f0f9ff',
      color: '#0284c7',
      borderLeft: '4px solid #0284c7',
      borderBottom: 'none',
      fontWeight: 600,
    },
    divider: {
      height: '20px',
      width: '1px',
      backgroundColor: '#cbd5e1',
      margin: 'auto 0.5rem',
      display: isMobile ? 'none' : 'block',
    },
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 850);
      if (window.innerWidth >= 850) setIsMenuOpen(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      if (location.pathname !== '/') return;
      
      let maxVisibility = 0;
      let currentSection = activeSection;
      navLinks.forEach((link) => {
        const section = document.getElementById(link.id);
        if (section) {
          const rect = section.getBoundingClientRect();
          const visibleHeight = Math.max(0, Math.min(window.innerHeight, rect.bottom) - Math.max(0, rect.top));
          if (visibleHeight > maxVisibility) {
            maxVisibility = visibleHeight;
            currentSection = link.id;
          }
        }
      });
      if (window.scrollY < 50) currentSection = 'home';
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 20) currentSection = 'accomplishments';
      setActiveSection(currentSection);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, activeSection]);

  const handleNavClick = (e: React.MouseEvent, path: string, id?: string) => {
    setIsMenuOpen(false);
    if (location.pathname === '/' && path.includes('#')) {
      e.preventDefault();
      const targetId = path.split('#')[1];
      const element = document.getElementById(targetId);
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top: y, behavior: 'smooth' });
        if (id) setActiveSection(id);
      }
    } else if (path === '/') {
       window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getLinkStyle = (name: string, path: string, id?: string, isMobileMode = false) => {
    let style = isMobileMode ? { ...styles.link, ...styles.mobileLinkItem } : { ...styles.link };
    const isActive = (location.pathname === '/' && id === activeSection) || 
                     (location.pathname !== '/' && path.startsWith(location.pathname) && path !== '/');

    if (isActive) {
      style = { ...style, ...(isMobileMode ? styles.activeMobileLink : styles.activeLink) };
    } else if (hoveredLink === name) {
      style = { ...style, backgroundColor: isMobileMode ? '#f8fafc' : 'rgba(0,0,0,0.03)', color: '#1e293b' };
    }
    return style;
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        
        <div style={styles.leftGroup}>
          <button 
            style={styles.sidebarToggleBtn} 
            onClick={onToggleSidebar}
          >
            <FaColumns />
          </button>

          <Link to="/" style={styles.logoGroup} onClick={(e) => handleNavClick(e, '/')}>
            <img 
              src="https://avatars.githubusercontent.com/u/160145497?v=4" 
              alt="Gowra Pavan Kumar" 
              style={styles.logoIcon}
            />
            <span style={styles.logoText}>Gowra's Blog</span>
          </Link>
        </div>

        <button 
          style={styles.menuButton} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div style={styles.desktopLinks}>
          {navLinks.map((item) => (
            <a key={item.name} href={item.path} style={getLinkStyle(item.name, item.path, item.id)} onClick={(e) => handleNavClick(e, item.path, item.id)}>
              {item.name}
            </a>
          ))}
          <div style={styles.divider}></div>
          {['Posts', 'Notes', 'Docs'].map((page) => (
            <Link key={page} to={`/${page.toLowerCase()}`} style={getLinkStyle(page, `/${page.toLowerCase()}`)}>
              {page}
            </Link>
          ))}
        </div>

        {isMobile && isMenuOpen && (
          <div style={styles.mobileMenu}>
            {navLinks.map((item) => (
              <a key={item.name} href={item.path} style={getLinkStyle(item.name, item.path, item.id, true)} onClick={(e) => handleNavClick(e, item.path, item.id)}>
                {item.name}
              </a>
            ))}
            <div style={{ width: '100%', height: '1px', backgroundColor: '#e2e8f0', margin: '0.5rem 0' }}></div>
            {['Posts', 'Notes', 'Docs'].map((page) => (
              <Link key={page} to={`/${page.toLowerCase()}`} style={getLinkStyle(page, `/${page.toLowerCase()}`, undefined, true)} onClick={() => setIsMenuOpen(false)}>
                {page}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;