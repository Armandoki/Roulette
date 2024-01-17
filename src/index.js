import React from 'react';
import ReactDOM from 'react-dom/client';

import Home from './components/Home';
import './static/css/index.css';
import 'bootstrap/dist/css/bootstrap.css'

const roulette =  (
    <React.StrictMode>
      <Home />
    </React.StrictMode>
  )

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(roulette);