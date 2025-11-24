import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { BountyProvider } from './context/BountyContext';
import './App.css';
import "leaflet/dist/leaflet.css";
import "./leaflet-fix";
import { store } from "./store/store";
import { Provider } from 'react-redux';
const container = document.getElementById('root');
if (!container) throw new Error('Root element not found in index.html');

createRoot(container).render(
  <React.StrictMode>
    <BrowserRouter>
      <BountyProvider>
        <Provider store={store}>
        <App />
        </Provider>
      </BountyProvider>
    </BrowserRouter>
  </React.StrictMode>
);
