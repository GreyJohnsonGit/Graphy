import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import './main.css';

(function main() {
  const root = document.getElementById('root');

  if (!root) {
    throw new Error('Element with id "#root" not found');
  }

  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
})();