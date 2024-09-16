import React from 'react';
import ReactDOM from 'react-dom/client';  // Make sure you are using this if on React 18
import App from './App.jsx';
import GridBackground from './components/ui/GridBackground.jsx';
import './index.css';
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GridBackground>
        <App />
      </GridBackground>
    </BrowserRouter>
  </React.StrictMode>
);
