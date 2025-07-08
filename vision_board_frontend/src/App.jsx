import "./App.css";
import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./Context/Context";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Navbar from "./components/Navbar";
import VisionBoard from "./components/VisionBoard";
import AddVisionItem from "./components/AddVisionItem";
import Archive from "./components/Archive";
import UpdateVisionItem from "./components/UpdateVisionItem";
import PrintBoard from "./components/PrintBoard";

function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<VisionBoard />} />
          <Route path="/add" element={<AddVisionItem />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/update/:id" element={<UpdateVisionItem />} />
          <Route path="/print" element={<PrintBoard />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}

export default App;
