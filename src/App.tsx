import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './pages/Home';
import Posts from './pages/Posts';
import Post from './pages/Post';
import NotFound from './components/NotFound'; // 1. Import your component
import ScrollToTop from './components/ScrollToTop';
import ChatBot from './components/ChatBot';
import Ziloplay from './pages/Ziloplay';
import Goal4u from './pages/Goal4u';

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900 flex flex-col">
      <ScrollToTop /> 
      
      <main className="w-full flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/ziloplay" element={<Ziloplay />} />
          <Route path="/goal4u" element={<Goal4u />} />
          
          {/* 2. Add the catch-all route at the VERY bottom of the list */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <ChatBot />
      <Footer />
    </div>
  );
}

export default App;