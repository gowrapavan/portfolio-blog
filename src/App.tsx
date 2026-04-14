import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import the Navbar
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Posts from './pages/Posts';
import Post from './pages/Post';
import NotFound from './components/NotFound';
import ScrollToTop from './components/ScrollToTop';
import ChatBot from './components/ChatBot';
import Ziloplay from './pages/Ziloplay';
import Goal4u from './pages/Goal4u';
import Logs from './pages/Logs'; // Adjust this path to wherever you saved Logs.tsx
function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900 flex flex-col">
      <ScrollToTop /> 
      
      {/* Place Navbar here so it shows on all pages */}
      <Navbar />

      <main className="w-full flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/ziloplay" element={<Ziloplay />} />
          <Route path="/goal4u" element={<Goal4u />} />
          <Route path="/logs" element={<Logs />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <ChatBot />
      <Footer />
    </div>
  );
}

export default App;