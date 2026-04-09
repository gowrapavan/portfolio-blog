import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Html } from '@react-three/drei';
import * as THREE from 'three';
import { FaEnvelope, FaGithub, FaLinkedin, FaPhone, FaArrowRight, FaChevronDown } from 'react-icons/fa';

// ==========================================
// 1. DATA & 3D COMPONENTS
// ==========================================

const techIcons = [
  { name: 'Python', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'React', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Node.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'AWS', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'Supabase', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
  { name: 'GitHub', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' }
];

const BackgroundParticles = ({ isHovering }: { isHovering: boolean }) => {
  const sphereRef = useRef<THREE.Points>(null);
  const particleCount = 180000;

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 5 + Math.random() * 30; 
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [particleCount]);

  useFrame((state, delta) => {
    if (sphereRef.current) {
      const speed = isHovering ? 0.25 : 0.07;
      sphereRef.current.rotation.y += delta * speed;
      sphereRef.current.rotation.z += delta * (speed * 0.5);
    }
  });

  return (
    <Points ref={sphereRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#0ea5e9" size={0.04} sizeAttenuation={true} depthWrite={false} opacity={0.3} />
    </Points>
  );
};

const TechCore = () => {
  return (
    <group>
      <Html center zIndexRange={[100, 0]}>
        <div className="center-core-wrapper">
          
          <div className="orbital-ring ring-1">
            {techIcons.map((icon, index) => {
              const angle = (index / techIcons.length) * 360;
              return (
                <div key={icon.name} className="icon-positioner" style={{ transform: `rotate(${angle}deg)` }}>
                  <div className="orbit-icon-wrapper">
                    <div className="orbit-icon">
                      <img src={icon.url} alt={icon.name} />
                    </div>
                    <span className="icon-tooltip">{icon.name}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="orbital-ring ring-2"></div>
          
          <div className="center-core">
            <img 
              src="https://avatars.githubusercontent.com/u/160145497?v=4" 
              className="core-image" 
              alt="Gowra Pavan Kumar" 
            />
            <div className="inner-glow" />
          </div>

        </div>
      </Html>
    </group>
  );
};

// ==========================================
// 2. MAIN HERO COMPONENT
// ==========================================

export default function Hero() {
  const [isHoveringSphere, setIsHoveringSphere] = useState(false);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
        
        .hero-container { position: relative; width: 100%; min-height: 100svh; background-color: #fafafa; overflow: hidden; display: flex; align-items: center; color: #0f172a; padding-bottom: 40px; }
        
        .bg-canvas-wrapper { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none; }
        .ambient-glow-1 { position: absolute; top: -10%; left: -5%; width: 50%; height: 50%; border-radius: 50%; background: radial-gradient(circle, rgba(14,165,233,0.1) 0%, rgba(255,255,255,0) 70%); pointer-events: none; z-index: 1; }
        .ambient-glow-2 { position: absolute; bottom: 0%; right: -5%; width: 50%; height: 50%; border-radius: 50%; background: radial-gradient(circle, rgba(59,130,246,0.08) 0%, rgba(255,255,255,0) 70%); pointer-events: none; z-index: 1; }
        
        .content-wrapper { max-width: 1280px; margin: 0 auto; padding: 0 40px; position: relative; z-index: 10; width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 40px; }
        .text-section { width: 50%; display: flex; flex-direction: column; align-items: flex-start; z-index: 20; }
        
        .badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; border-radius: 50px; background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 24px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
        .status-dot { position: relative; display: flex; width: 10px; height: 10px; }
        .dot-ping { position: absolute; width: 100%; height: 100%; border-radius: 50%; background-color: #22c55e; opacity: 0.5; animation: ping 1.5s infinite; }
        .dot-core { position: relative; width: 10px; height: 10px; border-radius: 50%; background-color: #16a34a; }
        .badge-text { font-size: 13px; font-weight: 600; color: #334155; }
        .heading { font-size: clamp(2.8rem, 5vw, 4.5rem); font-weight: 800; letter-spacing: -0.03em; line-height: 1.05; margin-bottom: 16px; color: #020617; }
        .highlight { background: linear-gradient(135deg, #0ea5e9 0%, #19b0f5 100%); -webkit-background-clip: text; color: transparent; }
        .subtitle { font-size: clamp(1.1rem, 2vw, 1.5rem); font-weight: 600; color: #475569; margin-bottom: 20px; }
        .description { font-size: clamp(1rem, 1.2vw, 1.1rem); color: #64748b; line-height: 1.6; max-width: 520px; margin-bottom: 36px; }
        
        /* Updated btn-primary for an <a> tag */
        .btn-primary { display: inline-flex; align-items: center; gap: 8px; background: #0ea5e9; color: white; padding: 14px 32px; border-radius: 50px; font-weight: 600; font-size: 1.05rem; border: none; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 10px 25px rgba(15, 23, 42, 0.3); text-decoration: none; }
        .btn-primary:hover { background: #19b0f5; transform: translateY(-3px); box-shadow: 0 20px 35px rgba(14, 165, 233, 0.25); }
                
        .cta-container { display: flex; align-items: center; gap: 28px; flex-wrap: wrap; }
        .social-links { display: flex; align-items: center; gap: 18px; }
        .social-icon { color: #94a3b8; font-size: 20px; transition: all 0.2s ease; cursor: pointer; display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 50%; background: white; border: 1px solid #e2e8f0; }
        .social-icon:hover { transform: translateY(-4px); color: #0ea5e9; border-color: #0ea5e9; }
        
        .canvas-section { width: 50%; height: 85vh; position: relative; cursor: grab; overflow: visible !important; }
        .canvas-wrapper { width: 100%; height: 100%; transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1); overflow: visible !important; }
        .canvas-hovered { transform: scale(1.03); }

        /* ==========================================
           HTML OVERLAY STYLES & ORBIT LOGIC
           ========================================== */
        
        .center-core-wrapper { 
          position: relative; 
          width: clamp(240px, 25vw, 320px); 
          height: clamp(240px, 25vw, 320px); 
          display: flex; 
          align-items: center; 
          justify-content: center; 
        } 
        
        .orbital-ring.ring-1 { position: absolute; border-radius: 50%; border: 1.5px dashed rgba(14, 165, 233, 0.4); inset: -12%; animation: spin-right 23.5s linear infinite; pointer-events: none; }
        .orbital-ring.ring-2 { position: absolute; border-radius: 50%; border: 1px dashed rgba(14, 165, 233, 0.2); inset: -28%; animation: spin-left 35s linear infinite; pointer-events: none; }
        .orbital-ring.ring-2::before { content: ''; position: absolute; top: 0; left: 50%; width: 8px; height: 8px; background: #0ea5e9; border-radius: 50%; transform: translate(-50%, -50%); box-shadow: 0 0 12px #0ea5e9; }
        .orbital-ring.ring-2::after { content: ''; position: absolute; top: -1px; left: -1px; right: -1px; bottom: -1px; border-radius: 50%; border: 2px solid transparent; border-top-color: #0ea5e9; transform: rotate(-45deg); }
        
        @keyframes spin-right { 100% { transform: rotate(360deg); } }
        @keyframes spin-left { 100% { transform: rotate(-360deg); } }

        .center-core { position: absolute; inset: 0; border-radius: 50%; padding: 10px; background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.8); box-shadow: 0 25px 50px rgba(14, 165, 233, 0.15); display: flex; align-items: center; justify-content: center; transform: translateZ(0); }
        .core-image { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; background: #fff; }
        .inner-glow { position: absolute; inset: 0; border-radius: 50%; box-shadow: inset 0 0 40px rgba(255, 255, 255, 0.9); pointer-events: none; }
        
        .icon-positioner { position: absolute; inset: 0; pointer-events: none; }
        .orbit-icon-wrapper { position: absolute; top: -21px; left: 50%; margin-left: -21px; width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; cursor: pointer; pointer-events: auto; animation: spin-left 23.5s linear infinite; }
        .orbit-icon { width: 100%; height: 100%; border-radius: 50%; background: #fff; border: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 25px rgba(14, 165, 233, 0.15); transition: all 0.3s ease; }
        .orbit-icon img { width: 22px; height: 22px; object-fit: contain; }
        .orbit-icon-wrapper:hover .orbit-icon { transform: scale(1.15); border-color: #0ea5e9; }
        
        .icon-tooltip { position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: #0f172a; color: white; padding: 6px 14px; border-radius: 8px; font-size: 13px; font-weight: 600; opacity: 0; transition: all 0.3s ease; white-space: nowrap; pointer-events: none; }
        .orbit-icon-wrapper:hover .icon-tooltip { opacity: 1; top: -45px; }

        @keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }

        /* ==========================================
           SCROLL INDICATOR STYLES
           ========================================== */
        .scroll-indicator {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          color: #64748b;
          text-decoration: none;
          z-index: 20;
          cursor: pointer;
          transition: color 0.3s ease;
        }
        .scroll-indicator:hover { color: #0ea5e9; }
        .scroll-text { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.8; }
        .scroll-arrow { font-size: 18px; animation: bounceDown 2s infinite cubic-bezier(0.4, 0, 0.2, 1); color: #0ea5e9; }

        @keyframes bounceDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }

        /* ==========================================
           FULL MOBILE RESPONSIVENESS
           ========================================== */
        @media (max-width: 992px) {
          .hero-container { padding-top: 20px; padding-bottom: 70px; } /* Cleaned up global padding */
          .content-wrapper { flex-direction: column; text-align: center; padding: 10px 24px 30px; gap: 20px; } /* Drastically reduced gap and padding */
          
          .text-section { width: 100%; align-items: center; }
          .badge { margin-bottom: 16px; }
          
          .heading { font-size: clamp(2.2rem, 8vw, 3.2rem); margin-bottom: 12px; }
          .subtitle { font-size: clamp(1.05rem, 4vw, 1.3rem); margin-bottom: 16px; }
          .description { font-size: 0.95rem; margin-bottom: 24px; max-width: 100%; }

          .cta-container { justify-content: center; flex-direction: column; gap: 16px; }
          
          /* FIX: Squashed canvas bounds to remove massive empty spaces */
          .canvas-section { width: 100%; height: 340px; min-height: 340px; order: -1; display: flex; align-items: center; justify-content: center; }
          
          /* Tightly controlled core so outer rings safely span exactly ~340px */
          .center-core-wrapper { width: clamp(190px, 48vw, 220px); height: clamp(190px, 48vw, 220px); }
        }
      `}</style>

      <section className="hero-container">
        
        <div className="bg-canvas-wrapper">
          <Canvas camera={{ position: [0, 0, 14], fov: 50 }} style={{ overflow: 'visible' }}>
            <BackgroundParticles isHovering={isHoveringSphere} />
          </Canvas>
        </div>

        <div className="ambient-glow-1" />
        <div className="ambient-glow-2" />

        <div className="content-wrapper">
          <div className="text-section">
            <div className="badge">
              <span className="status-dot">
                <span className="dot-ping"></span>
                <span className="dot-core"></span>
              </span>
              <span className="badge-text">👋 Available for new opportunities</span>
            </div>
            
            <h1 className="heading">
              <span className="highlight">Gowra</span> Pavan Kumar
            </h1>
            
            <h2 className="subtitle">Software Engineer & Full Stack Developer</h2>
            
            <p className="description">
              I build robust, scalable, and SEO-friendly web applications. Focused on performance, automation, and data-driven solutions using React, Next.js, and Python.
            </p>
            
            <div className="cta-container">
              <a href="/projects" className="btn-primary">
                View Projects <FaArrowRight />
              </a>
              <div className="social-links">
                <a href="mailto:gowrapavankumar2004@gmail.com" className="social-icon"><FaEnvelope /></a>
                <a href="https://github.com/gowrapavan" className="social-icon"><FaGithub /></a>
                <a href="https://linkedin.com/in/gowrapavan" className="social-icon"><FaLinkedin /></a>
                <a href="tel:+919642027908" className="social-icon"><FaPhone /></a>
              </div>
            </div>
          </div>

          <div 
            className="canvas-section"
            onMouseEnter={() => setIsHoveringSphere(true)}
            onMouseLeave={() => setIsHoveringSphere(false)}
          >
            <div className={`canvas-wrapper ${isHoveringSphere ? 'canvas-hovered' : ''}`}>
              <Canvas camera={{ position: [0, 0, 14], fov: 50 }} style={{ overflow: 'visible' }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#0ea5e9" />
                <TechCore />
              </Canvas>
            </div>
          </div>
        </div>

        {/* Bouncing Scroll Down Indicator */}
        <a href="#about" className="scroll-indicator" aria-label="Scroll down">
          <span className="scroll-text">Scroll Down</span>
          <FaChevronDown className="scroll-arrow" />
        </a>

      </section>
    </>
  );
}