import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { MessageSquare, Send, X, Bot } from 'lucide-react';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm Pavan's AI twin. Ask me anything about his technical skills or recent projects!" }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const { data: logs } = await supabase.from('dev_logs').select('content').order('created_at', { ascending: false }).limit(10);
      const context = logs?.map(l => l.content).join('\n') || "No recent logs.";

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            { role: 'system', content: `You are Pavan's AI twin. Answer based on: ${context}` },
            { role: 'user', content: userMsg }
          ]
        })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.choices[0].message.content }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Database connection failed!" }]);
    } finally { setLoading(false); }
  };

  const s = {
    container: { position: 'fixed' as const, bottom: '20px', right: '20px', zIndex: 9999, fontFamily: 'sans-serif' },
    bubble: { backgroundColor: '#2563eb', color: 'white', padding: '15px', borderRadius: '50%', cursor: 'pointer', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' },
    window: { backgroundColor: 'white', width: '320px', height: '450px', borderRadius: '15px', boxShadow: '0 8px 24px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column' as const, overflow: 'hidden', border: '1px solid #e5e7eb' },
    header: { backgroundColor: '#2563eb', color: 'white', padding: '12px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    msgArea: { flex: 1, overflowY: 'auto' as const, padding: '15px', backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column' as const, gap: '10px' },
    userMsg: { alignSelf: 'flex-end', backgroundColor: '#2563eb', color: 'white', padding: '8px 12px', borderRadius: '12px 12px 0 12px', fontSize: '14px', maxWidth: '80%' },
    botMsg: { alignSelf: 'flex-start', backgroundColor: 'white', border: '1px solid #e5e7eb', padding: '8px 12px', borderRadius: '0 12px 12px 12px', fontSize: '14px', maxWidth: '80%' },
    inputForm: { padding: '10px', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '5px' },
    input: { flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '14px' },
    sendBtn: { backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', padding: '5px 10px', cursor: 'pointer' }
  };

  return (
    <div style={s.container}>
      {!isOpen ? (
        <button style={s.bubble} onClick={() => setIsOpen(true)}><MessageSquare size={24} /></button>
      ) : (
        <div style={s.window}>
          <div style={s.header}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Bot size={18} /><strong>Pavan's Twin</strong></div>
            <X size={18} style={{ cursor: 'pointer' }} onClick={() => setIsOpen(false)} />
          </div>
          <div style={s.msgArea} ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} style={m.role === 'user' ? s.userMsg : s.botMsg}>{m.content}</div>
            ))}
            {loading && <div style={{ fontSize: '12px', color: '#9ca3af' }}>Typing...</div>}
          </div>
          <form style={s.inputForm} onSubmit={handleChat}>
            <input style={s.input} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask me something..." />
            <button type="submit" style={s.sendBtn}><Send size={16} /></button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;