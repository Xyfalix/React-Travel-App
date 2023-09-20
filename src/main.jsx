import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouting from './AppRouting.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import "./index.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AppRouting />
    </Router>
  </React.StrictMode>,
)
