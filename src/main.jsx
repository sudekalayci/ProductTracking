import React from 'react';
import ReactDOM from 'react-dom/client'; // Vite ile gelen React 18+ kullanımı
import App from './App'; // Uygulamanızın ana component'i

// React 18+ ile gelen 'root' API'si
const root = ReactDOM.createRoot(document.getElementById('root')); 

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);