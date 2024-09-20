import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detection from "./pages/Detection.jsx";
import Chatting from "./pages/Chatting.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/detection" element={<Detection />} />
        <Route path="/chatting" element={<Chatting />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
