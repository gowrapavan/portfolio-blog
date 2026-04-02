import Hero from '../components/Hero';
import Skills from '../components/Skills';
import FeaturedProjects from '../components/FeaturedProjects';
import Experience from '../components/Experience';
import Accomplishments from '../components/Accomplishments';
import RecentPosts from '../components/RecentPosts';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar'; // <-- Import Navbar

const Home = () => {
  const styles = {
    pageContainer: {
      width: '100%',
      minHeight: '100vh',
      overflowX: 'hidden' as const,
      display: 'flex',
      flexDirection: 'column' as const,
    },
    sectionWrapper: {
      width: '100%',
      display: 'block',
    }
  };

  return (
    <div style={styles.pageContainer}>
      <SEO 
        title="Home" 
        description="Gowra Pavan Kumar - Software Engineer & Full Stack Developer. Explore my portfolio, projects, skills, and technical notes."
      />

      {/* Add Navbar here */}
      <Navbar /> 

      <section id="home" style={styles.sectionWrapper}>
        <Hero /> 
      </section>

      <section id="experience" style={styles.sectionWrapper}>
        <Experience />
      </section>

      <section id="projects" style={styles.sectionWrapper}>
        <FeaturedProjects />
      </section>

      <section id="skills" style={styles.sectionWrapper}>
        <Skills />
      </section>

      <div style={styles.sectionWrapper}>
        <RecentPosts />
      </div>

      <section id="accomplishments" style={styles.sectionWrapper}>
        <Accomplishments />
      </section>
    </div>
  );
};

export default Home;