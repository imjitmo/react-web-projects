import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from './App.jsx';
import './index.css';
import('preline');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <Router>
        <App />
        <Toaster
          position="bottom-center"
          toastOptions={{ style: { background: '#334155', color: '#fff', textTransform: 'capitalize' } }}
        />
      </Router>
    </RecoilRoot>
  </React.StrictMode>
);
