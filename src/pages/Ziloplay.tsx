import React from 'react';

export default function Ziloplay() {
  return (
    <div style={{ 
      width: '100vw', 
      height: 'calc(100vh - 70px)', 
      marginTop: '70px', // Push the iframe down below the fixed navbar
      overflow: 'hidden' 
    }}>
      <iframe 
        src="https://ziloplay.netlify.app/" 
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="ZiloPlay Movie Streaming"
      />
    </div>
  );
}