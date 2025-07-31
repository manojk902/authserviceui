// src/App.jsx
import NavRoutes from "./NavRoutes";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { CssBaseline } from "@mui/material";
function App() {
  return (
    <>
      <CssBaseline />
      <NavRoutes />
      <ToastContainer />
    </>
  );
}

export default App;
