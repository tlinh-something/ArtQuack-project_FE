import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginSignup from './Login signup/LoginSignup';

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
function App() {
  return (
    <div className="App">
      <LoginSignup/>
    </div>
  );
}

export default App;
