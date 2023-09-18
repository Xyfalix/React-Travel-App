import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import DestinationDetail from './components/DestinationDetail.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/destination/:id" element={<DestinationDetail />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
