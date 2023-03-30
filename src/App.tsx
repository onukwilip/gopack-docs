import { useState } from "react";
import "./styles/App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import Docs from "./pages/Docs";
import Header from "./components/Header";

function App() {
  const [searchWord, setSearchWord] = useState("");

  return (
    <section className="App">
      <Header setSearchWord={setSearchWord} />
      <>
        <Routes>
          <Route path="/" element={<Navigate to="/docs" />} />
          <Route path="/docs" element={<Docs searchWord={searchWord} />} />
        </Routes>
      </>
    </section>
  );
}

export default App;
