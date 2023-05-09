import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

// -------------STYLES-----------------//
import './styles/sass/reset.scss';
import './styles/sass/variables.scss';
import './styles/sass/defaults.scss';
import './styles/sass/helpers.scss';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </BrowserRouter>
)
