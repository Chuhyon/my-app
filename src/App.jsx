import React from 'react';
import CSDashboard from './components/CSDashboard';
import './App.css';

function App() {
  return (
    <div className="App" style={{ 
      width: '100vw', 
      maxWidth: '100%', 
      padding: '0',
      margin: '0',
      boxSizing: 'border-box'
    }}>
      <CSDashboard />
    </div>
  );
}

export default App;