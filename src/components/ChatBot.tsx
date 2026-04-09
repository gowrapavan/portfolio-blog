import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { MessageSquare, Send, X, Bot, Sparkles } from 'lucide-react';

// 🛑 IMPORTANT: Keep your paths matching your folder structure!
import { posts } from '../data/posts'; 
import { projects } from '../data/projects';
import { aboutMeContext } from '../data/aboutMe'; 

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm Pavan's AI twin. Ask me anything about his projects, skills, or recent updates!" }
  ]);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  // --- Typewriter Effect Function ---
  const simulateTyping = (fullText: string) => {
    setIsTyping(true);
    let currentText = "";
    let currentIndex = 0;
    
    setMessages(prev => [...prev, { role: 'assistant', content: "" }]);

    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        currentText += fullText[currentIndex];
        
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: 'assistant', content: currentText };
          return newMessages;
        });
        
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 12); // Speed of typing
  };

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading || isTyping) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      let recentLogs = "No recent updates fetched.";
      if (supabase) {
        const { data: logs } = await supabase
          .from('dev_logs')
          .select('content')
          .order('created_at', { ascending: false })
          .limit(5);
        if (logs) recentLogs = logs.map(l => `- ${l.content}`).join('\n');
      }

      const postsContext = posts?.length 
        ? posts.map(p => `- Article: ${p.title} - ${p.excerpt}`).join('\n')
        : "No blog posts provided.";

      const projectsContext = projects?.length
        ? projects.map(p => `- Project: ${p.title} - Tech: ${p.tech?.join(', ') || p.tags?.join(', ') || 'N/A'}`).join('\n')
        : "No projects provided.";

      const systemPrompt = `
        You are the official AI Portfolio Assistant for Gowra Pavan Kumar. 
        You represent him. NEVER say you do not know who Pavan is.
        
        CRITICAL FORMATTING RULES:
        1. Keep answers CONCISE (2-3 short paragraphs max).
        2. DO NOT output massive walls of text. 
        3. Use bullet points when listing skills or projects.
        
        Use the exact information below to answer questions about Pavan's work. 
        
        PAVAN'S BACKGROUND:
        ${aboutMeContext}

        PAVAN'S PORTFOLIO PROJECTS:
        ${projectsContext}

        PAVAN'S BLOG POSTS/ARTICLES:
        ${postsContext}

        PAVAN'S RECENT AUTOMATED CODE LOGS:
        ${recentLogs}
      `;

      const groqKey = import.meta.env.VITE_GROQ_API_KEY;
      if (!groqKey) throw new Error("Missing Groq API Key");

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${groqKey}`, 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages.filter(m => m.role !== 'system'), 
            { role: 'user', content: userMsg }
          ],
          temperature: 0.4
        })
      });
      
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      
      setLoading(false);
      simulateTyping(data.choices[0].message.content);
      
    } catch (err) {
      console.error("🚨 Chat Error:", err);
      setLoading(false);
      simulateTyping("Sorry, my network is a bit slow right now! Please try again in a moment.");
    }
  };

  // --- NEW: Improved Markdown Formatter ---
  const formatMessage = (text: string) => {
    // 1. Make text bold
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong style="color: #0f172a;">$1</strong>');
    
    // 2. Convert standard markdown lists (* or -) to clean HTML breaks with a neat bullet point
    formattedText = formattedText.replace(/(\n)?^[-*]\s+(.*)/gm, '<br/><span style="color: #0284c7; margin-right: 6px;">•</span>$2');
    
    // 3. Remove any leading <br/> that might have been accidentally created at the very start
    formattedText = formattedText.replace(/^<br\/>/, '');
    
    return { __html: formattedText };
  };

  // --- REFINED BLUE UI STYLES ---
  // Using #0284c7 (Sky Blue 600) to match your portfolio's active tab color perfectly
  const primaryBlue = '#0284c7'; 
  const primaryBlueHover = '#0369a1';

  const s = {
    container: { position: 'fixed' as const, bottom: '24px', right: '24px', zIndex: 9999, fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif' },
    
    bubble: { 
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      width: '60px', height: '60px', borderRadius: '30px', 
      backgroundColor: primaryBlue, 
      color: 'white', border: 'none', cursor: 'pointer', 
      boxShadow: isHovering ? '0 10px 25px rgba(2, 132, 199, 0.4)' : '0 8px 20px rgba(2, 132, 199, 0.25)',
      transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
      transform: isHovering ? 'scale(1.05)' : 'scale(1)'
    },

    window: { 
      backgroundColor: '#ffffff', width: '360px', height: '560px', 
      borderRadius: '20px', display: 'flex', flexDirection: 'column' as const, overflow: 'hidden', 
      boxShadow: '0 12px 40px rgba(0,0,0,0.12), 0 0 2px rgba(0,0,0,0.1)', 
      position: 'absolute' as const, bottom: '80px', right: '0'
    },

    header: { 
      backgroundColor: primaryBlue, 
      color: 'white', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' 
    },
    headerInfo: { display: 'flex', alignItems: 'center', gap: '12px' },
    avatarWrapper: { 
      backgroundColor: 'rgba(255,255,255,0.2)', // Soft transparent white
      padding: '8px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' 
    },
    statusDot: { width: '8px', height: '8px', backgroundColor: '#4ade80', borderRadius: '50%', display: 'inline-block', marginRight: '6px' },

    msgArea: { 
      flex: 1, overflowY: 'auto' as const, padding: '20px', 
      backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column' as const, gap: '16px' 
    },
    
    userMsg: { 
      alignSelf: 'flex-end', backgroundColor: primaryBlue, color: 'white', 
      padding: '12px 16px', borderRadius: '18px 18px 4px 18px', fontSize: '14px', lineHeight: '1.6', maxWidth: '85%',
      boxShadow: '0 2px 8px rgba(2, 132, 199, 0.15)', whiteSpace: 'pre-wrap' as const, wordBreak: 'break-word' as const
    },
    botMsg: { 
      alignSelf: 'flex-start', backgroundColor: '#ffffff', color: '#475569', 
      padding: '12px 16px', borderRadius: '18px 18px 18px 4px', fontSize: '14px', lineHeight: '1.6', maxWidth: '85%', 
      border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)', whiteSpace: 'pre-wrap' as const, wordBreak: 'break-word' as const
    },

    inputForm: { padding: '16px', backgroundColor: '#ffffff', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '10px' },
    input: { 
      flex: 1, padding: '12px 16px', borderRadius: '24px', border: '1px solid #e2e8f0', 
      backgroundColor: '#f8fafc', outline: 'none', fontSize: '14px', color: '#0f172a',
      transition: 'border-color 0.2s ease'
    },
    sendBtn: { 
      backgroundColor: primaryBlue, color: 'white', border: 'none', borderRadius: '24px', 
      width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
      cursor: 'pointer', transition: 'background-color 0.2s ease'
    }
  };

  return (
    <div style={s.container}>
      {!isOpen ? (
        <button 
          style={s.bubble} 
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <MessageSquare size={24} fill="currentColor" strokeWidth={1} />
        </button>
      ) : (
        <div style={s.window}>
          <div style={s.header}>
            <div style={s.headerInfo}>
              <div style={s.avatarWrapper}><Bot size={22} color="white" strokeWidth={2} /></div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '15px' }}>Pavan's AI Twin</div>
                <div style={{ fontSize: '11px', color: '#e0f2fe', marginTop: '2px', display: 'flex', alignItems: 'center' }}>
                  <span style={s.statusDot}></span> {isTyping ? "Typing..." : "Online & Ready"}
                </div>
              </div>
            </div>
            <X size={20} style={{ cursor: 'pointer', color: '#e0f2fe', transition: 'color 0.2s' }} onClick={() => setIsOpen(false)} />
          </div>

          <div style={s.msgArea} ref={scrollRef}>
            {messages.map((m, i) => (
              <div 
                key={i} 
                style={m.role === 'user' ? s.userMsg : s.botMsg}
                dangerouslySetInnerHTML={formatMessage(m.content + (isTyping && i === messages.length - 1 && m.role === 'assistant' ? ' <span style="animation: pulse 1s infinite;">█</span>' : ''))} 
              />
            ))}
            
            {loading && (
              <div style={{ ...s.botMsg, padding: '12px 16px', display: 'flex', gap: '4px', alignItems: 'center', width: 'fit-content' }}>
                <span className="typing-dot" style={{ width: '6px', height: '6px', backgroundColor: '#94a3b8', borderRadius: '50%' }}></span>
                <span className="typing-dot" style={{ width: '6px', height: '6px', backgroundColor: '#94a3b8', borderRadius: '50%' }}></span>
                <span className="typing-dot" style={{ width: '6px', height: '6px', backgroundColor: '#94a3b8', borderRadius: '50%' }}></span>
              </div>
            )}
          </div>

          <form style={s.inputForm} onSubmit={handleChat}>
            <input 
              style={s.input} 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Ask about my tech stack..." 
              disabled={loading || isTyping} 
            />
            <button 
              type="submit" 
              style={{ 
                ...s.sendBtn, 
                backgroundColor: loading || isTyping || !input.trim() ? '#93c5fd' : primaryBlue,
                cursor: loading || isTyping || !input.trim() ? 'not-allowed' : 'pointer'
              }} 
              disabled={loading || isTyping || !input.trim()}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
      
      <style>
        {`
          @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
          .typing-dot { animation: bounce 1.4s infinite ease-in-out both; }
          .typing-dot:nth-child(1) { animation-delay: -0.32s; }
          .typing-dot:nth-child(2) { animation-delay: -0.16s; }
          @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        `}
      </style>
    </div>
  );
};

export default ChatBot;