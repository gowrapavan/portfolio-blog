import React from 'react';

export default function Goal4u() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <iframe 
        src="https://goal4u.netlify.app/" 
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Goal4u Football Analytics"
      />
    </div>
  );
}