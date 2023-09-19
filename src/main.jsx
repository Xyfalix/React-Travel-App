import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import DestinationDetail from './components/DestinationDetail.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DestinationList from './components/DestinationList.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
)
