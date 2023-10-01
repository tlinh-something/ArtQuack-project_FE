import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
//import App from './Register.jsx'
// import './Register.css'
import NotFound from './NotFound.jsx';

import Register from './Register.jsx';
import RegisterIns from './RegisterIns.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<App />}/> */}
        <Route path='/' element={<Register />}/>
        <Route path='registerIns' element={<RegisterIns />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
