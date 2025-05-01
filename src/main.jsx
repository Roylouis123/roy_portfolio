import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Preload critical assets (only essential images)
const preload = (assets) => {
  assets.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Only preload critical images
preload([]);

// Create React app faster without StrictMode in production
const root = createRoot(document.getElementById('root'));
root.render(
  import.meta.env.DEV ? (
    <StrictMode>
      <App />
    </StrictMode>
  ) : (
    <App />
  )
);
