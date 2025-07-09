// src/App.jsx
import React from "react";
import NavRoutes from "./NavRoutes";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <>
      <NavRoutes />
      <ToastContainer />
    </>
  );
}

export default App;
