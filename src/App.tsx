import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './pages/Home';
import Posts from './pages/Posts';
import Post from './pages/Post';
import ScrollToTop from './components/ScrollToTop';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900 flex flex-col">
      <ScrollToTop /> 
      
      {/* Navbar removed from here. It is now handled by individual pages to prevent duplicates and allow sidebar state passing. */}
      
      {/* Removed the max-w-4xl here so the Post/Posts grid can expand to 1400px */}
      <main className="w-full flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<Post />} />
        </Routes>
      </main>
                <ChatBot />

      <Footer />
    </div>
  );
}

export default App;