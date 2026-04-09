import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { FaHome, FaArrowLeft } from 'react-icons/fa';

// ==========================================
// 1. 3D BACKGROUND PARTICLES (Matches Hero)
// ==========================================
const BackgroundParticles = ({ isHovering }: { isHovering: boolean }) => {
  const sphereRef = useRef<THREE.Points>(null);
  const particleCount = 105000;

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
      // Gentle rotation, speeds up slightly on hover
      const speed = isHovering ? 0.15 : 0.05;
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

// ==========================================
// 2. MAIN 404 COMPONENT
// ==========================================
export default function PageNotFound() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
        
        .not-found-container { 
          position: relative; 
          width: 100%; 
          min-height: 100svh; 
          background-color: #fafafa; 
          overflow: hidden; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          color: #0f172a; 
        }
        
        /* Background & Ambient Glows */
        .bg-canvas-wrapper { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
        .ambient-glow-1 { position: absolute; top: -10%; left: -5%; width: 50vw; height: 50vw; border-radius: 50%; background: radial-gradient(circle, rgba(14,165,233,0.1) 0%, rgba(255,255,255,0) 70%); pointer-events: none; z-index: 1; }
        .ambient-glow-2 { position: absolute; bottom: 0%; right: -5%; width: 50vw; height: 50vw; border-radius: 50%; background: radial-gradient(circle, rgba(59,130,246,0.08) 0%, rgba(255,255,255,0) 70%); pointer-events: none; z-index: 1; }
        
        /* Content Wrapper */
        .content-wrapper { 
          position: relative; 
          z-index: 10; 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          text-align: center; 
          padding: 0 24px;
        }

        /* Giant 404 Text */
        .error-code { 
          font-size: clamp(8rem, 20vw, 14rem); 
          font-weight: 900; 
          line-height: 1; 
          letter-spacing: -0.05em;
          background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%); 
          -webkit-background-clip: text; 
          color: transparent; 
          margin-bottom: 10px;
          animation: float 6s ease-in-out infinite;
          filter: drop-shadow(0 20px 30px rgba(14, 165, 233, 0.15));
        }

        /* Typography */
        .heading { 
          font-size: clamp(2rem, 4vw, 3rem); 
          font-weight: 800; 
          letter-spacing: -0.03em; 
          color: #020617; 
          margin-bottom: 16px; 
        }
        .description { 
          font-size: clamp(1rem, 1.2vw, 1.15rem); 
          color: #64748b; 
          line-height: 1.6; 
          max-width: 480px; 
          margin-bottom: 40px; 
        }

        /* Call to Action Buttons */
        .cta-container { 
          display: flex; 
          align-items: center; 
          gap: 20px; 
          flex-wrap: wrap;
          justify-content: center;
        }

        /* Primary Button (Home) */
        .btn-primary { 
          display: inline-flex; 
          align-items: center; 
          gap: 10px; 
          background: #0ea5e9; 
          color: white; 
          padding: 14px 32px; 
          border-radius: 50px; 
          font-weight: 600; 
          font-size: 1.05rem; 
          text-decoration: none; 
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
          box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.3); 
        }
        .btn-primary:hover { 
          background: #19b0f5; 
          transform: translateY(-3px); 
          box-shadow: 0 20px 35px -5px rgba(14, 165, 233, 0.25); 
        }

        /* Secondary Button (Go Back) */
        .btn-secondary { 
          display: inline-flex; 
          align-items: center; 
          gap: 10px; 
          background: rgba(255, 255, 255, 0.8); 
          backdrop-filter: blur(10px);
          color: #0ea5e9; 
          padding: 14px 32px; 
          border-radius: 50px; 
          font-weight: 600; 
          font-size: 1.05rem; 
          text-decoration: none; 
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease; 
          cursor: pointer;
        }
        .btn-secondary:hover { 
          background: #ffffff; 
          color: #0ea5e9;
          border-color: #bae6fd;
          transform: translateY(-3px); 
          box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.05); 
        }

        .icon-bounce { transition: transform 0.3s ease; }
        .btn-primary:hover .icon-bounce { transform: translateX(-4px); }

        /* Floating Animation */
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }

        /* Mobile Responsiveness */
        @media (max-width: 600px) {
          .cta-container { flex-direction: column; gap: 16px; width: 100%; }
          .btn-primary, .btn-secondary { width: 100%; justify-content: center; }
        }
      `}</style>

      <section 
        className="not-found-container"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        
        {/* Interactive 3D Particle Background */}
        <div className="bg-canvas-wrapper">
          <Canvas camera={{ position: [0, 0, 14], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <BackgroundParticles isHovering={isHovering} />
          </Canvas>
        </div>

        {/* Premium Gradients */}
        <div className="ambient-glow-1" />
        <div className="ambient-glow-2" />

        {/* Main Content */}
        <div className="content-wrapper">
          
          <h1 className="error-code">404</h1>
          
          <h2 className="heading">Page not found</h2>
          
          <p className="description">
            Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          <div className="cta-container">
            {/* Go Back Button */}
            <button onClick={() => window.history.back()} className="btn-secondary">
              <FaArrowLeft className="icon-bounce" style={{ fontSize: '14px' }} /> Go Back
            </button>
            
            {/* Home Button */}
            <a href="/" className="btn-primary">
              <FaHome style={{ fontSize: '18px', marginBottom: '2px' }} /> Back to Home
            </a>
          </div>

        </div>

      </section>
    </>
  );
}