import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom'; // 1. Import this
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter> {/* 2. Add this wrapper around App */}
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);