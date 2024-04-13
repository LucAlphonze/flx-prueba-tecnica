import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LayoutComponent from "./components/layout/layout";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LayoutComponent />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
