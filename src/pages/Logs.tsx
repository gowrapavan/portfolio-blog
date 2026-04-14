import React from 'react';

export default function Logs() {
  return (
    <div style={{ 
      width: '100vw', 
      height: 'calc(100vh - 50px)', // Adjusted to match your 50px navbar
      marginTop: '50px', 
      overflow: 'hidden' 
    }}>
      <iframe 
        src="https://gowralogs.netlify.app/dashboard" // Pointing to your deployed Next.js app
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="CI/CD Intelligence Logs"
      />
    </div>
  );
}