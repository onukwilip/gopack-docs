import { useState } from "react";
import "./styles/App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import Docs from "./pages/Docs";
import Header from "./components/Header";

function App() {
  return (
    <section className="App">
      <Header />
      <>
        <Routes>
          <Route path="/" element={<Navigate to="/docs" />} />
          <Route path="/issues" element={<Navigate to="/docs" />} />
          <Route path="*" element={<Navigate to="/docs" />} />
          <Route path="/docs" element={<Docs />} />
        </Routes>
      </>
    </section>
  );
}

export default App;
