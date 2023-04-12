import { useState } from "react";
import "./styles/App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import Docs from "./pages/Docs";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import { SelectorType } from "./utils/types";

const App = () => {
  const displayState = useSelector(
    (state: SelectorType) => state?.display?.display
  );

  return (
    <section className={`App ${displayState === "dark" ? "dark" : null}`}>
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
};

export default App;
