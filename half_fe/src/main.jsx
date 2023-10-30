// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SidebarProvider } from "./components/context/sidebar_context";
import { CoursesProvider } from "./components/context/course_context";
import { CartProvider } from "./components/context/cart_context";
import { UserProvider } from "./components/context/user_context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   
      <SidebarProvider>
        <CoursesProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CoursesProvider>
      </SidebarProvider>
 
  </React.StrictMode>
);
